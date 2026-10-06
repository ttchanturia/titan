import type { Category } from './types';

/**
 * Parents plus every nested child, flattened one level.
 * GET /api/categories returns only the top-level entries, with their subcategories
 * nested in `children`, and the tree is only ever two levels deep.
 */
export function flattenCategories(categories: Category[] | undefined): Category[] {
  if (!categories) return [];
  return categories.flatMap((c) => [c, ...(c.children ?? [])]);
}
