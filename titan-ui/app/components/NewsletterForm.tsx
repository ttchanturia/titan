'use client';

import { useTranslation } from '@/lib/i18n';

export default function NewsletterForm() {
  const { t } = useTranslation();

  return (
    <form
      className="max-w-md mx-auto flex"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="flex-1 bg-transparent border-b border-outline-variant py-4 focus:outline-none focus:border-primary transition-colors text-sm"
        placeholder={t('newsletter_email_placeholder')}
        type="email"
      />
      <button className="ml-4 font-bold uppercase text-xs tracking-widest">
        {t('newsletter_subscribe')}
      </button>
    </form>
  );
}
