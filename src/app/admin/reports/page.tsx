"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Flag,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdminReportTable from "@/components/admin-report-table";

export default function AdminReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Parse query parameters
  const status = searchParams.get("status") || "pending";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1");

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState({
    pending: 0,
    investigating: 0,
    resolved: 0,
    dismissed: 0,
    total: 0,
  });

  // Fetch reports
  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        // Fetch all reports to get counts
        const { data: allReports, error: countError } = await supabase
          .from("reports")
          .select("id, status");

        if (countError) throw countError;

        // Calculate counts
        const counts = {
          pending: 0,
          investigating: 0,
          resolved: 0,
          dismissed: 0,
          total: allReports?.length || 0,
        };

        allReports?.forEach((report) => {
          if (report.status in counts) {
            counts[report.status as keyof typeof counts]++;
          }
        });

        setCounts(counts);

        // Fetch filtered reports
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setReports(data || []);
      } catch (err: any) {
        console.error("Error fetching reports:", err);
        setError(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [supabase]);

  // Handle status filter change
  const handleStatusFilterChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", newStatus);
    params.delete("page");
    router.push(`/admin/reports?${params.toString()}`);
  };

  // Handle type filter change
  const handleTypeFilterChange = (newType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", newType);
    params.delete("page");
    router.push(`/admin/reports?${params.toString()}`);
  };

  // Handle search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle report actions
  const handleResolveReport = async (reportId: string, resolution: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({
          status: "resolved",
          resolution,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", reportId);

      if (error) throw error;

      // Update local state
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "resolved",
                resolution,
                resolved_at: new Date().toISOString(),
              }
            : report,
        ),
      );

      // Update counts
      setCounts((prev) => ({
        ...prev,
        pending: prev.pending - 1,
        resolved: prev.resolved + 1,
      }));
    } catch (err: any) {
      console.error("Error resolving report:", err);
      throw err;
    }
  };

  const handleDismissReport = async (reportId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({
          status: "dismissed",
          resolution: reason,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", reportId);

      if (error) throw error;

      // Update local state
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "dismissed",
                resolution: reason,
                resolved_at: new Date().toISOString(),
              }
            : report,
        ),
      );

      // Update counts
      setCounts((prev) => ({
        ...prev,
        pending: prev.pending - 1,
        dismissed: prev.dismissed + 1,
      }));
    } catch (err: any) {
      console.error("Error dismissing report:", err);
      throw err;
    }
  };

  const handleInvestigateReport = async (reportId: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({
          status: "investigating",
        })
        .eq("id", reportId);

      if (error) throw error;

      // Update local state
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId
            ? { ...report, status: "investigating" }
            : report,
        ),
      );

      // Update counts
      setCounts((prev) => ({
        ...prev,
        pending: prev.pending - 1,
        investigating: prev.investigating + 1,
      }));
    } catch (err: any) {
      console.error("Error updating report status:", err);
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Reports & Moderation</h1>
        <p className="text-muted-foreground">
          Manage user reports and content moderation
        </p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Reports
                </p>
                <h3 className="text-2xl font-bold mt-1">{counts.pending}</h3>
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
                  {counts.investigating}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
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
                <h3 className="text-2xl font-bold mt-1">{counts.resolved}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dismissed
                </p>
                <h3 className="text-2xl font-bold mt-1">{counts.dismissed}</h3>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <Flag className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search reports..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div className="w-full md:w-48">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={type}
            onChange={(e) => handleTypeFilterChange(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="listing">Listings</option>
            <option value="review">Reviews</option>
            <option value="user">Users</option>
            <option value="message">Messages</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue={status} onValueChange={handleStatusFilterChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="relative">
            Pending
            {counts.pending > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.pending}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="investigating">
            Investigating
            {counts.investigating > 0 && (
              <span className="ml-1 bg-blue-100 text-blue-800 text-xs rounded-full px-1.5 py-0.5">
                {counts.investigating}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reports</CardTitle>
              <CardDescription>
                Reports that require review and action
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
                  <p className="mb-2">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <AdminReportTable
                  reports={reports.filter((r) => r.status === "pending")}
                  searchQuery={searchQuery}
                  statusFilter={status}
                  typeFilter={type}
                  onSearchChange={handleSearchChange}
                  onStatusFilterChange={handleStatusFilterChange}
                  onTypeFilterChange={handleTypeFilterChange}
                  onResolve={handleResolveReport}
                  onDismiss={handleDismissReport}
                  onInvestigate={handleInvestigateReport}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigating" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Investigating Reports</CardTitle>
              <CardDescription>
                Reports that are currently being investigated
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
                  <p className="mb-2">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <AdminReportTable
                  reports={reports.filter((r) => r.status === "investigating")}
                  searchQuery={searchQuery}
                  statusFilter={status}
                  typeFilter={type}
                  onSearchChange={handleSearchChange}
                  onStatusFilterChange={handleStatusFilterChange}
                  onTypeFilterChange={handleTypeFilterChange}
                  onResolve={handleResolveReport}
                  onDismiss={handleDismissReport}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Reports</CardTitle>
              <CardDescription>
                Reports that have been reviewed and actioned
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
                  <p className="mb-2">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <AdminReportTable
                  reports={reports.filter((r) => r.status === "resolved")}
                  searchQuery={searchQuery}
                  statusFilter={status}
                  typeFilter={type}
                  onSearchChange={handleSearchChange}
                  onStatusFilterChange={handleStatusFilterChange}
                  onTypeFilterChange={handleTypeFilterChange}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dismissed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dismissed Reports</CardTitle>
              <CardDescription>
                Reports that have been reviewed and dismissed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
                  <p className="mb-2">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <AdminReportTable
                  reports={reports.filter((r) => r.status === "dismissed")}
                  searchQuery={searchQuery}
                  statusFilter={status}
                  typeFilter={type}
                  onSearchChange={handleSearchChange}
                  onStatusFilterChange={handleStatusFilterChange}
                  onTypeFilterChange={handleTypeFilterChange}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
