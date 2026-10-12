// Backend API type definitions matching your C# models

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  /** Sale price; null/absent means the product isn't discounted */
  discountPrice?: number | null;
  categoryId: number;
  categoryName?: string;
  imageUrl?: string;
  stockQuantity: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  nameKa?: string;
  description?: string;
  parentId?: number | null;
  parentName?: string;
}

export interface Brand {
  id: number;
  name: string;
  nameKa?: string;
}
