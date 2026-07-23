'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { AdminLoginGate } from '../components/AdminLoginGate';
import {
  useProducts,
  useCategories,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/lib/hooks';
import type { Product } from '@/lib/types';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  imageUrl: '',
  stockQuantity: '',
};

type FormState = typeof emptyForm;

const inputClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

const selectClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

export default function AdminPage() {
  return (
    <AdminLoginGate>
      <AdminPageContent />
    </AdminLoginGate>
  );
}

function AdminPageContent() {
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isSaving = createProduct.isPending || updateProduct.isPending;

  const handleChange =
    (field: keyof FormState) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setFormError(null);
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      categoryId: String(product.categoryId),
      imageUrl: product.imageUrl ?? '',
      stockQuantity: String(product.stockQuantity),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormError(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const price = parseFloat(form.price);
    const categoryId = parseInt(form.categoryId, 10);
    const stockQuantity = form.stockQuantity ? parseInt(form.stockQuantity, 10) : 0;

    if (!form.name.trim() || !Number.isFinite(price) || !Number.isFinite(categoryId)) {
      setFormError('Name, price, and category are required.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      price,
      categoryId,
      imageUrl: form.imageUrl.trim() || undefined,
      stockQuantity: Number.isFinite(stockQuantity) ? stockQuantity : 0,
    };

    if (editingId !== null) {
      updateProduct.mutate(
        { id: editingId, ...payload },
        {
          onSuccess: () => {
            setForm(emptyForm);
            setEditingId(null);
          },
          onError: () => setFormError('Failed to update product. Please try again.'),
        },
      );
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => setForm(emptyForm),
        onError: () => setFormError('Failed to create product. Please try again.'),
      });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      if (editingId === id) handleCancelEdit();
      deleteProduct.mutate(id);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-8 py-16 max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-2 block">
            Admin
          </span>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary">
            Manage Products
          </h1>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold underline underline-offset-4"
        >
          View Storefront
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low p-8 rounded-sm mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 font-headline text-xl font-bold">
          {editingId !== null ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="md:col-span-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Name
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            className={inputClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Price
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange('price')}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Stock Quantity
          </label>
          <input
            type="number"
            min="0"
            value={form.stockQuantity}
            onChange={handleChange('stockQuantity')}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Category
          </label>
          <select
            required
            value={form.categoryId}
            onChange={handleChange('categoryId')}
            className={selectClasses}
          >
            <option value="">Select a category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Image URL
          </label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={handleChange('imageUrl')}
            className={inputClasses}
          />
        </div>

        {formError && (
          <p className="md:col-span-2 text-sm text-red-600">{formError}</p>
        )}

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-primary text-on-primary py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving
              ? editingId !== null
                ? 'Saving…'
                : 'Adding…'
              : editingId !== null
                ? 'Save Changes'
                : 'Add Product'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-8 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section>
        <h2 className="font-headline text-xl font-bold mb-6">
          Existing Products
        </h2>

        {isLoading && (
          <p className="text-on-surface-variant text-sm">Loading products…</p>
        )}

        {error && (
          <p className="text-on-surface-variant text-sm">
            Failed to load products: {error.message}
          </p>
        )}

        {products && products.length === 0 && (
          <p className="text-on-surface-variant text-sm">No products yet.</p>
        )}

        {products && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant text-xs uppercase tracking-widest">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3 pr-4">Stock</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className={
                      p.id === editingId
                        ? 'border-b border-outline-variant/50 bg-primary/5'
                        : 'border-b border-outline-variant/50'
                    }
                  >
                    <td className="py-3 pr-4">{p.name}</td>
                    <td className="py-3 pr-4">{p.categoryName ?? p.categoryId}</td>
                    <td className="py-3 pr-4">${p.price.toFixed(2)}</td>
                    <td className="py-3 pr-4">{p.stockQuantity}</td>
                    <td className="py-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleEditClick(p)}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleteProduct.isPending}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
