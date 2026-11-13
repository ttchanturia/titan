'use client';

import { useMemo } from 'react';
import { useHomepageContent } from './hooks';
import { interpolate, useTranslation } from './i18n';
import type { TranslationKey } from './translations';
import type { HomepageContentEntry } from './types';

/**
 * Configurable homepage fields.
 *
 * Text fields are keyed by their existing `home_*` translation key, which also
 * serves as the default: a field only gets a database row once an admin changes
 * it, and each language falls back to its built-in translation independently.
 * Image fields are language-neutral and fall back to HOMEPAGE_IMAGE_DEFAULTS.
 */
export type HomepageTextKey = Extract<TranslationKey, `home_${string}`>;

export const HOMEPAGE_IMAGE_DEFAULTS = {
  // Empty: the hero shows the newest product's photo unless an admin sets one
  home_hero_image: '',
} as const;

export type HomepageImageKey = keyof typeof HOMEPAGE_IMAGE_DEFAULTS;

export type HomepageField =
  | { kind: 'text'; key: HomepageTextKey; label: TranslationKey; multiline?: boolean }
  | { kind: 'image'; key: HomepageImageKey; label: TranslationKey; hint?: TranslationKey };

export interface HomepageSection {
  title: TranslationKey;
  fields: HomepageField[];
}

/** Admin form layout, in the order the sections appear on the homepage. */
export const HOMEPAGE_SECTIONS: HomepageSection[] = [
  {
    title: 'admin_homepage_section_hero',
    fields: [
      { kind: 'text', key: 'home_hero_title_line1', label: 'admin_homepage_field_title_line1' },
      { kind: 'text', key: 'home_hero_title_line2', label: 'admin_homepage_field_title_line2' },
      { kind: 'text', key: 'home_hero_subtitle', label: 'admin_homepage_field_subtitle', multiline: true },
      { kind: 'text', key: 'home_explore_series', label: 'admin_homepage_field_primary_button' },
      { kind: 'text', key: 'home_handcrafted_badge', label: 'admin_homepage_field_image_badge' },
      {
        kind: 'image',
        key: 'home_hero_image',
        label: 'admin_homepage_field_image',
        hint: 'admin_homepage_hero_image_hint',
      },
    ],
  },
  {
    title: 'admin_homepage_section_categories',
    fields: [
      { kind: 'text', key: 'home_categories_heading', label: 'admin_homepage_field_heading' },
      { kind: 'text', key: 'home_view_all_categories', label: 'admin_homepage_field_link' },
    ],
  },
  {
    title: 'admin_homepage_section_new_arrivals',
    fields: [
      { kind: 'text', key: 'home_new_arrivals_badge', label: 'admin_homepage_field_badge' },
      { kind: 'text', key: 'home_new_arrivals_heading', label: 'admin_homepage_field_heading' },
      { kind: 'text', key: 'home_view_all_products', label: 'admin_homepage_field_primary_button' },
    ],
  },
  {
    title: 'admin_homepage_section_newsletter',
    fields: [
      { kind: 'text', key: 'home_newsletter_heading', label: 'admin_homepage_field_heading' },
      {
        kind: 'text',
        key: 'home_newsletter_subtitle',
        label: 'admin_homepage_field_subtitle',
        multiline: true,
      },
    ],
  },
];

/**
 * Resolves homepage texts and images for the current locale: the admin's value
 * when one is set, otherwise the built-in default. `ready` is false until the
 * configuration has loaded (or failed to), so callers can avoid flashing the
 * defaults before the custom content arrives.
 */
export function useHomepage() {
  const { data, isPending } = useHomepageContent();
  const { locale, t } = useTranslation();

  const byKey = useMemo(
    () => new Map<string, HomepageContentEntry>((data ?? []).map((e) => [e.key, e])),
    [data],
  );

  const text = (key: HomepageTextKey, vars?: Record<string, string | number>) => {
    const entry = byKey.get(key);
    const custom = locale === 'ka' ? entry?.valueKa : entry?.value;
    return custom ? interpolate(custom, vars) : t(key, vars);
  };

  const image = (key: HomepageImageKey): string | undefined =>
    byKey.get(key)?.value || HOMEPAGE_IMAGE_DEFAULTS[key] || undefined;

  return { ready: !isPending, text, image };
}
