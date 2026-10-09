---
scope: Application holesocks/ (site vitrine statique Next.js)
purpose: build-substrate + référence Outline Technique
altitude: initiative
updated: 2026-10-09T00:29
---


- (event) BMA-17 : update headless brownfield de architecture.md (2026-05-17) contre le code au commit 2ee4436 ; pas de memlog antérieur, l'ancien document sert de source
- (constraint) Hors périmètre BMA-17 : aucune modification de code, aucune nouvelle décision ; toute décision manquante devient question ouverte
- (decision) AD-1 [ADOPTED] export statique pur : output export, pas d'API routes, middleware, SSR, ISR, Server Actions, fetch runtime ; images.unoptimized true. Empêche toute dépendance à un runtime Node
- (decision) AD-2 [ADOPTED] données = modules TypeScript typés src/data/products.ts (PRODUCTS) et reviews.ts (REVIEWS), types dans src/types/product.ts. Écart : l'ancien doc prévoyait des .json
- (decision) AD-3 [ADOPTED] frontière Server→Client : les pages (Server Components) importent les données et les passent en props aux composants client ; un composant client n'importe pas src/data
- (decision) AD-4 [ADOPTED] pas de state global ; état UI local (useState, hook useFilters). Avis ajoutés via ReviewForm = état local de ReviewSection, non persisté. Écart : l'ancien doc disait avis en lecture seule
- (decision) AD-5 [ADOPTED] images via OptimizedImage (ui/) ; exception existante <img> dans app/produit/[id]/page.tsx
- (decision) AD-6 [ADOPTED] design tokens Tailwind v4 dans globals.css @theme inline, pas de tailwind.config.ts, polices next/font/google
- (decision) AD-7 [ADOPTED] tests = Playwright e2e contre le build statique out/ servi par serve ; sélecteurs accessibles ; un spec par page. Écart : l'ancien doc reportait les tests
- (version) next 16.2.6, react 19.2.4, typescript ^5, tailwindcss ^4, framer-motion ^12.38.0, @playwright/test ^1.60.0, eslint ^9 — lus dans holesocks/package.json, non revérifiés sur le web (description du réel)
- (assumption) Aucune initiative BMAD active : spine écrit à l'emplacement existant planning-artifacts/architecture.md (headless loose)
- (question) Q1 liens Navbar /catalogue?level=N ignorés par le catalogue : honorer (useSearchParams + Suspense) ou retirer le paramètre ?
- (question) Q2 ProductDetailClient non utilisé par la route produit : supprimer ou réutiliser ?
- (question) Q3 hébergement cible non configuré (Vercel cité, rien dans le dépôt) : lequel ?
- (question) Q4 CI absente : en mettre une (recommandée par BMA-13 avant tout chantier e-commerce) ?
- (question) Q5 panier/paiement (BMA-13) : options A/B gardent AD-1, option C le casse et impose une révision d'architecture validée par le board
- (question) Q6 script npm export obsolète et types Product.color/style en string libre : nettoyer ?
- (event) Reviewer gate : lint_spine OK ; relecture reality-check (4 imprécisions corrigées : dépendances composants, BricoleurKit serveur, fallback <img> d'OptimizedImage, arborescence) ; relecture adverse (6 trous : 3 resserrés par description du code, 3 en questions ouvertes)
- (question) Q7 correspondance niveau → libellé/couleur recopiée dans 6 fichiers : source unique ?
- (question) Q8 compteur d'avis calculé au build vs liste client : qui porte les chiffres dérivés ?
- (question) Q9 aucun état de pointure sélectionnée : qui la portera avec le panier ?
- (event) spine finalized (update BMA-17, vérifié contre 2ee4436)
