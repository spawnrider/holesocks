"use client";

/**
 * ReviewForm Component
 * Fictional review submission form (session-only, no persistence)
 */

import { useState } from "react";
import type { Review } from "@/types/product";

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: (review: Review) => void;
}

export function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    author: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author.trim() || !formData.comment.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Create new review
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId,
      author: formData.author,
      rating: formData.rating as 1 | 2 | 3 | 4 | 5,
      comment: formData.comment,
    };

    // Submit to parent
    onReviewSubmit(newReview);

    // Reset form
    setFormData({ author: "", rating: 5, comment: "" });
    setIsSubmitted(true);

    // Clear success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-charbon/5 border border-charbon/10 rounded p-6">
      <h3 className="font-display text-2xl tracking-wide text-charbon mb-4">
        Partager votre avis
      </h3>

      {isSubmitted && (
        <div className="mb-4 p-3 bg-sauge/20 border border-sauge text-charbon font-ui text-sm rounded">
          Merci ! Votre avis a été ajouté (session uniquement).
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="font-ui font-bold text-xs uppercase tracking-widest text-gris block mb-1">
            Votre nom
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            className="w-full px-4 py-2 bg-creme border border-charbon/20 rounded focus:outline-none focus:ring-2 focus:ring-charbon font-ui text-charbon"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="font-ui font-bold text-xs uppercase tracking-widest text-gris block mb-1">
            Note
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-creme border border-charbon/20 rounded focus:outline-none focus:ring-2 focus:ring-charbon font-ui text-charbon"
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Très bon</option>
            <option value={3}>⭐⭐⭐ Bon</option>
            <option value={2}>⭐⭐ Passable</option>
            <option value={1}>⭐ Mauvais</option>
          </select>
        </div>

        <div>
          <label htmlFor="comment" className="font-ui font-bold text-xs uppercase tracking-widest text-gris block mb-1">
            Votre avis
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Partagez votre expérience avec cette chaussette..."
            rows={4}
            className="w-full px-4 py-2 bg-creme border border-charbon/20 rounded focus:outline-none focus:ring-2 focus:ring-charbon font-ui text-charbon resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-acidule text-charbon font-ui font-bold text-sm uppercase tracking-wider py-3 px-4 rounded hover:bg-charbon hover:text-creme transition-colors duration-150 min-h-[44px]"
        >
          Soumettre mon avis
        </button>
      </form>

      <p className="font-ui text-xs text-gris/70 mt-4 italic">
        Les avis sont stockés en session uniquement (démonstration).
      </p>
    </div>
  );
}
