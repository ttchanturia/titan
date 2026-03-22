'use client';

import { useState } from 'react';
import {
  useDeleteProduct,
  useCreateProduct,
  useProductsByCategory,
} from '@/lib/hooks';
import { Product } from '@/lib/types';

/**
 * Example: Delete Product with Optimistic UI
 * Deletes the product immediately, shows error if it fails
 */
export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: number;
  productName: string;
}) {
  const { mutate, isPending, error } = useDeleteProduct();

  const handleDelete = () => {
    if (confirm(`Delete ${productName}?`)) {
      mutate(productId);
    }
  };

  if (error) {
    return (
      <button className="text-red-500" disabled>
        Error deleting: {error.message}
      </button>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

/**
 * Example: Create Product Form
 * Shows loading state and error handling
 */
export function CreateProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('1');

  const { mutate, isPending, error, isSuccess } = useCreateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
      description: '',
      stockQuantity: 0,
    });
  };

  if (isSuccess) {
    return (
      <div className="text-green-600">
        Product created successfully! Refreshing list...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Vintage Stratocaster"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="2499.99"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create Product'}
      </button>

      {error && (
        <div className="text-red-600 text-sm">Error: {error.message}</div>
      )}
    </form>
  );
}

/**
 * Example: Filtering with automatic refetching
 * Shows how to use dependent queries
 */
export function ProductFilterExample() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const {
    data: products,
    isLoading,
    error,
  } = useProductsByCategory(selectedCategoryId);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
      >
        <option value={1}>Category 1</option>
        <option value={2}>Category 2</option>
      </select>

      <div>
        {products?.map((product: Product) => (
          <div key={product.id} className="mb-4 p-4 border rounded">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {/* Show delete button for each product */}
            <DeleteProductButton
              productId={product.id}
              productName={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
