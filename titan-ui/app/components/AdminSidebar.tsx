'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

const links = [
  { href: '/admin/products', labelKey: 'admin_nav_products' as const },
  { href: '/admin/categories', labelKey: 'admin_nav_categories' as const },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="w-48 shrink-0 flex flex-col gap-4 pt-1">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'text-sm font-semibold text-primary underline underline-offset-4'
                : 'text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors'
            }
          >
            {t(link.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
