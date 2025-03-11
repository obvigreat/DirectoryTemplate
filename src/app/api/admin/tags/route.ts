import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user role
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { name, slug, description, color } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Generate slug if not provided
    const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

    // Create the tag
    const { data, error } = await supabase
      .from("tags")
      .insert({
        name,
        slug: finalSlug,
        description,
        color,
      })
      .select();

    if (error) {
      console.error("Error creating tag:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error in POST tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get query parameters
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    // Build the query
    let tagsQuery = supabase.from("tags").select("*, listing_tags(count)");

    // Apply search filter if provided
    if (query) {
      tagsQuery = tagsQuery.ilike("name", `%${query}%`);
    }

    // Execute the query
    const { data, error } = await tagsQuery.order("name");

    if (error) {
      console.error("Error fetching tags:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET tags:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
