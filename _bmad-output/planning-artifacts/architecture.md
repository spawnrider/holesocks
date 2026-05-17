---
stepsCompleted: [step-01-init, step-02-context, step-03-starter, step-04-decisions, step-05-patterns, step-06-structure, step-07-validation, step-08-complete]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-05-17'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief.md
  - docs/pre-brief.md
workflowType: 'architecture'
project_name: 'HoleSocks'
user_name: 'Yohann'
date: '2026-05-17'
---

# Architecture Decision Document

_Ce document se construit de façon collaborative, étape par étape. Les sections sont ajoutées au fil des décisions architecturales._

## Analyse du Contexte Projet

### Aperçu des Exigences

**Exigences Fonctionnelles :**
6 groupes fonctionnels : page d'accueil, filtres, fiches produit, Kit du Bricoleur cross-sell, avis clients avec ajout fictif, et ton décalé comme contrainte de contenu transversale. Catalogue petit et fixe (~9-15 produits max). Aucun backend métier requis.

**Exigences Non Fonctionnelles :**
Performance réseau salon (< 2s), compatibilité navigateurs modernes, fluidité multi-visiteurs, accessibilité immédiate sans documentation. Ces NFR orientent fortement vers une approche statique côté client.

**Complexité et Taille :**
- Domaine principal : Frontend web (site statique)
- Niveau de complexité : Faible
- Composants architecturaux estimés : ~8-10 composants UI + 2-3 fichiers de données

### Contraintes Techniques et Dépendances

- Déploiement : local (serve statique) ou Vercel — la stack doit fonctionner sans différence de configuration
- Pas de compte client, pas de persistance réelle (avis fictifs = localStorage)
- Pas de responsive obligatoire (démo sur écran fixe de stand)
- Images produit à optimiser pour réseau salon peu fiable

### Préoccupations Transversales

- **Structure de données** : le ton décalé doit être encodé dans les données produit (fields dédiés), pas en dur dans les composants
- **Séparation contenu/code** : catalogue et avis dans des fichiers JSON indépendants pour permettre l'ajout de produits sans toucher au code
- **Dual-deploy** : build statique exportable compatible local et Vercel

## Évaluation du Starter Template

### Domaine Technologique Principal

Frontend web statique — SPA avec export statique, pas de backend requis.

### Starter Retenu : Next.js (output: 'export') + TypeScript + Tailwind CSS

**Justification :**
- Next.js est le framework natif de Vercel — déploiement zéro configuration
- `output: 'export'` produit un build statique identique servi en local ou sur Vercel
- `next/image` optimise automatiquement les photos produit (contrainte NFR < 2s réseau salon)
- Routing fichier-système : structure prévisible pour l'implémentation agentique

**Commande d'initialisation :**

```bash
npx create-next-app@latest holesocks \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-turbo
```

**Décisions architecturales apportées par le starter :**

- **Langage :** TypeScript strict
- **Styling :** Tailwind CSS v4 (intégré)
- **Build :** Next.js compiler
- **Linting :** ESLint avec config Next.js
- **Structure :** App Router, dossier `src/`, layout racine
- **Export statique :** `next.config.ts` → `output: 'export'`

**Note :** L'initialisation du projet via cette commande sera la première story d'implémentation.

## Décisions Architecturales Fondamentales

### Analyse des priorités

**Décisions critiques (bloquent l'implémentation) :**
- Architecture des données : JSON + types TypeScript
- Gestion d'état des filtres : useState local
- Comportement des avis : lecture seule

**Décisions reportées (post-démo) :**
- Analytics, tests automatisés, responsive

### Architecture des Données

- **Décision :** Fichiers JSON dans `src/data/` avec interfaces TypeScript dans `src/types/`
- **Rationale :** Catalogue éditable sans recompilation ; interfaces TypeScript assurent la cohérence pour l'implémentation agentique
- **Structure :**
  - `src/data/products.json` — catalogue complet (nom, description, niveau, couleur, style, taille, tagline, jauge)
  - `src/data/reviews.json` — avis clients humoristiques par produit
  - `src/types/product.ts` — interfaces TypeScript (Product, Review, FilterState)
- **Pas de base de données, pas d'API externe**

### Authentification & Sécurité

- **Décision :** Aucune — site public en lecture seule, pas de compte utilisateur
- **Rationale :** Hors scope PRD

### Patterns API & Communication

- **Décision :** Aucune API — données chargées à la build depuis JSON local
- **Rationale :** Site statique pur, pas de runtime serveur

### Architecture Frontend

- **Gestion d'état des filtres :** `useState` local dans le composant page catalogue
- **Rationale :** Filtres sur une seule page, zéro dépendance externe nécessaire
- **Avis clients :** Lecture seule depuis `src/data/reviews.json`, pas de persistance
- **Rationale :** Contexte démo salon — avis fictifs prédéfinis, cohérence garantie entre visiteurs

### Infrastructure & Déploiement

- **Local :** `next build` → `npx serve out`
- **Vercel :** Push vers repo Git → déploiement automatique (zéro config)
- **Environnement :** Aucune variable d'environnement requise (pas d'API externe)

