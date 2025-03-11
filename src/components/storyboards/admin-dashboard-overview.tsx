import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  ListFilter,
  Star,
  MessageSquare,
  Calendar,
  TrendingUp,
  Activity,
  Settings,
  Plus,
} from "lucide-react";

export default function AdminDashboardOverview() {
  // Mock data for demonstration
  const stats = {
    users: 1248,
    listings: 356,
    reviews: 892,
    categories: 24,
    bookings: 178,
    messages: 43,
  };

  const recentListings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      status: "active",
      user: "John Smith",
      created_at: "2023-10-15T14:30:00Z",
    },
    {
      id: 2,
      title: "Luxury Hotel & Spa",
      status: "pending",
      user: "Sarah Johnson",
      created_at: "2023-10-14T09:15:00Z",
    },
    {
      id: 3,
      title: "Tech Hub Coworking",
      status: "active",
      user: "Michael Brown",
      created_at: "2023-10-13T16:45:00Z",
    },
  ];

  const recentReviews = [
    {
      id: 1,
      user: "Emma Wilson",
      listing: "Downtown Coffee Shop",
      rating: 5,
      comment: "Amazing coffee and atmosphere! Will definitely be back.",
      created_at: "2023-10-15T10:20:00Z",
    },
    {
      id: 2,
      user: "David Lee",
      listing: "Luxury Hotel & Spa",
      rating: 4,
      comment: "Great experience overall. The spa services were excellent.",
      created_at: "2023-10-14T18:30:00Z",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Jessica Taylor",
      email: "jessica@example.com",
      role: "user",
      created_at: "2023-10-15T08:45:00Z",
    },
    {
      id: 2,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "user",
      created_at: "2023-10-14T14:20:00Z",
    },
    {
      id: 3,
      name: "Amanda Miller",
      email: "amanda@example.com",
      role: "admin",
      created_at: "2023-10-13T11:10:00Z",
    },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your directory platform
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.users}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                View All Users
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Listings
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.listings}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <ListFilter className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                View All Listings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Reviews
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.reviews}</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Categories
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.categories}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <ListFilter className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                Manage Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add New Listing
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add New Category
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add New User
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="w-4 h-4 mr-2" /> System Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="w-4 h-4 mr-2" /> View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Recent Listings */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <ListFilter className="w-5 h-5 mr-2 text-green-600" /> Recent
                  Listings
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs">
                        <th className="text-left py-2 px-3 font-medium">
                          Title
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Status
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Created By
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentListings.map((listing) => (
                        <tr
                          key={listing.id}
                          className="border-b hover:bg-gray-50 text-sm"
                        >
                          <td className="py-2 px-3">
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              {listing.title}
                            </a>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                listing.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : listing.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {listing.status}
                            </span>
                          </td>
                          <td className="py-2 px-3">{listing.user}</td>
                          <td className="py-2 px-3 text-gray-500">
                            {formatDate(listing.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Reviews */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" /> Recent
                  Reviews
                </h3>
                <div className="space-y-3">
                  {recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-3 last:border-0"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-gray-500">
                            Reviewed{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              {review.listing}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(review.created_at)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mt-1 text-gray-700">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Users */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" /> Recent Users
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs">
                        <th className="text-left py-2 px-3 font-medium">
                          Name
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Email
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Role
                        </th>
                        <th className="text-left py-2 px-3 font-medium">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-gray-50 text-sm"
                        >
                          <td className="py-2 px-3">
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              {user.name}
                            </a>
                          </td>
                          <td className="py-2 px-3">{user.email}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : user.role === "moderator"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-500">
                            {formatDate(user.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Bookings
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.bookings}</h3>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Unread Messages
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.messages}</h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Platform Growth
                </p>
                <h3 className="text-2xl font-bold mt-1">+12%</h3>
              </div>
              <div className="p-2 bg-emerald-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
