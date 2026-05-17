---
title: 'HoleSocks — Application du design system UX complet'
type: 'feature'
created: '2026-05-17'
status: 'in-progress'
context:
  - '{project-root}/_bmad-output/planning-artifacts/ux-design-specification.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le projet HoleSocks tourne avec des styles génériques (bleu/gris, Arial/Geist, fond blanc), sans aucun token de la charte graphique HoleSocks (Charbon, Crème, Acidulé, Sauge, Terra, Bebas Neue, DM Serif Display, Syne). Aucune navbar n'existe, la homepage est une liste basique sans hero, et les composants (ProductCard, HoleGauge, FilterChip) ignorent le design system défini dans la spec UX.

**Approach:** Appliquer le design system HoleSocks de bout en bout : tokens Tailwind v4 dans globals.css, polices Google Fonts, navbar sticky, homepage Direction C (Épurée Centrée), et refonte visuelle complète de ProductCard, HoleGauge et FilterChip/FilterBar — sans modifier la logique métier ni les types existants.

## Boundaries & Constraints

**Always:**
- Tailwind CSS v4 pur — aucun framework UI externe (shadcn, MUI)
- Polices via `next/font/google` : Bebas_Neue, DM_Serif_Display, Syne
- Framer Motion pour les animations (à installer)
- Variables CSS custom dans `globals.css` sous `@theme inline` (syntaxe Tailwind v4)
- HoleGauge accessible : `role="progressbar"`, `aria-valuenow`, `aria-label`
- `prefers-reduced-motion` respecté sur toutes les animations (translations désactivées, couleurs maintenues)
- Static export Next.js — pas de composants server-only incompatibles
- CTA principal toujours : "Adopter ce trou"
- Micro-copies en français avec ton décalé/humoristique

**Ask First:**
- Si des images réelles sont nécessaires (actuellement placeholders) — demander avant d'en ajouter
- Si la structure des routes doit changer

**Never:**
- Modifier `src/types/product.ts`, `src/data/products.ts`, `src/data/reviews.ts`, `src/lib/useFilters.ts`
- Modifier la logique de filtrage dans CatalogueClient (seulement les styles)
- Ajouter un système d'auth, panier réel, ou base de données
- Utiliser des couleurs hors palette HoleSocks (Charbon, Crème, Acidulé, Sauge, Ambre, Terra, Gris)

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Catalogue vide après filtres | filteredProducts.length === 0 | Empty state : illustration SVG, "AUCUNE SURVIVANTE", CTA "Voir toute la collection" | Bouton clearFilters fonctionnel |
| `prefers-reduced-motion: reduce` | Media query active | Translations/fade désactivés, transitions de couleur maintenues | CSS `@media` natif |
| Scroll navbar | window.scrollY > 20 | Navbar compressée 72px → 52px, fond transparent → Crème opaque | Transition CSS 200ms |
| HoleGauge level 1/2/3 | `level` prop | Couleur Sauge(1) / Ambre(2) / Terra(3), `aria-label` correct | Fallback gris si level inconnu |

</frozen-after-approval>

## Code Map

- `holesocks/src/app/globals.css` — design tokens Tailwind v4, imports polices, reset base
- `holesocks/src/app/layout.tsx` — providers polices, metadata, inclusion Navbar, skip-to-content
- `holesocks/src/components/ui/Navbar.tsx` (NEW) — navbar sticky avec scroll compression
- `holesocks/src/app/page.tsx` — homepage Direction C : hero Épurée Centrée + 3 niveaux + sections
- `holesocks/src/components/product/HoleGauge.tsx` — couleurs marque + accessibility attrs
- `holesocks/src/components/product/ProductCard.tsx` — couleurs marque, LevelBadge, CTA décalé
- `holesocks/src/components/filters/FilterChip.tsx` — FilterPill aux couleurs marque
- `holesocks/src/components/filters/FilterBar.tsx` — sidebar brand
- `holesocks/src/components/catalogue/CatalogueClient.tsx` — grid 3 col desktop, empty state brand

## Tasks & Acceptance

