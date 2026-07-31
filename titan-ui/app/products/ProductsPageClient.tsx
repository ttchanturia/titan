'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategories, useProducts } from '@/lib/hooks';
import { PRODUCTS_PAGE_SIZE } from '@/lib/constants';
import type { Product } from '@/lib/types';
import { ProductFilters, type SortOption } from '../components/ProductFilters';
import { ProductGrid } from '../components/ProductGrid';
import { Pagination } from '../components/Pagination';
import { useTranslation } from '@/lib/i18n';

function parsePositiveInt(value: string | null, fallback: number): number {
  const n = value ? parseInt(value, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseNonNegativeFloat(value: string): number | undefined {
  const n = value ? parseFloat(value) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function ProductsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();
  const { t } = useTranslation();

  // Instant local state for typing-driven inputs; synced to the URL on a
  // debounce so filtering doesn't lag behind keystrokes.
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const [minPriceInput, setMinPriceInput] = useState(searchParams.get('min') ?? '');
  const [maxPriceInput, setMaxPriceInput] = useState(searchParams.get('max') ?? '');

  const category = searchParams.get('category') ?? '';
  const inStockOnly = searchParams.get('inStock') === '1';
  const sort = (searchParams.get('sort') as SortOption | null) ?? '';
  const page = parsePositiveInt(searchParams.get('page'), 1);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === '') params.delete(key);
        else params.set(key, value);
      }
      router.replace(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const setFilter = useCallback(
    (patch: Record<string, string | null>) => {
      updateParams({ ...patch, page: null });
    },
    [updateParams],
  );

  // Debounce: sync typed inputs into the URL without spamming router.replace.
  useEffect(() => {
    const handle = setTimeout(() => {
      setFilter({
        search: searchInput || null,
        min: minPriceInput || null,
        max: maxPriceInput || null,
      });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, minPriceInput, maxPriceInput]);

  const minPrice = parseNonNegativeFloat(minPriceInput);
  const maxPrice = parseNonNegativeFloat(maxPriceInput);

  const filtered = useMemo(() => {
    if (!products) return [];
    let result: Product[] = products;

    if (category) {
      result = result.filter((p) => String(p.categoryId) === category);
    }
    if (searchInput.trim()) {
      const q = searchInput.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.stockQuantity > 0);
    }
    if (sort) {
      result = [...result].sort((a, b) => {
        switch (sort) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, category, searchInput, minPrice, maxPrice, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PRODUCTS_PAGE_SIZE,
    safePage * PRODUCTS_PAGE_SIZE,
  );

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
          {t('products_load_error')} {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <ProductFilters
        categories={categories}
        category={category}
        onCategoryChange={(value) => setFilter({ category: value || null })}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        minPrice={minPriceInput}
        onMinPriceChange={setMinPriceInput}
        maxPrice={maxPriceInput}
        onMaxPriceChange={setMaxPriceInput}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={(value) => setFilter({ inStock: value ? '1' : null })}
        sort={sort}
        onSortChange={(value) => setFilter({ sort: value || null })}
      />
      <ProductGrid products={paged} />
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={(p) => updateParams({ page: p > 1 ? String(p) : null })}
      />
    </>
  );
}
