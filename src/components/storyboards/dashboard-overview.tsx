import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Heart, Star, Eye, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function DashboardOverviewStoryboard() {
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    created_at: "2023-01-15T00:00:00Z",
  };

  // Mock data for recent activity
  const recentActivity = [
    { type: "view", listing: "Downtown Coffee Shop", date: "2 hours ago" },
    { type: "save", listing: "Sunset Yoga Studio", date: "Yesterday" },
    { type: "review", listing: "Tech Hub Coworking", date: "3 days ago" },
  ];

  // Mock data for saved listings
  const savedListings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      category: "Food & Drink",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    },
    {
      id: 2,
      title: "Sunset Yoga Studio",
      category: "Health & Fitness",
      location: "Los Angeles, CA",
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    },
  ];

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userData.name}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Manage your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCircle size={40} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Link href="/dashboard/settings">Edit Profile</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-sm">
                  Subscription Status
                </h4>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Active Premium Plan</span>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-sm">Saved Listings</h4>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">
                    {savedListings.length} saved listings
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {activity.type === "view" && (
                      <Eye className="w-4 h-4 text-blue-600" />
                    )}
                    {activity.type === "save" && (
                      <Heart className="w-4 h-4 text-red-500" />
                    )}
                    {activity.type === "review" && (
                      <Star className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.type === "view" && "Viewed"}
                      {activity.type === "save" && "Saved"}
                      {activity.type === "review" && "Reviewed"}{" "}
                      <span className="font-semibold">{activity.listing}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Saved Listings Section */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Listings</CardTitle>
            <CardDescription>
              Places you've bookmarked for later
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Link href="/dashboard/saved">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedListings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-lg overflow-hidden border border-gray-200 bg-white"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">{listing.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {listing.category}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Link href={`/listings/${listing.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>
            Your scheduled meetings and bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium mb-1">
              No Upcoming Appointments
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You don't have any appointments scheduled at the moment.
            </p>
            <Button variant="outline">
              <Link href="/listings">Browse Listings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
