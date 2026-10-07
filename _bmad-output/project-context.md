---
project_name: 'HoleSocks'
user_name: 'Yohann'
date: '2026-10-07'
verified_against: '7ef806c'
sections_completed: ['technology_stack', 'repo_structure', 'commands_ci', 'language_rules', 'framework_rules', 'design_styling', 'testing_rules', 'naming_conventions', 'anti_patterns', 'fragile_areas', 'external_integrations']
status: 'complete'
---

# Contexte Projet pour Agents IA — HoleSocks

_Ce fichier contient les règles critiques que les agents IA doivent respecter lors de l'implémentation du code. Focalisé sur les détails non évidents que les agents pourraient manquer._

---

## Structure du Dépôt

Monorepo léger : l'application est dans le sous-dossier `holesocks/`, **pas** à la racine. Toutes les commandes npm se lancent depuis `holesocks/`.

```
/                      # racine Git
  _bmad/               # installation BMAD (outillage, ne pas modifier à la main)
  _bmad-output/        # artefacts BMAD (ce fichier, planning, implémentation)
  docs/                # design.md, pre-brief.md, demo.md (références produit/design)
  slides/              # présentation (hors application)
  holesocks/           # application Next.js
    src/app/           # routes App Router
    src/components/    # composants par feature
    src/data/          # données statiques typées (.ts)
    src/lib/           # hooks (useFilters)
    src/types/         # interfaces (product.ts)
    public/images/     # images produit .png
    tests/e2e/         # specs Playwright
```

### Routes existantes (`holesocks/src/app/`)
| Route | Fichier | Type |
|---|---|---|
| `/` | `app/page.tsx` | Server Component (hero, niveaux, section manifeste, CTA) |
| `/catalogue` | `app/catalogue/page.tsx` → `CatalogueClient` | Server → Client |
| `/produit/[id]` | `app/produit/[id]/page.tsx` | Server Component async + `generateStaticParams()` |

- `app/layout.tsx` pose les polices, le lien d'évitement « Aller au contenu principal », la `<Navbar />` (fixe) et `<main id="main-content">` — une nouvelle page ne les redéclare pas.
- **Ajouter une route statique** (ex. `/manifeste`) = créer `app/<route>/page.tsx` en Server Component, default export, avec `export const metadata` si titre/description propres. Aucune config à toucher : `output: 'export'` génère `out/<route>.html`.
- Les liens internes utilisent `next/link` (`<Link href="/catalogue">`).

## Commandes & CI

Depuis `holesocks/` :

| Besoin | Commande |
|---|---|
| Installer | `npm ci` (lockfile `package-lock.json` versionné) |
| Dev | `npm run dev` |
| Build statique | `npm run build` → produit `out/` |
| Lint | `npm run lint` (ESLint 9 flat config, `eslint.config.mjs`) |
| Tests e2e | `npm run build && npm run test:e2e` |
| Rapport Playwright | `npm run test:e2e:report` |

- **Pas de CI** : aucun `.github/workflows/` ni autre pipeline. La vérification se fait en local : lint + build + e2e. `forbidOnly` et `retries: 2` ne s'activent que si `CI` est défini.
- **Pas de script `typecheck`** : `next build` fait la vérification TypeScript ; `npx tsc --noEmit` pour la lancer seule.
- `npm run export` (`next export`) est **obsolète** — la commande n'existe plus depuis Next 14 ; l'export se fait via `output: 'export'` dans `next build`. Ne pas l'utiliser.
- `test-build.mjs` est un script de diagnostic ad hoc (vérifie `out/produit/le-philosophe.html`), pas un test.
- Premier lancement Playwright sur une machine neuve : `npx playwright install chromium`.

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
- **Node** : aucune version épinglée (`engines`, `.nvmrc` absents) ; Next 16 exige Node ≥ 20.9

## Règles TypeScript

