import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.18.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    const body = await req.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: `Webhook signature verification failed: ${err.message}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription;

        if (userId && subscriptionId) {
          // Get subscription details from Stripe
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0].price.id;

          // Determine the plan based on the price ID
          let plan = "free";
          if (priceId === Deno.env.get("STRIPE_BUSINESS_PRICE_ID")) {
            plan = "business";
          } else if (priceId === Deno.env.get("STRIPE_PREMIUM_PRICE_ID")) {
            plan = "premium";
          }

          // Update the user's subscription in the database
          const { error: userError } = await supabase
            .from("users")
            .update({
              subscription: plan,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);

          if (userError) {
            console.error("Error updating user subscription:", userError);
          }

          // Store the subscription details
          const { error: subError } = await supabase
            .from("subscriptions")
            .insert({
              id: subscriptionId,
              user_id: userId,
              status: subscription.status,
              price_id: priceId,
              current_period_start: new Date(
                subscription.current_period_start * 1000,
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000,
              ).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (subError) {
            console.error("Error storing subscription:", subError);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const userId = subscription.metadata.user_id;

        if (userId) {
          // Determine the plan based on the price ID
          const priceId = subscription.items.data[0].price.id;
          let plan = "free";
          if (priceId === Deno.env.get("STRIPE_BUSINESS_PRICE_ID")) {
            plan = "business";
          } else if (priceId === Deno.env.get("STRIPE_PREMIUM_PRICE_ID")) {
            plan = "premium";
          }

          // Update the user's subscription in the database
          if (subscription.status === "active") {
            const { error } = await supabase
              .from("users")
              .update({
                subscription: plan,
                updated_at: new Date().toISOString(),
              })
              .eq("id", userId);

            if (error) {
              console.error("Error updating user subscription:", error);
            }
          }

          // Update the subscription details
          const { error: subError } = await supabase
            .from("subscriptions")
            .update({
              status: subscription.status,
              price_id: priceId,
              cancel_at_period_end: subscription.cancel_at_period_end,
              current_period_start: new Date(
                subscription.current_period_start * 1000,
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000,
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", subscriptionId);

          if (subError) {
            console.error("Error updating subscription:", subError);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const userId = subscription.metadata.user_id;

        if (userId) {
          // Update the user's subscription to free
          const { error } = await supabase
            .from("users")
            .update({
              subscription: "free",
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating user subscription:", error);
          }

          // Update the subscription status
          const { error: subError } = await supabase
            .from("subscriptions")
            .update({
              status: "canceled",
              cancel_at_period_end: false,
              updated_at: new Date().toISOString(),
            })
            .eq("id", subscriptionId);

          if (subError) {
            console.error("Error updating subscription:", subError);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Record the event in the database for auditing
    await supabase.from("webhook_events").insert({
      stripe_event_id: event.id,
      type: event.type,
      event_type: "stripe",
      data: event.data.object,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
