# FutureShop

FutureShop is a modern e-commerce storefront built with Next.js and Tailwind CSS. It combines a polished shopping experience with an admin dashboard prototype and lightweight local data persistence for products and orders.

## Project Idea

This project showcases a premium online store for curated tech, apparel, audio, home, and sport products.

Key experience areas include:

- Product browsing and discovery with categories, trending items, and new arrivals.
- Search, filter, and sort functionality for product listings.
- Product cards with rating, pricing, badges, and quick add-to-cart.
- Cart drawer experience using React context.
- Wishlist and account navigation flows.
- Checkout page and order submission backed by a local JSON data file.
- Admin dashboard and management pages for products, orders, customers, and site settings.

## Features

- Responsive storefront design with a dark premium visual style.
- Home page with hero slider, marquee, featured collections, and banners.
- Category-based shopping, search, and sorting options.
- Product detail and cart interactions.
- Client-side cart state using `CartContext`.
- Local data storage in `data.json` seeded from `lib/db.ts`.
- API routes for products, orders, wishlist, and admin stats.
- Admin pages under `app/admin` for overview, customers, orders, products, and settings.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Local JSON data persistence

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the production app.
- `npm run start` - Start the production server.
- `npm run lint` - Run ESLint.

## Project Structure

- `app/` - Main application pages and routes.
  - `app/page.tsx` - Home page.
  - `app/products/` - Product listing and filtering.
  - `app/wishlist/`, `app/cart/`, `app/checkout/`, `app/account/` - shopping flows.
  - `app/admin/` - Dashboard and admin sections.
- `components/` - UI components like `Navbar`, `ProductCard`, `HeroSlider`, `CartDrawer`, and filters.
- `context/CartContext.tsx` - Cart management state.
- `lib/db.ts` - Data helpers for products and orders.
- `lib/types.ts` - Shared TypeScript interfaces.
- `data.json` - Local seed data file for products and orders.

## Notes

This repository is built as a demo storefront and admin experience rather than a fully production-ready shop. It is a strong base for learning Next.js app routing, server/client components, and state management across a shopping experience.

It is also being used to learn and work with Playwright tests, GitHub Actions for CI/CD, and Docker for containerized workflows.
