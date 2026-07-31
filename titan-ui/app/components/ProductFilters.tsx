'use client';

import type { Category } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';

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
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-16 items-end">
      <div className="lg:col-span-2">
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          {t('filters_search_label')}
        </label>
        <input
          type="text"
          className={inputClasses}
          placeholder={t('filters_search_placeholder')}
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
        />
      </div>

      <div>
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          {t('filters_category_label')}
        </label>
        <select
          className={selectClasses}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">{t('filters_all_categories')}</option>
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
            {t('filters_min_price')}
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
            {t('filters_max_price')}
          </label>
          <input
            type="number"
            min="0"
            className={inputClasses}
            placeholder={t('filters_max_any')}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
          {t('filters_sort_by')}
        </label>
        <select
          className={selectClasses}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption | '')}
        >
          <option value="">{t('filters_sort_default')}</option>
          <option value="name-asc">{t('filters_sort_name_asc')}</option>
          <option value="name-desc">{t('filters_sort_name_desc')}</option>
          <option value="price-asc">{t('filters_sort_price_asc')}</option>
          <option value="price-desc">{t('filters_sort_price_desc')}</option>
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
          {t('filters_in_stock_only')}
        </span>
      </label>
    </div>
  );
}
