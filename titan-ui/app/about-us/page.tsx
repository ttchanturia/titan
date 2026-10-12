'use client';

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useTranslation } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/translations';

const SERVICES: { key: TranslationKey; icon: string; href?: string }[] = [
  { key: 'about_service_rental', icon: 'speaker', href: '/rental' },
  { key: 'about_service_events', icon: 'cable' },
  { key: 'about_service_concerts', icon: 'mic_external_on' },
  { key: 'about_service_stage', icon: 'speaker_group' },
  { key: 'about_service_technical', icon: 'build' },
  { key: 'about_service_custom', icon: 'tune' },
];

// Bar heights (as a fraction of the strip's height) for the soundwave
// dividers: a sine envelope that tapers at both ends, modulated by a ripple.
// Rounded to whole percents so server and client render identical markup.
const WAVE_BARS = Array.from({ length: 96 }, (_, i) => {
  const envelope = Math.sin((Math.PI * (i + 0.5)) / 96);
  const ripple = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37));
  return Math.max(8, Math.round(envelope * ripple * 100));
});

// Negative delays start each bar mid-cycle so they are out of phase on load.
const EQ_TIMINGS = [
  { duration: '1.1s', delay: '-0.4s' },
  { duration: '0.8s', delay: '-0.1s' },
  { duration: '1.3s', delay: '-0.7s' },
  { duration: '0.9s', delay: '-0.3s' },
  { duration: '1.2s', delay: '-0.9s' },
];

function Equalizer({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {EQ_TIMINGS.map((timing, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] h-full rounded-full bg-current"
          style={{ animationDuration: timing.duration, animationDelay: timing.delay }}
        />
      ))}
    </span>
  );
}

function Soundwave({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex h-16 ${className}`}>
      {/* Every other bar is dropped on phones so the wave doesn't fill in solid. */}
      {WAVE_BARS.map((height, i) => (
        <span
          key={i}
          className={`${i % 2 ? 'hidden sm:flex' : 'flex'} flex-1 items-center justify-center`}
        >
          <span
            className="w-0.5 sm:w-[3px] rounded-full bg-current"
            style={{ height: `${height}%`, opacity: 0.2 + (0.8 * height) / 100 }}
          />
        </span>
      ))}
    </div>
  );
}

function VinylRecord() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-sm md:max-w-md aspect-square">
      <div
        className="absolute inset-0 rounded-[50%] bg-primary shadow-2xl animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0 1px, transparent 1px 5px)',
        }}
      >
        <div className="absolute inset-[33%] rounded-[50%] bg-surface flex flex-col items-center justify-center gap-5 sm:gap-7">
          <span className="font-headline font-extrabold uppercase tracking-[0.3em] text-xs sm:text-sm">
            Titan
          </span>
          <span className="font-label text-[10px] tracking-[0.4em] text-on-surface-variant">
            1996
          </span>
        </div>
        <div className="absolute inset-[48.5%] rounded-[50%] bg-primary" />
      </div>
      {/* Static sheen: stays put while the record spins underneath it. */}
      <div
        className="absolute inset-0 rounded-[50%] pointer-events-none"
        style={{
          background:
            'conic-gradient(from 20deg, transparent 0deg, rgba(255,255,255,0.1) 25deg, transparent 60deg, transparent 180deg, rgba(255,255,255,0.1) 205deg, transparent 240deg)',
        }}
      />
    </div>
  );
}

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main className="pt-32">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 flex items-center gap-3">
                <Equalizer className="h-3 text-primary" />
                Titan
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
                {t('about_title')}
              </h1>
              <p className="mt-8 max-w-xl font-headline text-xl md:text-2xl font-medium leading-snug">
                {t('about_lead')}
              </p>
            </div>
            <div aria-hidden="true" className="lg:col-span-5 flex lg:justify-end select-none">
              <span className="stroke-text font-headline font-extrabold tracking-tighter leading-none text-[7rem] sm:text-[10rem] lg:text-[13rem]">
                1996
              </span>
            </div>
          </div>
          <Soundwave className="mt-12 md:mt-16 text-primary" />
        </header>

        {/* Story */}
        <section className="px-8 max-w-screen-2xl mx-auto py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <VinylRecord />
          </div>
          <div className="lg:col-span-7 space-y-8">
            <p className="font-headline text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
              {t('about_intro')}
            </p>
            <div className="w-12 h-1 bg-primary"></div>
            <p className="max-w-2xl text-lg text-on-surface-variant font-light leading-relaxed">
              {t('about_store')}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="bg-surface-container-lowest text-primary border-y border-outline-variant/30 py-24 md:py-32">
          <div className="px-8 max-w-screen-2xl mx-auto">
            <div className="flex items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
                  {t('about_services_heading')}
                </h2>
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </div>
              <Equalizer className="hidden md:inline-flex h-12 text-primary/40" />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/40 border border-outline-variant/40">
              {SERVICES.map((service, i) => (
                <li
                  key={service.key}
                  className="group relative bg-surface-container-lowest hover:bg-surface-container-low transition-colors p-8 md:p-10 flex flex-col justify-between gap-8 md:gap-12 min-h-48 md:min-h-60"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-4xl! text-primary/70 group-hover:text-primary transition-colors">
                      {service.icon}
                    </span>
                    <span className="font-label text-xs tracking-[0.3em] text-on-surface-variant/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="font-headline text-xl font-semibold leading-snug flex items-start justify-between gap-4 after:absolute after:inset-0"
                    >
                      {t(service.key)}
                      <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        arrow_outward
                      </span>
                    </Link>
                  ) : (
                    <p className="font-headline text-xl font-semibold leading-snug">
                      {t(service.key)}
                    </p>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="px-8 max-w-screen-2xl mx-auto pt-24 md:pt-32 text-center">
          <Soundwave className="max-w-3xl mx-auto mb-12 text-primary" />
          {/* Starts small: "პროფესიონალიზმი!" is one unbreakable word wider than a phone at 4xl. */}
          <p className="max-w-4xl mx-auto font-headline text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight wrap-break-word">
            {t('about_closing')}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/rental"
              className="bg-primary text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200"
            >
              {t('nav_rental')}
            </Link>
            <Link
              href="/products"
              className="text-sm font-bold uppercase tracking-widest flex items-center group"
            >
              {t('nav_products')}
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
