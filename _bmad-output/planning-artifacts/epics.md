---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation, step-05-implementation-complete]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
project: HoleSocks
user: Yohann
date: 2026-05-17
implementationDate: 2026-05-17
implementationStatus: COMPLETE
---

# HoleSocks - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en épics et stories pour HoleSocks, transformant les exigences du PRD et Architecture en stories implémentables par des agents développeurs.

## Requirements Inventory

### Exigences Fonctionnelles

**FR1:** Page d'accueil présentant le concept et les trois niveaux de chaussettes trouées

**FR2:** Navigation avec filtres : niveau de trou, couleur, style, taille

**FR3:** Fiches produit détaillées : nom, description décalée, photo, jauge de trou, avis clients

**FR4:** Section « Kit du Bricoleur » proposée en cross-sell sur chaque fiche produit

**FR5:** Section avis clients humoristiques, possibilité d'en ajouter fictivement

**FR6:** Ton décalé et humour omniprésent dans tous les textes et interactions

### Exigences Non Fonctionnelles

**NFR1:** Le site doit être fluide et réactif pendant toute la durée de la démo, même avec plusieurs visiteurs simultanés

**NFR2:** Aucun bug bloquant ne doit être rencontré sur les navigateurs modernes

**NFR3:** Temps de chargement initial < 2 secondes sur le réseau du salon

**NFR4:** L'interface doit être immédiatement compréhensible, sans formation

### Exigences Additionnelles (Architecture)

**ARCH1:** Starter : Next.js 16 + TypeScript + Tailwind CSS v4 avec `output: 'export'`

**ARCH2:** Données : JSON dans `src/data/` + interfaces TypeScript dans `src/types/product.ts`

**ARCH3:** État des filtres : `useState` local dans composant page catalogue

**ARCH4:** Avis : read-only depuis `src/data/reviews.json`, pas de persistance

**ARCH5:** Build : local `next build → npx serve out`, Vercel `git push` automatique

**ARCH6:** Structure : `src/app/`, `src/components/`, `src/data/`, `src/types/`, `src/lib/`

**ARCH7:** Patterns : nommage (PascalCase/camelCase/SCREAMING_SNAKE_CASE), feature folders, `@/` imports

### Exigences UX Design

**UX-DR1:** Tokens couleur — Charbon `#1C1A17`, Crème `#F4EFE3`, Acidulé `#D9E830`, Sauge `#7A9E7E`, Ambre `#D4A500`, Terra `#C44B28`, Gris `#6B6560` — définis dans `globals.css` comme variables CSS custom dans `@theme inline`

**UX-DR2:** Typographie — 3 familles uniquement : Bebas Neue (display/héros), DM Serif Display italic (éditorial), Syne 400/700 (UI/labels/boutons) — aucune exception ; chargées via `next/font/google`

**UX-DR3:** Espacement — base 8px, container max-width 1200px, padding horizontal 40px ; unités CSS : `rem` pour typo, `%`/`vw`/`vh` pour layouts, `px` uniquement pour borders et outlines

**UX-DR4:** Règles couleur — fond de page toujours Crème (jamais blanc pur), Acidulé uniquement en accent CTA (jamais fond pleine page), Charbon/Crème = combinaison de base ; inverse pour sections héros et footer

**UX-DR5:** `HoleGauge` — track neutre 8px, fill animé Framer Motion 800ms ease-out delay 200ms, couleurs par niveau : Sauge (1) / Ambre (2) / Terra (3) ; `role="progressbar"` + `aria-valuenow` + `aria-label` ; variants `size="sm"` (cartes) et `size="lg"` (fiche produit)

**UX-DR6:** `ProductCard` — hover `translateY(-4px)` + border Acidulé + shadow légère 200ms ease ; image ratio 4/3 via `next/image` fond Crème, trou centré ; `LevelBadge` en position absolue

**UX-DR7:** `LevelBadge` — Syne Bold 9px uppercase letterSpacing 0.14em ; niveau 1 : fond `#EEF5E0` texte `#3D6B41` label "Léger" ; niveau 2 : fond `#FFF3CD` texte `#7A5800` label "Aéré" ; niveau 3 : fond `#FDE8E2` texte `#8B2510` label "Catastrophe"

