"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Loader2,
  Calendar,
  ArrowUpRight,
  Shield,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SubscriptionManagerProps {
  userId: string;
}

export default function SubscriptionManager({
  userId,
}: SubscriptionManagerProps) {
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelingSubscription, setCancelingSubscription] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");

  useEffect(() => {
    async function fetchSubscription() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        setSubscription(data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [userId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case "trialing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" /> Trial
          </Badge>
        );
      case "past_due":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" /> Past Due
          </Badge>
        );
      case "canceled":
        return <Badge className="bg-gray-100 text-gray-800">Canceled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPriceId = () => {
    // Replace these with your actual price IDs from Stripe
    switch (selectedPlan) {
      case "premium":
        return "price_1OXYZABCDEFGHIJKLMNOPQRSt";
      case "business":
        return "price_1OXYZBCDEFGHIJKLMNOPQRSu";
      default:
        return "price_1OXYZABCDEFGHIJKLMNOPQRSt";
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: getPriceId(),
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/dashboard/subscription`,
        }),
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error: any) {
      setError(error.message || "Failed to create checkout session");
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;

    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will still have access until the end of your current billing period.",
      )
    ) {
      return;
    }

    setCancelingSubscription(true);
    setError(null);

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Update local state
      setSubscription({
        ...subscription,
        cancel_at_period_end: true,
      });

      // Refresh the page to get updated data
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to cancel subscription");
    } finally {
      setCancelingSubscription(false);
    }
  };

  const handleResumeSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;

    setCancelingSubscription(true);
    setError(null);

    try {
      const response = await fetch("/api/resume-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Update local state
      setSubscription({
        ...subscription,
        cancel_at_period_end: false,
      });

      // Refresh the page to get updated data
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to resume subscription");
    } finally {
      setCancelingSubscription(false);
    }
  };

  const handleManagePaymentMethod = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error: any) {
      setError(error.message || "Failed to create customer portal session");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!subscription || subscription.status === "canceled") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              You don't have an active subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Upgrade to a premium plan to access exclusive features and
              benefits.
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${selectedPlan === "premium" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                onClick={() => setSelectedPlan("premium")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Premium</h3>
                  {selectedPlan === "premium" && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-lg font-bold mb-1">
                  $9.99
                  <span className="text-sm font-normal text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="text-sm space-y-1 mt-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />{" "}
                    Advanced search filters
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" /> No
                    ads experience
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />{" "}
                    Priority support
                  </li>
                </ul>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer ${selectedPlan === "business" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                onClick={() => setSelectedPlan("business")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Business</h3>
                  {selectedPlan === "business" && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-lg font-bold mb-1">
                  $29.99
                  <span className="text-sm font-normal text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="text-sm space-y-1 mt-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" /> All
                    Premium features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />{" "}
                    Unlimited listings
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />{" "}
                    Analytics dashboard
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button onClick={handleSubscribe} className="w-full">
              <CreditCard className="w-4 h-4 mr-2" /> Subscribe Now
            </Button>
            <Link href="/pricing" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowUpRight className="w-4 h-4 mr-2" /> View All Plans
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium Benefits</CardTitle>
            <CardDescription>
              Why upgrade to a premium subscription?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Enhanced Features</h3>
                  <p className="text-sm text-gray-600">
                    Access advanced search filters and premium features to find
                    exactly what you're looking for.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Ad-Free Experience</h3>
                  <p className="text-sm text-gray-600">
                    Enjoy a clean, distraction-free browsing experience without
                    any advertisements.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Priority Support</h3>
                  <p className="text-sm text-gray-600">
                    Get faster responses and dedicated support for all your
                    questions and needs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Subscription</CardTitle>
              <CardDescription>
                {subscription.product_name || "Premium Plan"}
              </CardDescription>
            </div>
            {getStatusBadge(subscription.status)}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium">{subscription.status}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Current period ends</span>
              <span className="font-medium">
                {formatDate(subscription.current_period_end)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Subscription plan</span>
              <span className="font-medium">{subscription.product_name}</span>
            </div>

            {subscription.cancel_at_period_end && (
              <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    Your subscription will be canceled
                  </p>
                  <p>
                    You will lose access to premium features on{" "}
                    {formatDate(subscription.current_period_end)}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {subscription.status === "active" && (
            <>
              <Button
                onClick={handleManagePaymentMethod}
                variant="outline"
                className="w-full"
              >
                <CreditCard className="w-4 h-4 mr-2" /> Manage Payment Method
              </Button>

              {subscription.cancel_at_period_end ? (
                <Button
                  onClick={handleResumeSubscription}
                  disabled={cancelingSubscription}
                  className="w-full"
                >
                  {cancelingSubscription ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Resume Subscription
                </Button>
              ) : (
                <Button
                  onClick={handleCancelSubscription}
                  variant="destructive"
                  disabled={cancelingSubscription}
                  className="w-full"
                >
                  {cancelingSubscription ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  )}
                  Cancel Subscription
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Benefits</CardTitle>
          <CardDescription>
            Features included in your {subscription.product_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Advanced search filters</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Ad-free browsing experience</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Priority customer support</span>
            </li>
            {subscription.product_name?.toLowerCase().includes("business") && (
              <>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Unlimited listing creation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Featured placement in search results</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Detailed analytics dashboard</span>
                </li>
              </>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/pricing" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowUpRight className="w-4 h-4 mr-2" /> View All Plan Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
