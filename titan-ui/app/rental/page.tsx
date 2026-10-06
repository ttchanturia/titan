'use client';

import { Suspense } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ProductsPageClient } from '../products/ProductsPageClient';
import { useTranslation } from '@/lib/i18n';

export default function RentalPage() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
                {t('rental_badge')}
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
                {t('rental_heading')}
              </h1>
              <p className="mt-6 text-lg text-on-surface-variant font-light leading-relaxed">
                {t('rental_subtitle')}
              </p>
            </div>
          </div>
        </header>

        {/* Product Grid Section */}
        <section className="px-8 max-w-screen-2xl mx-auto">
          <Suspense fallback={<div className="animate-pulse h-96" />}>
            <ProductsPageClient rental />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
