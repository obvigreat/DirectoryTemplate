import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const body = await request.json();
    const { type, content_id, content_title, reason, details } = body;

    // Validate required fields
    if (!type || !content_id || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get user info
    const { data: userData } = await supabase
      .from("users")
      .select("name")
      .eq("id", user.id)
      .single();

    // Create the report
    const { data, error } = await supabase
      .from("reports")
      .insert({
        type,
        content_id,
        content_title,
        reporter_id: user.id,
        reporter_name: userData?.name || user.email,
        reason,
        details,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Error creating report:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    console.error("Error in POST report:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

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

    // Check if user is admin or moderator
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";

    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "all";
    const type = url.searchParams.get("type") || "all";

    // Build the query
    let reportsQuery = supabase.from("reports").select("*");

    // If not admin, only show user's own reports
    if (!isAdmin) {
      reportsQuery = reportsQuery.eq("reporter_id", user.id);
    }

    // Apply filters
    if (status !== "all") {
      reportsQuery = reportsQuery.eq("status", status);
    }

    if (type !== "all") {
      reportsQuery = reportsQuery.eq("type", type);
    }

    // Execute the query
    const { data, error } = await reportsQuery.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching reports:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET reports:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
