"use client";

import { useState } from "react";
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

export default function AdminAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month",
  );

  // Mock data for demonstration
  const mockData = {
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
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <header>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Insights and statistics for your directory platform
        </p>
      </header>

      <div className="space-y-6">
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              variant={timeframe === "week" ? "default" : "outline"}
              onClick={() => setTimeframe("week")}
            >
              Week
            </Button>
            <Button
              variant={timeframe === "month" ? "default" : "outline"}
              onClick={() => setTimeframe("month")}
            >
              Month
            </Button>
            <Button
              variant={timeframe === "year" ? "default" : "outline"}
              onClick={() => setTimeframe("year")}
            >
              Year
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {mockData.totalUsers}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${mockData.userGrowth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                    >
                      {mockData.userGrowth >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(mockData.userGrowth)}% from previous {timeframe}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  {mockData.newUsers} new users in the last {timeframe}
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
                    {mockData.totalListings}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${mockData.listingGrowth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                    >
                      {mockData.listingGrowth >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(mockData.listingGrowth)}% from previous{" "}
                      {timeframe}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <ListFilter className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  {mockData.newListings} new listings in the last {timeframe}
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
                    {mockData.totalBookings}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${mockData.bookingGrowth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                    >
                      {mockData.bookingGrowth >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(mockData.bookingGrowth)}% from previous{" "}
                      {timeframe}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  {mockData.newBookings} new bookings in the last {timeframe}
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
                  <h3 className="text-2xl font-bold mt-1">
                    {mockData.avgRating.toFixed(1)}/5
                  </h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${mockData.reviewGrowth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                    >
                      {mockData.reviewGrowth >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(mockData.reviewGrowth)}% reviews from previous{" "}
                      {timeframe}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  {mockData.newReviews} new reviews in the last {timeframe}
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
                Revenue generated over the last {timeframe}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                {/* Simple chart visualization */}
                <div className="h-full flex items-end space-x-2">
                  {mockData.revenueData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t-md"
                        style={{ height: `${(item.amount / 1000) * 100}%` }}
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
                Daily active users over the last {timeframe}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                {/* Simple chart visualization */}
                <div className="h-full flex items-end space-x-2">
                  {mockData.userActivityData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-green-500 rounded-t-md"
                        style={{ height: `${(item.count / 50) * 100}%` }}
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
      </div>
    </div>
  );
}
