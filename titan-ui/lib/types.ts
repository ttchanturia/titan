// Backend API type definitions matching your C# models

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  imageUrl?: string;
  stockQuantity: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
