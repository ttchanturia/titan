'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Acoustics' },
    { href: '/products', label: 'Electronic' },
    { href: '#', label: 'Studio' },
    { href: '#', label: 'Curations' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FBFAEE]">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto font-headline tracking-tight antialiased">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-[#000000] uppercase"
        >
          Sonic Gallery
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
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-48 font-body outline-none"
              placeholder="Search instruments..."
              type="text"
            />
          </div>
          <Link
            href="/cart"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          <button className="hover:opacity-80 transition-opacity duration-300">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
