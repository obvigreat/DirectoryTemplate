import { Button } from "@/components/ui/button";
import ListingCard from "@/components/listing-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RelatedListingsProps {
  category?: string;
  currentListingId?: number;
  listings?: any[];
}

export default function RelatedListings({
  category,
  currentListingId,
  listings = [],
}: RelatedListingsProps) {
  // Filter out the current listing if provided
  const filteredListings = currentListingId
    ? listings.filter((listing) => listing.id !== currentListingId)
    : listings;

  // If no listings are provided, use these mock listings
  const displayListings =
    filteredListings.length > 0
      ? filteredListings
      : [
          {
            id: 2,
            title: "Artisan Bakery",
            category: "Food & Drink",
            location: "New York, NY",
            rating: 4.7,
            reviews: 98,
            image:
              "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&q=80",
          },
          {
            id: 3,
            title: "Riverside Cafe",
            category: "Food & Drink",
            location: "New York, NY",
            rating: 4.6,
            reviews: 87,
            image:
              "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
          },
          {
            id: 4,
            title: "The Tea House",
            category: "Food & Drink",
            location: "New York, NY",
            rating: 4.9,
            reviews: 112,
            image:
              "https://images.unsplash.com/photo-1525480122447-64809d765a1a?w=800&q=80",
          },
        ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Similar Listings</h2>
        <Button
          variant="ghost"
          className="text-blue-600 flex items-center gap-1"
          asChild
        >
          <Link
            href={
              category
                ? `/listings?category=${encodeURIComponent(category)}`
                : "/listings"
            }
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
