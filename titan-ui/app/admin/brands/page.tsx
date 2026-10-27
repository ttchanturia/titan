'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from '@/lib/hooks';
import type { Brand } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { IconAction } from '../../components/IconAction';

const emptyForm = {
  name: '',
  nameKa: '',
};

type FormState = typeof emptyForm;

const inputClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

export default function AdminBrandsPage() {
  const { t } = useTranslation();
  const { data: brands, isLoading, error } = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isSaving = createBrand.isPending || updateBrand.isPending;

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleEditClick = (brand: Brand) => {
    setEditingId(brand.id);
    setFormError(null);
    setForm({ name: brand.name, nameKa: brand.nameKa ?? '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormError(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim()) {
      setFormError(t('admin_brand_required_error'));
      return;
    }

    // Only the English name is required; the Georgian one is optional
    const payload = {
      name: form.name.trim(),
      nameKa: form.nameKa.trim() || undefined,
    };

    if (editingId !== null) {
      updateBrand.mutate(
        { id: editingId, ...payload },
        {
          onSuccess: () => {
            setForm(emptyForm);
            setEditingId(null);
          },
          onError: () => setFormError(t('admin_brand_update_failed')),
        },
      );
    } else {
      createBrand.mutate(payload, {
        onSuccess: () => setForm(emptyForm),
        onError: () => setFormError(t('admin_brand_create_failed')),
      });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(t('admin_delete_confirm', { name }))) {
      if (editingId === id) handleCancelEdit();
      deleteBrand.mutate(id);
    }
  };

  return (
    <>
      <AdminPageHeader heading={t('admin_brands_heading')} />

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low p-8 rounded-sm mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 font-headline text-xl font-bold">
          {editingId !== null ? t('admin_edit_brand') : t('admin_add_brand')}
        </h2>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_brand_name_en_label')}
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_brand_name_ka_label')}
          </label>
          <input
            type="text"
            value={form.nameKa}
            onChange={handleChange('nameKa')}
            className={inputClasses}
          />
        </div>

        {formError && (
          <p className="md:col-span-2 text-sm text-red-600">{formError}</p>
        )}

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-primary text-on-primary py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving
              ? editingId !== null
                ? t('admin_saving')
                : t('admin_adding')
              : editingId !== null
                ? t('admin_save_changes')
                : t('admin_add_brand')}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-8 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {t('admin_cancel')}
            </button>
          )}
        </div>
      </form>

      <section>
        <h2 className="font-headline text-xl font-bold mb-6">
          {t('admin_existing_brands')}
        </h2>

        {isLoading && (
          <p className="text-on-surface-variant text-sm">{t('admin_loading_brands')}</p>
        )}

        {error && (
          <p className="text-on-surface-variant text-sm">
            {t('admin_load_brands_failed')} {error.message}
          </p>
        )}

        {brands && brands.length === 0 && (
          <p className="text-on-surface-variant text-sm">{t('admin_no_brands')}</p>
        )}

        {brands && brands.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant text-xs uppercase tracking-widest">
                  <th className="py-3 pr-4">{t('admin_table_name_en')}</th>
                  <th className="py-3 pr-4">{t('admin_table_name_ka')}</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className={
                      brand.id === editingId
                        ? 'border-b border-outline-variant/50 bg-primary/5'
                        : 'border-b border-outline-variant/50'
                    }
                  >
                    <td className="py-3 pr-4">{brand.name}</td>
                    <td className="py-3 pr-4">
                      {brand.nameKa || t('admin_no_parent_value')}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <IconAction
                          icon="edit"
                          label={t('admin_edit')}
                          onClick={() => handleEditClick(brand)}
                        />
                        <IconAction
                          icon="delete"
                          label={t('admin_delete')}
                          onClick={() => handleDelete(brand.id, brand.name)}
                          disabled={deleteBrand.isPending}
                          variant="danger"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
