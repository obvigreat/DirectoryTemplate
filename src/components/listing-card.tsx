"use client";

import { useState } from "react";
import { MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    category: string;
    location: string;
    rating: number;
    reviews: number;
    image: string;
    price?: string;
    features?: string[];
    isSaved?: boolean;
    description?: string;
    categories?: any;
    price_level?: number;
    reviews_count?: number;
    image_url?: string;
  };
  showActions?: boolean;
}

export default function ListingCard({
  listing,
  showActions = true,
}: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(listing.isSaved || false);
  const [isLoading, setIsLoading] = useState(false);

  // Format price level as dollar signs
  const formatPriceLevel = (level?: number) => {
    return level ? "$".repeat(level) : "$";
  };

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("listingId", listing.id.toString());

      const response = await fetch("/api/save-listing", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setIsSaved(result.saved);
      }
    } catch (error) {
      console.error("Error saving listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use image_url if available, otherwise use image
  const imageUrl =
    listing.image_url ||
    listing.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

  // Use reviews_count if available, otherwise use reviews
  const reviewsCount = listing.reviews_count || listing.reviews || 0;

  // Get category name
  const categoryName = listing.categories?.name || listing.category || "";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Link href={`/listings/${listing.id}`}>
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
        {showActions && (
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-all"
            onClick={handleSaveToggle}
            disabled={isLoading}
          >
            <Heart
              className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        )}
        {listing.price_level && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {formatPriceLevel(listing.price_level)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {categoryName}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          <Link
            href={`/listings/${listing.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {listing.title}
          </Link>
        </h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="font-medium">
            {listing.rating ? listing.rating.toFixed(1) : "New"}
          </span>
          {reviewsCount > 0 && (
            <span className="text-gray-400 text-sm ml-1">({reviewsCount})</span>
          )}
        </div>
        {listing.features && listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        {listing.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {listing.description}
          </p>
        )}

        {showActions && (
          <div className="mt-4 flex justify-between items-center">
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link
                href={`/listings/${listing.id}`}
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                View Details
              </Link>
            </Button>

            <form action="/api/save-listing" method="POST">
              <input type="hidden" name="listingId" value={listing.id} />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Heart
                  className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
