---
title: 'Chiffrage : panier, paiement en ligne et back-office commandes'
type: 'technical-costing'
mode: 'brownfield'
issue: 'BMA-13 (parent BMA-12)'
author: 'Architect'
status: complete
created: '2026-10-08'
verified_against: '8708500'
---

# Chiffrage : panier, paiement en ligne et back-office commandes

**Question du board :** « Quel serait le coût d'une intégration d'un vrai mécanisme de panier d'achat, d'un back-office de gestion des commandes et d'un paiement en ligne, au plus simple ? »

**Conventions.** Les tarifs ont été consultés le **2026-10-08** (sources en fin de document). **[H]** signale une hypothèse ou un chiffre non vérifié sur une source primaire. Les montants en dollars sont convertis à **1 $ ≈ 0,86 € [H]**. Pour l'effort, **1 story = 1 session de build ≈ 0,5 à 1 jour-homme (j/h)**. Les euros sont calculés à un **TJM de 500 € [H]**.

## Synthèse pour le board

- **Au plus simple (A, Stripe Payment Links)** : un bouton « Acheter » par produit qui mène à une page de paiement Stripe, et le Dashboard Stripe sert de back-office. Effort : **≈ 1,5 j/h**. Coût fixe : **0 €/mois**. Commission : **1,5 % + 0,25 €** par commande. Le site reste 100 % statique. **Limite : pas de panier multi-produits.**
- **Vrai panier au plus simple (B2, Shopify Buy Button)** : Shopify fournit le panier, le paiement et un back-office complet (stocks, expéditions, factures). Effort : **≈ 3 j/h**. Coût : **Basic à 27 €/mois** (paiement annuel), plus 1,5 % + 0,25 € par commande. **Le site reste statique.**
- **Panier maison (C)** : jamais moins cher que B2, à aucun volume. Il se justifie seulement par un besoin produit (UX sur mesure, propriété des données). Effort : **5 à 25 j/h**. Le site sort de l'export statique.
- **Recommandation** : **Shopify Buy Button**, en commençant par le plan Starter (~4 €/mois [H]). **Passer au plan Basic à partir d'environ 22 commandes par mois** (≈ 650 € de CA mensuel). Ce passage ne demande aucun changement de code. Si le board accepte de vendre sans panier pour tester la demande, l'option A suffit et coûte encore moins.
- **Préalables communs à toutes les options** : fixer des prix (le modèle `Product` n'en a **aucun** aujourd'hui), publier des CGV, des mentions légales et une politique de confidentialité, et choisir un **hébergement autorisé pour un usage commercial**. Le plan Vercel Hobby est réservé à l'usage non commercial.

| Option | Effort (stories / j/h) | Coût de mise en place [H TJM] | Fixe / mois | Commission / commande de 30 € | Reste statique ? |
|---|---|---|---|---|---|
| A. Stripe Payment Links | 3 / ≈ 1,5 | ≈ 750 € | 0 € | 0,70 € | Oui |
| B1. Snipcart | 5 / ≈ 3 | ≈ 1 500 € | min. 20 $ (≈ 17 €) | 0,70 € + 2 % = 1,30 € | Oui |
| B2. Shopify Buy Button (Starter → Basic) | 5 / ≈ 3 | ≈ 1 500 € | ~4 € [H] → 27 € | 1,75 € [H] → 0,70 € | Oui |
| C1. Panier maison + Stripe Checkout | 7 / ≈ 6 | ≈ 3 000 € | ≈ 17 € (Vercel Pro) | 0,70 € | **Non** |
| C2. C1 + base + back-office maison | 18 / ≈ 20 | ≈ 10 000 € | ≈ 17 à 40 € [H] | 0,70 € | **Non** |

---

## 1. Contrainte actuelle (état vérifié contre `8708500`)

