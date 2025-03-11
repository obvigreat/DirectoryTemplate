import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Basic access for individuals",
    price: 0,
    features: [
      "Browse all listings",
      "Save up to 5 listings",
      "Contact business owners",
      "Basic search functionality",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    description: "For business owners and professionals",
    price: 9.99,
    interval: "month",
    features: [
      "All Free features",
      "Add your business listing",
      "Receive customer inquiries",
      "Basic analytics",
      "Customer reviews management",
    ],
    cta: "Start 7-Day Trial",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Enhanced features for power users",
    price: 19.99,
    interval: "month",
    features: [
      "All Business features",
      "Featured listing placement",
      "Advanced analytics",
      "Priority support",
      "Multiple business listings",
      "Promotional tools",
    ],
    cta: "Upgrade Now",
    popular: false,
  },
];

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    return new Response(JSON.stringify(plans), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
    });
  }
});
