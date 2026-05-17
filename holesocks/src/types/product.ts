/**
 * Core TypeScript interfaces for HoleSocks project
 */

/**
 * Product in the HoleSocks catalogue
 */
export interface Product {
  id: string; // kebab-case identifier (e.g., "le-philosophe")
  name: string; // Display name
  tagline: string; // Short description
  description: string; // Full product description
  level: 1 | 2 | 3; // Skill level required (1=beginner, 2=intermediate, 3=expert)
  color: string; // Color name (e.g., "red", "blue", "black")
  style: string; // Style category (e.g., "cotton", "wool", "bamboo")
  sizes: string[]; // Available sizes (e.g., ["S", "M", "L", "XL"])
  gaugeValue: number; // Visual hole level indicator (0-100)
  imageUrl: string; // Path to product image (relative to public/)
}

/**
 * Customer review for a product
 */
export interface Review {
  id: string; // Unique review identifier
  productId: string; // Reference to product
  author: string; // Reviewer's name
  rating: 1 | 2 | 3 | 4 | 5; // Star rating
  comment: string; // Review text
}

/**
 * Filter state for catalogue page filtering
 * All properties are optional for flexible filtering
 */
export interface FilterState {
  level?: 1 | 2 | 3; // Filter by skill level
  color?: string; // Filter by color
  style?: string; // Filter by style
  size?: string; // Filter by available size
}
