# Rapport de tests E2E — HoleSocks

**Date :** 2025-05-17  
**Framework :** Playwright `@playwright/test` ^1.60.0  
**Résultat :** ✅ 47/47 tests passent

---

## Résumé d'exécution

| Fichier | Tests | Résultat |
|---|---|---|
| `tests/e2e/home.spec.ts` | 11 | ✅ 11/11 |
| `tests/e2e/catalogue.spec.ts` | 19 | ✅ 19/19 |
| `tests/e2e/product.spec.ts` | 17 | ✅ 17/17 |
| **Total** | **47** | **47/47** |

Durée totale : ~45s (1 worker, Chromium headless)

---

## Couverture par fichier

### `home.spec.ts` — Page d'accueil (11 tests)

- Affichage du titre principal `HOLESOCKS`
- Affichage du tagline
- Navigation du CTA principal vers `/catalogue`
- Affichage des 3 niveaux de trou (Léger, Aéré, Catastrophe)
- Navigation depuis une card de niveau vers une page produit
- Affichage des 3 piliers de la section manifeste (Qualité Volontaire, Trois Niveaux, Humour Inclus)
- Navigation du CTA final vers `/catalogue`
- Lien logo Navbar vers `/`
- Lien Navbar `Catalogue` vers `/catalogue`
- Lien Navbar `Bricoleur Kit` vers `/#bricoleur-kit`
- Responsive : Navbar visible sur mobile

### `catalogue.spec.ts` — Catalogue & filtres (19 tests)

**Contenu de base (5 tests)**
- Affichage du titre `CATALOGUE`
- Affichage de 8 produits au total
- Affichage des filtres (section `Filtres`)
- Affichage du compteur de produits
- Navigation depuis une card produit vers la page détail

**Filtres — Niveau (4 tests)**
- Filtre Léger → 2 produits (Le Philosophe, Le Minimal)
- Filtre Aéré → 4 produits (Le Drôle, Le Bricoleur, Le Zen, Le Poète)
- Filtre Catastrophe → 2 produits (Le Coquin, Le Extrême)
- Réinitialisation après filtre

**Filtres — Style (2 tests)**
- Filtre Orteil → 5 produits
- Filtre Talon → 2 produits

**Filtres — Couleur (3 tests)**
- Filtre Noir → 3 produits
- Filtre Rouge → 2 produits
- Filtre Bleu → 2 produits

**Filtres — Taille (2 tests)**
- Filtre S (exact) → 4 produits
- Filtre XL → 6 produits

**Filtres combinés & reset (3 tests)**
- Catastrophe + Rouge → 1 produit (Le Extrême)
- Aéré + Noir → 2 produits (Le Bricoleur, Le Poète)
- Réinitialisation complète après filtres combinés

### `product.spec.ts` — Page produit (17 tests)

**Contenu (7 tests — sur `/produit/le-philosophe`)**
- Titre H1 du produit
- Tagline du produit
- Description du produit
- Tailles disponibles S, M, L, XL (exact match)
- Bouton CTA `Adopter ce trou`
- Champs Couleur et Style
- Lien `Retour au catalogue`

**Avis existants (3 tests)**
- Titre de section avec compteur `Avis clients (2)`
- Noms des auteurs (Jean-Pierre, Marie)
- Contenu textuel d'un avis

**Formulaire d'avis (7 tests)**
- Affichage du formulaire `Partager votre avis`
- Soumission valide → message de confirmation
- Réinitialisation du formulaire après soumission
- Soumission vide → alerte de validation
- Select de note : valeur par défaut 5, changement vers 3

---

## Configuration technique

### `playwright.config.ts`

```ts
// Serveur web : static export servi via npx serve
webServer: {
  command: "npx serve out --listen 3000 --no-clipboard",
  url: "http://localhost:3000",
  reuseExistingServer: !process.env.CI,
  timeout: 60000,
}
```

**Note :** Next.js 16 avec `output: "export"` génère un dossier `out/` statique. `next start` n'est pas compatible avec ce mode — le serveur de test utilise `npx serve out`.

### Prérequis avant exécution

```bash
# Build obligatoire pour régénérer out/
npm run build

# Lancer les tests
npm run test:e2e

# Rapport HTML
npm run test:e2e:report
```

---

## Modifications apportées au projet

### Nouveau composant : `ReviewSection.tsx`

Créé `src/components/reviews/ReviewSection.tsx` — client component qui combine `ReviewList` et `ReviewForm` avec un state local pour permettre l'ajout d'avis en session (nécessaire car `ReviewForm` utilise `useState` et ne peut pas être importé directement dans un server component sans encapsulation).

### Mise à jour : `page.tsx` (page produit)

Remplacé l'import de `ReviewList` + `ReviewForm` (inutilisé) par `ReviewSection` qui encapsule les deux avec la gestion d'état.

---

## Points d'attention

- Les avis soumis sont **en session uniquement** (pas de persistance) — comportement attendu selon la spec.
- Les 8 produits et 10 avis de `src/data/` sont des données statiques — les tests sont synchronisés avec ces valeurs.
- Les filtres testés correspondent exactement aux données de `src/data/products.ts`.
