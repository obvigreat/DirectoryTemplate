"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Search,
  User,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Report {
  id: string;
  type: string;
  content_id: string;
  content_title: string;
  reporter_id: string;
  reporter_name: string;
  reason: string;
  details: string;
  status: string;
  created_at: string;
  resolved_at?: string;
  resolution?: string;
  admin_id?: string;
  admin_notes?: string;
}

interface AdminReportTableProps {
  reports: Report[];
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onTypeFilterChange: (type: string) => void;
  onResolve?: (reportId: string, resolution: string) => Promise<void>;
  onDismiss?: (reportId: string, reason: string) => Promise<void>;
  onInvestigate?: (reportId: string) => Promise<void>;
}

export default function AdminReportTable({
  reports,
  searchQuery,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
  onResolve,
  onDismiss,
  onInvestigate,
}: AdminReportTableProps) {
  const router = useRouter();
  const supabase = createClient();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [resolutionNote, setResolutionNote] = useState("");
  const [isResolvingId, setIsResolvingId] = useState<string | null>(null);
  const [isDismissingId, setIsDismissingId] = useState<string | null>(null);

  // Filter reports based on search query and filters
  const filteredReports = reports.filter((report) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      report.content_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.details?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    // Type filter
    const matchesType = typeFilter === "all" || report.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedReports(filteredReports.map((report) => report.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleSelectReport = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter((id) => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  const handleResolveReport = async (reportId: string, resolution: string) => {
    if (onResolve) {
      try {
        setIsResolvingId(reportId);
        await onResolve(reportId, resolution);
        // Remove from selected reports if it was selected
        setSelectedReports(selectedReports.filter((id) => id !== reportId));
      } catch (error) {
        console.error("Error resolving report:", error);
      } finally {
        setIsResolvingId(null);
        setResolutionNote("");
      }
    }
  };

  const handleDismissReport = async (reportId: string, reason: string) => {
    if (onDismiss) {
      try {
        setIsDismissingId(reportId);
        await onDismiss(reportId, reason);
        // Remove from selected reports if it was selected
        setSelectedReports(selectedReports.filter((id) => id !== reportId));
      } catch (error) {
        console.error("Error dismissing report:", error);
      } finally {
        setIsDismissingId(null);
        setResolutionNote("");
      }
    }
  };

  const handleInvestigateReport = async (reportId: string) => {
    if (onInvestigate) {
      try {
        await onInvestigate(reportId);
      } catch (error) {
        console.error("Error marking report as investigating:", error);
      }
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "investigating":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <AlertTriangle className="w-3 h-3 mr-1" /> Investigating
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Resolved
          </Badge>
        );
      case "dismissed":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <XCircle className="w-3 h-3 mr-1" /> Dismissed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const getContentLink = (report: Report) => {
    switch (report.type) {
      case "listing":
        return `/listings/${report.content_id}`;
      case "review":
        // Assuming reviews are linked to listings
        return `/listings/${report.content_id.split("-")[0]}`;
      case "user":
        return `/admin/users/${report.content_id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedReports.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedReports.length} reports selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => {
                // Handle bulk investigate
                selectedReports.forEach((reportId) =>
                  onInvestigate?.(reportId),
                );
                setSelectedReports([]);
              }}
            >
              <AlertTriangle className="w-4 h-4 mr-1" /> Investigate
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={() => {
                // Handle bulk resolve
                const resolution = prompt(
                  "Enter resolution note for all selected reports:",
                );
                if (resolution) {
                  selectedReports.forEach((reportId) =>
                    onResolve?.(reportId, resolution),
                  );
                  setSelectedReports([]);
                }
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Resolve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to dismiss ${selectedReports.length} reports?`,
                  )
                ) {
                  const reason = prompt("Enter dismissal reason:");
                  if (reason) {
                    selectedReports.forEach((reportId) =>
                      onDismiss?.(reportId, reason),
                    );
                    setSelectedReports([]);
                  }
                }
              }}
            >
              <XCircle className="w-4 h-4 mr-1" /> Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={handleSelectAll}
                  checked={
                    selectedReports.length === filteredReports.length &&
                    filteredReports.length > 0
                  }
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reporter
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => handleSelectReport(report.id)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getReportTypeIcon(report.type)}
                      <span className="ml-2 capitalize">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Link
                        href={getContentLink(report)}
                        className="text-blue-600 hover:underline"
                        target={report.type !== "user" ? "_blank" : "_self"}
                      >
                        {report.content_title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{report.reason}</p>
                      {report.details && (
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {report.details}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {report.reporter_name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/reports/${report.id}`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(getContentLink(report), "_blank")
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Content
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {report.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => handleInvestigateReport(report.id)}
                            className="text-blue-600"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />{" "}
                            Investigate
                          </DropdownMenuItem>
                        )}
                        {(report.status === "pending" ||
                          report.status === "investigating") && (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                const resolution = prompt(
                                  "Enter resolution note:",
                                );
                                if (resolution) {
                                  handleResolveReport(report.id, resolution);
                                }
                              }}
                              className="text-green-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Resolve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                const reason = prompt(
                                  "Enter dismissal reason:",
                                );
                                if (reason) {
                                  handleDismissReport(report.id, reason);
                                }
                              }}
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Dismiss
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No reports found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
