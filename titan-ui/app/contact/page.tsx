'use client';

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Equalizer } from '../components/AudioDecor';
import { useTranslation, headingText } from '@/lib/i18n';

export default function ContactPage() {
  const { t, locale } = useTranslation();

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 flex items-center gap-3">
            <Equalizer className="h-3 text-primary" />
            Titan
          </span>
          <h1 className="page-hero-heading font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
            {headingText(t('contact_heading'), locale)}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-on-surface-variant font-light leading-relaxed">
            {t('contact_subtitle')}
          </p>
        </header>

        <section className="px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-low p-8">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                call
              </span>
              <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                {t('contact_phone_heading')}
              </h2>
              <div className="space-y-2 text-sm font-semibold">
                <a href="tel:+995555377117" className="block hover:text-primary transition-colors">
                  +995 555 377 117
                </a>
                <a href="tel:+995322999680" className="block hover:text-primary transition-colors">
                  032 2 999 680
                </a>
              </div>
            </div>

            <div className="bg-surface-container-low p-8">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                mail
              </span>
              <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                {t('contact_email_heading')}
              </h2>
              <a
                href="mailto:g.titan.ltd@gmail.com"
                className="text-sm font-semibold hover:text-primary transition-colors break-all"
              >
                g.titan.ltd@gmail.com
              </a>
            </div>

            <div className="bg-surface-container-low p-8">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                location_on
              </span>
              <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                {t('contact_address_heading')}
              </h2>
              {/* TODO: placeholder - needs the real address text from the user */}
              <p className="text-sm font-semibold mb-3">თბილისი, საქართველო</p>
              <Link
                href="https://maps.app.goo.gl/todse2rYMdpVcdei6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 hover:text-primary transition-colors"
              >
                {t('contact_view_map')}
              </Link>
            </div>

            <div className="bg-surface-container-low p-8">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                share
              </span>
              <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                {t('contact_social_heading')}
              </h2>
              <a
                href="https://www.facebook.com/profile.php?id=61578846210562"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
