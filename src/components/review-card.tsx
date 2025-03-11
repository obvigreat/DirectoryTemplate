import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import Link from "next/link";

interface ReviewCardProps {
  review: {
    id: string | number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
      name: string;
      avatar_url?: string;
    };
    listing?: {
      id: string | number;
      title: string;
      image_url?: string;
    };
  };
  showListing?: boolean;
}

export default function ReviewCard({
  review,
  showListing = true,
}: ReviewCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={review.user.avatar_url} />
            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{review.user.name}</h4>
            {showListing && review.listing && (
              <p className="text-sm text-gray-500">
                Review for{" "}
                <Link
                  href={`/listings/${review.listing.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {review.listing.title}
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatDate(review.created_at)}
          </span>
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>

      {showListing && review.listing && review.listing.image_url && (
        <div className="mt-3 flex items-center">
          <div className="h-12 w-12 rounded overflow-hidden mr-3">
            <img
              src={review.listing.image_url}
              alt={review.listing.title}
              className="h-full w-full object-cover"
            />
          </div>
          <Link
            href={`/listings/${review.listing.id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View Listing
          </Link>
        </div>
      )}
    </div>
  );
}
