import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/settings - Get all settings
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get all settings
  const { data: settings, error } = await supabase.from("settings").select("*");

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }

  // Transform settings into a more usable format
  const formattedSettings = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return NextResponse.json(formattedSettings);
}

// PATCH /api/admin/settings - Update settings
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 },
      );
    }

    // Update setting
    const { data: setting, error } = await supabase
      .from("settings")
      .update({
        value,
        updated_at: new Date().toISOString(),
      })
      .eq("key", key)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update setting" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Setting updated successfully",
      setting,
    });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
