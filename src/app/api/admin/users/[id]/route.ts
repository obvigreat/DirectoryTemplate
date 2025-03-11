import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/users/[id] - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  // Get the user
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(userData);
}

// PATCH /api/admin/users/[id] - Update a user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
    const { name, role, status } = body;

    // Update user profile
    const { error } = await supabase
      .from("users")
      .update({
        name,
        role,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  // Don't allow deleting yourself
  if (params.id === user.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 },
    );
  }

  try {
    // Delete user from users table
    const { error: profileError } = await supabase
      .from("users")
      .delete()
      .eq("id", params.id);

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to delete user profile" },
        { status: 500 },
      );
    }

    // Delete user from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(
      params.id,
    );

    if (authError) {
      return NextResponse.json(
        { error: "Failed to delete user from auth" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
