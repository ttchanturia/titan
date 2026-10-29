'use client';

import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NewsletterForm from './components/NewsletterForm';
import { useProducts } from '@/lib/hooks';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { useHomepage } from '@/lib/homepage';

export default function HomePage() {
  const { data: products } = useProducts();
  const content = useHomepage();
  const latestProduct = products?.reduce<(typeof products)[number] | undefined>(
    (latest, p) => (!latest || p.id > latest.id ? p : latest),
    undefined,
  );
  // An admin-set hero photo wins; otherwise feature the newest product
  const heroImage = content.image('home_hero_image');

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
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-6 text-on-surface-variant">
                {content.text('home_collection_badge', { year: new Date().getFullYear() })}
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-8">
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
                <Link
                  href={latestProduct ? `/products/${latestProduct.id}` : '/products'}
                  className="text-sm font-bold uppercase tracking-widest flex items-center group"
                >
                  {content.text('home_technical_specs')}
                  <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="aspect-4/5 bg-surface-container-low relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heroImage ? 'Featured instrument' : (latestProduct?.name ?? 'Featured instrument')}
                  className="w-full h-full object-cover contrast-125"
                  src={heroImage || latestProduct?.imageUrl || DEFAULT_PRODUCT_IMAGE}
                />
                <div className="absolute bottom-10 -left-5 bg-primary text-on-primary px-8 py-4 -rotate-90 origin-left text-[10px] tracking-[0.5em] font-bold uppercase">
                  {content.text('home_handcrafted_badge')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Instruments */}
        <section className="bg-surface-container-low py-32 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 mb-20">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-headline font-bold tracking-tight">
                  {content.text('home_featured_heading')}
                </h2>
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold underline underline-offset-8 decoration-1"
              >
                {content.text('home_view_gallery')}
              </Link>
            </div>
          </div>
          <div className="flex gap-8 px-8 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {/* Card 1 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Vintage acoustic guitar against a minimal studio background"
                  src={content.image('home_card1_image')}
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                {content.text('home_card1_title')}
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                {content.text('home_card1_subtitle')}
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Modern electric bass guitar detail"
                  src={content.image('home_card2_image')}
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                {content.text('home_card2_title')}
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                {content.text('home_card2_subtitle')}
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Close up of a premium piano keyboard"
                  src={content.image('home_card3_image')}
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                {content.text('home_card3_title')}
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                {content.text('home_card3_subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* New Arrivals Bento */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-outline mb-4 block">
                {content.text('home_new_arrivals_badge')}
              </span>
              <h2 className="text-5xl font-headline font-extrabold tracking-tighter">
                {content.text('home_new_arrivals_heading')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-200">
              {/* Large Feature */}
              <div className="md:col-span-7 bg-surface-container relative group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Professional studio monitors on a minimalist desk"
                  src={content.image('home_bento_feature_image')}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-3xl text-white font-headline font-bold mb-4">
                    {content.text('home_bento_feature_title')}
                  </h3>
                  <button className="w-fit text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-2">
                    {content.text('home_bento_learn_more')}
                  </button>
                </div>
              </div>
              {/* Vertical Split */}
              <div className="md:col-span-5 grid grid-rows-2 gap-6">
                <div className="bg-surface-container-high p-12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      {content.text('home_bento_pedalboard_title')}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      {content.text('home_bento_pedalboard_subtitle', { year: new Date().getFullYear() })}
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-32 object-contain"
                    alt="Minimalist silver guitar pedal"
                    src={content.image('home_bento_pedalboard_image')}
                  />
                </div>
                <div className="bg-primary text-white p-12 flex flex-col justify-between">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    star
                  </span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      {content.text('home_bento_artist_title')}
                    </h4>
                    <p className="text-sm text-surface-dim">
                      {content.text('home_bento_artist_desc')}
                    </p>
                  </div>
                </div>
              </div>
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
