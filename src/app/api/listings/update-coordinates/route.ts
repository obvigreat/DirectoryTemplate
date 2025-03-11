import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// This endpoint is for admin use to update coordinates for listings
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
    const { listingId, latitude, longitude } = body;

    if (!listingId || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Listing ID, latitude, and longitude are required" },
        { status: 400 }
      );
    }

    // Update the listing with coordinates
    const { error } = await supabase
      .from("listings")
      .update({
        latitude,
        longitude,
        updated_at: new Date().toISOString(),
      })
      .eq("id", listingId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update listing coordinates" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Listing coordinates updated successfully",
    });
  } catch (error) {
    console.error("Error updating listing coordinates:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// Batch update coordinates for listings based on their location
export async function PUT(request: NextRequest) {
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
    // Get all listings without coordinates
    const { data: listings, error } = await supabase
      .from("listings")
      .select("id, location")
      .is("latitude", null);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: 500 }
      );
    }

    if (!listings || listings.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No listings found that need coordinate updates",
        updated: 0,
      });
    }

    // Geocoding results for common locations
    const geocodingResults: Record<string, { lat: number; lng: number }> = {
      "new york": { lat: 40.7128, lng: -74.006 },
      "los angeles": { lat: 34.0522, lng: -118.2437 },
      "chicago": { lat: 41.8781, lng: -87.6298 },
      "san francisco": { lat: 37.7749, lng: -122.4194 },
      "miami": { lat: 25.7617, lng: -80.1918 },
      "seattle": { lat: 47.6062, lng: -122.3321 },
      "austin": { lat: 30.2672, lng: -97.7431 },
      "denver": { lat: 39.7392, lng: -104.9903 },
      "boston": { lat: 42.3601, lng: -71.0589 },
      "washington dc": { lat: 38.9072, lng: -77.0369 },
      "philadelphia": { lat: 39.9526, lng: -75.1652 },
      "atlanta": { lat: 33.7490, lng: -84.3880 },
      "dallas": { lat: 32.7767, lng: -96.7970 },
      "houston": { lat: 29.7604, lng: -95.3698 },
      "phoenix": { lat: 33.4484, lng: -112.0740 },
    };

    // Update each listing with coordinates based on location
    let updatedCount = 0;
    const updates = [];

    for (const listing of listings) {
      if (!listing.location) continue;

      const normalizedLocation = listing.location.toLowerCase();
      const matchedCity = Object.keys(geocodingResults).find((city) =>
        normalizedLocation.includes(city)
      );

      if (matchedCity) {
        const coords = geocodingResults[matchedCity];
        updates.push({
          id: listing.id,
          latitude: coords.lat,
          longitude: coords.lng,
          updated_at: new Date().toISOString(),
        });
      }
    }

    // Batch update listings with coordinates
    if (updates.length > 0) {
      const { error: updateError, count } = await supabase
        .from("listings")
        .upsert(updates);

      if (updateError) {
        return NextResponse.json(
          { error: "Failed to update listings" },
          { status: 500 }
        );
      }

      updatedCount = count || updates.length;
    }

    return NextResponse.json({
      success: true,
      message: `Updated coordinates for ${updatedCount} listings`,
      updated: updatedCount,
      total: listings.length,
    });
  } catch (error) {
    console.error(