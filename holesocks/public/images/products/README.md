# Product Images

Product photography for HoleSocks catalogue.

## Organization

Images should be organized by product ID (kebab-case) to match product.json entries.

Example:
```
products/
├── le-philosophe.jpg
├── le-drole.jpg
├── le-coquin.jpg
└── ...
```

## Format Requirements

- Format: JPG or PNG
- Optimization: Use next/image component in ProductCard for automatic optimization
- Size: Recommended 400x400px or larger (next/image handles responsive sizes)
- Filename: Match product id exactly (kebab-case)
