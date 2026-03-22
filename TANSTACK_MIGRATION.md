# TanStack Query Migration Summary

## What Changed

Upgraded from manual `useEffect` + `useState` to **TanStack Query** - production-grade React data fetching.

## Files Created

```
app/
├── providers.tsx ⭐ NEW - QueryClient setup
├── components/
│   └── MutationExamples.tsx ⭐ NEW - Example mutations
└── layout.tsx ✅ UPDATED - Wrapped with QueryProvider

lib/
├── hooks.ts ✅ UPDATED - Now uses TanStack Query + mutations
└── api.ts ✅ UPDATED - Added create/update/delete methods

TANSTACK_QUERY_GUIDE.md ⭐ NEW - Complete guide
```

## Key Improvements

### Before

```tsx
// Manual state management, double renders in dev
export function useProducts() {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    productApi
      .getAll()
      .then((data) => {
        if (isMounted) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (isMounted) setState({ data: null, loading: false, error });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
```

### After

```tsx
// One line! Everything handled automatically
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAll(),
  });
}
```

## What You Get Now

✅ **Automatic Caching**

- Visit products page twice = 1 API call + 1 cache hit
- 5-minute stale time (configurable)

✅ **Request Deduplication**

- Two components request same data = 1 API call
- Built-in, no manual optimization needed

✅ **Automatic Retries**

- Failed requests retry 3x with exponential backoff
- No more "Request failed, try again?" messages

✅ **No Double Renders**

- React Strict Mode dev-only double renders eliminated
- Production-ready from day 1

✅ **DevTools**

- Browser extension shows all queries, cache status, timing
- Debug like a pro

✅ **Mutations (POST/PUT/DELETE)**

```tsx
const { mutate: deleteProduct, isPending } = useDeleteProduct();
deleteProduct(productId);
```

✅ **Optimistic Updates**

```tsx
// Show deleted immediately, rollback if fails
onMutate: (id) => {
  queryClient.setQueryData(['products'], (old) =>
    old.filter((p) => p.id !== id),
  );
};
```

## API Usage

### Fetch Data (Automatic Caching)

```tsx
const { data, isLoading, error } = useProducts();
```

### Create Product

```tsx
const { mutate, isPending, error } = useCreateProduct();
mutate({ name: 'New Guitar', price: 2000, categoryId: 1 });
```

### Delete Product

```tsx
const { mutate: deleteProduct } = useDeleteProduct();
deleteProduct(productId);
// Automatically revalidates products list!
```

### Filter by Category (Dependent Query)

```tsx
const { data: products } = useProductsByCategory(categoryId);
// Automatically refetches when categoryId changes
```

## Configuration

Default settings in `app/providers.tsx`:

```typescript
staleTime: 5 minutes     // Data fresh for 5 min
gcTime: 10 minutes       // Keep in cache 10 min
retry: 3                 // Retry failed requests 3x
retryDelay: exponential  // Wait longer each retry
```

All production-ready defaults. Adjust as needed.

## Performance Impact

### Bundle Size

- TanStack Query: ~14KB gzipped
- Worth it for automatic caching, deduplication, devtools

### API Calls

- Same number of calls, but smarter
- Caching = fewer re-requests

### Render Performance

- Slightly better (no unnecessary useEffect cleanup)

## Example Components

See `app/components/MutationExamples.tsx`:

- **DeleteProductButton** - Delete with error handling
- **CreateProductForm** - Create with loading state
- **ProductFilterExample** - Filter with dependent queries

## Next Steps

1. ✅ Done! Everything is set up
2. Try the app: visit products twice (2nd is instant from cache)
3. Open DevTools (F12) > bottom right > TanStack Query icon
4. See all queries, cache status, timing info
5. Add mutations to your product components (see MutationExamples)

## Documentation

- **TANSTACK_QUERY_GUIDE.md** - Complete reference
- **app/components/MutationExamples.tsx** - Code examples
- **lib/hooks.ts** - All available hooks with comments

## Troubleshooting

**Q: Why do I see a loading spinner on 2nd visit?**
A: You probably changed `staleTime`. Default is 5 min fresh.

**Q: DevTools not showing?**
A: Only shows in development. Check bottom-right corner.

**Q: How do I manually refresh data?**

```tsx
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['products'] });
```

**Q: Can I change cache settings?**
Yes! Edit `app/providers.tsx` defaultOptions. Per-query overrides available too.

---

You're ready for production! 🚀
