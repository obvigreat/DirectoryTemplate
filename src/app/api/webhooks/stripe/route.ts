import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "../../../../../supabase/server";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const supabase = await createClient();

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription as string;

        if (!userId) {
          throw new Error("No user ID found in session");
        }

        // Get subscription details
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;
        const productId = subscription.items.data[0].price.product as string;
        const product = await stripe.products.retrieve(productId);

        // Update user's subscription in the database
        const { error } = await supabase.from("user_subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: priceId,
          stripe_product_id: productId,
          product_name: product.name,
          status: subscription.status,
          current_period_end: new Date(
            subscription.current_period_end * 1000,
          ).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        });

        if (error) throw error;

        // Update user role based on subscription
        if (subscription.status === "active") {
          const { error: userError } = await supabase
            .from("users")
            .update({ role: "premium" })
            .eq("id", userId);

          if (userError) throw userError;
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        // Get the user associated with this subscription
        const { data: subscriptionData, error: fetchError } = await supabase
          .from("user_subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (fetchError) throw fetchError;

        // Update subscription status
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            status: subscription.status,
            current_period_end: new Date(
              subscription.current_period_end * 1000,
            ).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("stripe_subscription_id", subscriptionId);

        if (error) throw error;

        // Update user role based on subscription status
        if (subscriptionData?.user_id) {
          const newRole = subscription.status === "active" ? "premium" : "user";
          const { error: userError } = await supabase
            .from("users")
            .update({ role: newRole })
            .eq("id", subscriptionData.user_id);

          if (userError) throw userError;
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        // Get the user associated with this subscription
        const { data: subscriptionData, error: fetchError } = await supabase
          .from("user_subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (fetchError) throw fetchError;

        // Update subscription status
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            status: "canceled",
          })
          .eq("stripe_subscription_id", subscriptionId);

        if (error) throw error;

        // Downgrade user role
        if (subscriptionData?.user_id) {
          const { error: userError } = await supabase
            .from("users")
            .update({ role: "user" })
            .eq("id", subscriptionData.user_id);

          if (userError) throw userError;
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`Error processing webhook: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook handler failed: ${error.message}` },
      { status: 500 },
    );
  }
}
