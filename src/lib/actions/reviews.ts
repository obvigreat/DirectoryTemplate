"use server";

import { createClient } from "../../../supabase/server";
import { revalidatePath } from "next/cache";
import { InsertReview, UpdateReview } from "@/lib/supabase";

// Get reviews for a listing
export async function getReviewsByListingId(listingId: number | string) {
  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users:user_id (name, avatar_url)
    `,
    )
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  // Format the reviews to match the expected structure
  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    user: {
      name: review.users?.name || "Anonymous",
      avatar:
        review.users?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user_id}`,
    },
    rating: review.rating,
    comment: review.comment,
    date: review.created_at,
  }));

  return formattedReviews;
}

// Submit a new review
export async function submitReview(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to submit a review",
    };
  }

  const listingId = formData.get("listingId") as string;
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  if (!listingId || !rating || !comment) {
    return { success: false, message: "All fields are required" };
  }

  // Check if user has already reviewed this listing
  const { data: existingReview } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", user.id)
    .eq("listing_id", listingId)
    .single();

  if (existingReview) {
    // Update existing review
    const updatedReview: UpdateReview = {
      rating,
      comment,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("reviews")
      .update(updatedReview)
      .eq("id", existingReview.id);

    if (error) {
      console.error("Error updating review:", error);
      return { success: false, message: "Failed to update review" };
    }

    revalidatePath(`/listings/${listingId}`);
    return { success: true, message: "Review updated successfully" };
  } else {
    // Create new review
    const newReview: InsertReview = {
      user_id: user.id,
      listing_id: parseInt(listingId),
      rating,
      comment,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("reviews").insert(newReview);

    if (error) {
      console.error("Error submitting review:", error);
      return { success: false, message: "Failed to submit review" };
    }

    revalidatePath(`/listings/${listingId}`);
    return { success: true, message: "Review submitted successfully" };
  }
}

// Delete a review
export async function deleteReview(
  reviewId: string,
  listingId: number | string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to delete a review",
    };
  }

  // Check if the user owns the review
  const { data: review } = await supabase
    .from("reviews")
    .select("user_id")
    .eq("id", reviewId)
    .single();

  if (!review || review.user_id !== user.id) {
    return {
      success: false,
      message: "You don't have permission to delete this review",
    };
  }

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) {
    console.error("Error deleting review:", error);
    return { success: false, message: "Failed to delete review" };
  }

  revalidatePath(`/listings/${listingId}`);
  return { success: true, message: "Review deleted successfully" };
}