- **Mode strict activé** — pas de `any` implicite ; utiliser `unknown` + type guards si nécessaire
- **Alias `@/`** pointe vers `src/` — utiliser systématiquement, jamais de chemins relatifs `../../`
- **Module resolution** : `"bundler"` dans tsconfig — ne pas utiliser `require()`
- **Import JSON statique uniquement** : `import { PRODUCTS } from '@/data/products'` (fichier `.ts` exportant un tableau typé, pas d'import `.json` brut)
- **Interfaces TypeScript** dans `src/types/product.ts` pour toutes les données produit — ne jamais redéfinir inline
- **Pas de `fetch()` runtime** — le projet est 100% statique, toutes les données viennent d'imports compilés
- **Guillemets doubles** et `"use client"` en première ligne — style du code existant
- **Composants** : export nommé (`export function Navbar()`) ; **pages/layouts** : `export default function`
- **Order d'imports** : React → Next → libs tierces → composants internes (`@/`) → types → styles
- **`as const`** pour les configs fixes (ex: `LEVEL_CONFIG`)

## Règles Next.js / React

### Export Statique
- `output: 'export'` est **non négociable** — aucune feature nécessitant un serveur Node.js runtime (API routes, middleware, ISR, SSR) ne peut être utilisée
- `images.unoptimized: true` dans `next.config.ts` — utiliser le composant `<OptimizedImage>` (`@/components/ui/OptimizedImage`) qui wrape `next/image` adapté à l'export statique (utilisé par `ProductCard`, `BricoleurKit`, `ProductDetailClient`)
- `generateStaticParams()` **obligatoire** sur `app/produit/[id]/page.tsx` pour les routes dynamiques

### App Router
- Pages dans `app/` : `page.tsx` (Server Component par défaut)
- Les composants nécessitant hooks/interactivité doivent être marqués `'use client'`
- Passer les données via props depuis Server Component vers Client Component (ex: `CataloguePage` → `CatalogueClient`)
- Composants client actuels : `Navbar`, `CatalogueClient`, `HoleGauge` (Framer Motion), `ReviewSection`, `ReviewForm`, `OptimizedImage`, `ProductDetailClient`. Une page de contenu purement éditorial n'a pas besoin de `"use client"`
- `params` est une `Promise` en Next 16 : `const { id } = await params` (voir `app/produit/[id]/page.tsx`)

### Gestion d'État
- **Pas de state global** (Zustand, Redux, Context) — filtres gérés via `useFilters` hook local uniquement
- `useState` uniquement pour état UI local dans les composants client

### Polices
- Variables CSS définies sur `<html>` dans `layout.tsx` : `--font-bebas`, `--font-dm-serif`, `--font-syne`
- Classes utilitaires Tailwind : `font-display` (Bebas), `font-editorial` (DM Serif), `font-ui` (Syne)
- Ne jamais hardcoder de `font-family` inline
- Le `body` utilise Syne par défaut (`globals.css`), mais le code existant pose quand même `font-ui` explicitement sur les textes d'interface

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
- Opacités via suffixe Tailwind sur les tokens : `text-creme/70`, `border-charbon/10`, `bg-creme/95`

### Patrons de mise en page récurrents
- **Navbar fixe** (72 px, 52 px au scroll) : chaque page commence par `pt-[72px]` sur son conteneur racine, sinon le contenu passe sous la navbar
- Conteneur : `max-w-[1280px] mx-auto px-6` ; sections : `py-24 px-6`
- Sections alternées clair/sombre : `bg-creme` (texte `charbon`) / `bg-charbon` (texte `creme`, accents `acidule`)
- Titres : `font-display ... tracking-wide` en MAJUSCULES ; sous-titres : `font-editorial italic text-gris`
- CTA primaire : `bg-acidule text-charbon font-ui font-bold text-sm uppercase tracking-wider rounded min-h-[52px]` ; secondaire : `border border-creme/30 text-creme` (sur fond sombre)
- Sections porteuses de sens : `<section aria-label="...">` — les tests ciblent `getByRole("region", { name })`
- Contenu humoristique en français, ton décalé (cf. `docs/design.md`)

## Règles de Tests

### Stack de Tests
- **Playwright uniquement** — pas de Jest, Vitest ou tests unitaires configurés
- Tests dans `holesocks/tests/e2e/` — un fichier par page (`home.spec.ts`, `catalogue.spec.ts`, `product.spec.ts`) ; une nouvelle page = un nouveau `<page>.spec.ts`
- Style : `test.describe("<Page>")`, intitulés de tests en français, `page.goto("/route")` en `beforeEach`
- Sélecteurs accessibles uniquement : `getByRole` (heading, link, region, navigation) et `getByText` ; pas de `data-testid` ni de sélecteur CSS
- Navigation vérifiée par `await expect(page).toHaveURL("/route")`

### Environnement de Test
- Le serveur de test sert le **build statique** (`out/`) via `npx serve out --listen 3000`
- **Pré-requis avant les tests** : exécuter `next build` pour générer le dossier `out/` — sinon les tests tournent contre un `out/` périmé ou échouent (une nouvelle route n'existe pas tant qu'on n'a pas rebuildé)
- `reuseExistingServer` hors CI : un `serve` déjà lancé sur le port 3000 est réutilisé tel quel
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
- **Utilitaires** : camelCase (logique de filtre actuellement dans `src/lib/useFilters.ts`)
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
  catalogue/   # CatalogueClient
  product/     # ProductCard, HoleGauge, ProductDetailClient
  filters/     # FilterBar, FilterChip
  reviews/     # ReviewCard, ReviewList, ReviewForm, ReviewSection
  kit/         # BricoleurKit
  ui/          # Navbar, OptimizedImage
```
- Pas de dossier `layout/` malgré `src/components/README.md` : la `Navbar` est dans `ui/`
- Les fichiers `README.md` de `src/*/` décrivent l'intention initiale ; le code fait foi en cas d'écart

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
- **Images** : toujours passer par `<OptimizedImage>` (`@/components/ui/OptimizedImage`), jamais `<img>` native ni `next/image` directement — exception existante non conforme : `app/produit/[id]/page.tsx` utilise `<img>` ; ne pas la recopier
- **`level`** dans `Product` : type union `1 | 2 | 3` — ne pas utiliser `number`
- **Ton décalé** : le contenu humoristique est dans les données (`tagline`, `description`) — ne pas l'encoder dans les composants
- **Déploiement** : `npm start` utilise `npx serve out`, pas `next start` — le dossier `out/` doit exister au préalable (`next build`)

## Zones Fragiles

- **Bouton « Notre manifeste »** (`app/page.tsx`, hero) pointe aujourd'hui vers `/catalogue` ; la section `aria-label="Manifeste"` de l'accueil (3 piliers) est testée par `home.spec.ts` (« affiche la section manifeste avec les 3 piliers ») — la conserver si une page `/manifeste` est ajoutée
- **Liens de niveau de la Navbar** (`/catalogue?level=N`) : le catalogue **ignore** le paramètre (`useFilters` ne lit pas l'URL ; pas de `useSearchParams`). Le test vérifie seulement l'URL. Lire l'URL côté client imposerait un `<Suspense>` en export statique
- **Page produit** : rendue en Server Component direct (commentaire dans le fichier) pour que le SSG fonctionne ; `ProductDetailClient` existe mais n'est pas utilisé par la route
- **Avis** (`ReviewForm`/`ReviewSection`) : état local seulement, rien n'est persisté
- `useFilters.setFilter` est typé `value: any` (dette TS existante)
- Ajouter un produit = ajouter l'entrée dans `src/data/products.ts` **et** l'image `public/images/<id>.png`

## Intégrations Externes

- **Aucune au runtime** : pas d'API, pas de backend, pas d'analytics, pas de variables d'environnement
- **Google Fonts** via `next/font/google` : téléchargées **au build** (réseau requis pendant `next build`)
- **Déploiement** : non configuré dans le dépôt (seul `.vercel` est ignoré) ; tout hébergeur statique servant `out/` convient

---

_Dernière mise à jour : 2026-10-07 (vérifié contre `7ef806c`, refresh BMA-4)_
