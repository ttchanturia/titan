'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  // Intentionally does not read useSearchParams(): Nav renders on every page
  // (not via layout), and reflecting the current query would force a
  // Suspense boundary onto pages outside this feature's scope. This is a
  // one-way handoff into /products only.
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    setMenuOpen(false);
    router.push(
      trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products',
    );
  };

  const linkClasses = (href: string) => {
    const isActive =
      href !== '#' && (href === '/' ? pathname === '/' : pathname.startsWith(href));
    return isActive
      ? 'text-[#000000] font-medium'
      : 'text-[#566067] hover:text-[#000000] transition-colors font-medium';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FBFAEE]">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight antialiased">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-[#000000] uppercase"
        >
          Titan
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm ${
                link.href !== '#' &&
                (link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href))
                  ? 'border-b-2 border-[#000000] pb-1'
                  : ''
              } ${linkClasses(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-sm"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-48 font-body outline-none"
              placeholder="Search products..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <Link
            href="/cart"
            className="relative hover:opacity-80 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </Link>
          <button className="hidden sm:inline-flex hover:opacity-80 transition-opacity duration-300">
            <span className="material-symbols-outlined">person</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden hover:opacity-80 transition-opacity duration-300"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-[#FBFAEE] px-4 sm:px-8 py-6 space-y-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-surface-container-low px-4 py-3 rounded-sm"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-body outline-none"
              placeholder="Search products..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base ${linkClasses(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
