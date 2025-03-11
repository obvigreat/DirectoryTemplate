"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

type PendingListing = {
  id: string;
  title: string;
  created_at: string;
  user_name: string;
};

type PendingReview = {
  id: string;
  listing_id: string;
  listing_title: string;
  rating: number;
  created_at: string;
  user_name: string;
};

export default function AdminPendingItems() {
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPendingItems() {
      try {
        const supabase = createClient();

        // Fetch pending listings
        const { data: listings, error: listingsError } = await supabase
          .from("listings")
          .select("id, title, created_at, users(name)")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5);

        if (listingsError) throw listingsError;

        // Fetch pending reviews (if you have a review approval system)
        const { data: reviews, error: reviewsError } = await supabase
          .from("reviews")
          .select(
            "id, rating, created_at, listing_id, users(name), listings(title)",
          )
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5);

        // Format the data
        const formattedListings = (listings || []).map((listing) => ({
          id: listing.id,
          title: listing.title,
          created_at: listing.created_at,
          user_name: listing.users?.name || "Unknown User",
        }));

        const formattedReviews = (reviews || []).map((review) => ({
          id: review.id,
          listing_id: review.listing_id,
          listing_title: review.listings?.title || "Unknown Listing",
          rating: review.rating,
          created_at: review.created_at,
          user_name: review.users?.name || "Anonymous",
        }));

        setPendingListings(formattedListings);
        setPendingReviews(formattedReviews || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pending items:", error);
        setError("Failed to load pending items");
        setIsLoading(false);
      }
    }

    fetchPendingItems();
  }, []);

  const approveListing = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("listings")
        .update({ status: "active" })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setPendingListings(
        pendingListings.filter((listing) => listing.id !== id),
      );
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  const rejectListing = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("listings")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setPendingListings(
        pendingListings.filter((listing) => listing.id !== id),
      );
    } catch (error) {
      console.error("Error rejecting listing:", error);
    }
  };

  const approveReview = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("reviews")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setPendingReviews(pendingReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const rejectReview = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("reviews")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setPendingReviews(pendingReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error rejecting review:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="listings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listings">
              Listings
              {pendingListings.length > 0 && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  {pendingListings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews
              {pendingReviews.length > 0 && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  {pendingReviews.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : pendingListings.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No pending listings to approve
              </div>
            ) : (
              <div className="space-y-4">
                {pendingListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="border rounded-lg p-3 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{listing.title}</h4>
                        <p className="text-sm text-gray-500">
                          By {listing.user_name} on{" "}
                          {formatDate(listing.created_at)}
                        </p>
                      </div>
                      <Link href={`/admin/listings/${listing.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => rejectListing(listing.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button
                        size="sm"
                        className="text-white bg-green-600 hover:bg-green-700"
                        onClick={() => approveListing(listing.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </div>
                  </div>
                ))}

                {pendingListings.length > 5 && (
                  <div className="pt-2">
                    <Link href="/admin/listings?status=pending">
                      <Button variant="outline" size="sm" className="w-full">
                        View All Pending Listings
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : pendingReviews.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No pending reviews to approve
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border rounded-lg p-3 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          Review for {review.listing_title}
                        </h4>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          By {review.user_name} on{" "}
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                      <Link href={`/admin/listings/${review.listing_id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => rejectReview(review.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button
                        size="sm"
                        className="text-white bg-green-600 hover:bg-green-700"
                        onClick={() => approveReview(review.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </div>
                  </div>
                ))}

                {pendingReviews.length > 5 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Pending Reviews
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
