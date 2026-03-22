// This file shows different patterns for fetching data in Next.js 16
// THESE ARE EXAMPLES - Do not use all of them! Pick the pattern that fits your use case.
// These are commented out code examples to show different approaches.

// ============================================
// PATTERN 1: Server Component with Server Fetch
// ============================================
// Best for: Initial page load, SEO, static content
// File: app/products/page.tsx
//
// import { productApi } from '@/lib/api';
//
// export default async function ProductsPage() {
//   const products = await productApi.getAll();
//   return (
//     <div>
//       <h1>Products</h1>
//       {products.map((product) => (
//         <div key={product.id}>
//           <h2>{product.name}</h2>
//           <p>${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// ============================================
// PATTERN 2: Client Component with TanStack Query
// ============================================
// Best for: Interactive features, search, filters
// File: app/components/ProductsList.tsx
//
// 'use client';
//
// import { useState } from 'react';
// import { useProducts } from '@/lib/hooks';
//
// export function InteractiveProductsList() {
//   const { data: products, isLoading, error } = useProducts();
//   const [searchTerm, setSearchTerm] = useState('');
//
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//
//   const filtered = products?.filter((p) =>
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   ) || [];
//
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {filtered.map((product) => (
//         <div key={product.id}>
//           <h2>{product.name}</h2>
//           <p>${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// ============================================
// PATTERN 3: Single Product with Detail
// ============================================
// File: app/components/ProductDetail.tsx
//
// 'use client';
//
// import { useState } from 'react';
// import { useProduct } from '@/lib/hooks';
//
// export function ProductDetail({ productId }: { productId: number }) {
//   const { data: product, isLoading, error } = useProduct(productId);
//   const [quantity, setQuantity] = useState(1);
//
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!product) return <div>Product not found</div>;
//
//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>${product.price}</p>
//       <input
//         type="number"
//         min="1"
//         value={quantity}
//         onChange={(e) => setQuantity(parseInt(e.target.value))}
//       />
//       <button>Add to Cart</button>
//     </div>
//   );
// }

// ============================================
// PATTERN 4: Filter by Category (Dependent Query)
// ============================================
// File: app/components/CategoryFilter.tsx
//
// 'use client';
//
// import { useState } from 'react';
// import { useProductsByCategory, useCategories } from '@/lib/hooks';
//
// export function ProductsByCategory() {
//   const [selectedId, setSelectedId] = useState(1);
//   const { data: categories } = useCategories();
//   const { data: products, isLoading } = useProductsByCategory(selectedId);
//
//   return (
//     <div>
//       <select value={selectedId} onChange={(e) => setSelectedId(Number(e.target.value))}>
//         {categories?.map((c) => (
//           <option key={c.id} value={c.id}>{c.name}</option>
//         ))}
//       </select>
//       {isLoading ? <div>Loading...</div> : (
//         <>
//           {products?.map((p) => (
//             <div key={p.id}>{p.name}</div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// ============================================
// PATTERN 5: Mutations (Create, Update, Delete)
// ============================================
// File: app/components/DeleteProductButton.tsx
//
// 'use client';
//
// import { useDeleteProduct } from '@/lib/hooks';
//
// export function DeleteProductButton({ productId }: { productId: number }) {
//   const { mutate, isPending, error } = useDeleteProduct();
//
//   return (
//     <button onClick={() => mutate(productId)} disabled={isPending}>
//       {isPending ? 'Deleting...' : 'Delete'}
//     </button>
//   );
// }

// ============================================
// KEY TANSTACK QUERY PROPERTY NAMES
// ============================================
// - isLoading: boolean - True while fetching initial data
// - isSuccess: boolean - True when data loaded successfully
// - isError: boolean - True if request failed
// - isPending: boolean - True if no data yet
// - isFetching: boolean - True during any fetch (initial or background)
// - error: Error | null - Error object if failed
// - data: T - The fetched data

// OLD PROPERTY NAMES (from useEffect implementation):
// - loading: use isLoading or isPending instead
// - error: same as above

// ============================================
// WHEN TO USE EACH PATTERN
// ============================================
//
// Server Component (Pattern 1):
//   ✓ Static product listing
//   ✓ SEO important
//   ✓ No user interaction
//
// Client Hook (Pattern 2):
//   ✓ Search/filter needed
//   ✓ Real-time updates
//   ✓ User interaction
//
// Single Product (Pattern 3):
//   ✓ Product detail page
//   ✓ Show/edit single item
//
// Filter (Pattern 4):
//   ✓ Category filters
//   ✓ Dependent queries
//
// Mutations (Pattern 5):
//   ✓ Create new items
//   ✓ Update existing items
//   ✓ Delete items
//
// See TANSTACK_QUERY_GUIDE.md for complete examples
