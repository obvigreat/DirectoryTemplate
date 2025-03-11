import { createClient } from "../../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/categories/[id]/delete - Delete a category (using POST for form submission)
export async function POST(
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
    // Check if category has listings
    const { count } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("category_id", params.id);

    if (count && count > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with listings" },
        { status: 400 },
      );
    }

    // Delete category
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete category" },
        { status: 500 },
      );
    }

    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
