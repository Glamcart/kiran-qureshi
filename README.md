# Veloura Beauty — Premium Cosmetics & Skincare E-Commerce Website

An upscale beauty and cosmetics online storefront designed with a refined feminine editorial aesthetic, blush-pink palettes, rich berry accents, warm cream backgrounds, and champagne details.

---

## 🌟 Features Included

- **Editorial Beauty Hero:** Full-width campaign composition with responsive model photography, custom typography, and direct CTA routes.
- **Three Promotional Cards:** New Arrivals, Bestsellers, and Beauty Offers with hover micro-interactions.
- **Shop by Category:** 7 circular isolated categories (Face, Lips, Eyes, Skincare, Brushes, Fragrance, Beauty Tools).
- **Featured Beauty Finds:** 5-column desktop product grid with live stock badges, quick-view modal, and direct add to bag.
- **Complete Shopping Bag Drawer:** Slide-over bag with free shipping progress bar toward $59, quantity steppers, discount promo code (`VELOURA10`), and subtotal calculations.
- **Persistent Wishlist:** Add/remove items with local storage persistence and "Move to Bag" actions.
- **Product Detail Pages (PDP):** Image zoom, shade selector swatches, ingredient transparency, usage rituals, and related product recommendations.
- **The Beauty Edit Magazine:** Editorial stories on clean skincare routines, Parisienne makeup, and finding signature shades.
- **Concierge & FAQ:** Client inquiry form, studio address, customer care hours, and interactive FAQ accordion.
- **Demo Checkout & Account Portals:** Transparent, client-ready checkout and member demonstration flows.
- **100% Hostinger Ready:** Includes automatic `.htaccess` rewrite rule and pre-configured Vite build pipeline.

---

## 🚀 Local Development

To run the application locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 How to Deploy to Hostinger

This project is tailored specifically for **Hostinger Shared Hosting**, **Cloud Hosting**, or **Hostinger Static Web Hosting**.

### Step 1: Compile the Production Build
Run the build script in your terminal:
```bash
npm run build
```
This will compile all TypeScript code, bundle Tailwind CSS styles, copy static assets, and generate a self-contained production folder in `/dist`.

### Step 2: Upload Files to Hostinger `public_html`
1. Log into your **Hostinger Account** and access **hPanel**.
2. Go to **Websites** > choose your domain > **File Manager**.
3. Open the `public_html/` root folder.
4. Upload all files and folders located inside the local `dist/` directory directly into `public_html/`.
   - `index.html`
   - `assets/` (containing CSS, JS bundles, and optimized images)
   - `.htaccess` (pre-configured for React SPA routing)
   - `robots.txt`

### Step 3: Verify `.htaccess` for Single-Page Routing
The included `public/.htaccess` automatically gets copied into `dist/`. If you need to edit or recreate it manually on Hostinger:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 4: Enable Free SSL in Hostinger
1. In hPanel, navigate to **Security** > **SSL**.
2. Click **Install SSL** (Hostinger provides a free lifetime Let's Encrypt certificate).
3. Toggle **Force HTTPS** on.

Your Veloura Beauty storefront is now live!
