import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  MapPin,
  Users,
  ListFilter,
  Star,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  MessageSquare,
} from "lucide-react";

export default function AdminAnalytics() {
  // Mock data for demonstration
  const stats = {
    totalUsers: 1245,
    totalListings: 876,
    totalBookings: 432,
    totalReviews: 1893,
    totalMessages: 542,
    newUsers: 87,
    newListings: 42,
    newBookings: 65,
    newReviews: 124,
    userGrowth: 12,
    listingGrowth: 8,
    bookingGrowth: 15,
    reviewGrowth: 18,
    avgRating: 4.7,
    categories: [
      { name: "Restaurants", count: 245 },
      { name: "Hotels", count: 187 },
      { name: "Shopping", count: 156 },
      { name: "Entertainment", count: 98 },
      { name: "Services", count: 190 },
    ],
    topLocations: [
      { location: "New York", count: 145 },
      { location: "Los Angeles", count: 112 },
      { location: "Chicago", count: 87 },
      { location: "Miami", count: 76 },
      { location: "San Francisco", count: 68 },
    ],
    revenueData: [
      { date: "Jan 1", amount: 450 },
      { date: "Jan 2", amount: 520 },
      { date: "Jan 3", amount: 480 },
      { date: "Jan 4", amount: 600 },
      { date: "Jan 5", amount: 580 },
      { date: "Jan 6", amount: 650 },
      { date: "Jan 7", amount: 700 },
    ],
    userActivityData: [
      { date: "Jan 1", count: 25 },
      { date: "Jan 2", count: 32 },
      { date: "Jan 3", count: 28 },
      { date: "Jan 4", count: 35 },
      { date: "Jan 5", count: 40 },
      { date: "Jan 6", count: 38 },
      { date: "Jan 7", count: 42 },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and statistics for your directory platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Week</Button>
          <Button>Month</Button>
          <Button variant="outline">Year</Button>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalUsers}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stats.userGrowth}% from last month
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {stats.newUsers} new users in the last month
              </p>
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
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalListings}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stats.listingGrowth}% from last month
                  </span>
                </div>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <ListFilter className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {stats.newListings} new listings in the last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalBookings}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stats.bookingGrowth}% from last month
                  </span>
                </div>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {stats.newBookings} new bookings in the last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Rating
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.avgRating}/5</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stats.reviewGrowth}% reviews from last month
                  </span>
                </div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {stats.newReviews} new reviews in the last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Revenue generated over the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              {/* Simple chart visualization */}
              <div className="h-full flex items-end space-x-2">
                {stats.revenueData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-md"
                      style={{ height: `${(item.amount / 700) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-600">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>
              Daily active users over the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              {/* Simple chart visualization */}
              <div className="h-full flex items-end space-x-2">
                {stats.userActivityData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-green-500 rounded-t-md"
                      style={{ height: `${(item.count / 42) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-600">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Listings by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      {category.count} listings
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(category.count / stats.totalListings) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <CardDescription>Most popular listing locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-medium">{location.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                      {location.count} listings
                    </span>
                    <span className="ml-2 text-xs bg-gray-100 text-gray-800 py-0.5 px-2 rounded-full">
                      {Math.round((location.count / stats.totalListings) * 100)}
                      %
                    </span>
                  </div>
                </div>
              ))}
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
                  Messages
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalMessages}
                </h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">7.5%</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  User Retention
                </p>
                <h3 className="text-2xl font-bold mt-1">78%</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>
            Explore detailed metrics by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">User Growth</h3>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.userGrowth}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Compared to previous month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">New Users</h3>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold">{stats.newUsers}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In the last month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Retention Rate</h3>
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-2xl font-bold">78%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Users returning within 30 days
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">User Registration Timeline</h3>
                <div className="h-40 w-full">
                  {/* Simple line chart visualization */}
                  <div className="h-full flex items-end space-x-2">
                    {stats.userActivityData.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-blue-500 rounded-t-md"
                          style={{ height: `${(item.count / 42) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-1 text-gray-600">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="listings" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Listing Growth</h3>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.listingGrowth}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Compared to previous month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">New Listings</h3>
                  <div className="flex items-center">
                    <ListFilter className="w-5 h-5 text-indigo-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.newListings}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In the last month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Avg. Views per Listing</h3>
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-2xl font-bold">124</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In the last month
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {stats.categories.slice(0, 5).map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-gray-500">
                            {category.count} listings
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${(category.count / stats.totalListings) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Booking Growth</h3>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.bookingGrowth}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Compared to previous month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">New Bookings</h3>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.newBookings}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In the last month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Conversion Rate</h3>
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-2xl font-bold">8.2%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Visits to bookings ratio
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Booking Timeline</h3>
                <div className="h-40 w-full">
                  {/* Simple line chart visualization */}
                  <div className="h-full flex items-end space-x-2">
                    {stats.revenueData.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-orange-500 rounded-t-md"
                          style={{ height: `${(item.amount / 700) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-1 text-gray-600">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Review Growth</h3>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.reviewGrowth}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Compared to previous month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">New Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.newReviews}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In the last month
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Average Rating</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.avgRating}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Across all listings
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage =
                      rating === 5
                        ? 45
                        : rating === 4
                          ? 30
                          : rating === 3
                            ? 15
                            : rating === 2
                              ? 7
                              : 3;
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="w-8 text-sm font-medium">
                          {rating} ★
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-right text-sm text-gray-500">
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
