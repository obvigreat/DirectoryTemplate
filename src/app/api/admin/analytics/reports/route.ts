import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin" && userData?.role !== "moderator") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query parameters
    const url = new URL(request.url);
    const timeframe = url.searchParams.get("timeframe") || "month";
    const status = url.searchParams.get("status") || "all";

    // Get date ranges based on timeframe
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7,
        );
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
        );
        break;
      case "month":
      default:
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
        );
        break;
    }

    const startDateStr = startDate.toISOString();

    // Build the query
    let reportsQuery = supabase.from("reports").select("*");

    // Apply filters
    if (status !== "all") {
      reportsQuery = reportsQuery.eq("status", status);
    }

    // Get reports within timeframe
    reportsQuery = reportsQuery.gte("created_at", startDateStr);

    // Execute the query
    const { data: reports, error } = await reportsQuery.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching reports:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get report counts by type
    const reportsByType = reports.reduce(
      (acc: Record<string, number>, report) => {
        const type = report.type || "other";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {},
    );

    // Get report counts by status
    const reportsByStatus = reports.reduce(
      (acc: Record<string, number>, report) => {
        const status = report.status || "pending";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {},
    );

    // Get report trend data (reports per day in the timeframe)
    const reportTrends = [];
    const daysInTimeframe =
      timeframe === "week" ? 7 : timeframe === "month" ? 30 : 365;

    for (let i = 0; i < daysInTimeframe; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD

      const count = reports.filter((report) => {
        const reportDate = new Date(report.created_at)
          .toISOString()
          .split("T")[0];
        return reportDate === dateStr;
      }).length;

      reportTrends.push({
        date: dateStr,
        count,
      });
    }

    // Reverse to get chronological order
    reportTrends.reverse();

    return NextResponse.json({
      total: reports.length,
      byType: reportsByType,
      byStatus: reportsByStatus,
      trends: reportTrends,
    });
  } catch (error: any) {
    console.error("Error in GET reports analytics:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
