"use client";

import { useState, useEffect } from "react";
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
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Flag,
  ListFilter,
  Users,
  Star,
  MessageSquare,
} from "lucide-react";

interface ReportsAnalyticsProps {
  timeframe: "week" | "month" | "year";
  onTimeframeChange: (timeframe: "week" | "month" | "year") => void;
}

export default function AdminReportsAnalytics({
  timeframe,
  onTimeframeChange,
}: ReportsAnalyticsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    total: 0,
    byType: {} as Record<string, number>,
    byStatus: {
      pending: 0,
      investigating: 0,
      resolved: 0,
      dismissed: 0,
    },
    trends: [] as { date: string; count: number }[],
  });

  useEffect(() => {
    async function fetchReportsAnalytics() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/analytics/reports?timeframe=${timeframe}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reports analytics");
        }

        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err: any) {
        console.error("Error fetching reports analytics:", err);
        setError(err.message || "Failed to load reports analytics");

        // Set mock data for development/demo purposes
        setMockData();
      } finally {
        setLoading(false);
      }
    }

    fetchReportsAnalytics();
  }, [timeframe]);

  // Helper function to set mock data when API fails
  function setMockData() {
    setData({
      total: 87,
      byType: {
        listing: 42,
        user: 28,
        review: 15,
        message: 2,
      },
      byStatus: {
        pending: 35,
        investigating: 18,
        resolved: 24,
        dismissed: 10,
      },
      trends: generateMockTrends(),
    });
  }

  function generateMockTrends() {
    const trends = [];
    const now = new Date();
    const points = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 12;

    for (let i = 0; i < points; i++) {
      const date = new Date(now);
      let label: string;

      if (timeframe === "year") {
        date.setMonth(date.getMonth() - i);
        label = date.toLocaleString("default", { month: "short" });
      } else {
        date.setDate(date.getDate() - i);
        label = date.toLocaleDateString("default", {
          month: "short",
          day: "numeric",
        });
      }

      const count = Math.floor(Math.random() * 5) + 1;
      trends.push({ date: label, count });
    }

    return trends.reverse();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "investigating":
        return <Activity className="w-5 h-5 text-blue-600" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "dismissed":
        return <XCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "listing":
        return <ListFilter className="w-5 h-5 text-indigo-600" />;
      case "user":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "review":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      default:
        return <Flag className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports Analytics</h2>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "week" ? "default" : "outline"}
            onClick={() => onTimeframeChange("week")}
          >
            Week
          </Button>
          <Button
            variant={timeframe === "month" ? "default" : "outline"}
            onClick={() => onTimeframeChange("month")}
          >
            Month
          </Button>
          <Button
            variant={timeframe === "year" ? "default" : "outline"}
            onClick={() => onTimeframeChange("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-md text-center">
          <p className="mb-2">Using demo data for visualization purposes</p>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Reports
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{data.total}</h3>
                  </div>
                  <div className="p-2 bg-red-100 rounded-full">
                    <Flag className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {data.byStatus.pending || 0}
                    </h3>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Investigating
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {data.byStatus.investigating || 0}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Resolved
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {data.byStatus.resolved || 0}
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reports Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Report Trends</CardTitle>
                <CardDescription>
                  Reports received over the last {timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* Simple chart visualization */}
                  <div className="h-full flex items-end space-x-2">
                    {data.trends.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-red-500 rounded-t-md"
                          style={{ height: `${(item.count / 5) * 100}%` }}
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

            {/* Reports by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Reports by Type</CardTitle>
                <CardDescription>
                  Distribution of reports by content type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data.byType).map(([type, count], index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            {getTypeIcon(type)}
                          </div>
                          <span className="font-medium capitalize">{type}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {count} reports
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{
                            width: `${(count / data.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Report Status Distribution</CardTitle>
              <CardDescription>Current status of all reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(data.byStatus).map(([status, count], index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-full mr-2">
                        {getStatusIcon(status)}
                      </div>
                      <h3 className="font-medium capitalize">{status}</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">{count}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({Math.round((count / data.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
