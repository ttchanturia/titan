import type { Product } from '@/lib/types';
import { effectivePrice, hasDiscount } from '@/lib/pricing';

interface PriceTagProps {
  product: Pick<Product, 'price' | 'discountPrice'>;
  /** Classes for the price the customer pays (size, weight, color) */
  className?: string;
}

/**
 * Shows the price a customer pays, with the original price struck through
 * next to it when the product is discounted.
 */
export function PriceTag({ product, className = '' }: PriceTagProps) {
  const discounted = hasDiscount(product);

  return (
    <p className="flex items-baseline gap-3 flex-wrap">
      <span className={className}>₾{effectivePrice(product).toFixed(2)}</span>
      {discounted && (
        <span className="text-on-surface-variant line-through decoration-red-500 text-base">
          ₾{product.price.toFixed(2)}
        </span>
      )}
    </p>
  );
}
