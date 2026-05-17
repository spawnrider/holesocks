# HoleSocks – Demo TechReady

Ce repository contient l'ensemble des artefacts du projet **HoleSocks**, une démo e-commerce conçue avec le framework [BMAD](https://github.com/bmad-framework) pour TechReady.

🔗 **Live demo :** [https://holesocks.vercel.app/](https://holesocks.vercel.app/)

## Structure du repository

```
.
├── holesocks/          # Application Next.js 16 (code source)
├── _bmad-output/       # Artefacts de planification BMAD
│   ├── planning-artifacts/
│   │   ├── product-brief.md          # Brief produit initial
│   │   ├── prd.md                    # Product Requirements Document
│   │   ├── prd-validation-report.md  # Rapport de validation du PRD
│   │   ├── architecture.md           # Architecture technique
│   │   ├── ux-design-specification.md
│   │   ├── ux-design-directions.html
│   │   └── epics.md                  # Epics et stories
│   └── implementation-artifacts/
│       ├── spec-ux-implementation-complete.md
│       └── tests/test-summary.md
└── docs/               # Notes de design et pre-brief
    ├── design.md
    └── pre-brief.md
```

## holesocks/

Application e-commerce Next.js 16 avec export statique. Voir [holesocks/README.md](holesocks/README.md) pour les détails techniques, le démarrage local et le déploiement.

## _bmad-output/

Artefacts générés par le framework **BMAD** durant les phases de planification et d'implémentation :

- **product-brief.md** – Positionnement, cibles, vision produit
- **prd.md** – Exigences fonctionnelles et critères d'acceptation
- **architecture.md** – Choix techniques et décisions d'architecture
- **ux-design-specification.md** – Spécifications UX détaillées
- **epics.md** – 5 epics, 12 stories, 40+ critères d'acceptation

## docs/

Notes de conception et brief initial ayant servi de point de départ au projet.

## Déploiement

L'application est déployée sur Vercel. Le **Root Directory** Vercel est configuré sur `holesocks/`.

```bash
# Tout commit sur main déclenche un déploiement automatique
git push origin main
```

## License

Projet de démonstration – TechReady.
