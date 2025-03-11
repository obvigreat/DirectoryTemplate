import { createClient } from "../../../../../supabase/server";
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

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query parameters
    const url = new URL(request.url);
    const timeframe = url.searchParams.get("timeframe") || "month";

    // Get date ranges based on timeframe
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case "week":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case "year":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case "month":
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
    }

    const startDateStr = startDate.toISOString();

    // Fetch total counts
    const [usersResponse, listingsResponse, bookingsResponse, reviewsResponse] =
      await Promise.all([
        supabase.from("users").select("id", { count: "exact", head: true }),
        supabase.from("listings").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id, rating", { count: "exact" }),
      ]);

    // Fetch new counts (within timeframe)
    const [
      newUsersResponse,
      newListingsResponse,
      newBookingsResponse,
      newReviewsResponse,
    ] = await Promise.all([
      supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startDateStr),
      supabase
        .from("listings")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startDateStr),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startDateStr),
      supabase
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startDateStr),
    ]);

    // Fetch category distribution
    const { data: categoryData } = await supabase
      .from("listings")
      .select("category")
      .order("category");

    // Process category data
    const categoryMap = new Map<string, number>();
    categoryData?.forEach((item) => {
      const category = item.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    // Fetch location distribution
    const { data: locationData } = await supabase
      .from("listings")
      .select("location")
      .order("location");

    // Process location data
    const locationMap = new Map<string, number>();
    locationData?.forEach((item) => {
      const location = item.location;
      locationMap.set(location, (locationMap.get(location) || 0) + 1);
    });

    const topLocations = Array.from(locationMap.entries())
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate average rating
    let totalRating =