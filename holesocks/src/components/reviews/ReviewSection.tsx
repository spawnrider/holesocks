"use client";

import { useState } from "react";
import type { Review } from "@/types/product";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
}

export function ReviewSection({ productId, initialReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleReviewSubmit = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <>
      <ReviewList reviews={reviews} />
      <ReviewForm productId={productId} onReviewSubmit={handleReviewSubmit} />
    </>
  );
}
