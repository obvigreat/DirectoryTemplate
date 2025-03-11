import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/listings/[id] - Get a specific listing
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

  // Get the listing with related data
  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      categories(*),
      business_hours(*)
    `,
    )
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 },
    );
  }

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json(listing);
}

// PATCH /api/admin/listings/[id] - Update a listing
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
    const {
      title,
      description,
      category_id,
      location,
      status,
      price_level,
      features,
      images,
      business_hours,
    } = body;

    // Update listing
    const { error } = await supabase
      .from("listings")
      .update({
        title,
        description,
        category_id,
        location,
        status,
        price_level,
        features,
        images,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update listing" },
        { status: 500 },
      );
    }

    // Update business hours if provided
    if (business_hours && business_hours.length > 0) {
      // First delete existing hours
      await supabase
        .from("business_hours")
        .delete()
        .eq("listing_id", params.id);

      // Then insert new hours
      const hoursWithListingId = business_hours.map((hour: any) => ({
        ...hour,
        listing_id: params.id,
      }));

      const { error: hoursError } = await supabase
        .from("business_hours")
        .insert(hoursWithListingId);

      if (hoursError) {
        console.error("Failed to update business hours:", hoursError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Listing updated successfully",
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/listings/[id] - Delete a listing
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

  try {
    // First delete related data
    await supabase.from("business_hours").delete().eq("listing_id", params.id);
    await supabase.from("reviews").delete().eq("listing_id", params.id);
    await supabase.from("saved_listings").delete().eq("listing_id", params.id);
    await supabase.from("bookings").delete().eq("listing_id", params.id);
    await supabase.from("messages").delete().eq("listing_id", params.id);

    // Then delete the listing
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete listing" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
