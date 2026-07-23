import { Suspense } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ProductsPageClient } from './ProductsPageClient';

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
                The Full Collection
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
                All Instruments
              </h1>
              <p className="mt-6 text-lg text-on-surface-variant font-light leading-relaxed">
                From solid-body electrics to studio monitors and beyond,
                explore the complete Titan catalogue, engineered for
                precision at every price point.
              </p>
            </div>
          </div>
        </header>

        {/* Product Grid Section */}
        <section className="px-8 max-w-screen-2xl mx-auto">
          <Suspense fallback={<div className="animate-pulse h-96" />}>
            <ProductsPageClient />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
