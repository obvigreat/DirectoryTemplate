"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Review } from "@/lib/supabase/database.types";
import ReviewCard from "./review-card";

interface FormattedReview {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export default function RealtimeReviews({
  initialReviews,
  listingId,
}: {
  initialReviews: FormattedReview[];
  listingId: number;
}) {
  const [reviews, setReviews] = useState<FormattedReview[]>(initialReviews);
  const supabase = createClient();

  useEffect(() => {
    // Set up realtime subscription
    const channel = supabase
      .channel(`reviews-${listingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
          filter: `listing_id=eq.${listingId}`,
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            // Fetch user details for the new review
            const { data: userData } = await supabase
              .from("users")
              .select("name, avatar_url")
              .eq("id", payload.new.user_id)
              .single();

            const newReview: FormattedReview = {
              id: payload.new.id,
              user: {
                name: userData?.name || "Anonymous",
                avatar:
                  userData?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.new.user_id}`,
              },
              rating: payload.new.rating,
              comment: payload.new.comment,
              date: payload.new.created_at,
            };

            setReviews((prev) => [newReview, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setReviews((prev) =>
              prev.map((review) =>
                review.id === payload.new.id
                  ? {
                      ...review,
                      rating: payload.new.rating,
                      comment: payload.new.comment,
                    }
                  : review,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setReviews((prev) =>
              prev.filter((review) => review.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, listingId]);

  // Update reviews when initialReviews changes (e.g., from server)
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {reviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to leave a review!
        </div>
      )}
    </div>
  );
}
