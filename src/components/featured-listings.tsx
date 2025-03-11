"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ListingCard from "./listing-card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface FeaturedListingsProps {
  limit?: number;
  title?: string;
  showViewAll?: boolean;
}

export default function FeaturedListings({
  limit = 6,
  title = "Featured Listings",
  showViewAll = true,
}: FeaturedListingsProps) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      const supabase = createClient();

      try {
        // Fetch featured listings
        const { data, error } = await supabase
          .from("listings")
          .select("*, categories(*)")
          .eq("status", "active")
          .order("rating", { ascending: false })
          .limit(limit);

        if (error) {
          console.error("Supabase error:", error);
          setError("Failed to load listings");
          return;
        }

        setListings(data || []);
      } catch (err) {
        console.error("Error fetching featured listings:", err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [limit]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
          <p className="mb-2">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(limit)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
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
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