**UX-DR8:** `FilterChip/FilterPill` — pills rondes (`rounded-full`) ; inactive : `border border-charbon/30` fond transparent ; active : `bg-acidule text-charbon` ; Syne Bold 9px uppercase tracking-wider ; libellés décalés humour (ex: "Niveau d'existentialisme ↓")

**UX-DR9:** `KitBanner` / `BricoleurKit` — fond Charbon pleine largeur (`rounded`), titre Bebas Neue 32px+ texte Crème, cartes produit fond Crème avec hover translate, CTA "Adopter ce trou →" en Terra ; jamais de popup, toujours un bandeau ou section intégrée

**UX-DR10:** `Navbar` — sticky, hauteur 72px→52px transition 200ms ease ; fond transparent→Crème/95 backdrop-blur au scroll (`scrollY > 10px`) ; logo HOLESOCKS Bebas Neue, liens = 3 niveaux ; navigation plate sans hamburger ni mega-menu

**UX-DR11:** `HeroSection` — fond Charbon (`min-h-screen`), titre Bebas Neue ≥96px centré (`clamp(4rem,14vw,10rem)`), accroche DM Serif italic ; CTA principal fond Acidulé texte Charbon ; fade-up 800ms + parallax au scroll ; cercles décoratifs rotation lente ; `pt-[72px]` pour compenser navbar sticky

**UX-DR12:** Hiérarchie boutons — Primary : fond Charbon texte Crème Syne Bold 12px uppercase ; CTA accent : fond Acidulé texte Charbon hover→fond Charbon texte Crème ; Secondary : border Charbon 1.5px fond transparent ; Ghost : border Crème 1.5px (contexte sombre) ; jamais 2 Primary au même niveau hiérarchique

**UX-DR13:** WCAG AA cible — contrastes validés : Charbon/Crème 16.4:1 ✓ ; Charbon/Acidulé 8.2:1 ✓ ; Crème/Charbon 16.4:1 ✓ ; Crème/Terra 4.8:1 ✓

**UX-DR14:** Skip-to-content : premier élément DOM, visible au focus ; `<a href="#main-content">` en haut de layout

**UX-DR15:** Focus outline — Acidulé 2px offset 2px (fond clair) / Crème 2px offset 2px (fond sombre) ; suppression du outline navigateur natif remplacée par custom

**UX-DR16:** Landmarks sémantiques : `<main id="main-content">`, `<header>`, `<footer>`, `<nav aria-label="Navigation principale">`, `<section aria-label="...">` sur chaque section ; images décoratives `alt=""`

**UX-DR17:** Taille minimale cible 44×44px sur tous boutons et liens interactifs, espacement minimum 8px entre cibles adjacentes

**UX-DR18:** `prefers-reduced-motion` — translations et animations scroll désactivées ; transitions de couleur maintenues (non perturbatrices) ; hook custom `useReducedMotion()` appliqué sur toutes les animations Framer Motion

**UX-DR19:** Animations définies par élément : hover card 200ms ease, section fade-up 600ms ease-out, HoleGauge fill 800ms ease-out delay 200ms, Navbar compression 200ms ease, FilterPill activation 150ms ease, page transition fade 300ms ease

**UX-DR20:** Animations complexes (parallax, fade-up) réservées à la page d'accueil uniquement — catalogue et fiche produit épurés sans effets de scroll

**UX-DR21:** Breakpoints — Mobile `<560px` (1 col, navbar simplifiée, HoleGauge condensé), Tablet `560-900px` (2 col catalogue, hero réduit), Desktop `900-1280px` (3 col catalogue, layouts complets), Large `>1280px` (max-width 1280px centré)

**UX-DR22:** Grille catalogue responsive — 3 col (`lg:grid-cols-3`) → 2 col (`sm:grid-cols-2`) → 1 col ; fiche produit 2 colonnes desktop → stack vertical mobile

**UX-DR23:** Empty state catalogue (filtre sans résultat) — illustration SVG chaussette, titre Bebas Neue 40px "AUCUNE SURVIVANTE", sous-titre DM Serif italic "Ce niveau de filtre est redoutable.", CTA "Voir toute la collection" bg-acidule

