# Laxmi Vara Silks — Product Sync & Responsive Fixes

## Changes made
- Kept the existing React/Vite folder and page structure.
- Updated the Firestore catalog migration to add missing product documents without overwriting existing cloud product records.
- Updated ShopContext to merge the default `src/data/products.js` catalog, locally saved products, and Firestore products by stable product ID. This prevents a partial Firestore catalog from replacing the full local catalog.
- Kept existing localStorage keys for products, cart, wishlist, orders, users, and analytics unchanged.
- Updated admin product filtering so it can filter by top-level categories and subcategories (for example Sarees, Bras, Camisoles, Footwear, and Watches).
- Made subcategory matching case-insensitive on Clothing, Innerwear, and Women Products pages.
- Added mobile-width safeguards for the storefront and Admin Dashboard, including horizontally scrollable admin tables/tabs and stacked filter controls.

## Important notes
- `src/data/products.js` remains the main built-in catalog.
- LocalStorage only synchronizes within one browser/device. Cross-device updates rely on the existing Firebase Firestore configuration and security rules.
- The project ZIP excludes `node_modules`, `dist`, and `.git`; run `npm install` before `npm run dev`.
- Keep `.env` private and restrict the Google Maps API key to the required APIs and website domains.

## Build validation
The source was reviewed, but a production build could not be completed in this environment because the uploaded Windows `node_modules` did not include the Linux Rolldown native binding required by the bundled Vite version. Reinstall dependencies on your development machine before building.