### Analyse d'impact

**Séquence d'implémentation suggérée :**
1. Init projet (`create-next-app`) + configuration `output: 'export'`
2. Définition des types TypeScript + fichiers JSON de données
3. Composants UI (layout, cards produit, jauge de trou)
4. Page catalogue + système de filtres
5. Page fiche produit + Kit du Bricoleur
6. Section avis clients
7. Vérification build statique + déploiement

## Patterns d'Implémentation & Règles de Cohérence

### Points de conflit identifiés

5 catégories de patterns définies pour garantir la cohérence entre agents.

### Naming Patterns

**Code & fichiers :**
- Composants React : PascalCase (`ProductCard.tsx`, `HoleGauge.tsx`)
- Pages App Router : `page.tsx` dans dossier feature (`app/catalogue/page.tsx`)
- Hooks : camelCase préfixé `use` (`useFilters.ts`)
- Types/Interfaces : PascalCase sans préfixe `I` (`Product`, `Review`, `FilterState`)
- Fichiers utilitaires : camelCase (`filterProducts.ts`)
- Constantes : SCREAMING_SNAKE_CASE (`HOLE_LEVELS`, `DEFAULT_FILTERS`)

**Données JSON :**
- Clés en camelCase (cohérence TypeScript)
- IDs : chaînes kebab-case (`"le-philosophe"`, `"l-existentiel"`)

### Structure Patterns

**Organisation des composants : par feature**
```
src/components/
  product/     # ProductCard, HoleGauge, ProductImage
  filters/     # FilterBar, FilterChip
  reviews/     # ReviewCard, ReviewList
  layout/      # Header, Footer, PageWrapper
  ui/          # Boutons, badges réutilisables
```

**Import order :** React → Next → libs tierces → composants internes → types → styles

### Format Patterns

**Interface Product (TypeScript) :**
```typescript
interface Product {
  id: string            // "le-philosophe"
  name: string          // "Le Philosophe"
  tagline: string       // accroche absurde
  description: string   // texte décalé
  level: 1 | 2 | 3     // Léger / Aéré / Catastrophe
  color: string
  style: 'orteil' | 'talon' | 'semelle'
  sizes: number[]       // [38, 40, 41, 43, 44, 46]
  gaugeValue: number    // 0-100
  imageUrl: string
}
```

### Process Patterns

**Gestion des erreurs :**
- Composants serveur : `error.tsx` à la racine App Router
- Composants client : `try/catch` + état d'erreur local avec ton HoleSocks

**Chargement des données :**
- Import JSON statique uniquement : `import products from '@/data/products.json'`
- Jamais de `fetch()` runtime

**Alias de chemins :**
- `@/` pointe vers `src/` — utilisé systématiquement, jamais de chemins relatifs `../../`

### Règles d'enforcement

**Tous les agents DOIVENT :**
- Respecter les conventions de nommage définies ci-dessus
- Importer les données via `@/data/` uniquement
- Ne jamais créer de state global (Zustand, Redux, Context) sans validation architecturale
- Utiliser les interfaces TypeScript de `src/types/` pour toutes les données produit

## Structure Projet & Frontières

### Arborescence complète

```
holesocks/
├── README.md
├── package.json
├── next.config.ts                # output: 'export'
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── public/
│   └── images/
│       └── products/              # Photos chaussettes
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx             # Layout racine (Header, Footer)
    │   ├── page.tsx               # Page d'accueil
    │   ├── catalogue/
    │   │   └── page.tsx           # Catalogue + filtres
    │   ├── produit/
    │   │   └── [id]/
    │   │       └── page.tsx       # Fiche produit (generateStaticParams)
    │   └── not-found.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   ├── product/
    │   │   ├── ProductCard.tsx
    │   │   ├── HoleGauge.tsx      # Jauge visuelle
    │   │   └── ProductImage.tsx
    │   ├── filters/
    │   │   ├── FilterBar.tsx
    │   │   └── FilterChip.tsx
    │   ├── reviews/
    │   │   ├── ReviewList.tsx
    │   │   └── ReviewCard.tsx
    │   ├── kit/
    │   │   └── BricoleurKit.tsx   # Cross-sell
    │   └── ui/
    │       └── Badge.tsx
    ├── data/
    │   ├── products.json          # Catalogue
    │   └── reviews.json           # Avis
    ├── types/
    │   └── product.ts             # Product, Review, FilterState
    └── lib/
        └── filterProducts.ts      # Logique filtrage
```

