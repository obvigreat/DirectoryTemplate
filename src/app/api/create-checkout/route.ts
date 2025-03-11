import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to create a checkout session" },
      { status: 401 },
    );
  }

  try {
    const { planId, successUrl, cancelUrl } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Call the Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { planId, successUrl, cancelUrl, userId: user.id },
    });

    if (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
