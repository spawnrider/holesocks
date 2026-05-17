# Lib Directory

Utility functions and custom React hooks for shared logic.

## Files

- **useFilters.ts** - Custom hook for managing catalogue filter state (level, color, style, size)
  - Handles filter application and reset logic
  - Returns filtered products array
  - Used by Catalogue page and FilterBar component

## Patterns

- Custom hooks use camelCase naming (`useXxx.ts`)
- Utility functions exported for reuse across components
- Keep business logic separate from UI components
