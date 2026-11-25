'use client';

import { Suspense, useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { FB_PIXEL_ID, fbPageView, fbTrack } from '@/lib/fb-pixel';

// Admin pages are internal - keep them out of ad data.
const isAdminPath = (path: string | null) => !!path && path.startsWith('/admin');

/**
 * Fires PageView on every client-side navigation. The base snippet fires the
 * first one itself, so the initial render is skipped here to avoid doubles.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (isAdminPath(pathname)) return;
    fbPageView();
  }, [pathname, searchParams]);

  return null;
}

/**
 * Sends a "Contact" event when someone taps a phone, WhatsApp or email link
 * anywhere on the site - the site has no checkout, so these are the
 * conversions that matter for ads.
 */
function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link || isAdminPath(window.location.pathname)) return;
      const href = link.getAttribute('href') ?? '';

      let method: string | null = null;
      if (href.startsWith('tel:')) method = 'phone';
      else if (href.includes('wa.me/') || href.includes('whatsapp.com')) method = 'whatsapp';
      else if (href.startsWith('mailto:')) method = 'email';

      if (method) fbTrack('Contact', { content_name: method });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}

export default function FacebookPixel() {
  const pathname = usePathname();

  if (!FB_PIXEL_ID) return null;

  // Don't load the pixel at all if the visitor lands directly on an admin page.
  if (isAdminPath(pathname)) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <ContactClickTracker />
    </>
  );
}
