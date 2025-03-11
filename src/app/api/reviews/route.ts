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
      { error: "You must be logged in to submit a review" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const listingId = formData.get("listingId");
    const rating = formData.get("rating");
    const comment = formData.get("comment");

    if (!listingId || !rating || !comment) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if user has already reviewed this listing
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", user.id)
      .eq("listing_id", listingId)
      .single();

    let result;

    if (existingReview) {
      // Update existing review
      result = await supabase
        .from("reviews")
        .update({
          rating,
          comment,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingReview.id);

      if (result.error) {
        return NextResponse.json(
          { error: "Failed to update review" },
          { status: 500 },
        );
      }
    } else {
      // Save new review to database
      result = await supabase.from("reviews").insert({
        user_id: user.id,
        listing_id: listingId,
        rating,
        comment,
        created_at: new Date().toISOString(),
      });

      if (result.error) {
        return NextResponse.json(
          { error: "Failed to submit review" },
          { status: 500 },
        );
      }
    }

    // Update listing rating and reviews count
    await updateListingRating(supabase, listingId);

    return NextResponse.json({
      success: true,
      message: existingReview
        ? "Review updated successfully"
        : "Review submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

async function updateListingRating(
  supabase: any,
  listingId: FormDataEntryValue,
) {
  // Get all reviews for the listing
  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("listing_id", listingId);

  if (!reviews || reviews.length === 0) return;

  // Calculate average rating
  const totalRating = reviews.reduce(
    (sum: number, review: any) => sum + Number(review.rating),
    0,
  );
  const averageRating = totalRating / reviews.length;

  // Update the listing
  await supabase
    .from("listings")
    .update({
      rating: parseFloat(averageRating.toFixed(1)),
      reviews_count: reviews.length,
    })
    .eq("id", listingId);
}