**UX-DR24:** Micro-copies humour par action — ajout panier : "Ce trou est à vous. Officiellement." ; filtre actif : "N chaussettes vous attendent." ; avis envoyé : "Votre témoignage rejoindra les archives." ; page vide : "Aucune chaussette n'a survécu à ce filtre."

**UX-DR25:** Notifications — bandeau bas d'écran, fond Charbon texte Crème, 3s auto-dismiss, jamais de modal

**UX-DR26:** Formulaires — labels Syne Bold 10px uppercase au-dessus du champ, focus border Acidulé 2px, erreur border Terra + message DM Serif italic Terra sous le champ, succès checkmark SVG Sauge + copy décalée ; submit = bouton CTA accent, jamais disabled sur formulaires courts

## Requirements to Structure Mapping

| Exigence | Epic | Story |
|----------|------|-------|
| FR1 (home) | Epic 1 | 1.2 |
| FR2 (filtres) | Epic 2 | 2.1-2.3 |
| FR3 (fiches) | Epic 3 | 3.1-3.3 |
| FR4 (kit) | Epic 3 | 3.4 |
| FR5 (avis) | Epic 4 | 4.1-4.2 |
| FR6 (ton) | Epics 2-4 | All |
| NFR1-4 | Epic 1 | 1.1 |
| ARCH1-7 | All | All |
| UX-DR1-4 (tokens, typo, layout) | Epic 1 | 1.4 |
| UX-DR5-9 (composants visuels) | Epics 2-3 | 2.2, 3.1, 3.2, 3.4 |
| UX-DR10 (Navbar) | Epic 1 | 1.5 |
| UX-DR11 (HeroSection) | Epic 1 | 1.6 |
| UX-DR12 (hiérarchie boutons) | Epics 2-4 | All |
| UX-DR13-17 (accessibilité) | All | All |
| UX-DR18-20 (animations, motion) | Epics 1, 3 | 1.6, 3.2 |
| UX-DR21-22 (responsive) | All | All |
| UX-DR23-26 (copies, forms) | Epics 2, 4 | 2.3, 4.1-4.2 |

## Epic List

1. **Epic 1: Project Initialization & Foundation** — Init Next.js, structure, config, types, tokens, Navbar, Hero
2. **Epic 2: Filtering & Catalogue Navigation** — Filtres, page catalogue, logique filtrage + ton
3. **Epic 3: Product Detail & Cross-Sell** — Fiches produit, jauge, Kit du Bricoleur + ton
4. **Epic 4: Reviews & Testimonials** — Avis clients, ajout fictif + ton
5. **Epic 5: Build & Deployment** — Build statique, dual-deploy local/Vercel

---

## Epic 1: Project Initialization & Foundation

**Goal:** Initialiser le projet Next.js avec structure complète, configuration TypeScript/Tailwind, et types fondamentaux.

### Story 1.1: Initialize Next.js Project with Static Export Config

As a developer,
I want to initialize a Next.js 16 project with TypeScript, Tailwind CSS v4, and static export configuration,
So that the project is ready for component development and deployable both locally and on Vercel.

**Acceptance Criteria:**

**Given** I run `npx create-next-app@latest holesocks --typescript --tailwind --eslint --app --src-dir --no-turbo`
**When** the command completes
**Then** a fully configured Next.js project is created with TypeScript strict mode, Tailwind CSS v4, ESLint, App Router, `src/` directory, and no Turbopack

**And** when I edit `next.config.ts` and add `output: 'export'`
**Then** the build generates static files to `out/` directory

**And** when I run `npm run build` and then `npx serve out`
**Then** the site is accessible and loads in < 2s with optimized images

### Story 1.2: Create Complete Project Directory Structure

As a developer,
I want to create the complete directory structure matching the architectural design,
So that the project organization is clear and ready for development.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I create all required directories under `src/`:
  - `src/app/` (layout, page, catalogue/, produit/[id]/)
  - `src/components/` (layout/, product/, filters/, reviews/, kit/, ui/)
  - `src/data/` (products.json, reviews.json)
  - `src/types/` (product.ts)
  - `src/lib/` (utility functions)
**Then** all directories exist with README files explaining their purpose

