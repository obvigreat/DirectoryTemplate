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
      { error: "You must be logged in to view your subscription" },
      { status: 401 },
    );
  }

  try {
    // Get user profile to check current subscription
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("subscription")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 },
      );
    }

    // Get active subscription details if any
    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // It's okay if there's no subscription record
    if (subscriptionError && subscriptionError.code !== "PGRST116") {
      console.error("Error fetching subscription:", subscriptionError);
    }

    return NextResponse.json({
      plan: profile?.subscription || "free",
      subscription: subscription || null,
    });
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
