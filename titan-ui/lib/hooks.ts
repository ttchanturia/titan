'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Brand, Category, HomepageContentEntry, Product } from './types';
import { productApi, categoryApi, brandApi, homepageApi, uploadApi } from './api';


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

/**
 * Hook for creating a category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: Omit<Category, 'id' | 'parentName'>) =>
      categoryApi.create(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

/**
 * Hook for updating a category
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...category }: { id: number } & Partial<Category>) =>
      categoryApi.update(id, category),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // Category names are joined into product rows, so refresh those too
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for deleting a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for fetching all brands
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => brandApi.getAll(),
  });
}

/**
 * Hook for creating a brand
 */
export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBrand: Omit<Brand, 'id'>) => brandApi.create(newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
}

/**
 * Hook for updating a brand
 */
export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...brand }: { id: number } & Partial<Brand>) =>
      brandApi.update(id, brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      // Brand names are joined into product rows, so refresh those too
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for deleting a brand
 */
export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => brandApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      // Brand names are joined into product rows, so refresh those too
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

/**
 * Hook for fetching the admin-configured homepage content.
 * Retries only once so the homepage falls back to its defaults quickly when
 * the API is unreachable.
 */
export function useHomepageContent() {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: () => homepageApi.getAll(),
    retry: 1,
  });
}

/**
 * Hook for saving the full homepage configuration
 */
export function useUpdateHomepageContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entries: HomepageContentEntry[]) => homepageApi.replaceAll(entries),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage'] });
    },
  });
}

/**
 * Hook for uploading a product image
 * Returns the stored image URL to save on the product
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => uploadApi.uploadImage(file),
  });
}

