'use client';

import { AdminPageHeader } from '../../components/AdminPageHeader';
import { useTranslation } from '@/lib/i18n';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();

  return <AdminPageHeader heading={t('admin_categories_heading')} />;
}
