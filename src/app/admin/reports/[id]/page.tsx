import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Flag,
  MessageSquare,
  User,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Report Details | Admin Dashboard",
  description: "View and manage report details",
};

export default async function ReportDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the report
  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !report) {
    notFound();
  }

  // Fetch reporter details
  const { data: reporter } = await supabase
    .from("users")
    .select("id, name, email, avatar_url")
    .eq("id", report.reporter_id)
    .single();

  // Fetch admin details if resolved
  let admin = null;
  if (report.admin_id) {
    const { data: adminData } = await supabase
      .from("users")
      .select("id, name, email, avatar_url")
      .eq("id", report.admin_id)
      .single();
    admin = adminData;
  }

  // Fetch content details based on type
  let contentDetails = null;
  if (report.type === "listing") {
    const { data: listing } = await supabase
      .from("listings")
      .select("id, title, description, status, user_id, created_at")
      .eq("id", report.content_id)
      .single();
    contentDetails = listing;
  } else if (report.type === "review") {
    const { data: review } = await supabase
      .from("reviews")
      .select("id, rating, comment, user_id, listing_id, created_at")
      .eq("id", report.content_id)
      .single();
    contentDetails = review;
  } else if (report.type === "user") {
    const { data: user } = await supabase
      .from("users")
      .select("id, name, email, status, role, created_at")
      .eq("id", report.content_id)
      .single();
    contentDetails = user;
  }

  // Handle report actions
  async function resolveReport(formData: FormData) {
    "use server";

    const resolution = formData.get("resolution") as string;
    const adminNotes = formData.get("admin_notes") as string;

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Update report status
    const { error } = await supabase
      .from("reports")
      .update({
        status: "resolved",
        resolution,
        admin_notes: adminNotes,
        admin_id: user.id,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error resolving report:", error);
      return { success: false, error: error.message };
    }

    redirect("/admin/reports?status=resolved");
  }

  async function dismissReport(formData: FormData) {
    "use server";

    const resolution = formData.get("resolution") as string;
    const adminNotes = formData.get("admin_notes") as string;

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Update report status
    const { error } = await supabase
      .from("reports")
      .update({
        status: "dismissed",
        resolution,
        admin_notes: adminNotes,
        admin_id: user.id,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error dismissing report:", error);
      return { success: false, error: error.message };
    }

    redirect("/admin/reports?status=dismissed");
  }

  async function investigateReport() {
    "use server";

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Update report status
    const { error } = await supabase
      .from("reports")
      .update({
        status: "investigating",
        admin_id: user.id,
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error updating report status:", error);
      return { success: false, error: error.message };
    }

    redirect("/admin/reports?status=investigating");
  }

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "investigating":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <AlertTriangle className="w-3 h-3 mr-1" /> Investigating
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Resolved
          </Badge>
        );
      case "dismissed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="w-3 h-3 mr-1" /> Dismissed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "listing":
        return <Flag className="w-5 h-5 text-orange-500" />;
      case "review":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "user":
        return <User className="w-5 h-5 text-purple-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  // Get content link based on type
  const getContentLink = () => {
    switch (report.type) {
      case "listing":
        return `/listings/${report.content_id}`;
      case "review":
        // Assuming reviews are linked to listings
        return contentDetails?.listing_id
          ? `/listings/${contentDetails.listing_id}`
          : "#";
      case "user":
        return `/admin/users/${report.content_id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Report Details</h1>
          <p className="text-muted-foreground">
            Review and manage reported content
          </p>
        </div>
        <Link href="/admin/reports">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Reports
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Report Details */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center">
                  {getTypeIcon(report.type)}
                  <span className="ml-2 capitalize">
                    {report.type} Report: {report.content_title}
                  </span>
                </CardTitle>
                <CardDescription>
                  Reported on {new Date(report.created_at).toLocaleString()}
                </CardDescription>
              </div>
              {getStatusBadge(report.status)}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                <p className="mt-1 font-medium">{report.reason}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Details</h3>
                <p className="mt-1 whitespace-pre-line">
                  {report.details || "No details provided"}
                </p>
              </div>

              {report.status === "resolved" || report.status === "dismissed" ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Resolution
                  </h3>
                  <p className="mt-1">{report.resolution}</p>
                  {report.admin_notes && (
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Admin Notes
                      </h3>
                      <p className="mt-1 text-sm">{report.admin_notes}</p>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Resolved by {admin?.name || "Admin"} on{" "}
                    {new Date(report.resolved_at || "").toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="border-t pt-4 mt-4">
                  <div className="flex gap-2">
                    <form action={investigateReport}>
                      <Button
                        type="submit"
                        variant="outline"
                        className="text-blue-600"
                        disabled={report.status === "investigating"}
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {report.status === "investigating"
                          ? "Investigating"
                          : "Mark as Investigating"}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>
                Preview of the reported {report.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contentDetails ? (
                <div className="space-y-4">
                  {report.type === "listing" && (
                    <div>
                      <h3 className="font-medium">{contentDetails.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {contentDetails.description}
                      </p>
                      <div className="mt-2">
                        <Badge
                          className={`${contentDetails.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {contentDetails.status}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {report.type === "review" && (
                    <div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < contentDetails.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2">{contentDetails.rating}/5</span>
                      </div>
                      <p className="text-sm mt-2">{contentDetails.comment}</p>
                    </div>
                  )}

                  {report.type === "user" && (
                    <div>
                      <h3 className="font-medium">{contentDetails.name}</h3>
                      <p className="text-sm text-gray-600">
                        {contentDetails.email}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge
                          className={`${contentDetails.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {contentDetails.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {contentDetails.role}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Link href={getContentLink()} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" /> View Full Content
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Content not found or has been deleted
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Forms */}
          {(report.status === "pending" ||
            report.status === "investigating") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resolve Report</CardTitle>
                  <CardDescription>
                    Mark this report as resolved after taking action
                  </CardDescription>
                </CardHeader>
                <form action={resolveReport}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="resolution"
                        className="text-sm font-medium"
                      >
                        Resolution <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="resolution"
                        name="resolution"
                        placeholder="Describe what action was taken"
                        required
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="admin_notes"
                        className="text-sm font-medium"
                      >
                        Admin Notes (Internal)
                      </label>
                      <Textarea
                        id="admin_notes"
                        name="admin_notes"
                        placeholder="Add any internal notes about this case"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" /> Resolve Report
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dismiss Report</CardTitle>
                  <CardDescription>
                    Dismiss this report if no action is needed
                  </CardDescription>
                </CardHeader>
                <form action={dismissReport}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="resolution"
                        className="text-sm font-medium"
                      >
                        Dismissal Reason <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="resolution"
                        name="resolution"
                        placeholder="Explain why this report is being dismissed"
                        required
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="admin_notes"
                        className="text-sm font-medium"
                      >
                        Admin Notes (Internal)
                      </label>
                      <Textarea
                        id="admin_notes"
                        name="admin_notes"
                        placeholder="Add any internal notes about this case"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full text-red-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Dismiss Report
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Reporter Information */}
          <Card>
            <CardHeader>
              <CardTitle>Reporter</CardTitle>
              <CardDescription>User who submitted this report</CardDescription>
            </CardHeader>
            <CardContent>
              {reporter ? (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium uppercase">
                    {reporter.avatar_url ? (
                      <img
                        src={reporter.avatar_url}
                        alt={reporter.name || "User"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      reporter.name?.charAt(0) || "U"
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {reporter.name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">{reporter.email}</p>
                    <Link
                      href={`/admin/users/${reporter.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Reporter information not available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Admin Information (if resolved) */}
          {admin && (
            <Card>
              <CardHeader>
                <CardTitle>Handled By</CardTitle>
                <CardDescription>
                  Admin who processed this report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium uppercase">
                    {admin.avatar_url ? (
                      <img
                        src={admin.avatar_url}
                        alt={admin.name || "Admin"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      admin.name?.charAt(0) || "A"
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{admin.name || "Admin"}</h3>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Flag className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Report Submitted</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm mt-1">
                      {reporter?.name || "User"} reported this {report.type} for{" "}
                      {report.reason}
                    </p>
                  </div>
                </div>

                {report.status === "investigating" && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div>
                      <h3 className="font-medium">Under Investigation</h3>
                      <p className="text-sm text-gray-500">
                        {admin
                          ? new Date(report.resolved_at || "").toLocaleString()
                          : "Currently being investigated"}
                      </p>
                      {admin && (
                        <p className="text-sm mt-1">
                          {admin.name} is investigating this report
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(report.status === "resolved" ||
                  report.status === "dismissed") && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${report.status === "resolved" ? "bg-green-100" : "bg-gray-100"} flex items-center justify-center`}
                      >
                        {report.status === "resolved" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {report.status === "resolved"
                          ? "Resolved"
                          : "Dismissed"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(report.resolved_at || "").toLocaleString()}
                      </p>
                      <p className="text-sm mt-1">{report.resolution}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