**And** initial files exist: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx`, `.gitignore`, `README.md`

**And** `public/images/products/` directory is created for product photos

### Story 1.3: Define TypeScript Interfaces for Product Data

As a developer,
I want to define TypeScript interfaces for Product, Review, and FilterState,
So that all components use consistent, type-safe data structures.

**Acceptance Criteria:**

**Given** I create `src/types/product.ts`
**When** the file is complete
**Then** it exports interfaces: Product (with id, name, tagline, description, level 1|2|3, color, style, sizes, gaugeValue, imageUrl), Review (id, productId, author, rating, comment), FilterState (level, color, style, size all optional)

**And** all components import from `@/types/product.ts`

### Story 1.4: Configure Design Tokens, Typography and Global Styles

As a developer,
I want to set up all design tokens, Google Fonts, and global CSS styles,
So that the entire application uses the HoleSocks brand system consistently.

**Acceptance Criteria:**

**Given** I configure `src/app/globals.css`
**When** the file is complete
**Then** il définit les variables CSS custom dans `@theme inline` : couleurs (Charbon `#1C1A17`, Crème `#F4EFE3`, Acidulé `#D9E830`, Sauge `#7A9E7E`, Ambre `#D4A500`, Terra `#C44B28`, Gris `#6B6560`) et polices (`--font-display`, `--font-editorial`, `--font-ui`)

**And** les trois polices sont chargées dans `src/app/layout.tsx` via `next/font/google` : Bebas Neue, DM Serif Display (italic), Syne (400 + 700) avec variables CSS

**And** le body utilise `bg-creme text-charbon font-ui` comme base ; `prefers-reduced-motion` désactive les animations de translation

**And** les classes Tailwind personnalisées `font-display`, `font-editorial`, `font-ui` sont disponibles dans tous les composants

### Story 1.5: Create Navbar Component with Sticky Scroll Behaviour

As a visitor,
I want a sticky navigation bar that compresses on scroll,
So that the site is always navigable without losing screen real estate.

**Acceptance Criteria:**

**Given** I create `src/components/ui/Navbar.tsx`
**When** la page charge
**Then** la navbar est affichée en hauteur 72px, fond transparent, logo HOLESOCKS en Bebas Neue, liens vers les 3 niveaux

**And** quand `scrollY > 10px`
**Then** la hauteur passe à 52px et le fond devient `bg-creme/95 backdrop-blur-md`, transition 200ms ease

**And** le premier élément DOM du layout est un lien skip-to-content `<a href="#main-content">Aller au contenu</a>` visible uniquement au focus

**And** la navbar utilise `<nav aria-label="Navigation principale">` et tous les liens ont une taille cible ≥44px

### Story 1.6: Create Homepage with Hero Section and Brand Sections

As a visitor,
I want a compelling homepage that immediately communicates the HoleSocks concept,
So that I understand and smile within 5 seconds of arrival.

**Acceptance Criteria:**

**Given** je charge `src/app/page.tsx`
**When** la page s'affiche
**Then** le hero (`min-h-screen bg-charbon pt-[72px]`) montre le titre en Bebas Neue `clamp(4rem,14vw,10rem)` centré, une accroche DM Serif italic, et un CTA fond Acidulé texte Charbon vers `/catalogue`

**And** la section niveaux (fond Crème) présente les 3 niveaux Léger/Aéré/Catastrophe avec leurs couleurs sémantiques Sauge/Ambre/Terra

**And** une section manifeste (fond Charbon) utilise des numéros 01/02/03 en Acidulé pour les arguments décalés

**And** les animations fade-up sont conditionnées au hook `useReducedMotion()` — désactivées si `prefers-reduced-motion: reduce`

**And** chaque `<section>` dispose d'un `aria-label` descriptif et le contenu principal est dans `<main id="main-content">`

---

## Epic 2: Filtering & Catalogue Navigation

**Goal:** Créer page catalogue + filtres interactifs. Ton décalé dans tous les labels et messages.

### Story 2.1: Implement useFilters Hook for Local State Management

As a developer,
I want to create a `useFilters` hook managing filter state locally,
So that the catalogue page applies filters without external state management.

**Acceptance Criteria:**

**Given** I create `src/lib/useFilters.ts`
**When** the hook is used in the catalogue page
**Then** it returns `filters: FilterState`, `setFilter(key, value)`, `clearFilters()`, `applyFilters(products)` functions

**And** the hook uses only `useState`, no Redux/Zustand/Context

