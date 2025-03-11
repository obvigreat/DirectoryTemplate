"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { submitReview } from "@/lib/actions/reviews";

interface ReviewFormProps {
  listingId: number;
  onSubmit?: (review: { rating: number; comment: string }) => void;
  onCancel?: () => void;
}

export default function ReviewForm({
  listingId,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("listingId", listingId.toString());
      formData.append("rating", rating.toString());
      formData.append("comment", comment);

      const result = await submitReview(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        // Call the onSubmit callback if provided
        if (onSubmit) {
          onSubmit({ rating, comment });
        }

        // Reset form
        setRating(0);
        setComment("");
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${(hoverRating || rating) >= star ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
          {rating === 0 && (
            <p className="text-sm text-red-500 mt-1">Please select a rating</p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this place..."
            rows={4}
            required
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={rating === 0 || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
