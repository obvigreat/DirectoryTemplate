import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to view bookings" },
      { status: 401 },
    );
  }

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const listingId = searchParams.get("listingId");
  const status = searchParams.get("status");

  try {
    let query = supabase
      .from("bookings")
      .select("*, listings:listing_id(title, category, location, images)")
      .order("booking_date", { ascending: true });

    // If listingId is provided, filter by listing
    if (listingId) {
      // First check if the user owns this listing
      const { data: listing } = await supabase
        .from("listings")
        .select("user_id")
        .eq("id", listingId)
        .single();

      if (!listing || listing.user_id !== user.id) {
        // If user doesn't own the listing, they can only see their own bookings
        query = query.eq("listing_id", listingId).eq("user_id", user.id);
      } else {
        // If user owns the listing, they can see all bookings for it
        query = query.eq("listing_id", listingId);
      }
    } else {
      // If no listingId, get bookings for all listings owned by the user
      // and bookings made by the user
      const { data: userListings } = await supabase
        .from("listings")
        .select("id")
        .eq("user_id", user.id);

      const listingIds = userListings?.map((listing) => listing.id) || [];

      if (listingIds.length > 0) {
        query = query.or(
          `listing_id.in.(${listingIds.join(",")}),user_id.eq.${user.id}`,
        );
      } else {
        query = query.eq("user_id", user.id);
      }
    }

    // Filter by status if provided
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const { listingId, name, email, phone, bookingDate, bookingTime, notes } =
      body;

    if (
      !listingId ||
      !name ||
      !email ||
      !phone ||
      !bookingDate ||
      !bookingTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get current user if logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create the booking
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        listing_id: listingId,
        user_id: user?.id || null,
        name,
        email,
        phone,
        booking_date: bookingDate,
        booking_time: bookingTime,
        notes,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      data,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
