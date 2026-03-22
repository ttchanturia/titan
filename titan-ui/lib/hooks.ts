'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from './types';
import { productApi, categoryApi } from './api';

/**
 * Hook for fetching all products
 * Uses TanStack Query for caching, deduplication, and automatic retries
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAll(),
  });
}

/**
 * Hook for fetching a single product by ID
 */
export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id, // Don't fetch until we have an ID
  });
}

/**
 * Hook for fetching products by category
 */
export function useProductsByCategory(categoryId: number) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productApi.getByCategory(categoryId),
    enabled: !!categoryId, // Don't fetch until we have a categoryId
  });
}

/**
 * Hook for fetching all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
  });
}

/**
 * Hook for fetching a single category by ID
 */
export function useCategory(id: number) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryApi.getById(id),
    enabled: !!id, // Don't fetch until we have an ID
  });
}

// ============================================
// MUTATIONS (POST, PUT, DELETE)
// ============================================

/**
 * Hook for creating a product
 * Automatically revalidates products list on success
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Omit<Product, 'id' | 'createdAt'>) =>
      productApi.create(newProduct),
    onSuccess: () => {
      // Revalidate products list after creating
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for updating a product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...product }: { id: number } & Partial<Product>) =>
      productApi.update(id, product),
    onSuccess: (_, variables) => {
      // Revalidate both the specific product and products list
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for deleting a product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    onSuccess: () => {
      // Revalidate products list after deleting
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
