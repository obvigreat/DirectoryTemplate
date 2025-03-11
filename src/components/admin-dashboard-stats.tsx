"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Store,
  Star,
  MessageSquare,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function AdminDashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalReviews: 0,
    totalMessages: 0,
    activeListings: 0,
    pendingListings: 0,
    averageRating: 0,
    newUsersThisMonth: 0,
    isLoading: true,
    error: null as string | null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient();
        const now = new Date();
        const firstDayOfMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          1,
        ).toISOString();

        // Fetch total users
        const { count: totalUsers } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        // Fetch new users this month
        const { count: newUsersThisMonth } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .gte("created_at", firstDayOfMonth);

        // Fetch total listings
        const { count: totalListings } = await supabase
          .from("listings")
          .select("*", { count: "exact", head: true });

        // Fetch active listings
        const { count: activeListings } = await supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("status", "active");

        // Fetch pending listings
        const { count: pendingListings } = await supabase
          .from("listings")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        // Fetch total reviews
        const { count: totalReviews } = await supabase
          .from("reviews")
          .select("*", { count: "exact", head: true });

        // Fetch total messages
        const { count: totalMessages } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true });

        // Fetch average rating
        const { data: ratingData } = await supabase
          .from("listings")
          .select("rating")
          .not("rating", "is", null);

        let averageRating = 0;
        if (ratingData && ratingData.length > 0) {
          const sum = ratingData.reduce(
            (acc, curr) => acc + (curr.rating || 0),
            0,
          );
          averageRating = parseFloat((sum / ratingData.length).toFixed(1));
        }

        setStats({
          totalUsers: totalUsers || 0,
          totalListings: totalListings || 0,
          totalReviews: totalReviews || 0,
          totalMessages: totalMessages || 0,
          activeListings: activeListings || 0,
          pendingListings: pendingListings || 0,
          averageRating,
          newUsersThisMonth: newUsersThisMonth || 0,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setStats({
          ...stats,
          isLoading: false,
          error: "Failed to load statistics",
        });
      }
    }

    fetchStats();
  }, []);

  if (stats.error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p>Error: {stats.error}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.isLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              stats.totalUsers
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.newUsersThisMonth} new this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.isLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              stats.totalListings
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>{stats.activeListings} active</span>
            <span>{stats.pendingListings} pending</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.isLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              stats.totalReviews
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Avg. Rating: {stats.averageRating}/5
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.isLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              stats.totalMessages
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total conversations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
