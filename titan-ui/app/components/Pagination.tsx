'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-16">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="material-symbols-outlined text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors"
        aria-label="Previous page"
      >
        chevron_left
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={
            p === page
              ? 'w-9 h-9 flex items-center justify-center text-sm font-bold text-on-primary bg-primary rounded-full'
              : 'w-9 h-9 flex items-center justify-center text-sm text-on-surface-variant hover:text-primary transition-colors'
          }
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="material-symbols-outlined text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors"
        aria-label="Next page"
      >
        chevron_right
      </button>
    </nav>
  );
}
