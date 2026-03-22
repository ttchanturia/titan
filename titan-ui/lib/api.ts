import axios from 'axios';
import { Product, Category } from './types';

// Configure base URL - adjust based on your backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Product API calls
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>(
      `/products/category/${categoryId}`,
    );
    return response.data;
  },

  create: async (
    product: Omit<Product, 'id' | 'createdAt'>,
  ): Promise<Product> => {
    const response = await axiosInstance.post<Product>('/products', product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>): Promise<boolean> => {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.status === 204 || response.status === 200;
  },

  delete: async (id: number): Promise<boolean> => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.status === 204 || response.status === 200;
  },
};

// Category API calls
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await axiosInstance.get<Category>(`/categories/${id}`);
    return response.data;
  },
};

export default axiosInstance;
