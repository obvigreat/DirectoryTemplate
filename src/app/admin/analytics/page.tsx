import { Metadata } from "next";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import AdminPageHeader from "@/components/admin-page-header";
import AnalyticsDashboard from "@/components/analytics/analytics-dashboard";

export const metadata: Metadata = {
  title: "Analytics | Admin",
  description: "View analytics and reports",
};

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/admin/analytics");
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        heading="Analytics"
        text="View analytics and reports for your platform"
      />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