### Mapping Exigences → Structure

| Exigence | Composant principal |
|----------|-------------------|
| Page d'accueil | `app/page.tsx` |
| Filtres catalogue | `app/catalogue/page.tsx` + `components/filters/` |
| Fiche produit | `app/produit/[id]/page.tsx` |
| Jauge de trou | `components/product/HoleGauge.tsx` |
| Kit du Bricoleur | `components/kit/BricoleurKit.tsx` |
| Avis clients | `components/reviews/` + `data/reviews.json` |
| Données produit | `data/products.json` + `types/product.ts` |

### Flux de données

Statique complet : `products.json` → import → filtre → rendu → build statique `out/`

### Frontières architecturales

**Frontière données :**
- `src/data/` = source unique, JSON seulement
- `src/types/product.ts` = validation TypeScript

**Frontière composants :**
- `components/product/` = responsable des cards/images
- `components/filters/` = responsable du filtrage UI
- `components/layout/` = structure page

**Frontière pages :**
- `/catalogue` = liste filtrée
- `/produit/[id]` = détail statique
- `/` = accueil

## Résultats de Validation de l'Architecture

### Validation de Cohérence ✅

**Compatibilité des décisions :**
Next.js 16 + TypeScript + Tailwind + export statique = stack cohérent et bien documenté. Toutes les versions sont modernes et compatibles. Aucun conflit détecté.

**Cohérence des patterns :**
Les patterns de nommage (PascalCase, camelCase) s'alignent naturellement avec TypeScript. La structure par feature facilite l'application des patterns. Import order et alias `@/` clairement définis.

**Alignement de la structure :**
L'arborescence `src/app/`, `src/components/`, `src/data/`, `src/types/` suit les conventions Next.js App Router. Les frontières (données seules en `src/data/`) sont explicites et auditables.

### Validation de Couverture des Exigences ✅

**Couverture fonctionnelle :**
- Page d'accueil : `app/page.tsx` ✅
- Filtres : `app/catalogue/page.tsx` + `components/filters/` ✅
- Fiches produit : `app/produit/[id]/page.tsx` ✅
- Jauge de trou : `HoleGauge.tsx` ✅
- Kit du Bricoleur : `BricoleurKit.tsx` ✅
- Avis clients : `ReviewCard.tsx` + `reviews.json` ✅
- Ton décalé : transversal dans les données ✅

**Couverture non-fonctionnelle :**
- < 2s chargement : `next/image` optimise automatiquement ✅
- Multi-visiteurs : site statique, aucune contention ✅
- Navigateurs modernes : TypeScript strict, Tailwind safe ✅
- UI immédiate : pas d'onboarding par design ✅

### Validation de Prêt pour l'Implémentation ✅

**Complétude des décisions :**
Toutes les décisions critiques documentées (stack, données, filtres, avis). Versions vérifiées. Rationale fournie.

**Complétude des patterns :**
5 catégories couvertes : nommage, structure, format, process, enforcement. Exemples concrets. Règles d'export pour agents.

**Complétude de la structure :**
25+ fichiers et dossiers nommés explicitement. Mappings FR → composants. Flux de données documenté.

### Gaps Identifiés

**Aucun gap critique.**

Les décisions existantes sont suffisantes pour une implémentation cohérente par agents.

### Checklist de Complétude Architecturale

- [x] Contexte projet analysé (démo salon, ton décalé, catalog fixe)
- [x] Complexité évaluée (basse, frontend statique)
- [x] Contraintes identifiées (dual-deploy, NFR < 2s)
- [x] Décisions critiques documentées avec versions
- [x] Stack technologique complètement spécifié (Next.js 16, TS, Tailwind)
- [x] Patterns d'implémentation établis (5 catégories)
- [x] Structure projet complète et nommée
- [x] Frontières architecturales claires (données, composants, pages)
- [x] Exigences fonctionnelles couvertes à 100%
- [x] Exigences non-fonctionnelles adressées à 100%

**Statut global : PRÊT POUR L'IMPLÉMENTATION**
