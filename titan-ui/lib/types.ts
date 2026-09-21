// Backend API type definitions matching your C# models

export interface Product {
  id: number;
  name: string;
  description?: string;
  descriptionKa?: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  categoryNameKa?: string;
  imageUrl?: string;
  imageUrls?: string[];
  stockQuantity: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  nameKa?: string;
}
