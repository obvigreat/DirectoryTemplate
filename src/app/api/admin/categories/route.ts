import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/categories - Get all categories
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

  // Get all categories with listing count
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*, listings(count)")
    .order("name");

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }

  return NextResponse.json({ categories });
}

// POST /api/admin/categories - Create a new category
export async function POST(request: NextRequest) {
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
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const { data: existingCategory } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 },
      );
    }

    // Create category
    const { data: category, error } = await supabase
      .from("categories")
      .insert({
        name,
        slug,
        description,
        icon,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create category" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