- **Next.js 16.2.6** en `output: 'export'` (`holesocks/next.config.ts`). Le build produit `out/`, un site 100 % statique sans aucun runtime serveur. Le `project-context.md` classe en anti-patterns les API routes, Server Actions, middleware, cookies, `fetch()` runtime et tout état global.
- **Catalogue statique** : `holesocks/src/data/products.ts` contient **8 produits** au type `Product` (`src/types/product.ts`). Chaque produit a **4 tailles** (`sizes`), soit 32 variantes. **Le modèle n'a ni champ prix, ni stock, ni composition textile.**
- **Aucun backend, aucune base de données, aucune variable d'environnement, aucune CI.** La vérification se fait en local : lint, build, puis tests e2e Playwright contre `npx serve out`.
- **Déploiement Vercel**, non configuré dans le dépôt (seul `.vercel` est ignoré). Les conditions de Vercel réservent le plan Hobby à un « personal, non-commercial use » [S4]. **Dès qu'on vend, il faut Vercel Pro (20 $/mois, ≈ 17 €) ou un hébergeur statique gratuit qui autorise l'usage commercial [H, à vérifier].**
- **Le PRD décrit un site de démonstration pour un salon** (« Divertissement »). Vendre change la nature du produit. Ce document ne modifie pas le PRD, mais une décision du board est attendue (voir Q1).
- Points du code existant à prendre en compte : il n'existe **pas de pied de page** pour porter les liens légaux. Le « Kit du Bricoleur » (`components/kit/BricoleurKit.tsx`) fait déjà du cross-sell, ce qui n'a de sens commercial qu'avec un panier multi-produits.

### Hypothèse de panier type

Aucun prix n'existe dans le site. La recherche marché (BMA-11) donne un repère : Quanailles vend la paire 9,00 € avec une remise dégressive. Hypothèse retenue : **12 € la paire, 2 paires par commande, livraison 4,90 € ⇒ panier ≈ 30 € TTC [H]**. Les commissions ci-dessous sont calculées sur ce panier.

## 2. Préalables communs à toutes les options

| # | Travail | Fichiers touchés | Effort |
|---|---|---|---|
| P1 | Ajouter `price` (en centimes, `number`) et `composition` au type `Product`, renseigner les 8 produits, afficher le prix dans la carte et la fiche produit | `src/types/product.ts`, `src/data/products.ts`, `components/product/ProductCard.tsx`, `app/produit/[id]/page.tsx`, `tests/e2e/product.spec.ts`, `catalogue.spec.ts` | 1 story (0,5 j/h) |
| P2 | Pages légales statiques (CGV, mentions légales, confidentialité, livraison et retours) et pied de page qui les relie | `app/cgv/`, `app/mentions-legales/`, `app/confidentialite/`, nouveau `components/ui/Footer.tsx`, `app/layout.tsx`, nouveaux specs e2e | 1 story (0,5 j/h) **+ rédaction et relecture juridique hors dev [H : 300 à 800 € via un modèle ou un juriste]** |
| P3 | Configuration non dev : compte marchand (KYC, SIRET, IBAN), frais de port, URL des CGV | Aucun fichier | ≈ 0,5 j par une personne du board |

Ces préalables sont **inclus** dans les efforts du tableau de synthèse.

## 3. Options comparées

### A. Paiement hébergé sans backend : Stripe Payment Links + Dashboard Stripe

