# ✅ Verification Checklist

Run through this to ensure everything is working correctly.

## Backend Verification

- [ ] Backend running: `cd Titan-API && dotnet run`
- [ ] Check Swagger: Open `https://localhost:5000/swagger`
- [ ] API endpoint accessible: `https://localhost:5000/api/products`
  - Should return JSON array of products with seed data
- [ ] CORS is configured in `Program.cs`
- [ ] No SSL certificate errors in console

## Frontend Verification

- [ ] Installed dependencies: `npm install` (already done for axios)
- [ ] `.env.local` file exists with `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- [ ] Frontend running: `cd titan-ui && npm run dev`
- [ ] Next.js dev server started on `http://localhost:3000`

## Integration Verification

Open browser console (F12):

- [ ] Go to `http://localhost:3000/products`
- [ ] **Network Tab**:
  - [ ] See GET request to `http://localhost:5000/api/products`
  - [ ] Response should be 200 (not CORS errors)
  - [ ] Response shows product data as JSON
- [ ] **Console Tab**:
  - [ ] No CORS errors
  - [ ] No 404 errors
  - [ ] No undefined errors
- [ ] **UI**:
  - [ ] Products are loading (might see skeleton for 1-2 seconds)
  - [ ] Product cards appear with data from backend
  - [ ] Product names match your seed data
  - [ ] Prices display correctly

## Common Issues Quick Fix

| Symptom                           | Solution                                  |
| --------------------------------- | ----------------------------------------- |
| CORS error in console             | ✓ Rebuild backend, check Program.cs       |
| 404 on /api/products              | ✓ Backend not running on port 5000        |
| Products show as skeleton forever | ✓ Check Network tab for failed requests   |
| Blank product cards               | ✓ Seed data missing imageUrl field        |
| "Could not connect to" error      | ✓ Check NEXT_PUBLIC_API_URL in .env.local |

## Advanced Verification

### Test API directly (no frontend)

```bash
# In another terminal:
curl https://localhost:5000/api/products
# Should return JSON with your products
```

### Test with Postman/Insomnia

1. Create GET request
2. URL: `https://localhost:5000/api/products`
3. Send
4. Should see product JSON with all your seed data

### Check types are working

```tsx
// In app/components/ProductGrid.tsx - should have autocomplete for Product properties
// If types aren't working, check lib/types.ts imports
```

## Performance Check

After products load:

1. Open DevTools > Performance tab
2. Record page load
3. Check that most time is network (API call), not rendering
4. Product grid should render in <100ms

---

## ✨ Success Criteria

You've successfully integrated the API when:

✅ Backend is running on localhost:5000
✅ Frontend is running on localhost:3000  
✅ `/api/products` returns seed data
✅ Products page displays products from backend
✅ Product names/prices match backend data
✅ No console errors
✅ No CORS warnings

---

**Once all checkboxes are done, you're ready to add:**

- Shopping cart functionality
- Product filters
- Search capability
- Product detail pages
- Add to cart buttons
- Etc!

Good luck! 🚀
