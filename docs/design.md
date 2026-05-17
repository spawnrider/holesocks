# Design Guidelines — HoleSocks

**Version** : 1.0  
**Date** : Mai 2026  
**Statut** : Référence de design pour l'implémentation

---

## Philosophie de design

HoleSocks vend de l'absurde avec sérieux. L'interface doit donc avoir l'air d'un vrai site premium — c'est précisément ce contraste qui rend le concept drôle. Pas de kitsch, pas de mauvais goût assumé : une esthétique éditoriale, presque austère, qui parle de chaussettes trouées sans ciller.

> "L'idée la plus absurde possible, exécutée avec le plus grand sérieux."

**Trois principes directeurs :**
1. **Sérieux de façade** — L'UI ressemble à un vrai e-commerce premium. C'est l'écart avec le contenu qui produit l'humour.
2. **Intentionnalité visible** — Chaque trou est une *feature*, chaque choix de design est assumé. Rien ne doit sembler accidentel.
3. **Respiration** — Généreux en espace blanc. Un site qui "respire" pour des chaussettes qui respirent.

---

## Palette de couleurs

### Couleurs primaires

| Nom | Hex | Usage |
|-----|-----|-------|
| **Charbon** | `#1C1A17` | Fond principal, texte principal, bouton primaire |
| **Crème** | `#F4EFE3` | Fond de page, surfaces de carte, texte sur fond sombre |
| **Acidulé** | `#D9E830` | CTA principal, accent hover, badges "nouveau" |

### Couleurs sémantiques (niveaux de trou)

| Niveau | Nom | Hex | Usage |
|--------|-----|-----|-------|
| Niveau 1 | **Sauge** | `#7A9E7E` | Badge "Léger", jauge niveau 1, état succès |
| Niveau 2 | **Ambre** | `#D4A500` | Badge "Aéré", jauge niveau 2 |
| Niveau 3 | **Catastrophe** | `#C44B28` | Badge "Catastrophe", jauge niveau 3, alerte |

### Couleur neutre

| Nom | Hex | Usage |
|-----|-----|-------|
| **Gris philosophe** | `#6B6560` | Texte secondaire, labels, métadonnées |

### Variables CSS

```css
:root {
  /* Primaires */
  --hs-black:  #1C1A17;
  --hs-cream:  #F4EFE3;
  --hs-yellow: #D9E830;

  /* Sémantiques */
  --hs-sage:   #7A9E7E;  /* Léger */
  --hs-amber:  #D4A500;  /* Aéré */
  --hs-terra:  #C44B28;  /* Catastrophe */

  /* Neutre */
  --hs-mid:    #6B6560;

  /* Surfaces */
  --hs-surface:  #FFFFFF;
  --hs-border:   rgba(28, 26, 23, 0.12);
}
```

### Règles d'usage

- Le fond de page est toujours **Crème** (`#F4EFE3`), jamais blanc pur.
- L'**Acidulé** ne s'utilise qu'en accent : CTA, hover, highlight. Jamais en fond pleine page.
- Le **Charbon** sur fond Crème est la combinaison de base. L'inverse (Crème sur Charbon) pour les sections héros et footers.
- Les couleurs de niveau ne se mélangent pas : un produit "Léger" ne touche jamais la couleur Catastrophe.

---

## Typographie

### Familles de fontes

| Rôle | Fonte | Poids | Taille |
|------|-------|-------|--------|
| **Display / Héros** | Bebas Neue | Regular (400) | 48–96px |
| **Éditorial / Descriptions** | DM Serif Display | Regular + Italic | 18–32px |
| **UI / Navigation / Labels** | Syne | 400 & 700 | 10–16px |

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;700&display=swap');

--font-display:   'Bebas Neue', sans-serif;
--font-editorial: 'DM Serif Display', serif;
--font-ui:        'Syne', sans-serif;
```

### Échelle typographique

```css
/* Display */
.t-hero    { font-family: var(--font-display); font-size: 80px; line-height: 0.9; letter-spacing: 0.01em; }
.t-title   { font-family: var(--font-display); font-size: 48px; line-height: 0.95; }
.t-section { font-family: var(--font-display); font-size: 32px; line-height: 1; }

