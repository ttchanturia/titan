// Backend API type definitions matching your C# models

export interface Product {
  id: number;
  name: string;
  description?: string;
  descriptionKa?: string;
  price: number;
  /** Sale price; null/absent means the product isn't discounted */
  discountPrice?: number | null;
  categoryId: number;
  categoryName?: string;
  categoryNameKa?: string;
  /** Null/absent when no brand is assigned */
  brandId?: number | null;
  brandName?: string;
  brandNameKa?: string;
  imageUrl?: string;
  imageUrls?: string[];
  stockQuantity: number;
  /** True when listed on the Rental page instead of the Products page. */
  isRental?: boolean;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  nameKa?: string;
  description?: string;
  /** Null/undefined for a top-level category; otherwise the id of its parent. */
  parentId?: number | null;
  /** Name of the parent category, for display. Null/undefined for top-level. */
  parentName?: string | null;
  /** Subcategories nested under this category. Populated on top-level entries by GET /api/categories. */
  children?: Category[];
}

export interface Brand {
  id: number;
  name: string;
  nameKa?: string;
}