**Execution:**
- [ ] `holesocks/package.json` -- installer `framer-motion` via npm -- requis pour animations homepage et HoleGauge
- [ ] `holesocks/src/app/globals.css` -- remplacer contenu par tokens CSS HoleSocks + import tailwindcss + base body -- établit la fondation visuelle pour tous les composants
- [ ] `holesocks/src/app/layout.tsx` -- ajouter `next/font/google` (Bebas_Neue, DM_Serif_Display, Syne), metadata HoleSocks, `<Navbar />`, skip-to-content link -- donne accès aux polices et à la nav globale
- [ ] `holesocks/src/components/ui/Navbar.tsx` -- créer navbar sticky avec logo, liens 3 niveaux, compression au scroll -- navigation principale conforme spec UX
- [ ] `holesocks/src/app/page.tsx` -- réécrire homepage : hero Direction C (Bebas Neue, Charbon/Crème, CTA Acidulé), section 3 niveaux cards, section features -- remplace la page générique bleu/gris
- [ ] `holesocks/src/components/product/HoleGauge.tsx` -- remplacer couleurs jaune/orange/rouge par Sauge/Ambre/Terra, ajouter role=progressbar + aria attrs, animation Framer Motion -- accessibilité + brand
- [ ] `holesocks/src/components/product/ProductCard.tsx` -- remplacer couleurs génériques par tokens marque, LevelBadge coloré, CTA "Voir ce trou →" -- alignement design system
- [ ] `holesocks/src/components/filters/FilterChip.tsx` -- remplacer bg-blue par Acidulé/Charbon, border pill style marque -- FilterPill conforme spec UX
- [ ] `holesocks/src/components/filters/FilterBar.tsx` -- fond Crème/Charbon, typographie Syne uppercase, border Charbon -- sidebar brand
- [ ] `holesocks/src/components/catalogue/CatalogueClient.tsx` -- grid 3 col desktop (lg:grid-cols-3), empty state brand avec copy décalée -- layouts et micro-copies HoleSocks

**Acceptance Criteria:**
- Given la homepage, when chargée, then le hero affiche fond Charbon (#1C1A17), titre Bebas Neue blanc, bouton CTA fond Acidulé (#D9E830) texte Charbon
- Given la navbar, when scroll > 20px, then hauteur compressée et fond Crème opaque visible
- Given un HoleGauge level 3, when rendu, then barre Terra (#C44B28) et aria-label "Niveau d'usure : X%"
- Given catalogue avec filtres qui donnent 0 résultat, when rendu, then message "AUCUNE SURVIVANTE" et bouton reset visible
- Given `prefers-reduced-motion: reduce`, when page chargée, then aucune animation translate/fade active
- Given la page, when Tab pressé depuis le début, then skip-to-content link visible en focus

## Design Notes

**Tokens Tailwind v4 (dans `@theme inline`) :**
```css
--color-charbon: #1C1A17;
--color-creme: #F4EFE3;
--color-acidule: #D9E830;
--color-sauge: #7A9E7E;
--color-ambre: #D4A500;
--color-terra: #C44B28;
--color-gris: #6B6560;
```

**Police mapping :**
- `font-display` → Bebas Neue (titres hero, niveaux)
- `font-editorial` → DM Serif Display (taglines, citations)
- `font-ui` → Syne (labels, navigation, boutons)

**Navbar scroll :** `useEffect` + `window.addEventListener('scroll')` + state `scrolled`. Class conditionnelle `h-[52px]` vs `h-[72px]`, `bg-creme/95 backdrop-blur-sm` vs `bg-transparent`.

**HoleGauge couleurs :**
- level 1 → `bg-sauge`
- level 2 → `bg-ambre`
- level 3 → `bg-terra`

## Verification

**Commands:**
- `cd holesocks && npm run build` -- expected: Build réussi sans erreurs TypeScript
- `cd holesocks && npm run dev` -- expected: Serveur démarre, pages accessibles sur localhost:3000

**Manual checks (if no CLI):**
- Ouvrir localhost:3000 : fond Charbon, Bebas Neue visible, bouton Acidulé
- Ouvrir /catalogue : grid 3 colonnes en large, filtres aux couleurs marque
- DevTools > Accessibility > inspecter HoleGauge : role=progressbar présent
- DevTools > Emulate prefers-reduced-motion: aucune animation translate active
