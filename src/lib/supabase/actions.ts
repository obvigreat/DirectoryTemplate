"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Insertables, Updateables } from "./database.types";

// Listings actions
export async function createListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a listing",
    };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const website = formData.get("website") as string;
  const priceRange = formData.get("priceRange") as string;
  const amenitiesString = formData.get("amenities") as string;
  const amenities = amenitiesString ? JSON.parse(amenitiesString) : [];
  const hoursString = formData.get("hours") as string;
  const hours = hoursString ? JSON.parse(hoursString) : null;
  const imagesString = formData.get("images") as string;
  const images = imagesString ? JSON.parse(imagesString) : [];

  // Validate required fields
  if (!title || !category || !description || !location || !phone || !email) {
    return { success: false, error: "Missing required fields" };
  }

  const newListing: Insertables<"listings"> = {
    title,
    category,
    description,
    location,
    phone,
    email,
    website,
    user_id: user.id,
    price_range: priceRange,
    amenities,
    hours,
    images,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("listings")
    .insert(newListing)
    .select()
    .single();

  if (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/listings");
  revalidatePath("/dashboard/listings");
  return { success: true, data };
}

export async function updateListing(id: number, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to update a listing",
    };
  }

  // Check if the user owns the listing
  const { data: listing } = await supabase
    .from("listings")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!listing || listing.user_id !== user.id) {
    return {
      success: false,
      error: "You don't have permission to update this listing",
    };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const website = formData.get("website") as string;
  const priceRange = formData.get("priceRange") as string;
  const amenitiesString = formData.get("amenities") as string;
  const amenities = amenitiesString ? JSON.parse(amenitiesString) : [];
  const hoursString = formData.get("hours") as string;
  const hours = hoursString ? JSON.parse(hoursString) : null;
  const imagesString = formData.get("images") as string;
  const images = imagesString ? JSON.parse(imagesString) : [];
  const status = (formData.get("status") as string) || "active";

  // Validate required fields
  if (!title || !category || !description || !location || !phone || !email) {
    return { success: false, error: "Missing required fields" };
  }

  const updatedListing: Updateables<"listings"> = {
    title,
    category,
    description,
    location,
    phone,
    email,
    website,
    price_range: priceRange,
    amenities,
    hours,
    images,
    status,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("listings")
    .update(updatedListing)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating listing:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/listings/${id}`);
  revalidatePath("/listings");
  revalidatePath("/dashboard/listings");
  return { success: true, data };
}

export async function deleteListing(id: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to delete a listing",
    };
  }

  // Check if the user owns the listing
  const { data: listing } = await supabase
    .from("listings")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!listing || listing.user_id !== user.id) {
    return {
      success: false,
      error: "You don't have permission to delete this listing",
    };
  }

  const { error } = await supabase.from("listings").delete().eq("id", id);

  if (error) {
    console.error("Error deleting listing:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/listings");
  revalidatePath("/dashboard/listings");
  return { success: true };
}

// Reviews actions
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

    await updateListingRating(listingId);
    revalidatePath(`/listings/${listingId}`);
    return { success: true, message: "Review updated successfully" };
  } else {
    // Create new review
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

    await updateListingRating(listingId);
    revalidatePath(`/listings/${listingId}`);
    return { success: true, message: "Review submitted successfully" };
  }
}

async function updateListingRating(listingId: string | number) {
  const supabase = await createClient();

  // Get all reviews for the listing
  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("listing_id", listingId);

  if (!reviews || reviews.length === 0) return;

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
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

// Saved listings actions
export async function toggleSavedListing(listingId: number | string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      saved: false,
      message: "You must be logged in to save listings",
    };
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
      return {
        success: false,
        saved: true,
        message: "Failed to unsave listing",
      };
    }

    revalidatePath(`/listings/${listingId}`);
    revalidatePath("/dashboard/saved");
    return {
      success: true,
      saved: false,
      message: "Listing removed from saved",
    };
  } else {
    // Add to saved listings
    const { error } = await supabase.from("saved_listings").insert({
      user_id: user.id,
      listing_id: parseInt(listingId.toString()),
      saved_at: new Date().toISOString(),
    });

    if (error) {
      return {
        success: false,
        saved: false,
        message: "Failed to save listing",
      };
    }

    revalidatePath(`/listings/${listingId}`);
    revalidatePath("/dashboard/saved");
    return {
      success: true,
      saved: true,
      message: "Listing saved successfully",
    };
  }
}

// User profile actions
export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to update your profile",
    };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const updates: Updateables<"users"> = {
    name,
    bio,
    location,
    phone,
    website,
    updated_at: new Date().toISOString(),
  };

  if (avatarUrl) updates.avatar_url = avatarUrl;

  const { error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile" };
  }

  revalidatePath("/dashboard/settings");
  return { success: true, message: "Profile updated successfully" };
}
