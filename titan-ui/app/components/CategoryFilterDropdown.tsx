'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/lib/types';
import { flattenCategories } from '@/lib/categories';
import { useTranslation, localizedText } from '@/lib/i18n';

interface CategoryFilterDropdownProps {
  categories: Category[] | undefined;
  value: string;
  onChange: (categoryId: string) => void;
}

const triggerClasses =
  'w-full flex items-center justify-between gap-2 bg-surface-container-low px-4 py-3 rounded-sm text-sm font-body outline-none focus:ring-1 focus:ring-primary text-left';

/**
 * Plain-text chevron, not the material-symbols-outlined icon font — that font
 * isn't actually linked anywhere in this app (no <link> for it in layout.tsx),
 * so it was rendering as raw "expand_more" text here instead of a glyph.
 */
function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <span
      className={`inline-block text-xs shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      ▾
    </span>
  );
}

export function CategoryFilterDropdown({
  categories,
  value,
  onChange,
}: CategoryFilterDropdownProps) {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedParentId, setExpandedParentId] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // The selected entry is looked up fresh from the fetched tree by its real id
  // every render, so the trigger label always reflects live API data (both the
  // current locale and any future admin edits) rather than a stale local copy.
  const selected = flattenCategories(categories).find((c) => String(c.id) === value);
  const triggerLabel = selected
    ? localizedText(selected.name, selected.nameKa, locale)
    : t('filters_all_categories');

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

  const toggleParent = (id: number) => {
    setExpandedParentId((current) => (current === id ? null : id));
  };

  const selectAll = () => {
    onChange('');
    setIsOpen(false);
  };

  // Selects the category's own real id — a parent id when the parent row itself
  // is chosen, or the subcategory's own id when a child row is chosen. There is
  // no fallback-to-parent here: a subcategory filters by its own id end to end.
  const selectCategory = (id: number) => {
    onChange(String(id));
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
        <Chevron expanded={isOpen} />
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

          {categories?.map((parent) => {
            const parentLabel = localizedText(parent.name, parent.nameKa, locale);
            const isExpanded = expandedParentId === parent.id;
            const isParentSelected = String(parent.id) === value;
            const children = parent.children ?? [];

            return (
              <div key={parent.id} className="border-t border-outline-variant/10 first:border-t-0">
                <button
                  type="button"
                  onClick={() => toggleParent(parent.id)}
                  aria-expanded={isExpanded}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-body font-semibold hover:bg-surface-container-high transition-colors ${
                    isParentSelected ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  <span>{parentLabel}</span>
                  {children.length > 0 && <Chevron expanded={isExpanded} />}
                </button>

                {children.length > 0 && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {children.map((sub) => {
                        const isSubSelected = String(sub.id) === value;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => selectCategory(sub.id)}
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
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
