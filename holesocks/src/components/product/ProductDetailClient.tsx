"use client";

import type { Product, Review } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
  initialReviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  initialReviews,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Reviews: {initialReviews.length}</p>
      <p>Related: {relatedProducts.length}</p>
    </div>
  );
}