**And** filter logic correctly filters products by level, color, style, size

### Story 2.2: Create FilterBar and FilterChip Components

As a developer,
I want to create FilterBar and FilterChip UI components,
So that users can easily interact with and apply filters.

**Acceptance Criteria:**

**Given** I create `src/components/filters/FilterBar.tsx`
**When** the component renders
**Then** it displays Level filter (Léger/Aéré/Catastrophe + All), Color chips, Style options (orteil/talon/semelle + All), Size chips, and Clear Filters button with humorous label

**And** each filter calls `setFilter()` on click

**And** I create `src/components/filters/FilterChip.tsx` as reusable component with `onClick`, `label`, `isSelected` props using Tailwind CSS styling

### Story 2.3: Create Catalogue Page with Filter Integration

As a visitor,
I want to see a catalogue page that displays filtered products based on my selections,
So that I can easily explore products.

**Acceptance Criteria:**

**Given** I navigate to `/catalogue`
**When** the page loads
**Then** it displays FilterBar at top, ProductCard list below, page title "Sélectionnez vos chaussettes préférées"

**And** when I click a filter option
**Then** the product list updates in real-time without page reload

**And** URL optionally reflects filter state (`?level=1&color=red`) for shareability

**And** ProductCard components render with images, names, taglines, level indicators, and "View Details" link

---

## Epic 3: Product Detail & Cross-Sell

**Goal:** Créer fiches produits détaillées + jauge visuelle + Kit du Bricoleur. Ton décalé dans descriptions et UI.

### Story 3.1: Create ProductCard Component for Listing

As a developer,
I want to create a ProductCard component for product list views,
So that products display consistently across catalogue and home.

**Acceptance Criteria:**

**Given** I create `src/components/product/ProductCard.tsx`
**When** the component receives a Product object
**Then** it renders: optimized image via `next/image`, product name (bold), tagline (1-2 lines humorous), level indicator (1-3 stars/badge), "View Details" link to `/produit/[id]`, subtle shadow/hover effect

**And** styling uses Tailwind CSS with HoleSocks brand colors

### Story 3.2: Create HoleGauge Component (Visual Hole Level Indicator)

As a developer,
I want to create a HoleGauge component visually representing hole levels (1-3),
So that users immediately understand the severity/absurdity.

**Acceptance Criteria:**

**Given** I create `src/components/product/HoleGauge.tsx`
**When** the component receives `gaugeValue` (0-100) and `level` (1|2|3)
**Then** it renders a visual gauge bar: Level 1 = 33% light color, Level 2 = 66% medium color, Level 3 = 100% bright color

**And** includes labels "Léger", "Aéré", "Catastrophe"

**And** uses Tailwind CSS gradients or SVG for polished look

### Story 3.3: Create Product Detail Page with SSG (Static Generation)

As a visitor,
I want to see a detailed product page with description, gauges, and reviews,
So that I can make an (absurd) informed decision.

**Acceptance Criteria:**

**Given** I navigate to `/produit/le-philosophe` (valid product ID)
**When** the page loads
**Then** it displays: optimized image, name, tagline, humorous description (decaled tone), HoleGauge, size selector (buttons), ReviewList, Kit du Bricoleur section, back to Catalogue link

**And** page is statically generated via `generateStaticParams()` using product IDs from `src/data/products.json`

**And** all images/content load in < 2s on salon network

**And** invalid product IDs redirect to 404 page

### Story 3.4: Create BricoleurKit Cross-Sell Component

As a developer,
I want to create a "Kit du Bricoleur" cross-sell component,
So that visitors see a humorous upsell on each product detail page.

**Acceptance Criteria:**

**Given** I create `src/components/kit/BricoleurKit.tsx`
**When** the component renders on product detail page
**Then** it displays: section title "Kit du Bricoleur – Réparez vos chaussettes trouées !", list of 3-5 fictional tools (needle, thread, duct tape, "determination", etc.) with humorous descriptions, CTA button "Get the Kit" (non-functional), playful HoleSocks brand styling

**And** positioned below product reviews with decaled/humorous tone throughout

---

## Epic 4: Reviews & Testimonials

**Goal:** Afficher avis clients humoristiques + permettre ajout fictif immédiat. Ton décalé HoleSocks partout.

