// Meta (Facebook) Pixel helpers.
//
// The Pixel ID comes from NEXT_PUBLIC_FB_PIXEL_ID (Events Manager → Data
// sources → your pixel). It is inlined at build time, so set it before
// `npm run build`. When it's not set, the pixel is never loaded and every
// helper below is a no-op.

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? '';

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Standard events: https://developers.facebook.com/docs/meta-pixel/reference */
export function fbTrack(event: string, params?: Record<string, unknown>) {
  if (!FB_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params);
}

export function fbPageView() {
  fbTrack('PageView');
}
