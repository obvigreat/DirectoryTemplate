import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to save listings" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const listingId = formData.get("listingId");

    if (!listingId) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 },
      );
    }

    // Check if listing is already saved
    const { data: existingSave } = await supabase
      .from("saved_listings")
      .select("*")
      .eq("user_id", user.id)
      .eq("listing_id", listingId)
      .single();

    let saved = false;

    if (existingSave) {
      // Remove from saved listings
      const { error } = await supabase
        .from("saved_listings")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);

      if (error) {
        return NextResponse.json(
          { error: "Failed to unsave listing" },
          { status: 500 },
        );
      }
    } else {
      // Add to saved listings
      const { error } = await supabase.from("saved_listings").insert({
        user_id: user.id,
        listing_id: listingId,
        saved_at: new Date().toISOString(),
      });

      if (error) {
        return NextResponse.json(
          { error: "Failed to save listing" },
          { status: 500 },
        );
      }

      saved = true;
    }

    // Return success response with saved status
    return NextResponse.json({
      success: true,
      saved,
      message: saved
        ? "Listing saved successfully"
        : "Listing removed from saved",
    });
  } catch (error) {
    console.error("Error saving listing:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
