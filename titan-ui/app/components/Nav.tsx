'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
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
    router.push(
      trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products',
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FBFAEE]">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight antialiased">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-[#000000] uppercase"
        >
          Titan
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive =
              link.href !== '#' &&
              (link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? 'text-[#000000] border-b-2 border-[#000000] pb-1 text-sm font-medium'
                    : 'text-[#566067] hover:text-[#000000] transition-colors text-sm font-medium'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-6">
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
          <button className="hover:opacity-80 transition-opacity duration-300">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
