'use client';

import type { Brand, Category } from '@/lib/types';
import { useTranslation, localizedText } from '@/lib/i18n';
import { CategoryFilterDropdown } from './CategoryFilterDropdown';
import { SearchableSelect } from './SearchableSelect';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface ProductFiltersProps {
  categories: Category[] | undefined;
  category: string;
  onCategoryChange: (category: string) => void;
  brands: Brand[] | undefined;
  brand: string;
  onBrandChange: (brand: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  discountedOnly: boolean;
  onDiscountedOnlyChange: (value: boolean) => void;
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
  brands,
  brand,
  onBrandChange,
  searchInput,
  onSearchInputChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockOnlyChange,
  discountedOnly,
  onDiscountedOnlyChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const { t, locale } = useTranslation();
  const brandOptions = (brands ?? []).map((b) => ({
    value: String(b.id),
    label: localizedText(b.name, b.nameKa, locale) ?? b.name,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-16 items-end">
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
        <CategoryFilterDropdown
          categories={categories}
          value={category}
          onChange={onCategoryChange}
        />
      </div>

      <div>
        <label
          htmlFor="filter-brand"
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block"
        >
          {t('filters_brand_label')}
        </label>
        <SearchableSelect
          id="filter-brand"
          options={brandOptions}
          value={brand}
          onChange={onBrandChange}
          placeholder={t('filters_all_brands')}
          noOptionsText={t('admin_no_brands_found')}
          clearLabel={t('admin_clear_brand')}
        />
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
            placeholder="₾0"
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

      <div className="flex flex-col gap-2 pb-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
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
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={discountedOnly}
            onChange={(e) => onDiscountedOnlyChange(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm font-body text-on-surface-variant">
            {t('filters_discounted_only')}
          </span>
        </label>
      </div>
    </div>
  );
}
