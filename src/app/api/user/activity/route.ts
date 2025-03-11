import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to view your activity" },
      { status: 401 },
    );
  }

  try {
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
      .limit(10);

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
      .limit(10);

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
    activity.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return NextResponse.json(activity);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
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
