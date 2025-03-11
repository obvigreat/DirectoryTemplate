import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin or the reporter
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";

    // Get the report
    const { data: report, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Error fetching report:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if user has permission to view this report
    if (!isAdmin && report.reporter_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("Error in GET report:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { status, resolution, admin_notes } = body;

    // Validate status
    if (
      !status ||
      !["pending", "investigating", "resolved", "dismissed"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: any = {
      status,
      admin_id: user.id,
    };

    // Add resolution and resolved_at if resolving or dismissing
    if (status === "resolved" || status === "dismissed") {
      if (!resolution) {
        return NextResponse.json(
          { error: "Resolution is required when resolving or dismissing" },
          { status: 400 },
        );
      }
      updateData.resolution = resolution;
      updateData.resolved_at = new Date().toISOString();
    }

    // Add admin notes if provided
    if (admin_notes) {
      updateData.admin_notes = admin_notes;
    }

    // Update the report
    const { data, error } = await supabase
      .from("reports")
      .update(updateData)
      .eq("id", params.id)
      .select();

    if (error) {
      console.error("Error updating report:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("Error in PATCH report:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
