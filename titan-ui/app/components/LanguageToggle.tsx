'use client';

import { useTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/translations';

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  const optionClasses = (option: Locale) =>
    locale === option
      ? 'text-[#000000] font-bold'
      : 'text-[#566067] hover:text-[#000000] transition-colors';

  return (
    <div className="flex items-center gap-1 text-xs uppercase tracking-widest">
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={optionClasses('en')}
        aria-pressed={locale === 'en'}
      >
        En
      </button>
      <span className="text-[#C8C5CB]">/</span>
      <button
        type="button"
        onClick={() => setLocale('ka')}
        className={optionClasses('ka')}
        aria-pressed={locale === 'ka'}
      >
        Ge
      </button>
    </div>
  );
}
