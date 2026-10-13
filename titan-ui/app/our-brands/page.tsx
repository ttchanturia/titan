'use client';

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Equalizer, Soundwave } from '../components/AudioDecor';
import { useTranslation } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/translations';

const BRANDS = ['FBT', 'PROEL', 'NEUTRIK', 'K&M', 'STAGG', 'ITC', 'CLAYPAKY'];

const VALUES: { key: TranslationKey; icon: string }[] = [
  { key: 'brands_value_reliability', icon: 'verified_user' },
  { key: 'brands_value_experience', icon: 'history' },
  { key: 'brands_value_quality', icon: 'workspace_premium' },
  { key: 'brands_value_performance', icon: 'graphic_eq' },
];

// Corner screw heads, like the ears of a rack-mounted unit.
const SCREW_POSITIONS = ['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'];

export default function OurBrandsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main className="pt-32">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 flex items-center gap-3">
            <Equalizer className="h-3 text-primary" />
            Titan
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
            {t('brands_title')}
          </h1>
          <p className="mt-8 max-w-3xl font-headline text-xl md:text-2xl font-medium leading-snug">
            {t('brands_intro')}
          </p>
          <Soundwave className="mt-12 md:mt-16 text-primary" />
        </header>

        {/* Partner brands */}
        <section className="px-8 max-w-screen-2xl mx-auto py-24 md:py-32">
          <div className="flex items-end justify-between gap-8 mb-16">
            <div className="max-w-4xl">
              <p className="font-headline text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
                {t('brands_partners_lead')}
              </p>
              <div className="w-12 h-1 bg-primary mt-6"></div>
            </div>
            <Equalizer className="hidden lg:inline-flex h-12 shrink-0 text-primary/40" />
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/40 border border-outline-variant/40">
            {BRANDS.map((brand, i) => (
              <li
                key={brand}
                className={`group relative bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-colors duration-300 p-5 md:p-8 min-h-44 md:min-h-56 flex flex-col justify-between gap-6 ${
                  // Seven brands: the last card spans two columns so every row is full.
                  i === BRANDS.length - 1 ? 'col-span-2' : ''
                }`}
              >
                {SCREW_POSITIONS.map((position) => (
                  <span
                    key={position}
                    aria-hidden="true"
                    className={`absolute ${position} size-1.5 rounded-[50%] border border-outline-variant group-hover:border-on-primary/30 transition-colors`}
                  />
                ))}
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs tracking-[0.3em] text-on-surface-variant/60 group-hover:text-on-primary/50 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-[50%] bg-outline-variant group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_2px_rgba(52,211,153,0.6)] transition-all duration-300"
                  />
                </div>
                <span className="font-headline font-extrabold tracking-tighter leading-none text-2xl lg:text-4xl xl:text-5xl origin-left group-hover:scale-105 transition-transform duration-300">
                  {brand}
                </span>
                <Equalizer className="h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </li>
            ))}
          </ul>
        </section>

        {/* Values */}
        <section className="bg-surface-container-lowest border-y border-outline-variant/30 py-24 md:py-32">
          <div className="px-8 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="font-headline text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
                {t('brands_values')}
              </p>
              <div className="w-12 h-1 bg-primary mt-8"></div>
              <p className="mt-8 max-w-2xl text-lg text-on-surface-variant font-light leading-relaxed">
                {t('brands_goal')}
              </p>
            </div>
            {/* One per row on phones: "პროფესიონალური" won't fit in half a phone's width. */}
            <ul className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant/40 border border-outline-variant/40">
              {VALUES.map((value) => (
                <li
                  key={value.key}
                  className="group bg-surface-container-lowest hover:bg-surface-container-low transition-colors p-6 md:p-8 flex items-center gap-5 sm:min-h-40 sm:flex-col sm:items-start sm:justify-between sm:gap-6"
                >
                  <span className="material-symbols-outlined text-4xl! text-primary/70 group-hover:text-primary transition-colors">
                    {value.icon}
                  </span>
                  <span className="font-headline text-lg font-semibold leading-snug">
                    {t(value.key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="px-8 max-w-screen-2xl mx-auto pt-24 md:pt-32 text-center">
          <Soundwave className="max-w-3xl mx-auto mb-12 text-primary" />
          {/* Starts small: "თანამშრომლობისთვის." is one unbreakable word that crowds a phone at 2xl. */}
          <p className="max-w-4xl mx-auto font-headline text-xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight wrap-break-word">
            {t('brands_thanks')}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/products"
              className="bg-primary text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200"
            >
              {t('nav_products')}
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-bold uppercase tracking-widest flex items-center group"
            >
              {t('footer_about_us')}
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
