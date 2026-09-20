'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/lib/types';
import { useTranslation, localizedText } from '@/lib/i18n';
import { CATEGORY_TAXONOMY } from '@/lib/categoryTaxonomy';

interface CategoryFilterDropdownProps {
  categories: Category[] | undefined;
  value: string;
  onChange: (categoryId: string) => void;
}

const triggerClasses =
  'w-full flex items-center justify-between gap-2 bg-surface-container-low px-4 py-3 rounded-sm text-sm font-body outline-none focus:ring-1 focus:ring-primary text-left';

export function CategoryFilterDropdown({
  categories,
  value,
  onChange,
}: CategoryFilterDropdownProps) {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  // Purely cosmetic: remembers which subcategory (by its canonical English
  // name, paired with the categoryId it produced) was last clicked, so the
  // trigger can show it. Stored as the key rather than a rendered label so it
  // re-localizes correctly if the user switches language afterwards. Not
  // persisted — if `value` changes from outside (URL nav, reset), it no
  // longer matches the stored categoryId and is ignored, falling back to the
  // parent category's name, since only the parent id is real filter state.
  const [selectedSub, setSelectedSub] = useState<{ categoryId: string; subName: string } | null>(
    null,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories?.find((c) => String(c.id) === value);
  const selectedSubEntry =
    selectedSub?.categoryId === value
      ? CATEGORY_TAXONOMY.flatMap((p) => p.subcategories).find(
          (s) => s.name === selectedSub.subName,
        )
      : undefined;

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const triggerLabel = selectedSubEntry
    ? localizedText(selectedSubEntry.name, selectedSubEntry.nameKa, locale)
    : selectedCategory
      ? localizedText(selectedCategory.name, selectedCategory.nameKa, locale)
      : t('filters_all_categories');

  const toggleParent = (name: string) => {
    setExpandedParent((current) => (current === name ? null : name));
  };

  const selectAll = () => {
    setSelectedSub(null);
    onChange('');
    setIsOpen(false);
  };

  const selectSubcategory = (parentName: string, subName: string) => {
    const parentCategory = categories?.find((c) => c.name === parentName);
    if (!parentCategory) return;
    const categoryId = String(parentCategory.id);
    setSelectedSub({ categoryId, subName });
    onChange(categoryId);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={triggerClasses}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="truncate">{triggerLabel}</span>
        <span
          className={`material-symbols-outlined text-base shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute z-20 mt-2 w-full min-w-64 bg-surface-container-low rounded-sm shadow-lg border border-outline-variant/20 py-2 max-h-96 overflow-y-auto"
          role="listbox"
        >
          <button
            type="button"
            onClick={selectAll}
            className={`w-full text-left px-4 py-2.5 text-sm font-body hover:bg-surface-container-high transition-colors ${
              !value ? 'text-primary font-semibold' : 'text-on-surface'
            }`}
          >
            {t('filters_all_categories')}
          </button>

          {CATEGORY_TAXONOMY.map((parent) => {
            const parentCategory = categories?.find((c) => c.name === parent.name);
            const parentLabel = parentCategory
              ? localizedText(parentCategory.name, parentCategory.nameKa, locale)
              : localizedText(parent.name, parent.nameKa, locale);
            const isExpanded = expandedParent === parent.name;
            const isParentSelected = !!parentCategory && String(parentCategory.id) === value;

            return (
              <div key={parent.name} className="border-t border-outline-variant/10 first:border-t-0">
                <button
                  type="button"
                  onClick={() => toggleParent(parent.name)}
                  aria-expanded={isExpanded}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-body font-semibold hover:bg-surface-container-high transition-colors ${
                    isParentSelected ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  <span>{parentLabel}</span>
                  <span
                    className={`material-symbols-outlined text-base shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    {parent.subcategories.map((sub) => {
                      const isSubSelected = isParentSelected && selectedSub?.subName === sub.name;
                      return (
                        <button
                          key={sub.name}
                          type="button"
                          onClick={() => selectSubcategory(parent.name, sub.name)}
                          className={`w-full text-left pl-8 pr-4 py-2 text-sm font-body hover:bg-surface-container-high transition-colors ${
                            isSubSelected
                              ? 'text-primary font-semibold'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {localizedText(sub.name, sub.nameKa, locale)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
