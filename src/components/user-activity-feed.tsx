"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Star,
  Heart,
  Calendar,
  Eye,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Store,
  Flag,
} from "lucide-react";
import Link from "next/link";

type ActivityItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  link?: string;
  entityId?: string;
  entityType?: string;
};

export default function UserActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    async function fetchActivity() {
      try {
        setLoading(true);

        // In a real app, fetch from your API
        // const { data: { user } } = await supabase.auth.getUser();
        // if (!user) return;
        //
        // const { data, error } = await supabase
        //   .from('user_activity')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });
        //
        // if (error) throw error;
        // setActivities(data || []);

        // Mock data for demonstration
        const mockActivities: ActivityItem[] = [
          {
            id: "1",
            type: "message",
            title: "New Message",
            description:
              "You received a message from Jane Smith about your Coffee Shop listing",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            link: "/dashboard/messages",
            entityId: "msg123",
            entityType: "message",
          },
          {
            id: "2",
            type: "booking",
            title: "Booking Confirmed",
            description:
              "Your reservation at Downtown Restaurant has been confirmed for tomorrow at 7:00 PM",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            status: "confirmed",
            link: "/dashboard/bookings",
            entityId: "book456",
            entityType: "booking",
          },
          {
            id: "3",
            type: "review",
            title: "New Review",
            description:
              "Your listing 'City Cafe' received a 5-star review from Michael Johnson",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
            link: "/dashboard/listings",
            entityId: "rev789",
            entityType: "review",
          },
          {
            id: "4",
            type: "listing",
            title: "Listing Updated",
            description:
              "You updated the details for 'Downtown Fitness Center'",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            link: "/dashboard/listings/123",
            entityId: "list123",
            entityType: "listing",
          },
          {
            id: "5",
            type: "saved",
            title: "Listing Saved",
            description: "You saved 'Beachfront Restaurant' to your favorites",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 2,
            ).toISOString(), // 2 days ago
            link: "/dashboard/saved",
            entityId: "save456",
            entityType: "saved_listing",
          },
          {
            id: "6",
            type: "booking",
            title: "Booking Cancelled",
            description: "Your reservation at City Spa has been cancelled",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 3,
            ).toISOString(), // 3 days ago
            status: "cancelled",
            link: "/dashboard/bookings",
            entityId: "book789",
            entityType: "booking",
          },
          {
            id: "7",
            type: "report",
            title: "Report Submitted",
            description: "You reported an issue with 'Downtown Bar' listing",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 4,
            ).toISOString(), // 4 days ago
            status: "pending",
            entityId: "rep123",
            entityType: "report",
          },
          {
            id: "8",
            type: "profile",
            title: "Profile Updated",
            description: "You updated your profile information",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 5,
            ).toISOString(), // 5 days ago
            link: "/dashboard/settings",
            entityType: "profile",
          },
          {
            id: "9",
            type: "subscription",
            title: "Subscription Activated",
            description: "Your Premium subscription has been activated",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 7,
            ).toISOString(), // 7 days ago
            link: "/dashboard/subscription",
            entityType: "subscription",
          },
          {
            id: "10",
            type: "view",
            title: "Listing Viewed",
            description:
              "Your listing 'City Cafe' has been viewed 25 times this week",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 8,
            ).toISOString(), // 8 days ago
            link: "/dashboard/listings/analytics",
            entityId: "list789",
            entityType: "listing",
          },
        ];

        setActivities(mockActivities);
      } catch (err: any) {
        console.error("Error fetching activity:", err);
        setError(err.message || "Failed to load activity feed");
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  const getActivityIcon = (type: string, status?: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "booking":
        if (status === "confirmed")
          return <CheckCircle className="h-5 w-5 text-green-500" />;
        if (status === "cancelled")
          return <XCircle className="h-5 w-5 text-red-500" />;
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "listing":
        return <Store className="h-5 w-5 text-indigo-500" />;
      case "saved":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "report":
        return <Flag className="h-5 w-5 text-red-500" />;
      case "profile":
        return <User className="h-5 w-5 text-gray-500" />;
      case "subscription":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "view":
        return <Eye className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
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

  const filteredActivities =
    activeTab === "all"
      ? activities
      : activities.filter((activity) => activity.type === activeTab);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Recent Activity</span>
          <Clock className="h-5 w-5 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="review">Reviews</TabsTrigger>
            <TabsTrigger value="listing">Listings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="m-0">
            {loading ? (
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
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No activity found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {getActivityIcon(activity.type, activity.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">
                          {activity.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      {activity.link && (
                        <Link
                          href={activity.link}
                          className="text-xs text-blue-600 hover:underline mt-2 inline-flex items-center"
                        >
                          View Details <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <Link href="/dashboard/activity">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