/* Éditorial */
.t-lead    { font-family: var(--font-editorial); font-size: 22px; line-height: 1.4; }
.t-body    { font-family: var(--font-editorial); font-size: 16px; line-height: 1.65; }
.t-quote   { font-family: var(--font-editorial); font-style: italic; font-size: 18px; line-height: 1.5; }

/* UI */
.t-ui      { font-family: var(--font-ui); font-size: 15px; line-height: 1.6; }
.t-small   { font-family: var(--font-ui); font-size: 13px; line-height: 1.5; }
.t-label   { font-family: var(--font-ui); font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
.t-price   { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.03em; }
```

### Règles typographiques

- **Bebas Neue** est réservé aux titres et prix. Jamais pour du corps de texte.
- **DM Serif Display** en italique pour les accroches produit et citations décalées. Droit pour les titres de section.
- **Syne** Bold (700) pour les labels, badges, boutons. Regular (400) pour le corps UI.
- Pas d'autre famille de fonte. Trois, c'est déjà de la générosité.

---

## Iconographie & motifs visuels

### Le trou comme motif

Le cercle est le motif central du site. Il représente le trou — l'argument de vente.

```css
/* Cercle décoratif type "trou" */
.motif-hole {
  border-radius: 50%;
  border: 2px solid currentColor;
  /* Utiliser en superposition, opacity 0.15–0.35 */
}
```

**Usages :**
- Arrière-plans de sections héros (grands cercles en superposition)
- Séparateurs de sections (ligne avec cercle central)
- Illustrations de fiches produit

### Bordures & séparations

```css
--hs-border-thin:   0.5px solid var(--hs-border);
--hs-border-medium: 1px solid rgba(28, 26, 23, 0.2);
--hs-border-accent: 2px solid var(--hs-yellow);  /* hover / focus */
```

---

## Composants

### Boutons

```css
/* Base commune */
.btn {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: transform 120ms ease, opacity 120ms ease;
}
.btn:active { transform: scale(0.96); }

/* Variantes */
.btn-primary  { background: var(--hs-black);  color: var(--hs-cream);  border-color: var(--hs-black); }
.btn-accent   { background: var(--hs-yellow); color: var(--hs-black);  border-color: var(--hs-yellow); }
.btn-outline  { background: transparent;      color: var(--hs-black);  border-color: var(--hs-black); }
.btn-danger   { background: var(--hs-terra);  color: #FFFFFF;          border-color: var(--hs-terra); }

/* États hover */
.btn-primary:hover  { opacity: 0.88; }
.btn-accent:hover   { filter: brightness(1.05); }
.btn-outline:hover  { background: var(--hs-black); color: var(--hs-cream); }
```

**Hiérarchie :**
1. `btn-accent` — Action principale (Ajouter au panier)
2. `btn-primary` — Action secondaire (Commander)
3. `btn-outline` — Action tertiaire (Filtrer, Voir plus)
4. `btn-danger` — Niveau Catastrophe uniquement

### Badges de niveau

```css
.badge {
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
}

.badge-level1 { background: #EEF5E0; color: #3D6B41; }   /* Léger */
.badge-level2 { background: #FFF3CD; color: #7A5800; }   /* Aéré */
.badge-level3 { background: #FDE8E2; color: #8B2510; }   /* Catastrophe */
.badge-new    { background: var(--hs-yellow); color: var(--hs-black); }
.badge-promo  { background: var(--hs-black);  color: var(--hs-cream); }
```

### Jauge de trou

Composant signature. Affiche le niveau de perforation de 0 à 100% sur une barre colorée.

```css
.hole-gauge-track {
  height: 10px;
  background: rgba(28, 26, 23, 0.08);
  border-radius: 5px;
  overflow: visible;
  position: relative;
}

.hole-gauge-fill {
  height: 100%;
  border-radius: 5px;
  position: relative;
  transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);  /* ease-out-expo */
}

/* Curseur de fin */
.hole-gauge-fill::after {
  content: '';
  position: absolute;
  right: 0; top: 50%;
  transform: translate(50%, -50%);
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  background: var(--hs-cream);
}

/* Par niveau */
.gauge-level1 { width: 28%; background: var(--hs-sage);  color: var(--hs-sage); }
.gauge-level2 { width: 60%; background: var(--hs-amber); color: var(--hs-amber); }
.gauge-level3 { width: 95%; background: var(--hs-terra); color: var(--hs-terra); }
```

**Règle :** La jauge s'anime à l'entrée dans le viewport (Intersection Observer), de 0 à la valeur cible, 500ms ease-out-expo, délai 200ms.

### Carte produit

```css
.product-card {
  background: var(--hs-surface);
  border: 0.5px solid var(--hs-border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--hs-yellow);
  box-shadow: 0 8px 24px rgba(28, 26, 23, 0.08);
}

.product-card__thumb {
  background: var(--hs-cream);
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-card__body {
  padding: 14px 16px;
}

.product-card__name {
  font-family: var(--font-editorial);
  font-size: 18px;
  margin-bottom: 4px;
}

.product-card__desc {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--hs-mid);
  line-height: 1.45;
  margin-bottom: 12px;
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card__price {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: 0.03em;
}
```

### Avis client

```css
.review-card {
  background: var(--hs-cream);
  border-radius: 10px;
  padding: 16px 20px;
  position: relative;
}

.review-card__stars {
  color: var(--hs-yellow);
  font-size: 14px;
  margin-bottom: 8px;
}

.review-card__text {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 15px;
  line-height: 1.55;
  margin-bottom: 10px;
}

.review-card__author {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--hs-mid);
}
```

---

## Grille & espacement

### Grille catalogue

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .product-grid { grid-template-columns: 1fr; }
}
```

### Échelle d'espacement

| Token | Valeur | Usage |
|-------|--------|-------|
| `--space-xs` | `8px` | Gap interne composant, padding badge |
| `--space-sm` | `16px` | Padding carte, gap bouton+label |
| `--space-md` | `24px` | Marge entre composants |
| `--space-lg` | `40px` | Section padding vertical |
| `--space-xl` | `64px` | Séparation de sections majeures |
| `--space-2xl` | `96px` | Marges héros, espaces respiratoires |

### Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Page fond */
body {
  background: var(--hs-cream);
  color: var(--hs-black);
  font-family: var(--font-ui);
}
```

### Rayons de bordure

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-sm` | `4px` | Badges, inputs |
| `--radius-md` | `8px` | Boutons, petits composants |
| `--radius-lg` | `12px` | Cartes produit |
| `--radius-xl` | `16px` | Modales, sections encadrées |
| `--radius-full` | `9999px` | Pills, avatars |

---

## Animations & micro-interactions

### Principes

- **Une animation mémorable vaut mieux que dix animations correctes.** Concentrer les effets sur les moments clés.
- **Ease-out** pour les entrées (les éléments ralentissent en arrivant). **Ease-in** pour les sorties.
- Durée standard : 200–350ms. Rien au-dessus de 500ms sauf la jauge de trou.

### Entrée des cartes (page catalogue)

```css
@keyframes card-in {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.product-card {
  animation: card-in 320ms ease-out both;
}

/* Stagger via JS : card.style.animationDelay = `${index * 80}ms` */
```

### Ajout au panier

```css
/* 1. Bouton : feedback immédiat */
.btn-add:active { transform: scale(0.93); transition: transform 100ms ease; }

/* 2. Compteur panier : bounce */
@keyframes badge-bounce {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.4); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
.cart-count.updated { animation: badge-bounce 350ms ease; }
```

### Hover état filtre actif

```css
.filter-btn {
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
}
.filter-btn.active {
  background: var(--hs-black);
  color: var(--hs-cream);
  border-color: var(--hs-black);
}
```

### Jauge de trou (voir composant)

La jauge s'anime à l'entrée en viewport via `IntersectionObserver`. Animation unique, non répétée.

---

## Ton & voix de marque

### Principe fondamental

> Tout est dit avec le plus grand sérieux. L'humour naît de l'écart entre le ton et le sujet.

### Formules à préférer

| Contexte | À faire | À éviter |
|----------|---------|----------|
| Nom de modèle | "Le Philosophe", "L'Existentiel", "Le Lundi Noir" | "Chaussette Ref. 001A" |
| Description niveau | "Un discret frisson d'air — on appelle ça la respiration." | "Petit trou au talon." |
| CTA panier | "Adopter ce trou" | "Ajouter au panier" |
| Confirmation commande | "Vos trous sont en route. Respirez." | "Commande confirmée." |
| Page 404 | "Cette page a été emportée par le vent. Comme votre chaussette." | "Page introuvable." |
| Filtre sans résultat | "Aucune chaussette ne répond à ces critères. Peut-être les vôtres." | "Aucun résultat." |

### Ton du contenu

- **Légèrement philosophique** — pointe de Camus, pas de Kant.
- **Jamais agressif ni moqueur** — le sourire, pas le ricanement.
- **Précis et sérieux** — les descriptions techniques sont vraies (taille, matière, niveau), c'est le contexte qui est absurde.
- **Court** — chaque phrase doit tenir en une ligne. La profondeur vient de la densité, pas de la longueur.

---

## Pages & zones UI

### Navigation

```
[Logo HOLESOCKS]          [Léger] [Aéré] [Catastrophe]    [🛒 Panier (2)]
```

- Logo : "HOLESOCKS" en **Bebas Neue** 28px, lettre-espacement large
- Liens de navigation : **Syne** 700, 12px, uppercase, letter-spacing 0.14em
- Le niveau actif porte le badge de sa couleur sémantique

### Page d'accueil — structure

1. **Héros** — Grande typographie Bebas, fond Charbon, motifs cercles, accroche DM Serif italic
2. **Les 3 niveaux** — 3 cartes côte à côte, fond Crème, jauge animée, badge niveau
3. **Produits vedettes** — Grille 3 colonnes, 6 produits
4. **Kit du Bricoleur** — Bandeau pleine largeur, fond Acidulé, texte Charbon
5. **Avis clients** — Fond Charbon, citations en DM Serif italic crème

### Fiche produit — structure

```
[Photo produit]  |  [Nom modèle — Bebas Neue 48px]
                 |  [Badge niveau]  [Jauge de trou]
                 |  [Description — DM Serif italic]
                 |  [Sélecteur taille]
                 |  [Prix — Bebas Neue 32px]
                 |  [CTA "Adopter ce trou" — btn-accent]
                 |  ─────────────────────────────────
                 |  [Cross-sell Kit du Bricoleur]
[Avis clients]
```

---

## Checklist implémentation

- [ ] Variables CSS déclarées sur `:root`
- [ ] Fontes Google importées (Bebas Neue, DM Serif Display, Syne)
- [ ] Fond de page `#F4EFE3` (jamais blanc pur)
- [ ] Jauge animée à l'entrée viewport sur les fiches produit
- [ ] Stagger d'animation sur les grilles de cartes
- [ ] Badges de niveau avec les bonnes couleurs sémantiques
- [ ] Hover carte produit : translateY(-4px) + border Acidulé
- [ ] CTA principal en `btn-accent` (jaune), pas en `btn-primary`
- [ ] Ton décalé sur toutes les strings UI (confirmations, erreurs, filtres vides)
- [ ] Logo "HOLESOCKS" en Bebas Neue dans la navigation

---

*Design Guidelines HoleSocks — v1.0 — Mai 2026*  
*Généré dans le cadre du workflow BMAD — Phase UX Design*
