"use server";

import { createClient } from "../../../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Save or unsave a listing
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
      console.error("Failed to unsave listing:", error);
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
      console.error("Failed to save listing:", error);
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

// Get saved listings for the current user
export async function getSavedListings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
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
    console.error("Error fetching saved listings:", error);
    return [];
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

  return savedListings;
}

// Check if a listing is saved by the current user
export async function isListingSaved(listingId: number | string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from("saved_listings")
    .select("*")
    .eq("user_id", user.id)
    .eq("listing_id", listingId)
    .single();

  return !!data;
}

// Get saved listing IDs for the current user
export async function getSavedListingIds() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } = await supabase
    .from("saved_listings")
    .select("listing_id")
    .eq("user_id", user.id);

  return data?.map((item) => item.listing_id) || [];
}
