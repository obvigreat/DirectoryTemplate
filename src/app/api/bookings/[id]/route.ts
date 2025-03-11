import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const id = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to view booking details" },
      { status: 401 },
    );
  }

  try {
    // Get the booking with listing details
    const { data: booking, error } = await supabase
      .from("bookings")
      .select(
        "*, listings:listing_id(title, category, location, images, user_id)",
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if user has permission to view this booking
    // User can view if they made the booking or if they own the listing
    if (booking.user_id !== user.id && booking.listings.user_id !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to view this booking" },
        { status: 403 },
      );
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const id = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to update a booking" },
      { status: 401 },
    );
  }

  try {
    // Get the booking to check permissions
    const { data: booking } = await supabase
      .from("bookings")
      .select("*, listings:listing_id(user_id)")
      .eq("id", id)
      .single();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if user has permission to update this booking
    // Only the listing owner can update the booking status
    if (booking.listings.user_id !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to update this booking" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    // Validate status
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    // Update the booking
    const { data, error } = await supabase
      .from("bookings")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      data,
    });
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const id = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to cancel a booking" },
      { status: 401 },
    );
  }

  try {
    // Get the booking to check permissions
    const { data: booking } = await supabase
      .from("bookings")
      .select("user_id, listings:listing_id(user_id)")
      .eq("id", id)
      .single();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if user has permission to cancel this booking
    // User can cancel if they made the booking or if they own the listing
    if (booking.user_id !== user.id && booking.listings.user_id !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to cancel this booking" },
        { status: 403 },
      );
    }

    // Update the booking status to cancelled instead of deleting
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error: any) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
