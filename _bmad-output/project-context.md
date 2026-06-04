---
project_name: 'HoleSocks'
user_name: 'Yohann'
date: '2026-05-18'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'design_styling', 'testing_rules', 'naming_conventions', 'anti_patterns']
status: 'complete'
---

# Contexte Projet pour Agents IA — HoleSocks

_Ce fichier contient les règles critiques que les agents IA doivent respecter lors de l'implémentation du code. Focalisé sur les détails non évidents que les agents pourraient manquer._

---

## Stack Technologique & Versions

- **Next.js** 16.2.6 — App Router, `output: 'export'` (build statique pur)
- **React** 19.2.4
- **TypeScript** ^5 — strict mode activé (`"strict": true` dans tsconfig)
- **Tailwind CSS** ^4 — config via `@theme inline` dans `globals.css`, pas de `tailwind.config.ts`
- **Framer Motion** ^12.38.0
- **Playwright** ^1.60.0 — tests e2e uniquement
- **ESLint** ^9 avec `eslint-config-next` (core-web-vitals + typescript)
- **Polices** : Bebas Neue, DM Serif Display, Syne (via `next/font/google`)

## Règles TypeScript

- **Mode strict activé** — pas de `any` implicite ; utiliser `unknown` + type guards si nécessaire
- **Alias `@/`** pointe vers `src/` — utiliser systématiquement, jamais de chemins relatifs `../../`
- **Module resolution** : `"bundler"` dans tsconfig — ne pas utiliser `require()`
- **Import JSON statique uniquement** : `import { PRODUCTS } from '@/data/products'` (fichier `.ts` exportant un tableau typé, pas d'import `.json` brut)
- **Interfaces TypeScript** dans `src/types/product.ts` pour toutes les données produit — ne jamais redéfinir inline
- **Pas de `fetch()` runtime** — le projet est 100% statique, toutes les données viennent d'imports compilés
- **Order d'imports** : React → Next → libs tierces → composants internes (`@/`) → types → styles
- **`as const`** pour les configs fixes (ex: `LEVEL_CONFIG`)

## Règles Next.js / React

### Export Statique
- `output: 'export'` est **non négociable** — aucune feature nécessitant un serveur Node.js runtime (API routes, middleware, ISR, SSR) ne peut être utilisée
- `images.unoptimized: true` dans `next.config.ts` — utiliser le composant `<OptimizedImage>` (`@/components/ui/OptimizedImage`) qui wrape `next/image` adapté à l'export statique
- `generateStaticParams()` **obligatoire** sur `app/produit/[id]/page.tsx` pour les routes dynamiques

### App Router
- Pages dans `app/` : `page.tsx` (Server Component par défaut)
- Les composants nécessitant hooks/interactivité doivent être marqués `'use client'`
- Passer les données via props depuis Server Component vers Client Component (ex: `CataloguePage` → `CatalogueClient`)

### Gestion d'État
- **Pas de state global** (Zustand, Redux, Context) — filtres gérés via `useFilters` hook local uniquement
- `useState` uniquement pour état UI local dans les composants client

### Polices
- Variables CSS définies sur `<html>` dans `layout.tsx` : `--font-bebas`, `--font-dm-serif`, `--font-syne`
- Classes utilitaires Tailwind : `font-display` (Bebas), `font-editorial` (DM Serif), `font-ui` (Syne)
- Ne jamais hardcoder de `font-family` inline

## Règles de Design & Styling

### Palette de Couleurs (tokens Tailwind v4)
Définis dans `globals.css` via `@theme inline` — utiliser exclusivement ces classes :

| Token | Valeur | Usage |
|---|---|---|
| `charbon` | `#1C1A17` | Texte principal, bordures |
| `creme` | `#F4EFE3` | Fond page, fonds de cards |
| `acidule` | `#D9E830` | Accent primaire, CTA |
| `sauge` | `#7A9E7E` | Badge niveau 1 (Léger) |
| `ambre` | `#D4A500` | Badge niveau 2 (Aéré) |
| `terra` | `#C44B28` | Badge niveau 3 (Catastrophe), accents |
| `gris` | `#6B6560` | Texte secondaire, métadonnées |

### Hiérarchie Typographique
- `font-display` (Bebas Neue) — titres, badges, labels uppercase
- `font-editorial` (DM Serif) — taglines, citations, textes italiques
- `font-ui` (Syne) — corps de texte, navigation, boutons

### Conventions Tailwind
- **Pas de `tailwind.config.ts`** — toute personnalisation se fait dans `globals.css` via `@theme inline`
- **Pas de styles inline** — utiliser exclusivement les classes Tailwind
- `prefers-reduced-motion` géré globalement dans `globals.css` — ne pas dupliquer dans les composants

## Règles de Tests

### Stack de Tests
- **Playwright uniquement** — pas de Jest, Vitest ou tests unitaires configurés
- Tests dans `tests/e2e/` — organisation par page (`home.spec.ts`, `catalogue.spec.ts`, `product.spec.ts`)

### Environnement de Test
- Le serveur de test sert le **build statique** (`out/`) via `npx serve out --listen 3000`
- **Pré-requis avant les tests** : exécuter `next build` pour générer le dossier `out/`
- `webServer` dans `playwright.config.ts` gère le démarrage automatique du serveur
- `baseURL` : `http://localhost:3000`
- `workers: 1`, `fullyParallel: false` — les tests s'exécutent séquentiellement

### Configuration Playwright
- `timeout` global : 60 000 ms
- `actionTimeout` : 30 000 ms
- `expect.timeout` : 15 000 ms
- Navigateur : Chromium uniquement (Desktop Chrome)
- `retries: 2` en CI, `0` en local

## Conventions de Nommage & Organisation

### Fichiers & Composants
- **Composants React** : PascalCase (`ProductCard.tsx`, `HoleGauge.tsx`)
- **Pages App Router** : `page.tsx` dans dossier feature (`app/catalogue/page.tsx`)
- **Hooks** : camelCase préfixé `use` (`useFilters.ts`)
- **Types/Interfaces** : PascalCase sans préfixe `I` (`Product`, `Review`, `FilterState`)
- **Utilitaires** : camelCase (`filterProducts.ts`)
- **Constantes** : SCREAMING_SNAKE_CASE (`PRODUCTS`, `LEVEL_CONFIG`)

### Données
- Clés JSON en camelCase (cohérence TypeScript)
- IDs produit : chaînes kebab-case (`"le-philosophe"`, `"l-existentiel"`)
- `src/data/products.ts` — export nommé `PRODUCTS: Product[]`
- `src/data/reviews.ts` — avis clients
- `src/types/product.ts` — interfaces `Product`, `Review`, `FilterState`
- `public/images/` — images produit au format `.png`

### Organisation des Composants (par feature)
```
src/components/
  product/     # ProductCard, HoleGauge, ProductImage
  filters/     # FilterBar, FilterChip
  reviews/     # ReviewCard, ReviewList, ReviewForm, ReviewSection
  kit/         # BricoleurKit
  layout/      # Navbar, éléments de layout
  ui/          # OptimizedImage, composants réutilisables génériques
```

## Anti-patterns Critiques à Éviter

### ❌ Ne JAMAIS faire
- Utiliser `fetch()` ou toute requête réseau runtime — le projet est 100% statique
- Créer des API routes (`app/api/`) — incompatible avec `output: 'export'`
- Importer des fichiers `.json` bruts — utiliser les fichiers `.ts` dans `src/data/`
- Utiliser des chemins relatifs `../../` — toujours utiliser l'alias `@/`
- Installer un gestionnaire d'état global (Zustand, Redux, Jotai, Context API) sans validation architecturale
- Hardcoder des couleurs hex ou des noms de polices — utiliser les tokens Tailwind définis
- Créer un `tailwind.config.ts` — la config Tailwind se fait dans `globals.css` via `@theme inline`
- Ajouter des Server Actions, middleware Next.js, `next/headers` ou cookies — pas de runtime serveur

### ⚠️ Points de Vigilance
- **`generateStaticParams()`** : obligatoire pour toute route dynamique `[id]`, sinon le build échoue
- **Images** : toujours passer par `<OptimizedImage>` (`@/components/ui/OptimizedImage`), jamais `<img>` native ni `next/image` directement
- **`level`** dans `Product` : type union `1 | 2 | 3` — ne pas utiliser `number`
- **Ton décalé** : le contenu humoristique est dans les données (`tagline`, `description`) — ne pas l'encoder dans les composants
- **Déploiement** : `npm start` utilise `npx serve out`, pas `next start` — le dossier `out/` doit exister au préalable (`next build`)

---

_Dernière mise à jour : 2026-05-18_
