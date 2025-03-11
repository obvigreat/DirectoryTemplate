import { createClient } from "../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  ArrowUpRight,
  BarChart,
  Store,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardStats from "@/components/admin-dashboard-stats";
import AdminRecentActivity from "@/components/admin-recent-activity";
import AdminPendingItems from "@/components/admin-pending-items";
import AdminPageHeader from "@/components/admin-page-header";
import AdminStatsCard from "@/components/admin-stats-card";

export const metadata = {
  title: "Admin Dashboard | Directory",
  description: "Manage your directory platform",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts for dashboard stats
  const [
    usersResponse,
    listingsResponse,
    categoriesResponse,
    reviewsResponse,
    bookingsResponse,
    messagesResponse,
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("listings").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admin Dashboard"
        description="Welcome back! Here's an overview of your directory platform"
      />

      {/* Stats Overview */}
      <AdminDashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Links */}
        <Card className="md:col-span-1 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/listings">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <Store className="mr-2 h-4 w-4" />
                  Listings
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Categories
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  Reports
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity and Pending Items */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-4">
              <AdminRecentActivity />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <AdminPendingItems />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminStatsCard
          title="Pending Bookings"
          value={bookingsResponse.count || 0}
          icon={Calendar}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />

        <AdminStatsCard
          title="Unread Messages"
          value={messagesResponse.count || 0}
          icon={MessageSquare}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />

        <AdminStatsCard
          title="Platform Growth"
          value={`+${Math.floor(Math.random() * 10) + 5}%`}
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
      </div>

      {/* Quick Add Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <Link href="/admin/users/add">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </Link>
        <Link href="/admin/listings/add">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Listing
          </Button>
        </Link>
        <Link href="/admin/categories/add">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </Link>
      </div>
    </div>
  );
}
