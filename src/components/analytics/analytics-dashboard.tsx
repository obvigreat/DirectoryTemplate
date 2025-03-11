"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProcessAnalyticsButton from "./process-analytics-button";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Search,
  Calendar,
  MessageSquare,
  Download,
} from "lucide-react";

type AnalyticsPeriod = "day" | "week" | "month" | "year";

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [pageViewsData, setPageViewsData] = useState<any[]>([]);
  const [listingViewsData, setListingViewsData] = useState<any[]>([]);
  const [searchQueriesData, setSearchQueriesData] = useState<any[]>([]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch summary data
        const summaryResponse = await fetch(
          `/api/analytics?metric=summary&period=${period}`,
        );
        if (!summaryResponse.ok)
          throw new Error("Failed to fetch summary data");
        const summaryData = await summaryResponse.json();
        setSummaryData(summaryData);

        // Fetch page views data
        const pageViewsResponse = await fetch(
          `/api/analytics?metric=page_views&period=${period}`,
        );
        if (!pageViewsResponse.ok)
          throw new Error("Failed to fetch page views data");
        const pageViewsData = await pageViewsResponse.json();
        setPageViewsData(pageViewsData);

        // Fetch listing views data
        const listingViewsResponse = await fetch(
          `/api/analytics?metric=listing_views&period=${period}`,
        );
        if (!listingViewsResponse.ok)
          throw new Error("Failed to fetch listing views data");
        const listingViewsData = await listingViewsResponse.json();
        setListingViewsData(listingViewsData);

        // Fetch search queries data
        const searchQueriesResponse = await fetch(
          `/api/analytics?metric=search_queries&period=${period}`,
        );
        if (!searchQueriesResponse.ok)
          throw new Error("Failed to fetch search queries data");
        const searchQueriesData = await searchQueriesResponse.json();
        setSearchQueriesData(searchQueriesData);
      } catch (err: any) {
        console.error("Error fetching analytics:", err);
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  // Process page views data for visualization
  const processPageViewsData = () => {
    if (!pageViewsData.length) return [];

    // Group by date
    const groupedByDate = pageViewsData.reduce((acc: any, view: any) => {
      const date = new Date(view.created_at).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});

    // Convert to array format for chart
    return Object.entries(groupedByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  // Process listing views data for visualization
  const processListingViewsData = () => {
    if (!listingViewsData.length) return [];

    // Group by listing
    const groupedByListing = listingViewsData.reduce((acc: any, view: any) => {
      const listingTitle =
        view.listings?.title || `Listing #${view.listing_id}`;
      if (!acc[listingTitle]) acc[listingTitle] = 0;
      acc[listingTitle]++;
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(groupedByListing)
      .map(([listing, count]) => ({ listing, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10); // Top 10 listings
  };

  // Process search queries data for visualization
  const processSearchQueriesData = () => {
    if (!searchQueriesData.length) return [];

    // Group by query
    const groupedByQuery = searchQueriesData.reduce((acc: any, search: any) => {
      const query = search.query || "(empty query)";
      if (!acc[query]) acc[query] = 0;
      acc[query]++;
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(groupedByQuery)
      .map(([query, count]) => ({ query, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10); // Top 10 queries
  };

  // Calculate percentage change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 100; // If previous was 0, show 100% increase
    return ((current - previous) / previous) * 100;
  };

  // Export data as CSV
  const exportData = (data: any[], filename: string) => {
    if (!data.length) return;

    // Convert data to CSV format
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    const csv = [headers, ...rows].join("\n");

    // Create download link
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute(
      "download",
      `${filename}-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pageViewsChartData = processPageViewsData();
  const topListings = processListingViewsData();
  const topSearchQueries = processSearchQueriesData();

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <ProcessAnalyticsButton />
          <div className="flex space-x-2">
            <Button
              variant={period === "day" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("day")}
            >
              Day
            </Button>
            <Button
              variant={period === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("week")}
            >
              Week
            </Button>
            <Button
              variant={period === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("month")}
            >
              Month
            </Button>
            <Button
              variant={period === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("year")}
            >
              Year
            </Button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      ) : summaryData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Page Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {summaryData.page_views.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                For the past {period}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Listing Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {summaryData.listing_views.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                For the past {period}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Search Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {summaryData.search_queries.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                For the past {period}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {summaryData.new_users.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                For the past {period}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Detailed analytics */}
      <Tabs defaultValue="pageViews">
        <TabsList>
          <TabsTrigger value="pageViews">Page Views</TabsTrigger>
          <TabsTrigger value="listings">Listing Views</TabsTrigger>
          <TabsTrigger value="searches">Search Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="pageViews" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Page Views Over Time</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(pageViewsData, "page-views")}
              disabled={!pageViewsData.length}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : pageViewsChartData.length > 0 ? (
            <div className="h-80 border rounded-md p-4">
              {/* Simple bar chart visualization */}
              <div className="h-full flex items-end space-x-2">
                {pageViewsChartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-md"
                      style={{
                        height: `${Math.max(5, (item.count / Math.max(...pageViewsChartData.map((d) => d.count))) * 100)}%`,
                      }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-500">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                No page view data available for this period
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                  </div>
                ) : pageViewsData.length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(
                      pageViewsData.reduce((acc: any, view: any) => {
                        if (!acc[view.page_path]) acc[view.page_path] = 0;
                        acc[view.page_path]++;
                        return acc;
                      }, {}),
                    )
                      .sort((a: any, b: any) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([path, count], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm truncate max-w-[70%]">
                            {path}
                          </span>
                          <span className="text-sm font-medium">
                            {count as number}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                  </div>
                ) : pageViewsData.length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(
                      pageViewsData.reduce((acc: any, view: any) => {
                        const referrer = view.referrer || "Direct";
                        if (!acc[referrer]) acc[referrer] = 0;
                        acc[referrer]++;
                        return acc;
                      }, {}),
                    )
                      .sort((a: any, b: any) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([referrer, count], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm truncate max-w-[70%]">
                            {referrer}
                          </span>
                          <span className="text-sm font-medium">
                            {count as number}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Top Viewed Listings</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(listingViewsData, "listing-views")}
              disabled={!listingViewsData.length}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : topListings.length > 0 ? (
            <div className="h-80 border rounded-md p-4">
              {/* Simple bar chart visualization */}
              <div className="h-full flex items-end space-x-2">
                {topListings.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-green-500 rounded-t-md"
                      style={{
                        height: `${Math.max(5, (item.count / Math.max(...topListings.map((d) => d.count))) * 100)}%`,
                      }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-500 truncate max-w-full">
                      {item.listing}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                No listing view data available for this period
              </p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Listing Views Details</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
              ) : listingViewsData.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 font-medium text-sm">
                    <div>Listing</div>
                    <div>Views</div>
                    <div>Last Viewed</div>
                  </div>
                  {topListings.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 text-sm border-t pt-2"
                    >
                      <div className="truncate">{item.listing}</div>
                      <div>{item.count}</div>
                      <div>
                        {new Date(
                          listingViewsData.find(
                            (view) =>
                              view.listings?.title === item.listing ||
                              (!view.listings?.title &&
                                `Listing #${view.listing_id}` === item.listing),
                          )?.created_at,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="searches" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Top Search Queries</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(searchQueriesData, "search-queries")}
              disabled={!searchQueriesData.length}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : topSearchQueries.length > 0 ? (
            <div className="h-80 border rounded-md p-4">
              {/* Simple bar chart visualization */}
              <div className="h-full flex items-end space-x-2">
                {topSearchQueries.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-purple-500 rounded-t-md"
                      style={{
                        height: `${Math.max(5, (item.count / Math.max(...topSearchQueries.map((d) => d.count))) * 100)}%`,
                      }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-500 truncate max-w-full">
                      {item.query}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 border rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">
                No search query data available for this period
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Search Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                  </div>
                ) : searchQueriesData.length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(
                      searchQueriesData.reduce((acc: any, search: any) => {
                        const category = search.category || "(no category)";
                        if (!acc[category]) acc[category] = 0;
                        acc[category]++;
                        return acc;
                      }, {}),
                    )
                      .sort((a: any, b: any) => b[1] - a[1])
                      .map(([category, count], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{category}</span>
                          <span className="text-sm font-medium">
                            {count as number}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Search Locations</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                  </div>
                ) : searchQueriesData.length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(
                      searchQueriesData.reduce((acc: any, search: any) => {
                        const location = search.location || "(no location)";
                        if (!acc[location]) acc[location] = 0;
                        acc[location]++;
                        return acc;
                      }, {}),
                    )
                      .sort((a: any, b: any) => b[1] - a[1])
                      .map(([location, count], index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm truncate max-w-[70%]">
                            {location}
                          </span>
                          <span className="text-sm font-medium">
                            {count as number}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
