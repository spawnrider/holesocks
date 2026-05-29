---
title: 'Remplacer les tailles S/M/L/XL par des pointures européennes concrètes'
type: 'refactor'
created: '2026-05-29'
status: 'done'
route: 'one-shot'
---

## Intent

**Problem:** Les produits HoleSocks utilisaient des étiquettes de taille abstraites (S, M, L, XL) qui ne correspondent pas aux conventions de pointure européenne, rendant le choix de taille difficile pour les clients.

**Approach:** Remplacer toutes les occurrences des labels S/M/L/XL par des plages de pointures EU concrètes (34-38, 38-42, 42-46, 46-50) dans les données produit, les options de filtre et les tests.

## Suggested Review Order

1. [holesocks/src/types/product.ts:17](../../../holesocks/src/types/product.ts) — commentaire du champ `sizes` mis à jour
2. [holesocks/src/data/products.ts:13](../../../holesocks/src/data/products.ts) — données produit (8 produits), mapping S→34-38, M→38-42, L→42-46, XL→46-50
3. [holesocks/src/components/filters/FilterBar.tsx:29](../../../holesocks/src/components/filters/FilterBar.tsx) — `SIZE_OPTIONS` mis à jour avec les 4 plages EU
4. [holesocks/tests/e2e/product.spec.ts:29](../../../holesocks/tests/e2e/product.spec.ts) — test des tailles sur la fiche produit (Le Philosophe)
5. [holesocks/tests/e2e/catalogue.spec.ts:153](../../../holesocks/tests/e2e/catalogue.spec.ts) — test du filtre taille dans le catalogue
