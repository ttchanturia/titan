'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProduct } from '@/lib/hooks';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { useParams } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useTranslation } from '@/lib/i18n';

export default function ProductPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { t, locale } = useTranslation();

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <>
        <Nav />
        <main className="pt-32 pb-24">
          <div className="py-16 px-4">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-surface-container-high h-96 animate-pulse rounded" />
                <div>
                  <div className="h-8 bg-surface-container-high rounded mb-4 w-3/4 animate-pulse" />
                  <div className="h-6 bg-surface-container-high rounded mb-8 w-1/2 animate-pulse" />
                  <div className="h-32 bg-surface-container-high rounded mb-8 animate-pulse" />
                  <div className="h-12 bg-surface-container-high rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <main className="pt-32 pb-24">
          <div className="py-16 px-4">
            <div className="max-w-screen-2xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-on-surface mb-4">
                {t('product_not_found')}
              </h1>
              <p className="text-on-surface-variant mb-8">
                {t('product_load_failed')} {error.message}
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-primary text-on-primary font-semibold rounded hover:bg-primary/90 transition-colors"
              >
                {t('product_back_to_products')}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Nav />
        <main className="pt-32 pb-24">
          <div className="py-16 px-4">
            <div className="max-w-screen-2xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-on-surface mb-4">
                {t('product_not_found')}
              </h1>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-primary text-on-primary font-semibold rounded hover:bg-primary/90 transition-colors"
              >
                {t('product_back_to_products')}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const stockStatus =
    product.stockQuantity > 10
      ? { label: t('product_stock_in'), color: 'bg-emerald-500' }
      : product.stockQuantity > 0
        ? { label: t('product_stock_low'), color: 'bg-amber-500' }
        : { label: t('product_stock_out'), color: 'bg-red-500' };

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="py-16 px-4">
          <div className="max-w-screen-2xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                {t('product_breadcrumb_home')}
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                {t('product_breadcrumb_products')}
              </Link>
              <span>/</span>
              <span className="text-on-surface">{product.name}</span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <div className="relative bg-surface-container-high aspect-square rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl || DEFAULT_PRODUCT_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6">
                  <span
                    className={`${stockStatus.color} text-white text-sm font-bold px-4 py-2 rounded-full`}
                  >
                    {stockStatus.label}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-start">
                {product.categoryName && (
                  <p className="text-sm text-on-surface-variant mb-2 uppercase font-semibold tracking-wide">
                    {product.categoryName}
                  </p>
                )}

                <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6">
                  {product.name}
                </h1>

                <p className="text-3xl font-headline font-bold text-primary mb-8">
                  ${product.price.toFixed(2)}
                </p>

                {product.description && (
                  <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="mb-8 pb-8 border-b border-outline">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-on-surface font-semibold">
                      {t('product_stock_quantity_label')}
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {product.stockQuantity} {t('product_units')}
                    </span>
                  </div>
                  {product.createdAt && (
                    <div className="flex items-center gap-4">
                      <span className="text-on-surface-variant text-sm">
                        {t('product_added_on')}{' '}
                        {new Date(product.createdAt).toLocaleDateString(
                          locale === 'ka' ? 'ka-GE' : 'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 px-8 py-4 font-semibold rounded text-center transition-colors ${
                      product.stockQuantity > 0
                        ? 'bg-primary text-on-primary hover:bg-primary/90'
                        : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                    }`}
                    disabled={product.stockQuantity === 0}
                  >
                    {product.stockQuantity === 0
                      ? t('product_stock_out')
                      : added
                        ? t('product_added')
                        : t('product_add_to_cart')}
                  </button>
                  <Link
                    href="/products"
                    className="px-8 py-4 font-semibold rounded text-center border border-outline text-on-surface hover:bg-surface-container transition-colors"
                  >
                    {t('product_continue_shopping')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-surface-container p-8 rounded mb-16">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t('product_info_heading')}
              </h2>
              <ul className="space-y-3 text-on-surface-variant">
                <li>
                  <span className="font-semibold text-on-surface">
                    {t('product_id_label')}
                  </span>{' '}
                  {product.id}
                </li>
                <li>
                  <span className="font-semibold text-on-surface">
                    {t('product_category_label')}
                  </span>{' '}
                  {product.categoryName || t('product_uncategorized')}
                </li>
                <li>
                  <span className="font-semibold text-on-surface">
                    {t('product_price_label')}
                  </span>{' '}
                  ${product.price.toFixed(2)}
                </li>
                <li>
                  <span className="font-semibold text-on-surface">
                    {t('product_stock_quantity_label')}
                  </span>{' '}
                  {product.stockQuantity} {t('product_units')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
