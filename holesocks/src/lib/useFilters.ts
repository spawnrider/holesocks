/**
 * useFilters Hook
 * Manages catalogue filter state locally using React hooks
 * No external state management (Redux, Zustand, Context)
 */

import { useState } from "react";
import type { Product, FilterState } from "@/types/product";

/**
 * Hook for managing product filters
 * @returns Object with filter state and manipulation functions
 */
export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({});

  /**
   * Set or update a single filter value
   */
  const setFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilters({});
  };

  /**
   * Apply current filters to products array
   * Returns filtered products based on active filter criteria
   */
  const applyFilters = (products: Product[]): Product[] => {
    return products.filter((product) => {
      // Filter by level
      if (filters.level !== undefined && product.level !== filters.level) {
        return false;
      }

      // Filter by color
      if (filters.color !== undefined && product.color !== filters.color) {
        return false;
      }

      // Filter by style
      if (filters.style !== undefined && product.style !== filters.style) {
        return false;
      }

      // Filter by size (check if product has this size available)
      if (
        filters.size !== undefined &&
        !product.sizes.includes(filters.size)
      ) {
        return false;
      }

      // All filters passed
      return true;
    });
  };

  return {
    filters,
    setFilter,
    clearFilters,
    applyFilters,
  };
}
