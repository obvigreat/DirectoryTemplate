"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Listing } from "@/lib/supabase/database.types";
import ListingCard from "./listing-card";

export default function RealtimeListings({
  initialListings,
  category,
}: {
  initialListings: Listing[];
  category?: string;
}) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const supabase = createClient();

  useEffect(() => {
    // Set up realtime subscription
    let query = supabase
      .channel("listings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "listings",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Only add if it matches the category filter
            if (!category || payload.new.category === category) {
              setListings((prev) => [payload.new as Listing, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            setListings((prev) =>
              prev.map((listing) =>
                listing.id === payload.new.id
                  ? (payload.new as Listing)
                  : listing,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setListings((prev) =>
              prev.filter((listing) => listing.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(query);
    };
  }, [supabase, category]);

  // Update listings when initialListings changes (e.g., from server)
  useEffect(() => {
    setListings(initialListings);
  }, [initialListings]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
