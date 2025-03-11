import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Zap, BarChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { createClient } from "../../../supabase/server";
import SubscriptionBenefits from "@/components/subscription-benefits";

export const metadata: Metadata = {
  title: "Pricing | Directory",
  description: "Choose the right plan for your business",
};

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's current plan if logged in
  let currentPlan = "free";
  if (user) {
    const { data } = await supabase
      .from("users")
      .select("subscription")
      .eq("id", user.id)
      .single();

    currentPlan = data?.subscription || "free";
  }

  const plans = [
    {
      id: "free",
      name: "Basic",
      price: "$0",
      interval: "forever",
      description: "For individuals just getting started",
      features: [
        "10 listing views per day",
        "Basic customer support",
        "Standard business profile",
        "Limited analytics",
        "Advertisements",
      ],
      popular: false,
    },
    {
      id: "business",
      name: "Business",
      price: "$19.99",
      interval: "monthly",
      description: "For small businesses and professionals",
      features: [
        "Unlimited listing views",
        "Priority customer support",
        "Featured business profile",
        "Advanced analytics",
        "No advertisements",
        "API access",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$49.99",
      interval: "monthly",
      description: "For growing businesses with advanced needs",
      features: [
        "Unlimited listing views",
        "24/7 dedicated support",
        "Premium business profile",
        "Comprehensive analytics",
        "No advertisements",
        "API access",
        "Custom branding",
      ],
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${plan.popular ? "border-blue-500 shadow-md" : ""} relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.id === currentPlan ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    {user ? (
                      <Link href="/dashboard/subscription">
                        {plan.id === "free"
                          ? "Downgrade"
                          : `Choose ${plan.name}`}
                      </Link>
                    ) : (
                      <Link href="/sign-in?callbackUrl=/dashboard/subscription">
                        {plan.id === "free" ? "Sign Up" : `Choose ${plan.name}`}
                      </Link>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Comparison */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Compare Plan Features
          </h2>
          <SubscriptionBenefits showBusinessTier={true} />
        </div>

        {/* Why Upgrade Section */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Upgrade Your Plan?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Enhanced Visibility
              </h3>
              <p className="text-gray-600">
                Premium and Business plans give your listings priority placement
                in search results, increasing your visibility to potential
                customers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Features</h3>
              <p className="text-gray-600">
                Unlock powerful tools like advanced search filters, unlimited
                listings, and priority customer support to grow your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Business plan subscribers get access to comprehensive analytics
                to track performance and optimize their listings.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">
                Can I upgrade or downgrade my plan at any time?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade your plan at any time and the new features
                will be immediately available. If you downgrade, the changes
                will take effect at the end of your current billing cycle.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">How does billing work?</h4>
              <p className="text-gray-600">
                We bill monthly or annually, depending on the plan you choose.
                You can pay using major credit cards, and all payments are
                securely processed.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                Is there a free trial available?
              </h4>
              <p className="text-gray-600">
                We currently don't offer a free trial, but you can start with
                our free Basic plan and upgrade anytime.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                What happens if I cancel my subscription?
              </h4>
              <p className="text-gray-600">
                If you cancel your subscription, you'll still have access to
                your paid features until the end of your current billing period.
                After that, your account will revert to the Basic plan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 mt-16 max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">
              Join thousands of businesses already using our platform
            </p>
            <Link href={user ? "/dashboard" : "/sign-up"}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                {user ? "Go to Dashboard" : "Sign Up Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
