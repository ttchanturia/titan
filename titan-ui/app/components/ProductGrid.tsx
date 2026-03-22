'use client';

import Link from 'next/link';
import { useProducts } from '@/lib/hooks';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface-container-high h-80 mb-4 rounded" />
            <div className="h-6 bg-surface-container-high rounded mb-2" />
            <div className="h-4 bg-surface-container-high rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface-variant">
          Failed to load products: {error.message}
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface-variant">No products available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const stockStatus =
          product.stockQuantity > 10
            ? { label: 'Available', color: 'bg-emerald-500' }
            : product.stockQuantity > 0
              ? { label: 'Low Stock', color: 'bg-amber-500' }
              : { label: 'Out of Stock', color: 'bg-red-500' };

        return (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-surface-container-high aspect-square mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl || DEFAULT_PRODUCT_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`${stockStatus.color} text-white text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {stockStatus.label}
                </span>
              </div>
            </div>
            <h3 className="font-headline text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.categoryName && (
              <p className="text-sm text-on-surface-variant mb-2">
                {product.categoryName}
              </p>
            )}
            {product.description && (
              <p className="text-sm text-on-surface-variant mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            <p className="font-headline text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
