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
  Flag,
  MessageSquare,
  User,
} from "lucide-react";

export default function AdminReports() {
  // Mock data for demonstration
  const mockReports = [
    {
      id: "1",
      type: "listing",
      reason: "Inappropriate content",
      status: "pending",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      reported_by: { name: "John Doe", email: "john@example.com" },
      content: { id: "123", title: "Suspicious Listing", type: "listing" },
      description:
        "This listing contains inappropriate images and misleading information.",
    },
    {
      id: "2",
      type: "review",
      reason: "Spam",
      status: "resolved",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      reported_by: { name: "Jane Smith", email: "jane@example.com" },
      content: { id: "456", title: "Review for Coffee Shop", type: "review" },
      description:
        "This review appears to be spam with unrelated content and links.",
    },
    {
      id: "3",
      type: "user",
      reason: "Harassment",
      status: "pending",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reported_by: { name: "Mike Johnson", email: "mike@example.com" },
      content: { id: "789", title: "User Profile", type: "user" },
      description:
        "This user has been sending harassing messages to multiple listing owners.",
    },
    {
      id: "4",
      type: "listing",
      reason: "Fake listing",
      status: "investigating",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reported_by: { name: "Sarah Williams", email: "sarah@example.com" },
      content: { id: "101", title: "Suspicious Business", type: "listing" },
      description:
        "I believe this listing is fake. The address doesn't exist and the phone number is invalid.",
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

  // Get icon based on report type
  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "listing":
        return <Flag className="w-4 h-4 text-orange-500" />;
      case "review":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "user":
        return <User className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  // Get status badge based on report status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "investigating":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertTriangle className="w-3 h-3 mr-1" /> Investigating
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Filter reports by status
  const pendingReports = mockReports.filter(
    (report) => report.status === "pending",
  );
  const investigatingReports = mockReports.filter(
    (report) => report.status === "investigating",
  );
  const resolvedReports = mockReports.filter(
    (report) => report.status === "resolved",
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold mb-2">Reports & Moderation</h1>
        <p className="text-muted-foreground">
          Manage user reports and content moderation
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Reports
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {pendingReports.length}
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
                  {investigatingReports.length}
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
                <h3 className="text-2xl font-bold mt-1">
                  {resolvedReports.length}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="investigating">Investigating</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>
                View and manage all reported content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Reported Item</th>
                      <th className="text-left py-3 px-4">Reason</th>
                      <th className="text-left py-3 px-4">Reported By</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((report) => (
                      <tr key={report.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {getReportTypeIcon(report.type)}
                            <span className="ml-2 capitalize">
                              {report.type}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <a href="#" className="text-blue-600 hover:underline">
                            {report.content.title}
                          </a>
                        </td>
                        <td className="py-3 px-4">{report.reason}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span>{report.reported_by.name}</span>
                            <span className="text-xs text-gray-500">
                              {report.reported_by.email}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {formatDate(report.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            {report.status !== "resolved" && (
                              <Button size="sm">Resolve</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reports</CardTitle>
              <CardDescription>Reports awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReports.length > 0 ? (
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {getReportTypeIcon(report.type)}
                          <span className="ml-2 font-medium capitalize">
                            {report.type}: {report.content.title}
                          </span>
                        </div>
                        <div>{getStatusBadge(report.status)}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {report.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Reported by {report.reported_by.name} on{" "}
                          {formatDate(report.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          <Button size="sm">Resolve</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending reports found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigating">
          <Card>
            <CardHeader>
              <CardTitle>Under Investigation</CardTitle>
              <CardDescription>
                Reports currently being investigated
              </CardDescription>
            </CardHeader>
            <CardContent>
              {investigatingReports.length > 0 ? (
                <div className="space-y-4">
                  {investigatingReports.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {getReportTypeIcon(report.type)}
                          <span className="ml-2 font-medium capitalize">
                            {report.type}: {report.content.title}
                          </span>
                        </div>
                        <div>{getStatusBadge(report.status)}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {report.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Reported by {report.reported_by.name} on{" "}
                          {formatDate(report.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Content
                          </Button>
                          <Button size="sm">Mark as Resolved</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No reports under investigation
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Reports</CardTitle>
              <CardDescription>Reports that have been resolved</CardDescription>
            </CardHeader>
            <CardContent>
              {resolvedReports.length > 0 ? (
                <div className="space-y-4">
                  {resolvedReports.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {getReportTypeIcon(report.type)}
                          <span className="ml-2 font-medium capitalize">
                            {report.type}: {report.content.title}
                          </span>
                        </div>
                        <div>{getStatusBadge(report.status)}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {report.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Reported by {report.reported_by.name} on{" "}
                          {formatDate(report.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Reopen
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No resolved reports found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