**Principe.** Un Payment Link par produit est créé dans le Dashboard Stripe. Sur la fiche produit, le bouton « Acheter » est un lien externe vers `buy.stripe.com/...`, ou vers un sous-domaine personnalisé [S2]. La page Stripe permet :
- de choisir la taille, via un champ personnalisé de type liste déroulante (jusqu'à 10 options dans le Dashboard) [S2] ;
- d'ajuster la quantité (minimum et maximum configurables) [S2] ;
- de saisir l'adresse de livraison, avec pays autorisés et frais de port configurables [S2] ;
- d'accepter les CGV via une case obligatoire [S2].

Le Dashboard Stripe fait office de back-office. Il donne la liste des paiements, avec l'adresse et la taille, permet les remboursements et envoie les reçus par e-mail.

- **Mise en place** : P1, P2, puis 1 story pour les CTA et la page `/merci` (redirection après paiement). Total **3 stories, ≈ 1,5 j/h**. Le seul ajout au code est un champ `paymentLinkUrl` par produit.
- **Coûts récurrents** : **0 €** fixe. **1,5 % + 0,25 €** par carte standard de l'EEE, **2,8 % + 0,25 €** par carte premium de l'EEE [S1]. Pour 30 € : **0,70 €** (1,09 € avec une carte premium).
- **Impacts sur l'existant** : `output: 'export'` est **conservé**. Aucune dépendance npm, aucun script tiers, aucune variable d'environnement. Fichiers touchés : ceux de P1 et P2, plus `app/merci/page.tsx`.
- **Limites et risques** :
  - **Pas de panier multi-produits**, car un lien correspond à un produit. Le cross-sell du Kit du Bricoleur ne peut donc pas se convertir en une seule commande.
  - Les prix existent à deux endroits (`products.ts` et Stripe), avec un risque de décalage. Une vérification manuelle à chaque changement de prix est nécessaire.
  - Pas de gestion de stock, sauf une « limite de paiements » par lien.
  - Le back-office est sommaire : pas de statut « expédié » ni d'étiquettes de transport.

### B. Panier embarqué SaaS (le site reste statique)

#### B1. Snipcart

**Principe.** Un script et une feuille de style se chargent depuis le CDN Snipcart. Les boutons portent des attributs `data-item-id`, `data-item-price` et `data-item-url`. Snipcart fournit le panier en tiroir, le tunnel de paiement (via Stripe, entre autres) et un back-office : commandes, clients, paniers abandonnés, stock simple.

À chaque commande, Snipcart **relit la page du site** pour valider le prix. Le catalogue reste donc **une seule source de vérité, `products.ts`**. C'est le principal atout architectural de cette option.

- **Mise en place** : P1, P2, puis 3 stories : chargement du script dans `layout.tsx` ; boutons `data-item-*` sur la fiche, avec la taille en `data-item-custom1` ; icône du panier et compteur dans `Navbar.tsx`, thème aux couleurs de HoleSocks ; tests e2e en clé de test. Total **5 stories, ≈ 3 j/h**.
- **Coûts récurrents** : **2 % par transaction**, avec un **minimum de 20 $/mois** si le CA mensuel est inférieur à 1 000 $ [S3]. S'y ajoutent les frais Stripe (1,5 % + 0,25 €) [S1]. Pour 30 € : **1,30 €**.
- **Impacts sur l'existant** : `output: 'export'` est **conservé**. Pas de dépendance npm (script CDN). Une clé API **publique** apparaît dans `layout.tsx`. Ajout d'un script tiers d'environ 100 Ko [H], à surveiller vis-à-vis de l'exigence de chargement en moins de 2 s.
- **Risques** :
  - Le tarif est en dollars, avec un minimum mensuel dû même sans vente.
  - Le back-office est moins riche que Shopify : pas de factures natives ni d'étiquettes.
  - Dépendance à un éditeur de petite taille [H].

#### B2. Shopify Buy Button (plan Starter, puis Basic)

**Principe.** Les 8 produits et leurs 32 variantes de taille sont saisis dans Shopify. Un composant client charge le SDK Buy Button et affiche le bouton « Ajouter au panier » et le tiroir du panier. Le paiement se fait sur la page Shopify. Le back-office Shopify est complet : commandes, statuts, stocks par variante, étiquettes d'expédition, e-mails transactionnels et factures via des applications.

- **Mise en place** : P1 (le prix vient alors de Shopify, `products.ts` garde le texte éditorial et un `shopifyProductId`) et P2. Ensuite 3 stories : composant `components/shop/ShopifyBuyButton.tsx` (`"use client"`) ; bascule du panier dans `Navbar.tsx` ; thème et tests. Total **5 stories, ≈ 3 j/h**, plus ≈ 0,5 j de saisie du catalogue dans Shopify (hors dev).
- **Coûts récurrents** :
  - **Starter : 5 $/mois (≈ 4 €), 5 % de frais de transaction [H]**. Le plan n'apparaît pas sur la page des tarifs française. Les sources secondaires indiquent que le Buy Button y est inclus [S6]. **Hypothèse retenue : 5 % + 0,25 € par commande tout compris ⇒ 1,75 € pour 30 €.**
  - **Basic : 27 €/mois en paiement annuel, ou 36 €/mois en paiement mensuel.** Shopify Payments prend **1,5 % + 0,25 €** [S5], soit **0,70 €** pour 30 €. Avec une passerelle tierce à la place de Shopify Payments, il faut ajouter 2 % [S5].
- **Impacts sur l'existant** : `output: 'export'` est **conservé**. Pas de dépendance npm (SDK chargé en script). Un jeton Storefront **public** apparaît dans le code. **Le catalogue est dupliqué** : prix et stock dans Shopify, texte dans `products.ts`.
- **Risques** :
  - Le widget s'affiche en iframe et se personnalise moins que Snipcart. L'écart avec le ton graphique du site est probable.
  - Le SDK Buy Button est un produit ancien, peu mis à jour [H].
  - Les cookies Shopify imposent probablement une bannière de consentement [H].
  - **Les conditions du plan Starter restent à confirmer en France.**

### C. Panier maison + Stripe Checkout (sortie du mode statique)

**Point d'architecture clé.** Avec Stripe, un vrai panier multi-produits exige **au moins un point d'entrée serveur**, qui crée la Checkout Session avec la clé secrète. La redirection depuis le seul navigateur (`redirectToCheckout`) n'est plus la voie documentée par Stripe [H, à confirmer]. Il faut donc **retirer `output: 'export'`**. Les pages restent pré-rendues statiquement par Next, mais le déploiement nécessite un runtime de fonctions (Vercel Pro).

#### C1. Panier maison minimal, back-office = Dashboard Stripe

- **Contenu** :
  - un `CartProvider` (Context React et `localStorage`) dans `layout.tsx` ;
  - le bouton « Ajouter au panier » et le choix de taille ;
  - une page `app/panier/page.tsx` ;
  - la route `app/api/checkout/route.ts` (`stripe` en dépendance, prix relus **côté serveur** depuis `products.ts`) ;
  - les pages `/merci` et `/panier/annule` ;
  - le badge du panier dans la `Navbar`.
- **Mise en place** : P1, P2, plus 5 stories. Total **7 stories, ≈ 6 j/h**. Il faut aussi réécrire les règles du `project-context.md` (anti-patterns « pas d'API routes », « pas de state global ») et adapter Playwright, qui doit passer de `serve out` à `next start` (`package.json`, `playwright.config.ts`). Le script `test-build.mjs` devient obsolète.
- **Coûts récurrents** : **≈ 17 €/mois** (Vercel Pro) [S4], plus 0,70 € par commande [S1].
- **Impacts sur l'existant** : `next.config.ts`, `app/layout.tsx`, `components/ui/Navbar.tsx`, la fiche produit, le type `Product`, `package.json` (dépendance `stripe`), de nouveaux secrets (`STRIPE_SECRET_KEY`) et la configuration de test. **C'est un changement d'architecture**, qui doit faire l'objet d'une mise à jour de `architecture.md` avant tout développement.

#### C2. C1 + base de données + back-office maison

- **Contenu ajouté à C1** :
  - un webhook Stripe `app/api/webhooks/stripe/route.ts`, qui enregistre la commande ;
  - une base gérée et un ORM (2 dépendances) ;
  - un espace `app/admin/**` avec authentification, liste des commandes, statuts payée / expédiée / remboursée et export ;
  - la décrémentation du stock ;
  - les e-mails transactionnels (service tiers).
- **Mise en place** : environ **18 stories, ≈ 20 j/h** [H]. Il est recommandé de mettre en place une CI avant ce chantier (aujourd'hui absente).
- **Coûts récurrents** : Vercel Pro ≈ 17 €, une base gérée de 0 à 25 $/mois et un service d'e-mail transactionnel de 0 à 20 $/mois [H, offres gratuites non vérifiées]. Total **≈ 17 à 40 €/mois** [H], plus 0,70 € par commande.
- **Risques** :
  - Surface de sécurité nouvelle : secrets, signature du webhook, authentification de l'administration, données personnelles en base.
  - Maintenance permanente, sans CI ni tests unitaires dans le projet aujourd'hui.

## 4. Obligations (toutes options)

| Domaine | Obligation | A | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|
| **CGV et droit de la consommation** | CGV accessibles avant l'achat, droit de rétractation de 14 jours, information sur le prix TTC et les frais de port, médiateur de la consommation [H : à valider par un juriste] | P2 | P2 | P2 | P2 | P2 |
| **Mentions légales** | Identité de l'éditeur, SIRET, hébergeur | P2 | P2 | P2 | P2 | P2 |
| **TVA** | Régime à choisir : franchise ou TVA à 20 % sur le textile. Guichet unique OSS si les ventes à distance dans l'UE dépassent 10 000 €/an [H : à valider par un expert-comptable]. Stripe Tax est en option (0,5 % par transaction en sans-code) [S1]. Shopify calcule la TVA nativement [H] | Manuel ou Stripe Tax | Snipcart | Natif | Stripe Tax | Stripe Tax |
| **Factures** | Pas de facture native pour Stripe Payment Links (reçus seulement) ; une facture doit pouvoir être fournie sur demande [H] | Manuel | Snipcart | Applications Shopify | Manuel | À coder |
| **RGPD** | Politique de confidentialité, registre de traitement. Les données clients restent chez le prestataire (A, B) ou dans notre base (C2, responsabilité accrue) | Faible | Moyen | Moyen | Faible | **Élevé** |
| **Cookies** | Les scripts tiers de panier ou d'analytics peuvent exiger une bannière de consentement [H] | Non (page externe) | Probable | Probable | Non | Non |
| **PCI DSS** | La carte n'est jamais saisie sur notre domaine dans aucune option ⇒ questionnaire SAQ A (le plus léger) [H] | SAQ A | SAQ A | SAQ A | SAQ A | SAQ A |
| **Étiquetage textile** | La composition des fibres doit être indiquée avant l'achat (règlement UE 1007/2011) [H]. Le champ `style` actuel (« cotton ») ne suffit pas | P1 | P1 | P1 | P1 | P1 |

## 5. Coûts mensuels selon le volume (panier de 30 € [H])

Le calcul compte l'abonnement plus les commissions, **hors hébergement**. L'hébergement est identique pour A, B1 et B2 (0 € si l'hôte statique autorise l'usage commercial [H], sinon ≈ 17 € avec Vercel Pro). Il est inclus pour C.

| Commandes / mois (CA) | A | B1 Snipcart | B2 Starter [H] | B2 Basic (annuel) | C1 | C2 [H] |
|---|---|---|---|---|---|---|
| 10 (300 €) | **7 €** | 24 € | 22 € | 34 € | 24 € | 24 à 46 € |
| 50 (1 500 €) | **35 €** | 65 € | 92 € | 62 € | 52 € | 52 à 74 € |
| 200 (6 000 €) | **140 €** | 260 € | 354 € | 167 € | 157 € | 157 à 179 € |

### Seuils de rentabilité

- **Shopify Starter → Basic** : Starter coûte ≈ 1,05 € de plus par commande [H]. Basic devient moins cher **au-delà d'environ 22 commandes par mois** (≈ 650 € de CA) en paiement annuel, ou d'environ 30 commandes par mois en paiement mensuel. **La bascule est un changement de plan, sans code.**
- **Snipcart → Shopify Basic** : Snipcart est moins cher tant que le CA mensuel reste sous ≈ 1 350 € (≈ 45 commandes par mois). Au-delà, les 2 % de Snipcart dépassent l'abonnement Basic.
- **Panier maison (C1) contre Shopify Basic** : C1 coûte environ 10 €/mois de moins hors maintenance. Mais il demande ≈ 3 j/h de développement en plus (≈ 1 500 € [H]), soit **plus de 10 ans pour être amorti**. **C n'est jamais rentable sur le coût.** Il ne se justifie que par un besoin produit : UX de panier sur mesure, données en propre, logique B2B.
- **A** est l'option la moins chère à tout volume. Elle ne doit être abandonnée que **pour une raison fonctionnelle** : un panier multi-produits devient nécessaire, ou la gestion du stock et des expéditions devient pénible, autour de 30 commandes par mois selon nous [H].

## 6. Recommandation

**Pour un vrai panier au plus simple : B2, Shopify Buy Button**, en démarrant sur **Starter** si ses conditions en France confirment l'hypothèse (≈ 4 €/mois et 5 %), et sinon directement sur **Basic** (27 €/mois). Passer à Basic **à partir d'environ 22 commandes par mois**.

Raisons :
1. **Le site reste statique.** On conserve l'architecture, les règles du `project-context.md` et la stratégie de test. Le risque d'architecture est nul.
2. **Shopify couvre d'emblée le back-office commandes** demandé par le board : statuts, stocks par taille, expéditions, TVA. Snipcart et l'option A n'en couvrent qu'une partie.
3. **L'effort est d'environ 3 j/h**, préalables compris, et la croissance de volume ne demande que des changements de plan.

**Alternative moins chère, si le board accepte de vendre sans panier** pour d'abord tester la demande (recommandation de BMA-11 : « preuve par pré-commande ») : **A, Stripe Payment Links**, ≈ 1,5 j/h et 0 €/mois. Le passage ultérieur vers B2 ne jette que le CTA, environ 1 story.

**À écarter pour l'instant : C.** Ce n'est rentable à aucun volume, et cela suppose de sortir du mode statique, de mettre à jour l'architecture et de mettre en place une CI.

## 7. Questions ouvertes pour le board

| # | Question | Recommandation |
|---|---|---|
| Q1 | HoleSocks reste-t-il une démo de salon, ou devient-il une boutique réelle ? (Le PRD dit démo.) | Garder la démo intacte. Ouvrir une **initiative « boutique »** avec son propre PRD avant toute implémentation. Pendant les salons, utiliser le **mode test** du prestataire. |
| Q2 | Le panier multi-produits est-il indispensable, ou un achat produit par produit suffit-il ? | Indispensable si le cross-sell du Kit du Bricoleur doit vendre ⇒ B2. Sinon A. |
| Q3 | Quel volume de commandes est attendu les 3 premiers mois ? | Hypothèse prudente : moins de 20 par mois ⇒ Shopify Starter (ou A). Revoir à 3 mois. |
| Q4 | Quels prix de vente ? (Aucun n'existe dans le site.) | Le Product Manager fixe une grille. Repère du marché : 9 € la paire chez Quanailles (BMA-11). Hypothèse de calcul : 12 €. |
| Q5 | Quelle entité juridique, et existe-t-il déjà un compte marchand (Stripe, Shopify, SIRET, IBAN) ? | Ouvrir le compte au nom de l'entité qui facture. Prévoir la vérification d'identité (KYC) **avant** la date de lancement, compter quelques jours [H]. |
| Q6 | Quel régime de TVA ? | Valider avec l'expert-comptable avant d'ouvrir la vente. Vendre en France uniquement au début pour éviter l'OSS. |
| Q7 | Stock réel, ou fabrication à la demande et dropshipping ? | Petit stock réel, suivi par taille dans Shopify. La fabrication à la demande changerait le chiffrage (intégration d'un fournisseur). |
| Q8 | Livraison : zones, transporteur, tarifs ? | France métropolitaine, forfait unique (hypothèse 4,90 €), lettre suivie. Configurable sans code dans A et B2. |
| Q9 | Qui rédige les CGV et les mentions légales ? | Modèle juridique relu par un juriste [H : 300 à 800 €]. Les agents intègrent les pages (P2), ils ne rédigent pas le contenu juridique. |
| Q10 | Hébergement : rester sur Vercel ? | Usage commercial ⇒ **Vercel Pro (≈ 17 €/mois)**, ou un hébergeur statique gratuit qui autorise l'usage commercial (à vérifier). Décision requise dans toutes les options. |
| Q11 | Faut-il un suivi des conversions (analytics) ? | Non dans un premier temps : les rapports Shopify ou Stripe suffisent, et on évite une bannière de cookies supplémentaire. |

## Sources (consultées le 2026-10-08)

- [S1] Stripe, tarifs France : https://stripe.com/fr/pricing. Cartes EEE standard 1,5 % + 0,25 €, premium 2,8 % + 0,25 €, Royaume-Uni 2,5 % + 0,25 €, internationales 3,15 % + 0,25 € (+ 2 % de conversion). Payment Links et Checkout sans surcoût. Stripe Tax Basic sans code : 0,5 % par transaction.
- [S2] Stripe Docs, personnalisation de Payment Links : https://docs.stripe.com/payment-links/customize. Champs personnalisés en liste déroulante, quantité ajustable, adresse de livraison et frais de port, consentement aux CGV, domaine personnalisé.
- [S3] Snipcart, tarifs : https://snipcart.com/pricing. 2 % par transaction, minimum 20 $/mois si moins de 1 000 $ de ventes mensuelles, frais de passerelle en plus.
- [S4] Vercel, tarifs : https://vercel.com/pricing. Hobby « for personal, non-commercial use » ; Pro à 20 $/mois.
- [S5] Shopify, tarifs France : https://www.shopify.com/fr/tarifs. Basic 27 €/mois (annuel) ou 36 €/mois (mensuel). Shopify Payments Basic 1,5 % + 0,25 €. Passerelle tierce Basic : 2 %.
- [S6] **Sources secondaires, non primaires [H]** sur le plan Starter (5 $/mois, 5 % de frais de transaction, Buy Button inclus) : https://www.demandsage.com/shopify-starter-plan/, https://ecomm.design/shopify-pricing-guide/, https://help.shopify.com/en/manual/online-sales-channels/buy-button. Le plan Starter n'est pas affiché sur la page des tarifs française : **à confirmer avant de décider**.
- Repère de prix marché : `research-marche-concurrents-chaussettes-fantaisie.md` (BMA-11), source [3] (Quanailles, 9,00 € la paire).
