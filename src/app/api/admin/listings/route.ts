import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/listings - Get all listings with pagination and filtering
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

  // Parse query parameters
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const status = url.searchParams.get("status") || "";
  const categoryId = url.searchParams.get("category") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const offset = (page - 1) * pageSize;

  // Build the query
  let listingsQuery = supabase
    .from("listings")
    .select("*, categories(*)", { count: "exact" });

  // Apply filters
  if (query) {
    listingsQuery = listingsQuery.ilike("title", `%${query}%`);
  }

  if (status) {
    listingsQuery = listingsQuery.eq("status", status);
  }

  if (categoryId) {
    listingsQuery = listingsQuery.eq("category_id", categoryId);
  }

  // Apply pagination
  listingsQuery = listingsQuery
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  // Execute the query
  const { data: listings, count, error } = await listingsQuery;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    listings,
    pagination: {
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  });
}

// POST /api/admin/listings - Create a new listing
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
    const body = await request.json();
    const {
      title,
      description,
      category_id,
      location,
      status = "active",
      price_level,
      features,
      images,
      business_hours,
      contact_info,
    } = body;

    if (!title || !category_id) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 },
      );
    }

    // Create listing
    const { data: listing, error } = await supabase
      .from("listings")
      .insert({
        title,
        description,
        category_id,
        location,
        status,
        price_level,
        features,
        images,
        user_id: user.id, // Admin is the owner
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create listing" },
        { status: 500 },
      );
    }

    // Add business hours if provided
    if (business_hours && business_hours.length > 0 && listing) {
      const hoursWithListingId = business_hours.map((hour: any) => ({
        ...hour,
        listing_id: listing.id,
      }));

      const { error: hoursError } = await supabase
        .from("business_hours")
        .insert(hoursWithListingId);

      if (hoursError) {
        console.error("Failed to add business hours:", hoursError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
