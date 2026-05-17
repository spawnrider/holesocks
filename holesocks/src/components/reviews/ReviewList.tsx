/**
 * ReviewList Component
 * Displays list of product reviews
 */

import { ReviewCard } from "./ReviewCard";
import type { Review } from "@/types/product";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-charbon/5 rounded">
        <p className="font-editorial italic text-gris">Pas encore d'avis pour ce produit.</p>
        <p className="font-ui text-xs uppercase tracking-wider text-gris/60 mt-2">
          Soyez le premier à partager votre expérience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
