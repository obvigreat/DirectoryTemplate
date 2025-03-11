"use server";

import { createClient } from "../../../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateUser } from "@/lib/supabase";

// Get user profile
export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return profile;
}

// Update user profile
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
  const avatarUrl = formData.get("avatarUrl") as string;

  const updates: UpdateUser = {};
  if (name) updates.name = name;
  if (avatarUrl) updates.avatar_url = avatarUrl;
  updates.updated_at = new Date().toISOString();

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

// Get user activity (views, saves, reviews)
export async function getUserActivity() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Get saved listings
  const { data: savedListings } = await supabase
    .from("saved_listings")
    .select(
      `
      saved_at,
      listings:listing_id (id, title, images)
    `,
    )
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })
    .limit(5);

  // Get reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      `
      created_at,
      rating,
      comment,
      listings:listing_id (id, title, images)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Format the activity data
  const activity = [
    // Format saved listings as activities
    ...(savedListings?.map((item) => ({
      id: `save-${item.listings.id}-${new Date(item.saved_at).getTime()}`,
      type: "save",
      listing: {
        id: item.listings.id,
        title: item.listings.title,
        image: item.listings.images?.[0] || "",
      },
      date: item.saved_at,
      formattedDate: formatDate(item.saved_at),
    })) || []),

    // Format reviews as activities
    ...(reviews?.map((item) => ({
      id: `review-${item.listings.id}-${new Date(item.created_at).getTime()}`,
      type: "review",
      listing: {
        id: item.listings.id,
        title: item.listings.title,
        image: item.listings.images?.[0] || "",
      },
      rating: item.rating,
      comment: item.comment,
      date: item.created_at,
      formattedDate: formatDate(item.created_at),
    })) || []),
  ];

  // Sort by date (newest first)
  return activity.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Helper function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}
