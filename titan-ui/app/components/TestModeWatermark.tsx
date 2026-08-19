'use client';

import { useTranslation } from '@/lib/i18n';

export function TestModeWatermark() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-4 right-4 z-[60] pointer-events-none select-none rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-widest px-4 py-2 shadow-lg">
      {t('test_mode_watermark')}
    </div>
  );
}
