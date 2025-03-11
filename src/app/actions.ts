"use server";

import { createClient } from "../../supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  signOut,
} from "@/lib/actions/auth";

export const signUpAction = signUp;
export const signInAction = signIn;
export const forgotPasswordAction = forgotPassword;
export const resetPasswordAction = resetPassword;
export const signOutAction = signOut;

// Check if a user has an active subscription
export async function checkUserSubscription(
  userId: string,
  requiredPlan: "business" | "premium" | "any" = "any",
) {
  const supabase = await createClient();

  // Get user profile to check current subscription
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("subscription")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Failed to fetch user profile:", profileError);
    return false;
  }

  const currentPlan = profile?.subscription || "free";

  // Check if the user has the required subscription
  if (requiredPlan === "any") {
    // Any paid plan is sufficient
    return currentPlan !== "free";
  } else if (requiredPlan === "business") {
    // Business or premium plan is required
    return currentPlan === "business" || currentPlan === "premium";
  } else if (requiredPlan === "premium") {
    // Only premium plan is sufficient
    return currentPlan === "premium";
  }

  return false;
}

// Get user subscription details
export async function getUserSubscription(userId: string) {
  const supabase = await createClient();

  // Get user profile to check current subscription
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("subscription")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Failed to fetch user profile:", profileError);
    return { plan: "free", subscription: null };
  }

  // Get active subscription details if any
  const { data: subscription, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // It's okay if there's no subscription record
  if (subscriptionError && subscriptionError.code !== "PGRST116") {
    console.error("Error fetching subscription:", subscriptionError);
  }

  return {
    plan: profile?.subscription || "free",
    subscription: subscription || null,
  };
}

export async function saveListingAction(listingId: number) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?message=You must be logged in to save listings");
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
      console.error("Failed to unsave listing:", error);
    }
  } else {
    // Add to saved listings
    const { error } = await supabase.from("saved_listings").insert({
      user_id: user.id,
      listing_id: listingId,
      saved_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to save listing:", error);
    }
  }

  revalidatePath(`/listings/${listingId}`);
  return redirect(`/listings/${listingId}`);
}

export async function submitReviewAction(formData: FormData) {
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
    .eq("listing_id", parseInt(listingId))
    .single();

  if (existingReview) {
    // Update existing review
    const { error } = await supabase
      .from("reviews")
      .update({
        rating,
        comment,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingReview.id);

    if (error) {
      return { success: false, message: "Failed to update review" };
    }
  } else {
    // Save new review to database
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      listing_id: parseInt(listingId),
      rating,
      comment,
      created_at: new Date().toISOString(),
    });

    if (error) {
      return { success: false, message: "Failed to submit review" };
    }
  }

  // Update listing rating and reviews count
  await updateListingRating(supabase, listingId);

  revalidatePath(`/listings/${listingId}`);
  return {
    success: true,
    message: existingReview
      ? "Review updated successfully"
      : "Review submitted successfully",
  };
}

async function updateListingRating(supabase: any, listingId: number | string) {
  // Get all reviews for the listing
  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("listing_id", listingId);

  if (!reviews || reviews.length === 0) return;

  // Calculate average rating
  const totalRating = reviews.reduce(
    (sum: number, review: any) => sum + review.rating,
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

export async function searchListingsAction(formData: FormData) {
  const query = formData.get("query") as string;
  const location = formData.get("location") as string;

  const searchParams = new URLSearchParams();
  if (query) searchParams.set("q", query);
  if (location) searchParams.set("location", location);

  return redirect(`/listings?${searchParams.toString()}`);
}
