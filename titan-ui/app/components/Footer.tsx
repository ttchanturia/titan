'use client';

import Link from 'next/link';
import { useCategories } from '@/lib/hooks';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const { data: categories } = useCategories();
  const { t } = useTranslation();
  const productLinks = categories?.length
    ? categories
        .slice(0, 4)
        .map((c) => ({ label: c.name, href: `/products?category=${c.id}` }))
    : [{ label: t('footer_shop_all'), href: '/products' }];

  return (
    <footer className="w-full border-t border-[#C8C5CB]/20 pt-20 pb-10 px-8 mt-24 bg-[#F5F4E8] font-body text-sm tracking-wide">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          <div className="text-lg font-headline font-bold tracking-tighter uppercase mb-6">
            Titan
          </div>
          <p className="text-[#566067] leading-relaxed">{t('footer_tagline')}</p>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            {t('footer_products_heading')}
          </h5>
          <ul className="space-y-4">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            {t('footer_brand_heading')}
          </h5>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                {t('footer_sustainability')}
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                {t('footer_technical_specs')}
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                {t('footer_store_locator')}
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                {t('footer_privacy')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            {t('footer_connect_heading')}
          </h5>
          <div className="flex space-x-6">
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">share</span>
            </Link>
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">mail</span>
            </Link>
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">location_on</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-20 pt-8 border-t border-[#C8C5CB]/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#9EA0A3] uppercase tracking-[0.2em]">
        <span>{t('footer_copyright')}</span>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link className="hover:text-[#000000]" href="#">
            {t('footer_cookies')}
          </Link>
          <Link className="hover:text-[#000000]" href="#">
            {t('footer_terms')}
          </Link>
          <Link className="hover:text-[#000000]" href="#">
            {t('footer_accessibility')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
