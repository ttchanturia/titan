'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import {
  useHomepageContent,
  useUpdateHomepageContent,
  useUploadImage,
} from '@/lib/hooks';
import {
  HOMEPAGE_IMAGE_DEFAULTS,
  HOMEPAGE_SECTIONS,
  type HomepageField,
  type HomepageSection,
} from '@/lib/homepage';
import { translations } from '@/lib/translations';
import type { HomepageContentEntry } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { MAX_UPLOAD_SIZE_BYTES, MAX_UPLOAD_SIZE_MB } from '@/lib/constants';

/** Form values per field key; `valueKa` is unused for image fields. */
type FormState = Record<string, { value: string; valueKa: string }>;

const inputClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

const labelClasses =
  'font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block';

function defaultsFor(field: HomepageField) {
  return field.kind === 'text'
    ? { value: translations.en[field.key], valueKa: translations.ka[field.key] }
    : { value: HOMEPAGE_IMAGE_DEFAULTS[field.key], valueKa: '' };
}

/** Pre-fills every field with its current effective value (saved or default). */
function buildForm(saved: HomepageContentEntry[]): FormState {
  const byKey = new Map(saved.map((e) => [e.key, e]));
  const form: FormState = {};
  for (const field of HOMEPAGE_SECTIONS.flatMap((s) => s.fields)) {
    const defaults = defaultsFor(field);
    const entry = byKey.get(field.key);
    form[field.key] = {
      value: entry?.value ?? defaults.value,
      valueKa: field.kind === 'text' ? (entry?.valueKa ?? defaults.valueKa) : '',
    };
  }
  return form;
}

/**
 * Only values that differ from the built-in defaults are stored, so untouched
 * fields keep following the defaults if those change later.
 */
function toEntries(form: FormState): HomepageContentEntry[] {
  return HOMEPAGE_SECTIONS.flatMap((s) => s.fields)
    .map((field) => {
      const defaults = defaultsFor(field);
      const value = form[field.key].value.trim();
      const valueKa = form[field.key].valueKa.trim();
      return {
        key: field.key,
        value: value && value !== defaults.value ? value : null,
        valueKa: valueKa && valueKa !== defaults.valueKa ? valueKa : null,
      };
    })
    .filter((e) => e.value !== null || e.valueKa !== null);
}

export default function AdminHomepagePage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useHomepageContent();

  return (
    <>
      <AdminPageHeader heading={t('admin_homepage_heading')} />

      <p className="text-sm text-on-surface-variant mb-12 max-w-xl">
        {t('admin_homepage_intro')}
      </p>

      {isLoading && (
        <p className="text-on-surface-variant text-sm">{t('admin_homepage_loading')}</p>
      )}

      {error && (
        <p className="text-on-surface-variant text-sm">
          {t('admin_homepage_load_failed')} {error.message}
        </p>
      )}

      {/* Mounted only once the saved values are in, so the form starts from them */}
      {data && <HomepageForm saved={data} />}
    </>
  );
}

function HomepageForm({ saved }: { saved: HomepageContentEntry[] }) {
  const { t } = useTranslation();
  const updateHomepage = useUpdateHomepageContent();
  const uploadImage = useUploadImage();

  const [form, setForm] = useState<FormState>(() => buildForm(saved));
  const [formError, setFormError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const setField = (key: string, lang: 'value' | 'valueKa', next: string) => {
    setSavedMessage(false);
    setForm((f) => ({ ...f, [key]: { ...f[key], [lang]: next } }));
  };

  const handleResetSection = (section: HomepageSection) => {
    setSavedMessage(false);
    setForm((f) => {
      const next = { ...f };
      for (const field of section.fields) next[field.key] = defaultsFor(field);
      return next;
    });
  };

  const handleImageSelect = (key: string) => async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // let the same file be re-picked after a failure
    if (!file) return;

    setFormError(null);
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setFormError(t('admin_image_too_large', { max: MAX_UPLOAD_SIZE_MB, files: file.name }));
      return;
    }

    setUploadingKey(key);
    try {
      const { url } = await uploadImage.mutateAsync(file);
      setField(key, 'value', url);
    } catch (err) {
      const serverMessage =
        isAxiosError<{ error?: string }>(err) && err.response?.data?.error;
      setFormError(serverMessage || t('admin_image_upload_failed'));
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSavedMessage(false);

    updateHomepage.mutate(toEntries(form), {
      onSuccess: () => setSavedMessage(true),
      onError: () => setFormError(t('admin_homepage_save_failed')),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {HOMEPAGE_SECTIONS.map((section) => (
        <fieldset
          key={section.title}
          className="bg-surface-container-low p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2 flex items-baseline justify-between gap-4">
            <h2 className="font-headline text-xl font-bold">{t(section.title)}</h2>
            <button
              type="button"
              onClick={() => handleResetSection(section)}
              className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              {t('admin_homepage_reset')}
            </button>
          </div>

          {section.fields.map((field) =>
            field.kind === 'text' ? (
              (['value', 'valueKa'] as const).map((lang) => {
                const label = `${t(field.label)} · ${t(
                  lang === 'value' ? 'admin_homepage_lang_en' : 'admin_homepage_lang_ka',
                )}`;
                const value = form[field.key][lang];
                const onChange = (
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                ) => setField(field.key, lang, e.target.value);

                return (
                  <div key={`${field.key}-${lang}`}>
                    <label className={labelClasses}>{label}</label>
                    {field.multiline ? (
                      <textarea
                        rows={3}
                        value={value}
                        onChange={onChange}
                        className={`${inputClasses} resize-none`}
                      />
                    ) : (
                      <input type="text" value={value} onChange={onChange} className={inputClasses} />
                    )}
                  </div>
                );
              })
            ) : (
              <div key={field.key} className="md:col-span-2">
                <label className={labelClasses}>{t(field.label)}</label>
                <div className="flex items-center gap-4">
                  {form[field.key].value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form[field.key].value}
                      alt=""
                      className="w-20 h-20 shrink-0 object-cover rounded-sm border border-outline-variant"
                    />
                  ) : (
                    <div className="w-20 h-20 shrink-0 rounded-sm border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-center text-[10px] leading-tight px-1">
                      {t('admin_homepage_no_image')}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={form[field.key].value}
                      onChange={(e) => setField(field.key, 'value', e.target.value)}
                      placeholder={t('admin_image_url_label')}
                      className={inputClasses}
                    />
                    <label
                      className={`inline-flex items-center gap-1 mt-3 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors ${uploadImage.isPending ? 'cursor-wait' : 'cursor-pointer'}`}
                    >
                      <span className="material-symbols-outlined text-base">add_photo_alternate</span>
                      {uploadingKey === field.key
                        ? t('admin_image_uploading')
                        : t('admin_image_choose')}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect(field.key)}
                        disabled={uploadImage.isPending}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {field.hint && (
                  <p className="text-xs text-on-surface-variant mt-2">{t(field.hint)}</p>
                )}
              </div>
            ),
          )}
        </fieldset>
      ))}

      <div className="sticky bottom-0 bg-surface py-4 flex flex-col gap-3">
        {formError && <p className="text-sm text-red-600">{formError}</p>}
        {savedMessage && (
          <p className="text-sm text-on-surface-variant">{t('admin_homepage_saved')}</p>
        )}
        <button
          type="submit"
          disabled={updateHomepage.isPending || uploadImage.isPending}
          className="w-full bg-primary text-on-primary py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateHomepage.isPending ? t('admin_saving') : t('admin_save_changes')}
        </button>
      </div>
    </form>
  );
}
