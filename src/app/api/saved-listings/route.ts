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
      { error: "You must be logged in to view saved listings" },
      { status: 401 },
    );
  }

  const { data, error } = await supabase
    .from("saved_listings")
    .select(
      `
      *,
      listings:listing_id (*)
    `,
    )
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Format the data to match the expected structure
  const savedListings = data.map((item) => ({
    id: item.listings.id,
    title: item.listings.title,
    category: item.listings.category,
    location: item.listings.location,
    rating: item.listings.rating,
    reviews: item.listings.reviews_count,
    image: item.listings.images?.[0] || "",
    savedDate: new Date(item.saved_at).toISOString().split("T")[0],
    isSaved: true,
  }));

  return NextResponse.json(savedListings);
}

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
    const body = await request.json();
    const { listingId } = body;

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

    if (existingSave) {
      // Remove from saved listings
      const { error } = await supabase
        .from("saved_listings")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        saved: false,
        message: "Listing removed from saved",
      });
    } else {
      // Add to saved listings
      const { error } = await supabase.from("saved_listings").insert({
        user_id: user.id,
        listing_id: listingId,
        saved_at: new Date().toISOString(),
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        saved: true,
        message: "Listing saved successfully",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
