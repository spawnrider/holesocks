# Types Directory

TypeScript type definitions and interfaces for the HoleSocks project.

## Files

- **product.ts** - Core interfaces:
  - `Product` - Product catalogue item with all properties
  - `Review` - Customer review with rating and comment
  - `FilterState` - Filter state for catalogue filtering (optional properties)

## Usage

Import types throughout components:
```typescript
import type { Product, Review, FilterState } from "@/types/product";
```

All components using products, reviews, or filters should import from this file.
