'use client';

const STORAGE_KEY = 'titan_admin_auth';

export function getStoredAuthHeader(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setStoredAuthHeader(username: string, password: string): void {
  const token =
    typeof window !== 'undefined' ? window.btoa(`${username}:${password}`) : '';
  sessionStorage.setItem(STORAGE_KEY, `Basic ${token}`);
}

export function clearStoredAuthHeader(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
