# TanStack Query Setup - Complete Guide

## What Changed

Upgraded from manual `useEffect` to **TanStack Query** - the industry-standard React data fetching library.

### Benefits You Get Now

✅ **Automatic Caching** - Visit product list twice, 2nd time is instant (from cache)
✅ **Request Deduplication** - Two components request same data = 1 API call
✅ **Background Revalidation** - Stale data refreshes silently in background
✅ **Automatic Retries** - Failed requests retry with exponential backoff
✅ **DevTools** - Browser extension to debug queries
✅ **No Double Requests** - Eliminates the React Strict Mode double-fetch

## Setup

### 1. QueryProvider (Already Added)

File: `app/providers.tsx`

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 mins - data stays fresh
      gcTime: 1000 * 60 * 10, // 10 mins - keep in cache
      retry: 3, // Retry 3 times
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools /> {/* Browser DevTools */}
    </QueryClientProvider>
  );
}
```

### 2. Hooks (Already Updated)

File: `lib/hooks.ts`

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi } from './api';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAll(),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id, // Don't fetch until we have an ID
  });
}
```

### 3. Layout Updated

File: `app/layout.tsx`

```tsx
import { QueryProvider } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

---

## How to Use

### Basic Query (Reading Data)

```tsx
'use client';

import { useProducts } from '@/lib/hooks';

export function ProductList() {
  const { data: products, isLoading, error, isFetching } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isFetching && <small>Refreshing...</small>}
      {products?.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

**Return Values:**

- `data` - The cached/fetched data
- `isLoading` - True while initial fetch is in-flight
- `error` - Error object if request failed
- `isPending` - True if no data yet (different from isFetching)
- `isFetching` - True if ANY request is in-flight (background refetch too)
- `status` - Can be 'pending', 'error', or 'success'

### Dependent Queries (Waiting for Data)

```tsx
'use client';

import { useCategories, useProductsByCategory } from '@/lib/hooks';
import { useState } from 'react';

export function FilterByCategory() {
  const [selectedId, setSelectedId] = useState(1);
  const { data: categories } = useCategories();
  // This only fetches when selectedId changes
  const { data: products } = useProductsByCategory(selectedId);

  return (
    <div>
      <select onChange={(e) => setSelectedId(Number(e.target.value))}>
        {categories?.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>
      {products?.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

---

## Advanced: Mutations (POST, PUT, DELETE)

For creating/updating/deleting data:

### 1. Create a Mutation Hook

```tsx
// lib/hooks.ts - ADD THIS

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: CreateProductDTO) => productApi.create(newProduct),

    // After success, revalidate products list
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

### 2. Use in Components

```tsx
'use client';

import { useCreateProduct } from '@/lib/hooks';

export function CreateProductForm() {
  const { mutate, isPending, error } = useCreateProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({
      name: 'New Guitar',
      price: 2000,
      categoryId: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product name" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
```

---

## DevTools

TanStack Query DevTools help you debug queries:

### Open in Browser

1. Look for a floating icon in bottom corner (dev only)
2. Click to open panel
3. See all active queries, their status, cache age, etc.

### Features

- ✅ See all queries and their state
- ✅ See cache status (fresh, stale, etc.)
- ✅ Manually revalidate queries
- ✅ See request timing
- ✅ Replay requests

---

## Query Keys - Best Practices

Query keys are used for caching and invalidation. Use arrays:

```tsx
// Good - hierarchical and specific
['products'][('products', 'category', categoryId)][('product', id)][
  'categories'
][
  // These are DIFFERENT queries:
  'products'
] != ['products', 'category', 1];
```

### Invalidate (Refresh) Queries

```tsx
import { useQueryClient } from '@tanstack/react-query';

export function MyComponent() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Refresh specific query
    queryClient.invalidateQueries({ queryKey: ['products'] });

    // Refresh all queries starting with 'products'
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };
}
```

---

## Caching Behavior

### Default Settings (Already Configured)

```
staleTime: 5 minutes
  ↓
  Data fresh for 5 mins. Requests within 5 mins use cache.
  After 5 mins, data is stale (but still shown).

gcTime: 10 minutes
  ↓
  Keep stale data in cache for 10 mins total.
  After 10 mins, delete from cache completely.
```

### Timeline Example

```
Time 0:00 - User visits page
  → API call made, data cached

Time 3:00 - User navigates away, comes back
  → Data still fresh (< 5 mins), use cache (instant!)

Time 6:00 - User navigates away, comes back
  → Data is stale (> 5 mins), but still cached
  → Show old data WHILE fetching fresh data
  → New data arrives, UI updates

Time 12:00 - Nothing happens
  → Data expired from cache
  → Next request will be a full API call
```

---

## Error Handling

```tsx
export function SafeProductList() {
  const { data: products, error, isError } = useProducts();

  if (isError) {
    return (
      <div className="error-box">
        <p>Failed to load products</p>
        <details>
          <summary>Error details</summary>
          <pre>{error?.message}</pre>
        </details>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
```

---

## Optimistic Updates

Update UI immediately, rollback if mutation fails:

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function DeleteProductButton({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => productApi.delete(id),

    // Update UI optimistically
    onMutate: async (id) => {
      // Cancel in-flight queries
      await queryClient.cancelQueries({ queryKey: ['products'] });

      // Get old data
      const oldData = queryClient.getQueryData(['products']);

      // Update cache optimistically
      queryClient.setQueryData(['products'], (old: Product[]) =>
        old.filter((p) => p.id !== id),
      );

      return { oldData }; // Save for rollback
    },

    // Rollback if mutation fails
    onError: (err, id, context) => {
      queryClient.setQueryData(['products'], context?.oldData);
    },

    // Revalidate on success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return <button onClick={() => mutate(productId)}>Delete</button>;
}
```

This deletes the product from UI immediately. If deletion fails, shows it again.

---

## Pagination Example

```tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/lib/api';

const ITEMS_PER_PAGE = 10;

export function PaginatedProducts() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'paginated', page],
    queryFn: () =>
      productApi.getAll().then((products) => ({
        items: products.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE,
        ),
        total: products.length,
      })),
  });

  const totalPages = Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE);

  return (
    <div>
      {/* Products */}
      {data?.items.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}

      {/* Pagination */}
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
```

---

## Next Steps

1. ✅ Setup is complete!
2. Try querying products from different pages
3. Open DevTools (bottom right) to see caching in action
4. Try searching/filtering - see no API calls on repeat searches
5. Add a "Create Product" form with mutations

---

## Resources

- **Docs**: https://tanstack.com/query/latest
- **GitHub**: https://github.com/TanStack/query
- **DevTools**: Install from browser extension store

Enjoy production-grade data fetching! 🚀
