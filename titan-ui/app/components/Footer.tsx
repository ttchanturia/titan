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
          <div className="flex flex-wrap gap-6">
            <Link
              className="hover:opacity-60 transition-opacity"
              href="https://www.facebook.com/profile.php?id=61578846210562"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer_facebook_aria')}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              className="hover:opacity-60 transition-opacity"
              href="mailto:g.titan.ltd@gmail.com"
              aria-label={t('footer_email_aria')}
            >
              <span className="material-symbols-outlined">mail</span>
            </Link>
            <Link
              className="hover:opacity-60 transition-opacity"
              href="https://maps.app.goo.gl/todse2rYMdpVcdei6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer_location_aria')}
            >
              <span className="material-symbols-outlined">location_on</span>
            </Link>
          </div>
          <div className="mt-6 space-y-2">
            <Link
              className="block text-[#566067] hover:text-[#000000] transition-colors"
              href="tel:+995555377117"
              aria-label={`${t('footer_call_aria')} +995 555 377 117`}
            >
              +995 555 377 117
            </Link>
            <Link
              className="block text-[#566067] hover:text-[#000000] transition-colors"
              href="tel:+995322999680"
              aria-label={`${t('footer_call_aria')} 032 2 999 680`}
            >
              032 2 999 680
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
