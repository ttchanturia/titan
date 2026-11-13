// Application constants

// "No image" placeholder for a product that genuinely has none uploaded.
// Inline SVG rather than a stock photo (e.g. a random pair of headphones) -
// a neutral graphic so it never looks like it's showing the actual product.
export const FALLBACK_IMAGE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f5f5f5' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='system-ui'%3ENo Image%3C/text%3E%3C/svg%3E`;

export const PRODUCTS_PAGE_SIZE = 9;

// Must match Uploads:MaxSizeBytes in the API's appsettings.json
export const MAX_UPLOAD_SIZE_MB = 8;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

// Same mobile number already shown on the Contact page / footer, reused here
// for the "call or message to purchase" flow (no self-checkout).
export const PHONE_TEL_HREF = 'tel:+995555377117';
export const WHATSAPP_URL = 'https://wa.me/995555377117';
