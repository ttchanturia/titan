'use client';

import { Fragment, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/lib/hooks';
import type { Category } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';

const emptyForm = {
  name: '',
  nameKa: '',
  description: '',
  parentId: '',
};

type FormState = typeof emptyForm;

const inputClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

const selectClasses =
  'w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const { data: categories, isLoading, error } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isSaving = createCategory.isPending || updateCategory.isPending;

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setFormError(null);
    setForm({
      name: category.name,
      nameKa: category.nameKa ?? '',
      description: category.description ?? '',
      parentId: category.parentId != null ? String(category.parentId) : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormError(null);
    setForm(emptyForm);
  };

  // Jump straight to "create a new category under this one" instead of making
  // the admin re-select the same parent from the dropdown every time.
  const handleAddSubcategoryClick = (parent: Category) => {
    setEditingId(null);
    setFormError(null);
    setForm({ ...emptyForm, parentId: String(parent.id) });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim()) {
      setFormError(t('admin_category_required_error'));
      return;
    }

    const payload = {
      name: form.name.trim(),
      nameKa: form.nameKa.trim() || undefined,
      description: form.description.trim() || undefined,
      parentId: form.parentId ? parseInt(form.parentId, 10) : null,
    };

    if (editingId !== null) {
      updateCategory.mutate(
        { id: editingId, ...payload },
        {
          onSuccess: () => {
            setForm(emptyForm);
            setEditingId(null);
          },
          onError: () => setFormError(t('admin_category_update_failed')),
        },
      );
    } else {
      createCategory.mutate(payload, {
        onSuccess: () => setForm(emptyForm),
        onError: () => setFormError(t('admin_category_create_failed')),
      });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(t('admin_delete_confirm', { name }))) {
      if (editingId === id) handleCancelEdit();
      deleteCategory.mutate(id);
    }
  };

  // A category can't be assigned as its own parent
  const parentOptions = categories?.filter((c) => c.id !== editingId);

  // Group for display: each top-level category followed by its own subcategories,
  // so the hierarchy the admin just built is actually visible in the table.
  const topLevelCategories = categories?.filter((c) => c.parentId == null) ?? [];
  const subcategoriesByParent = new Map<number, Category[]>();
  categories?.forEach((c) => {
    if (c.parentId != null) {
      subcategoriesByParent.set(c.parentId, [
        ...(subcategoriesByParent.get(c.parentId) ?? []),
        c,
      ]);
    }
  });

  return (
    <>
      <AdminPageHeader heading={t('admin_categories_heading')} />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-surface-container-low p-8 rounded-sm mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 font-headline text-xl font-bold">
          {editingId !== null ? t('admin_edit_category') : t('admin_add_category')}
        </h2>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_category_name_en_label')}
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_category_name_ka_label')}
          </label>
          <input
            type="text"
            value={form.nameKa}
            onChange={handleChange('nameKa')}
            className={inputClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            {t('admin_parent_category_label')}
          </label>
          <select
            value={form.parentId}
            onChange={handleChange('parentId')}
            className={selectClasses}
          >
            <option value="">{t('admin_no_parent_option')}</option>
            {parentOptions?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
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
                : t('admin_add_category')}
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
          {t('admin_existing_categories')}
        </h2>

        {isLoading && (
          <p className="text-on-surface-variant text-sm">
            {t('admin_loading_categories')}
          </p>
        )}

        {error && (
          <p className="text-on-surface-variant text-sm">
            {t('admin_load_categories_failed')} {error.message}
          </p>
        )}

        {categories && categories.length === 0 && (
          <p className="text-on-surface-variant text-sm">{t('admin_no_categories')}</p>
        )}

        {categories && categories.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant text-xs uppercase tracking-widest">
                  <th className="py-3 pr-4">{t('admin_table_name_en')}</th>
                  <th className="py-3 pr-4">{t('admin_table_name_ka')}</th>
                  <th className="py-3 pr-4">{t('admin_table_parent')}</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {topLevelCategories.map((parent) => (
                  <Fragment key={parent.id}>
                    <CategoryRow
                      key={parent.id}
                      category={parent}
                      isChild={false}
                      isEditing={parent.id === editingId}
                      onEdit={handleEditClick}
                      onDelete={handleDelete}
                      onAddSubcategory={handleAddSubcategoryClick}
                      deletePending={deleteCategory.isPending}
                      t={t}
                    />
                    {(subcategoriesByParent.get(parent.id) ?? []).map((child) => (
                      <CategoryRow
                        key={child.id}
                        category={child}
                        isChild
                        isEditing={child.id === editingId}
                        onEdit={handleEditClick}
                        onDelete={handleDelete}
                        onAddSubcategory={handleAddSubcategoryClick}
                        deletePending={deleteCategory.isPending}
                        t={t}
                      />
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function CategoryRow({
  category,
  isChild,
  isEditing,
  onEdit,
  onDelete,
  onAddSubcategory,
  deletePending,
  t,
}: {
  category: Category;
  isChild: boolean;
  isEditing: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number, name: string) => void;
  onAddSubcategory: (category: Category) => void;
  deletePending: boolean;
  t: ReturnType<typeof useTranslation>['t'];
}) {
  return (
    <tr
      className={
        isEditing
          ? 'border-b border-outline-variant/50 bg-primary/5'
          : 'border-b border-outline-variant/50'
      }
    >
      <td className="py-3 pr-4">
        {isChild ? <span className="text-on-surface-variant mr-2">↳</span> : null}
        {category.name}
      </td>
      <td className="py-3 pr-4">{category.nameKa || t('admin_no_parent_value')}</td>
      <td className="py-3 pr-4">
        {category.parentName ?? t('admin_no_parent_value')}
      </td>
      <td className="py-3 flex gap-4">
        {!isChild && (
          <button
            type="button"
            onClick={() => onAddSubcategory(category)}
            className="text-primary hover:underline"
          >
            {t('admin_add_subcategory')}
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(category)}
          className="text-primary hover:underline"
        >
          {t('admin_edit')}
        </button>
        <button
          type="button"
          onClick={() => onDelete(category.id, category.name)}
          disabled={deletePending}
          className="text-red-600 hover:underline disabled:opacity-50"
        >
          {t('admin_delete')}
        </button>
      </td>
    </tr>
  );
}
