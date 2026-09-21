'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export function AdminPageHeader({ heading }: { heading: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-2 block">
          {t('admin_badge')}
        </span>
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary">
          {heading}
        </h1>
      </div>
      <Link
        href="/products"
        className="text-sm font-semibold underline underline-offset-4"
      >
        {t('admin_view_storefront')}
      </Link>
    </div>
  );
}
