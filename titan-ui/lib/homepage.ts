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
  home_card1_image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUiyuTKRup-WCp7nzD5vZJ8hJJYrl5qV19vyMpNvncMwREkP4BPwinYxCXPZ06J3Y5ryZGR5Wps0Eguhdo-EJrC-zlupAvHu-ef8b00Ir0M6tcW6Z53f_lHHyTcHAJqCsUwbU5c4P-QR4WNzUHIaMykPpqT9YEnH_biNNJ60fs6BoJxWjkcZEAGl1Z7AuFecL58C0xZWUJhnkDOwWKl0y2bgZsavXsyFe9L_BpOJlmoN-rJKqHPR78TVctqCFnxyoZYkBn3B0zxHY',
  home_card2_image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtYnaHbOcrQazuyhunYvGs0PsaSblTAKsOlHDeQ89k0ZKQLfs1BpZ3a9poaS5Ra7jxTDL2ZUF82SvjpdvH5vdZ_u1_zajR6sbFzY5nmoAeCQf5sGxFJ3ffWBVw3QRPwfECwkuY4RK1yEHHiXisnj93Hn73qpAyx77eYqHBZ5J3bjtd5-t-cjzQAMHQkEF4T2-vYOtNLaM3XucUQ-ENN9xEUY9wpxo6c0q6175NqWDBmkAbmcFC2v0D1PVG4r-iqsbSnZ7AUCjMLfc',
  home_card3_image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBosCeO_YIJGT_egoD5caDhk2A_uGG6YhRs2HWxlpO481sdXunr2zZa9EaEhCcnPq1ji5AJPW_rp3yeBKxDgVRzVmCMXE-pO0QxLcQFcNgAZ5MnHUzUiXtua6ilqxK9tvhhI5h6wfDuhJBveRiJjIJeqQ2PvFJpbHuGQ52-t4fB57UZDE4n4u01hl3yr3yARXyatwuhfyWUiOmLHTVoHulXuwl-MPa56W_ayY-G0sqqEKUsmS4JTEoGnT6pSksA7vLOfohgL--8Dts',
  home_bento_feature_image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5s0J6LvIwjgs6QFQjNotHWSB2fyIpstOTlKLQQM9w5zcobi6O35Q4PonYTl1jkWoZKXohd3Ccue-vmNsl6rwU1Di8V11J0xmVb5utFPhq3DVmm_TF8i1nkXjCXujp6Cw3c3HLi9iTMIBv7Z_BfMvr4E0xTwPre2gnKabM2UmnZHRXJBE5GftdlSZK6kRvrdFma2ZpKCKZoCu98V-OiPn4SxXIJfgTiKqhcCQCLNEK7lG1T184tLtEfTJTK-yR-L6S7FH523OI66o',
  home_bento_pedalboard_image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOE4mNHpCaCGJ0BVeXd1eIjgpwSk0Cmg4nYSHhLAxfvUTZ3oPR-5qz71v9ElOhLNLLim_9rdm0ZA2mhJDALsKcR6FoUSTcMoJg-6y30W7amvvTfGMsxycTpHKr0WXygENTcfjdomj9WOao9tOjrNzyK6hz7yQANy_EKomSYqxqSvPcIMhZjrqeTupJRGurvmNNZUBzC3_3bNi3lTIQOTvD5uHzoDY0HwFdB64zrZ2d9PbJ1X-M4mjEy-_hgoGFl1tuzHiI3CDEMg4',
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
      { kind: 'text', key: 'home_collection_badge', label: 'admin_homepage_field_badge' },
      { kind: 'text', key: 'home_hero_title_line1', label: 'admin_homepage_field_title_line1' },
      { kind: 'text', key: 'home_hero_title_line2', label: 'admin_homepage_field_title_line2' },
      { kind: 'text', key: 'home_hero_subtitle', label: 'admin_homepage_field_subtitle', multiline: true },
      { kind: 'text', key: 'home_explore_series', label: 'admin_homepage_field_primary_button' },
      { kind: 'text', key: 'home_technical_specs', label: 'admin_homepage_field_secondary_link' },
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
    title: 'admin_homepage_section_featured',
    fields: [
      { kind: 'text', key: 'home_featured_heading', label: 'admin_homepage_field_heading' },
      { kind: 'text', key: 'home_view_gallery', label: 'admin_homepage_field_link' },
    ],
  },
  {
    title: 'admin_homepage_section_card1',
    fields: [
      { kind: 'text', key: 'home_card1_title', label: 'admin_homepage_field_title' },
      { kind: 'text', key: 'home_card1_subtitle', label: 'admin_homepage_field_subtitle' },
      { kind: 'image', key: 'home_card1_image', label: 'admin_homepage_field_image' },
    ],
  },
  {
    title: 'admin_homepage_section_card2',
    fields: [
      { kind: 'text', key: 'home_card2_title', label: 'admin_homepage_field_title' },
      { kind: 'text', key: 'home_card2_subtitle', label: 'admin_homepage_field_subtitle' },
      { kind: 'image', key: 'home_card2_image', label: 'admin_homepage_field_image' },
    ],
  },
  {
    title: 'admin_homepage_section_card3',
    fields: [
      { kind: 'text', key: 'home_card3_title', label: 'admin_homepage_field_title' },
      { kind: 'text', key: 'home_card3_subtitle', label: 'admin_homepage_field_subtitle' },
      { kind: 'image', key: 'home_card3_image', label: 'admin_homepage_field_image' },
    ],
  },
  {
    title: 'admin_homepage_section_new_arrivals',
    fields: [
      { kind: 'text', key: 'home_new_arrivals_badge', label: 'admin_homepage_field_badge' },
      { kind: 'text', key: 'home_new_arrivals_heading', label: 'admin_homepage_field_heading' },
    ],
  },
  {
    title: 'admin_homepage_section_bento_feature',
    fields: [
      { kind: 'text', key: 'home_bento_feature_title', label: 'admin_homepage_field_title' },
      { kind: 'text', key: 'home_bento_learn_more', label: 'admin_homepage_field_button' },
      { kind: 'image', key: 'home_bento_feature_image', label: 'admin_homepage_field_image' },
    ],
  },
  {
    title: 'admin_homepage_section_bento_pedalboard',
    fields: [
      { kind: 'text', key: 'home_bento_pedalboard_title', label: 'admin_homepage_field_title' },
      { kind: 'text', key: 'home_bento_pedalboard_subtitle', label: 'admin_homepage_field_subtitle' },
      { kind: 'image', key: 'home_bento_pedalboard_image', label: 'admin_homepage_field_image' },
    ],
  },
  {
    title: 'admin_homepage_section_bento_artist',
    fields: [
      { kind: 'text', key: 'home_bento_artist_title', label: 'admin_homepage_field_title' },
      {
        kind: 'text',
        key: 'home_bento_artist_desc',
        label: 'admin_homepage_field_description',
        multiline: true,
      },
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
