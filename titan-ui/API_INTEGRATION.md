# API Integration Guide - Titan E-Commerce

## Architecture Overview

This app uses the **latest Next.js 16 best practices** for data fetching:

### 1. **API Layer** (`lib/api.ts`)

- Centralized Axios instance with base URL from environment
- Organized API methods: `productApi` and `categoryApi`
- All backend calls go through here
- Easy to mock for testing

### 2. **Type Safety** (`lib/types.ts`)

- TypeScript interfaces matching your C# backend models
- Prevents runtime errors with type checking

### 3. **React Hooks** (`lib/hooks.ts`)

- **useProducts()** - Fetch all products (for interactive pages)
- **useProduct(id)** - Fetch single product by ID
- **useProductsByCategory(categoryId)** - Filter by category
- **useCategories()** - Fetch all categories
- **useCategory(id)** - Fetch single category

### 4. **Client Components** (`app/components/ProductGrid.tsx`)

- Uses hooks to fetch data client-side
- Loading skeleton UI
- Error handling
- Stock status indicator based on quantity

## How to Use

### For **Static/Server Pages** (Initial page load, SEO optimized):

```tsx
// app/products/page.tsx
import { productApi } from '@/lib/api';

export default async function ProductsPage() {
  const products = await productApi.getAll(); // Server-side fetch
  return <ProductGrid products={products} />;
}
```

### For **Interactive Pages** (Real-time updates, filters):

```tsx
'use client';
import { useProducts } from '@/lib/hooks';

export function ProductGrid() {
  const { data, loading, error } = useProducts(); // Client-side fetch
  // ... render with dynamic updates
}
```

## Configuration

### API URL

Set in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, update to your deployed API URL.

## CORS Setup (Important!)

Your backend needs CORS enabled. Update `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Next.js dev URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add after MapControllers()
app.UseCors("AllowFrontend");
```

## Running the App

1. **Start Backend** (.NET API):

   ```bash
   cd Titan-API
   dotnet run
   ```

   Should start on `http://localhost:5000`

2. **Start Frontend** (Next.js):
   ```bash
   cd titan-ui
   npm run dev
   ```
   Open `http://localhost:3000`

## Why This Approach?

✅ **Type-Safe** - TypeScript catches errors before runtime
✅ **Modular** - Easy to maintain, extend, and test
✅ **Performance** - Server Components reduce JS sent to client
✅ **DX** - Flexible: Server-side for SSR, Client hooks for interactivity
✅ **Latest Standard** - Following Next.js 16 + React 19 patterns
✅ **Axios** - Better error handling and request/response interceptors than fetch

## Advanced: Add Request Interceptors

In `lib/api.ts`, you can add auth headers, logging, etc:

```typescript
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
```

## Advanced: SWR (Optional Upgrade)

For automatic caching and revalidation, you can upgrade to **SWR** (Stale-While-Revalidate):

```bash
npm install swr
```

```tsx
import useSWR from 'swr';

function useProducts() {
  const { data, error, isLoading } = useSWR(
    '/products',
    fetcher, // custom fetcher using axios
    { revalidateOnFocus: true }, // fresh data on tab focus
  );
  return { data, loading: isLoading, error };
}
```

This adds:

- Automatic caching
- Background revalidation
- Duplicate request deduplication
- Better offline support

---

**Everything is set up! Just update the CORS settings in your backend and you're ready to go.** 🚀
