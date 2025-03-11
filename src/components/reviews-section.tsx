"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReviewCard from "@/components/review-card";
import { Star } from "lucide-react";
import { useAuth } from "./auth-state-provider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ReviewsSectionProps {
  listingId: number;
  reviews: any[];
  listingTitle?: string;
}

export default function ReviewsSection({
  listingId,
  reviews = [],
  listingTitle = "this listing",
}: ReviewsSectionProps) {
  const { user, isLoading } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null,
  );
  const [displayedReviews, setDisplayedReviews] = useState(3);

  // Calculate average rating
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  // Rating distribution
  const ratingDistribution = {
    5: reviews.filter((r) => Math.round(r.rating) === 5).length,
    4: reviews.filter((r) => Math.round(r.rating) === 4).length,
    3: reviews.filter((r) => Math.round(r.rating) === 3).length,
    2: reviews.filter((r) => Math.round(r.rating) === 2).length,
    1: reviews.filter((r) => Math.round(r.rating) === 1).length,
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("listingId", listingId.toString());
      formData.append("rating", rating.toString());
      formData.append("comment", comment);

      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setComment("");
        setRating(5);
        // Close the form after successful submission
        setTimeout(() => {
          setShowReviewForm(false);
          // Reload the page to show the new review
          window.location.reload();
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to submit review",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while submitting your review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreReviews = () => {
    setDisplayedReviews((prev) => prev + 5);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
        </div>

        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogTrigger asChild>
            <Button disabled={isLoading || !user}>Write a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Write a Review for {listingTitle}
              </h3>

              {message && (
                <div
                  className={`p-4 mb-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star
                          className={`h-8 w-8 ${(hoveredRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Review
                  </label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Share your experience with this business..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rating Distribution */}
      {totalReviews > 0 && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Rating Breakdown</h3>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {averageRating.toFixed(1)} out of 5
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                ratingDistribution[star as keyof typeof ratingDistribution];
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={star} className="flex items-center">
                  <div className="w-12 text-sm">{star} stars</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-xs text-gray-500 text-right">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {totalReviews > 0 ? (
        <div className="space-y-6">
          {reviews.slice(0, displayedReviews).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {displayedReviews < totalReviews && (
            <Button
              variant="outline"
              className="w-full"
              onClick={loadMoreReviews}
            >
              Load More Reviews
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            No reviews yet. Be the first to review this listing!
          </p>
          {!isLoading && user ? (
            <Button onClick={() => setShowReviewForm(true)}>
              Write a Review
            </Button>
          ) : (
            <Button asChild>
              <a href={`/sign-in?callbackUrl=/listings/${listingId}`}>
                Sign In to Review
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
