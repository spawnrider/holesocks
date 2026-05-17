# HoleSocks – Demo E-Commerce Website

A playful, humorous e-commerce website for HoleSocks products built with **Next.js 16** and **TypeScript**.

🔗 **Live demo:** [https://holesocks.vercel.app/](https://holesocks.vercel.app/)

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev
# Visit http://localhost:3000

# Production build (static export)
npm run build

# Serve production build locally
npx serve out
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/             # React components (organized by feature)
│   ├── filters/           # Catalogue filtering components
│   ├── product/           # Product display components
│   ├── reviews/           # Review components
│   ├── kit/               # Cross-sell components
│   ├── layout/            # Header, footer, layout wrappers
│   └── ui/                # Reusable UI primitives
├── data/                  # Static JSON data (products, reviews)
├── types/                 # TypeScript interfaces
├── lib/                   # Utility functions and custom hooks
└── ...

public/
├── images/
│   └── products/          # Product photography
└── ...
```

## Technology Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Build:** Static export to `/out/` directory
- **Linting:** ESLint with Next.js config

## Features

1. **Home Page** – Browse products by skill level (1, 2, 3)
2. **Catalogue Page** – Filter products by level, color, style, size
3. **Product Detail** – Individual product page with hole gauge indicator
4. **Reviews** – Customer reviews with fictional submission form
5. **Cross-Sell** – "Bricoleur Kit" component showing related products

## Performance

- **Build Time:** < 2 seconds
- **Total Size:** < 1.0 MB (static)
- **Load Time:** < 2 seconds on salon network
- **Browser Support:** Chrome, Firefox, Edge, Safari

## Deployment

### Local
```bash
npm run build
npx serve out
```

### Vercel
```bash
git push origin main
# Vercel auto-deploys on push (zero-config)
```

## License

This is a demo project for TechReady.
