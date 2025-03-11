"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ReviewCard from "./review-card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface RecentReviewsProps {
  limit?: number;
  title?: string;
  showViewAll?: boolean;
}

export default function RecentReviews({
  limit = 3,
  title = "Recent Reviews",
  showViewAll = true,
}: RecentReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const supabase = createClient();

      try {
        // Fetch recent reviews with user and listing info
        const { data, error } = await supabase
          .from("reviews")
          .select("*, users(name, avatar_url), listings(id, title, image_url)")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw error;

        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [limit]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="space-y-4">
          {Array(limit)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <div className="ml-auto">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Button
            variant="ghost"
            className="text-blue-600 flex items-center gap-1"
            asChild
          >
            <Link href="/listings">
              View All Listings <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={{
              id: review.id,
              rating: review.rating,
              comment: review.comment,
              created_at: review.created_at,
              user: {
                name: review.users?.name || "Anonymous",
                avatar_url: review.users?.avatar_url,
              },
              listing: {
                id: review.listings?.id,
                title: review.listings?.title || "Unknown Listing",
                image_url: review.listings?.image_url,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
