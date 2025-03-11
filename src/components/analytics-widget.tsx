"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Calendar,
} from "lucide-react";

type AnalyticsData = {
  views: number;
  viewsChange: number;
  visitors: number;
  visitorsChange: number;
  bookings: number;
  bookingsChange: number;
  messages: number;
  messagesChange: number;
  viewsByDay: { date: string; count: number }[];
  viewsBySource: { source: string; count: number }[];
};

export default function AnalyticsWidget() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);

        // In a real app, fetch from your API
        // const { data: { user } } = await supabase.auth.getUser();
        // if (!user) return;
        //
        // const response = await fetch(`/api/user/analytics?timeframe=${timeframe}`);
        // if (!response.ok) throw new Error('Failed to fetch analytics');
        // const analyticsData = await response.json();
        // setData(analyticsData);

        // Mock data for demonstration
        const mockData: AnalyticsData = {
          views: 1245,
          viewsChange: 12.5,
          visitors: 876,
          visitorsChange: 8.3,
          bookings: 32,
          bookingsChange: -5.2,
          messages: 64,
          messagesChange: 15.7,
          viewsByDay: generateMockTimeSeriesData(timeframe),
          viewsBySource: [
            { source: "Direct", count: 450 },
            { source: "Search", count: 320 },
            { source: "Social", count: 280 },
            { source: "Referral", count: 195 },
          ],
        };

        // Simulate API delay
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800);
      } catch (err: any) {
        console.error("Error fetching analytics:", err);
        setError(err.message || "Failed to load analytics");
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [timeframe]);

  // Helper function to generate mock time series data
  function generateMockTimeSeriesData(timeframe: string) {
    const data = [];
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

      const count = Math.floor(Math.random() * 100) + 20;
      data.push({ date: label, count });
    }

    return data.reverse();
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-gray-500" />
            Analytics Overview
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant={timeframe === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("week")}
              className="h-7 text-xs"
            >
              Week
            </Button>
            <Button
              variant={timeframe === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("month")}
              className="h-7 text-xs"
            >
              Month
            </Button>
            <Button
              variant={timeframe === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("year")}
              className="h-7 text-xs"
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
            </div>
            <Skeleton className="h-[200px] w-full mt-6" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : data ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> Views
                  </span>
                  <span
                    className={`text-xs flex items-center ${data.viewsChange >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.viewsChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(data.viewsChange)}%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {data.views.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Users className="h-4 w-4 mr-1" /> Visitors
                  </span>
                  <span
                    className={`text-xs flex items-center ${data.visitorsChange >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.visitorsChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(data.visitorsChange)}%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {data.visitors.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> Bookings
                  </span>
                  <span
                    className={`text-xs flex items-center ${data.bookingsChange >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.bookingsChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(data.bookingsChange)}%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">{data.bookings}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" /> Messages
                  </span>
                  <span
                    className={`text-xs flex items-center ${data.messagesChange >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.messagesChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(data.messagesChange)}%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">{data.messages}</p>
              </div>
            </div>

            <Tabs defaultValue="views">
              <TabsList className="mb-4">
                <TabsTrigger value="views" className="text-xs">
                  <LineChart className="h-3 w-3 mr-1" /> Views Over Time
                </TabsTrigger>
                <TabsTrigger value="sources" className="text-xs">
                  <PieChart className="h-3 w-3 mr-1" /> Traffic Sources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="views" className="h-[200px] pt-2">
                <div className="h-full flex items-end space-x-2">
                  {data.viewsByDay.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t-md"
                        style={{ height: `${(item.count / 100) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sources" className="h-[200px] pt-2">
                <div className="grid grid-cols-2 h-full">
                  <div className="flex flex-col justify-center space-y-2">
                    {data.viewsBySource.map((source, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: [
                              "#3b82f6",
                              "#10b981",
                              "#f59e0b",
                              "#6366f1",
                            ][index % 4],
                          }}
                        ></div>
                        <span className="text-xs">{source.source}</span>
                        <span className="text-xs ml-auto font-medium">
                          {Math.round((source.count / data.views) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {data.viewsBySource.map((source, index) => {
                          const percentage = source.count / data.views;
                          const previousPercentages = data.viewsBySource
                            .slice(0, index)
                            .reduce(
                              (acc, curr) => acc + curr.count / data.views,
                              0,
                            );

                          const startAngle = previousPercentages * 360;
                          const endAngle =
                            (previousPercentages + percentage) * 360;

                          const x1 =
                            50 +
                            40 * Math.cos(((startAngle - 90) * Math.PI) / 180);
                          const y1 =
                            50 +
                            40 * Math.sin(((startAngle - 90) * Math.PI) / 180);
                          const x2 =
                            50 +
                            40 * Math.cos(((endAngle - 90) * Math.PI) / 180);
                          const y2 =
                            50 +
                            40 * Math.sin(((endAngle - 90) * Math.PI) / 180);

                          const largeArcFlag = percentage > 0.5 ? 1 : 0;

                          const pathData = [
                            `M 50 50`,
                            `L ${x1} ${y1}`,
                            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`,
                          ].join(" ");

                          return (
                            <path
                              key={index}
                              d={pathData}
                              fill={
                                ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"][
                                  index % 4
                                ]
                              }
                            />
                          );
                        })}
                        <circle cx="50" cy="50" r="25" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-xs">
                <BarChart className="h-3 w-3 mr-1" /> View Detailed Analytics
              </Button>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
