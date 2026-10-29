# WOMEN NEEDS — React + Bootstrap Website

A complete dummy Indian women's lifestyle/boutique website.

## Pages
- Home
- Shop All
- Clothing
- Women Products
- Skincare
- Dress Materials
- Stitching
- Gallery
- About
- Contact

## Run
1. Install Node.js.
2. Extract the ZIP.
3. Open a terminal inside the project folder.
4. Run:
   npm install
   npm run dev

## Main files to edit

### Brand
`src/components/Navbar.jsx`
`src/components/Footer.jsx`

Change the dummy:
- Women Needs
- phone
- email
- address
- social links

### Products
`src/data/products.js`

Change:
- product names
- prices
- badges
- image URLs
- categories

### Gallery
`src/data/gallery.js`

There are exactly 10 gallery image references. Replace those URLs with your own images.

Recommended filenames if you want local images:
src/assets/gallery/gallery-1.jpg
...
src/assets/gallery/gallery-10.jpg

Then update the array to:
"/src/assets/gallery/gallery-1.jpg", etc.

### Logo
The current W circle is a dummy text logo. Replace the `.brand-mark` element in Navbar.jsx/Footer.jsx with your own image when ready.

## Design
Bootstrap is used for responsive layout and Bootstrap Icons are used throughout. Custom CSS provides the boutique styling, hover effects, animations, lightbox, typography and responsive behavior.

## Reference image sources
The demo uses Unsplash image URLs as visual references. Replace them with your own licensed/original product and brand photography before publishing commercially.
