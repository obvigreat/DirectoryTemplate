// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/supabase-functions

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_data: any;
  user_id?: string;
  session_id?: string;
  created_at: string;
}

interface ProcessedResult {
  success: boolean;
  message: string;
  processed: number;
  errors: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );

    // Verify the request is from an admin
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Check if user is an admin
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    // Process analytics data based on request method
    if (req.method === "POST") {
      // Process a batch of events
      const { events } = await req.json();
      const result = await processEvents(supabase, events);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else if (req.method === "GET") {
      // Process all unprocessed events
      const result = await processAllEvents(supabase);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 405,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/**
 * Process a batch of analytics events
 */
async function processEvents(
  supabase: any,
  events: AnalyticsEvent[],
): Promise<ProcessedResult> {
  let processed = 0;
  let errors = 0;

  for (const event of events) {
    try {
      // Process the event based on its type
      switch (event.event_type) {
        case "listing_view":
          await processListingView(supabase, event);
          break;
        case "search":
          await processSearch(supabase, event);
          break;
        case "subscription_purchase":
          await processSubscriptionPurchase(supabase, event);
          break;
        // Add more event types as needed
      }

      processed++;
    } catch (error) {
      console.error(`Error processing event ${event.id}:`, error);
      errors++;
    }
  }

  return {
    success: true,
    message: `Processed ${processed} events with ${errors} errors`,
    processed,
    errors,
  };
}

/**
 * Process all unprocessed events from the analytics_events table
 */
async function processAllEvents(supabase: any): Promise<ProcessedResult> {
  // Get all events from the last 24 hours that haven't been processed
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const { data: events, error } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", oneDayAgo.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }

  if (!events || events.length === 0) {
    return {
      success: true,
      message: "No events to process",
      processed: 0,
      errors: 0,
    };
  }

  return await processEvents(supabase, events);
}

/**
 * Process a listing view event
 */
async function processListingView(supabase: any, event: AnalyticsEvent) {
  const { listingId } = event.event_data;

  if (!listingId) return;

  // Update listing view count
  await supabase.rpc("increment_listing_views", { listing_id: listingId });
}

/**
 * Process a search event
 */
async function processSearch(supabase: any, event: AnalyticsEvent) {
  const { query, category, location, resultsCount } = event.event_data;

  // Store popular searches for recommendations
  if (query) {
    await supabase.from("popular_searches").upsert(
      {
        query: query.toLowerCase(),
        category,
        location,
        count: 1,
        last_searched_at: new Date().toISOString(),
      },
      {
        onConflict: "query",
        ignoreDuplicates: false,
      },
    );
  }
}

/**
 * Process a subscription purchase event
 */
async function processSubscriptionPurchase(
  supabase: any,
  event: AnalyticsEvent,
) {
  const { plan, price } = event.event_data;
  const { user_id } = event;

  if (!user_id) return;

  // Update user's lifetime value
  await supabase.rpc("update_user_lifetime_value", {
    user_id,
    amount: price,
  });
}
