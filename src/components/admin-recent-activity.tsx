"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus, Store, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

type ActivityItem = {
  id: string;
  type: "user" | "listing" | "review" | "message";
  title: string;
  description: string;
  timestamp: string;
  link: string;
};

export default function AdminRecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const supabase = createClient();
        const now = new Date();

        // Fetch recent users
        const { data: recentUsers, error: usersError } = await supabase
          .from("users")
          .select("id, name, email, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        if (usersError) throw usersError;

        // Fetch recent listings
        const { data: recentListings, error: listingsError } = await supabase
          .from("listings")
          .select("id, title, status, created_at, users(name)")
          .order("created_at", { ascending: false })
          .limit(5);

        if (listingsError) throw listingsError;

        // Fetch recent reviews
        const { data: recentReviews, error: reviewsError } = await supabase
          .from("reviews")
          .select("id, rating, created_at, users(name), listings(id, title)")
          .order("created_at", { ascending: false })
          .limit(5);

        if (reviewsError) throw reviewsError;

        // Fetch recent messages
        const { data: recentMessages, error: messagesError } = await supabase
          .from("messages")
          .select(
            "id, content, created_at, sender_id, users!messages_sender_id_fkey(name)",
          )
          .order("created_at", { ascending: false })
          .limit(5);

        if (messagesError) throw messagesError;

        // Format users
        const userActivities: ActivityItem[] = (recentUsers || []).map(
          (user) => ({
            id: `user-${user.id}`,
            type: "user",
            title: "New User Registered",
            description: `${user.name || user.email} joined the platform`,
            timestamp: user.created_at,
            link: `/admin/users/${user.id}`,
          }),
        );

        // Format listings
        const listingActivities: ActivityItem[] = (recentListings || []).map(
          (listing) => ({
            id: `listing-${listing.id}`,
            type: "listing",
            title: "New Listing Created",
            description: `"${listing.title}" by ${listing.users?.name || "Unknown"}`,
            timestamp: listing.created_at,
            link: `/admin/listings/${listing.id}`,
          }),
        );

        // Format reviews
        const reviewActivities: ActivityItem[] = (recentReviews || []).map(
          (review) => ({
            id: `review-${review.id}`,
            type: "review",
            title: "New Review Posted",
            description: `${review.users?.name || "Anonymous"} rated ${review.listings?.title || "a listing"} ${review.rating}/5`,
            timestamp: review.created_at,
            link: `/admin/listings/${review.listings?.id}`,
          }),
        );

        // Format messages
        const messageActivities: ActivityItem[] = (recentMessages || []).map(
          (message) => ({
            id: `message-${message.id}`,
            type: "message",
            title: "New Message",
            description: `${message.users?.name || "User"} sent a message`,
            timestamp: message.created_at,
            link: `/admin/messages`,
          }),
        );

        // Combine all activities and sort by timestamp
        const allActivities = [
          ...userActivities,
          ...listingActivities,
          ...reviewActivities,
          ...messageActivities,
        ];
        allActivities.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        setActivities(allActivities.slice(0, 10));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        setError("Failed to load recent activity");
        setIsLoading(false);
      }
    }

    fetchRecentActivity();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "listing":
        return <Store className="h-4 w-4 text-blue-500" />;
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - activityTime.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return activityTime.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No recent activity found
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