### Story 4.1: Create ReviewList and ReviewCard Components

As a developer,
I want to create ReviewList and ReviewCard components displaying product reviews,
So that visitors can read humorous testimonials.

**Acceptance Criteria:**

**Given** I create `src/components/reviews/ReviewList.tsx`
**When** the component receives `productId` and accesses `reviews.json`
**Then** it imports reviews statically, filters by `productId`, renders ReviewCard for each, displays "No reviews yet" message (humorous) if empty

**And** I create `src/components/reviews/ReviewCard.tsx` rendering: author name (fictional/humorous), star rating (1-5 visual), review comment (humorous/decaled tone), optional relative timestamp

**And** ReviewCard uses Tailwind CSS for clean, readable layout

### Story 4.2: Add Fictional Review Submission (Local Only, No Persistence)

As a visitor,
I want to add a fictional review without persistence,
So that I can play along with HoleSocks humor.

**Acceptance Criteria:**

**Given** I am on a product detail page
**When** I scroll to reviews section
**Then** I see "Add Your Review" form with: author name input, star rating selector (1-5), comment textarea

**And** when I click "Submit"
**Then** form validates all fields, new ReviewCard appears at top (ephemeral), disappears on page refresh (session-only storage), confirmation message displays "Merci pour votre avis fictif!"

**And** form uses `useState` only, maintains HoleSocks tone in validation/confirmation messages

---

## Epic 5: Build & Deployment

**Goal:** Configurer build statique + dual-deploy (local + Vercel).

### Story 5.1: Configure Static Build and Local Deployment

As a developer,
I want to configure static build and test local deployment,
So that the project runs on a demo station without a server.

**Acceptance Criteria:**

**Given** project has `output: 'export'` in `next.config.ts`
**When** I run `npm run build`
**Then** build completes without errors, all `.tsx` files statically generate to HTML, all images optimize to `out/` directory

**And** when I run `npx serve out`
**Then** site is accessible at `http://localhost:3000`, all pages load correctly (/catalogue, /produit/*, /), navigation works without 404s, images load optimally

**And** `out/` folder size is < 50MB (ideally < 20MB)

### Story 5.2: Set Up Vercel Deployment with Git Integration

As a developer,
I want to configure automatic Vercel deployment via Git push,
So that updates deploy seamlessly.

**Acceptance Criteria:**

**Given** project is in a Git repository
**When** I push main branch to GitHub/GitLab
**Then** Vercel detects push, builds automatically (no custom config needed), deploys to live URL (e.g., holesocks.vercel.app), includes all optimizations (image opt, caching headers)

**And** live site passes checks: all pages load in < 2s, no 404 errors, images render correctly, Tailwind CSS bundled

---

## Epic Prioritization & Sequencing

1. **Epic 1 (Foundation)** — Must complete first; unblocks all others
2. **Epic 2 (Filtering)** — Can start after Epic 1, many stories parallel
3. **Epic 3 (Product Detail)** — Can start after Epic 1, overlaps with Epic 2
4. **Epic 4 (Reviews)** — Can start after Epic 1, independent
5. **Epic 5 (Build & Deploy)** — Start after Epic 1 (basic), finalize after all features

**Note:** Brand Voice & Tone (ton décalé) embedded in Epics 2-4, not separate epic.

---

## Coverage Summary

✅ All 5 epics cover 6 FRs + 4 NFRs + 7 architectural requirements + 26 UX Design Requirements
✅ 15 stories total avec critères d'acceptation spécifiques
✅ Toutes les stories sont dimensionnées pour un agent développeur seul
✅ Brand Voice & Ton décalé embarqués dans Epics 2-4 comme préoccupation transversale
✅ Design tokens, typographie et styles globaux couverts par Story 1.4
✅ Navbar sticky + skip-to-content couverts par Story 1.5
✅ Homepage hero + sections couvertes par Story 1.6
✅ Accessibilité WCAG AA (contrastes, landmarks, ARIA, 44px targets) couverte dans toutes les stories
✅ Animations Framer Motion + prefers-reduced-motion couverts par Stories 1.6 et 3.2
✅ Responsive 3-breakpoints couvert dans toutes les stories de composants
✅ Toutes les exigences mappées explicitement sur des stories spécifiques
