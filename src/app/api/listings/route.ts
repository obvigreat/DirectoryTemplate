import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const query = searchParams.get("q");
  const location = searchParams.get("location");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let listingsQuery = supabase
    .from("listings")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(offset, offset + limit - 1);

  if (category && category !== "All Categories") {
    listingsQuery = listingsQuery.eq("category", category);
  }

  if (query) {
    listingsQuery = listingsQuery.ilike("title", `%${query}%`);
  }

  if (location) {
    listingsQuery = listingsQuery.ilike("location", `%${location}%`);
  }

  const { data: listings, error, count } = await listingsQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listings, count: count || 0 });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to create a listing" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "category",
      "description",
      "location",
      "phone",
      "email",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    // Add user_id and timestamps
    const listing = {
      ...body,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "active",
    };

    const { data, error } = await supabase
      .from("listings")
      .insert(listing)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
