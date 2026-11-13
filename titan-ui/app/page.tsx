'use client';

import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NewsletterForm from './components/NewsletterForm';
import { useCategories, useProducts } from '@/lib/hooks';
import { FALLBACK_IMAGE_SVG } from '@/lib/constants';
import { useHomepage } from '@/lib/homepage';
import { useTranslation, localizedText } from '@/lib/i18n';

export default function HomePage() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories } = useCategories();
  const content = useHomepage();
  const { t, locale } = useTranslation();
  const latestProduct = products?.reduce<(typeof products)[number] | undefined>(
    (latest, p) => (!latest || p.id > latest.id ? p : latest),
    undefined,
  );
  // An admin-set hero photo wins; otherwise feature the newest product
  const heroImage = content.image('home_hero_image');
  // Nothing to show yet while products are still in flight and there's no
  // admin override - skeleton rather than flashing the generic fallback photo.
  const showHeroSkeleton = !heroImage && productsLoading;

  // Top-level categories only (GET /api/categories already returns just those,
  // with subcategories nested in `children`), capped at 6 for the homepage tile.
  const topCategories = categories?.slice(0, 6) ?? [];

  // Most recently added products, newest first (id is insertion order).
  const latestProducts = products ? [...products].sort((a, b) => b.id - a.id).slice(0, 4) : [];

  return (
    <>
      <Nav />
      {/* Hidden (not unmounted) until the admin-configured content loads, so the
          built-in defaults don't flash first and the layout stays in place */}
      <main className={content.ready ? undefined : 'invisible'}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-5 z-10">
              <h1 className="uppercase text-5xl sm:text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-8">
                {content.text('home_hero_title_line1')} <br />
                <span className="text-outline">{content.text('home_hero_title_line2')}</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md mb-12 font-light leading-relaxed">
                {content.text('home_hero_subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/products"
                  className="bg-primary text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200"
                >
                  {content.text('home_explore_series')}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
              {/* Capped at max-w-md - a smaller, fixed-size frame rather than
                  growing to fill the remaining grid width. */}
              <div className="w-full max-w-md aspect-4/5 bg-surface-container-low relative overflow-hidden">
                {showHeroSkeleton ? (
                  <div className="w-full h-full animate-pulse bg-surface-container-high" />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={heroImage ? 'Featured instrument' : (latestProduct?.name ?? 'Featured instrument')}
                      className="w-full h-full object-cover contrast-125"
                      src={heroImage || latestProduct?.imageUrl || FALLBACK_IMAGE_SVG}
                    />
                    <div className="absolute bottom-10 -left-5 bg-primary text-on-primary px-8 py-4 -rotate-90 origin-left text-[10px] tracking-[0.5em] font-bold uppercase">
                      {content.text('home_handcrafted_badge')}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-surface-container-low py-32">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
              <div>
                <h2 className="text-4xl font-headline font-bold tracking-tight">
                  {t('home_categories_heading')}
                </h2>
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold underline underline-offset-8 decoration-1"
              >
                {t('home_view_all_categories')}
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {topCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group relative bg-surface aspect-square p-8 flex flex-col justify-between overflow-hidden hover:bg-primary hover:text-on-primary transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                    category
                  </span>
                  <span className="font-headline text-lg md:text-xl font-bold leading-tight">
                    {localizedText(category.name, category.nameKa, locale)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-outline mb-4 block">
                {content.text('home_new_arrivals_badge')}
              </span>
              <h2 className="home-bento-heading text-5xl font-headline font-extrabold tracking-tighter wrap-break-word">
                {content.text('home_new_arrivals_heading')}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {latestProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="aspect-square bg-surface-container-high relative overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                      src={product.imageUrl || FALLBACK_IMAGE_SVG}
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-headline font-semibold">
                    {product.name}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-block bg-primary text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200"
              >
                {t('home_view_all_products')}
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-32 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-screen-2xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-headline font-bold mb-8">
              {content.text('home_newsletter_heading')}
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-12 font-light">
              {content.text('home_newsletter_subtitle')}
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
