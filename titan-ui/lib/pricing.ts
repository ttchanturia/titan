import type { Product } from './types';

type Priced = Pick<Product, 'price' | 'discountPrice'>;

/** A product is on sale when it has a positive discount price below its regular price */
export function hasDiscount(product: Priced): boolean {
  return (
    product.discountPrice != null &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price
  );
}

/** The price the customer actually pays */
export function effectivePrice(product: Priced): number {
  return hasDiscount(product) ? product.discountPrice! : product.price;
}

/** Whole-number percentage saved, e.g. 15 for 15% off */
export function discountPercent(product: Priced): number {
  if (!hasDiscount(product)) return 0;
  return Math.round((1 - product.discountPrice! / product.price) * 100);
}
