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
  useUploadImage,
} from '@/lib/hooks';
import type { Product } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';

const MAX_IMAGES = 3;

const emptyForm = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  imageUrls: [] as string[],
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
  const { t } = useTranslation();
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const uploadImage = useUploadImage();

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
      imageUrls: product.imageUrls?.length
        ? product.imageUrls
        : product.imageUrl
          ? [product.imageUrl]
          : [],
      stockQuantity: String(product.stockQuantity),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormError(null);
    setForm(emptyForm);
  };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = ''; // let the same file(s) be re-picked after a failure
    if (files.length === 0) return;

    const remainingSlots = MAX_IMAGES - form.imageUrls.length;
    const filesToUpload = files.slice(0, remainingSlots);
    setFormError(null);

    // Uploaded one at a time (not in parallel) so a shared "uploading" state
    // stays accurate and the droplet isn't asked to resize several images at once.
    for (const file of filesToUpload) {
      try {
        const { url } = await uploadImage.mutateAsync(file);
        setForm((f) => ({ ...f, imageUrls: [...f.imageUrls, url] }));
      } catch {
        setFormError(t('admin_image_upload_failed'));
        break;
      }
    }
  };

  const handleImageRemove = (index: number) =>
    setForm((f) => ({
      ...f,
      imageUrls: f.imageUrls.filter((_, i) => i !== index),
    }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const price = parseFloat(form.price);
    const categoryId = parseInt(form.categoryId, 10);
    const stockQuantity = form.stockQuantity ? parseInt(form.stockQuantity, 10) : 0;

    if (!form.name.trim() || !Number.isFinite(price) || !Number.isFinite(categoryId)) {
      setFormError(t('admin_required_error'));
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      price,
      categoryId,
      imageUrls: form.imageUrls,
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
          onError: () => setFormError(t('admin_update_failed')),
        },
      );
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => setForm(emptyForm),
        onError: () => setFormError(t('admin_create_failed')),
      });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(t('admin_delete_confirm', { name }))) {
      if (editingId === id) handleCancelEdit();
      deleteProduct.mutate(id);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-8 py-16 max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-2 block">
            {t('admin_badge')}
          </span>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary">
            {t('admin_heading')}
          </h1>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold underline underline-offset-4"
        >
          {t('admin_view_storefront')}
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low p-8 rounded-sm mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 font-headline text-xl font-bold">
          {editingId !== null ? t('admin_edit_product') : t('admin_add_product')}
        </h2>

        <div className="md:col-span-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_name_label')}
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
            {t('admin_description_label')}
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
            {t('admin_price_label')}
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
            {t('admin_stock_label')}
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
            {t('admin_category_label')}
          </label>
          <select
            required
            value={form.categoryId}
            onChange={handleChange('categoryId')}
            className={selectClasses}
          >
            <option value="">{t('admin_select_category')}</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_image_label')}
          </label>
          <div className="flex items-center gap-4">
            {form.imageUrls.map((url, index) => (
              <div key={url} className="relative w-20 h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="w-20 h-20 object-cover rounded-sm border border-outline-variant"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  aria-label={t('admin_image_remove')}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
            {form.imageUrls.length < MAX_IMAGES && (
              <label
                aria-label={t('admin_image_choose')}
                className={`w-20 h-20 rounded-sm border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-center text-[10px] leading-tight px-1 ${uploadImage.isPending ? 'cursor-wait' : 'cursor-pointer'}`}
              >
                {uploadImage.isPending ? (
                  t('admin_image_uploading')
                ) : (
                  <span className="material-symbols-outlined">add_photo_alternate</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  disabled={uploadImage.isPending}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            {t('admin_image_hint', { count: form.imageUrls.length, max: MAX_IMAGES })}
          </p>
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
                ? t('admin_saving')
                : t('admin_adding')
              : editingId !== null
                ? t('admin_save_changes')
                : t('admin_add_product')}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-8 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {t('admin_cancel')}
            </button>
          )}
        </div>
      </form>

      <section>
        <h2 className="font-headline text-xl font-bold mb-6">
          {t('admin_existing_products')}
        </h2>

        {isLoading && (
          <p className="text-on-surface-variant text-sm">{t('admin_loading')}</p>
        )}

        {error && (
          <p className="text-on-surface-variant text-sm">
            {t('admin_load_failed')} {error.message}
          </p>
        )}

        {products && products.length === 0 && (
          <p className="text-on-surface-variant text-sm">{t('admin_no_products')}</p>
        )}

        {products && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant text-xs uppercase tracking-widest">
                  <th className="py-3 pr-4">{t('admin_table_name')}</th>
                  <th className="py-3 pr-4">{t('admin_table_category')}</th>
                  <th className="py-3 pr-4">{t('admin_table_price')}</th>
                  <th className="py-3 pr-4">{t('admin_table_stock')}</th>
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
                    <td className="py-3 pr-4">₾{p.price.toFixed(2)}</td>
                    <td className="py-3 pr-4">{p.stockQuantity}</td>
                    <td className="py-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleEditClick(p)}
                        className="text-primary hover:underline"
                      >
                        {t('admin_edit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleteProduct.isPending}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {t('admin_delete')}
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
