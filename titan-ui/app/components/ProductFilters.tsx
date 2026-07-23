'use client';

import type { Category } from '@/lib/types';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface ProductFiltersProps {
  categories: Category[] | undefined;
  category: string;
  onCategoryChange: (category: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  sort: SortOption | '';
  onSortChange: (value: SortOption | '') => void;
}

const inputClasses =
  'w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

const selectClasses =
  'w-full bg-surface-container-low px-4 py-3 rounded-sm text-sm font-body outline-none focus:ring-1 focus:ring-primary';

export function ProductFilters({
  categories,
  category,
  onCategoryChange,
  searchInput,
  onSearchInputChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockOnlyChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-16 items-end">
      <div className="lg:col-span-2">
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          Search
        </label>
        <input
          type="text"
          className={inputClasses}
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
        />
      </div>

      <div>
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          Category
        </label>
        <select
          className={selectClasses}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Min Price
          </label>
          <input
            type="number"
            min="0"
            className={inputClasses}
            placeholder="$0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Max Price
          </label>
          <input
            type="number"
            min="0"
            className={inputClasses}
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          Sort By
        </label>
        <select
          className={selectClasses}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption | '')}
        >
          <option value="">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <label className="flex items-center gap-2 pb-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <span className="text-sm font-body text-on-surface-variant">
          In stock only
        </span>
      </label>
    </div>
  );
}
