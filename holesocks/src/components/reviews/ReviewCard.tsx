/**
 * ReviewCard Component
 * Displays individual review
 */

import type { Review } from "@/types/product";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const stars = Array(review.rating)
    .fill("⭐")
    .join("");

  return (
    <div className="bg-creme border border-charbon/10 rounded p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-ui font-semibold text-charbon">{review.author}</h3>
          <div className="text-base text-ambre mt-1 tracking-wider">{stars}</div>
        </div>
      </div>
      <p className="font-editorial text-charbon/80 leading-relaxed">{review.comment}</p>
    </div>
  );
}
