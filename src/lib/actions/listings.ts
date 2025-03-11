"use server";

import { createClient } from "../../../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Listing, InsertListing, UpdateListing } from "@/lib/supabase";

// Get all listings with optional filters
export async function getListings({
  category,
  query,
  location,
  page = 1,
  limit = 9,
  sortBy = "created_at",
  sortOrder = "desc",
}: {
  category?: string;
  query?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let listingsQuery = supabase
    .from("listings")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(offset, offset + limit - 1);

  if (category && category !== "All Categories") {
    listingsQuery = listingsQuery.eq("category", category);
  }

  if (query) {
    listingsQuery = listingsQuery.ilike("title", `%${query}%`);
  }

  if (location) {
    listingsQuery = listingsQuery.ilike("location", `%${location}%`);
  }

  const { data: listings, error, count } = await listingsQuery;

  if (error) {
    console.error("Error fetching listings:", error);
    return { listings: [], count: 0 };
  }

  return { listings, count: count || 0 };
}

// Get a single listing by ID
export async function getListingById(id: number | string) {
  const supabase = await createClient();

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching listing:", error);
    return null;
  }

  return listing;
}

// Get related listings
export async function getRelatedListings({
  category,
  currentListingId,
  limit = 3,
}: {
  category: string;
  currentListingId: number;
  limit?: number;
}) {
  const supabase = await createClient();

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .neq("id", currentListingId)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related listings:", error);
    return [];
  }

  return listings;
}

// Create a new listing
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

  const newListing: InsertListing = {
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
  return { success: true, data };
}

// Update an existing listing
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

  // Validate required fields
  if (!title || !category || !description || !location || !phone || !email) {
    return { success: false, error: "Missing required fields" };
  }

  const updatedListing: UpdateListing = {
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
  return { success: true, data };
}

// Delete a listing
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
  revalidatePath("/dashboard");
  return { success: true };
}
