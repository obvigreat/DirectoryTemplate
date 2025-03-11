"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./auth-state-provider";
import { Button } from "./ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface ClientSubscriptionCheckProps {
  requiredPlan: "business" | "premium" | "any";
  children: React.ReactNode;
  redirectUrl?: string;
}

export default function ClientSubscriptionCheck({
  requiredPlan,
  children,
  redirectUrl = "/pricing",
}: ClientSubscriptionCheckProps) {
  const { user, isLoading } = useAuth();
  const [subscription, setSubscription] = useState<string | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setIsCheckingSubscription(false);
        return;
      }

      try {
        const response = await fetch("/api/user/subscription");
        if (response.ok) {
          const data = await response.json();
          setSubscription(data.plan || "free");
        } else {
          console.error("Error fetching subscription:", await response.text());
          setSubscription("free");
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        setSubscription("free");
      } finally {
        setIsCheckingSubscription(false);
      }
    };

    if (!isLoading) {
      checkSubscription();
    }
  }, [user, isLoading]);

  if (isLoading || isCheckingSubscription) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle className="text-yellow-800">Sign In Required</AlertTitle>
        <AlertDescription className="text-yellow-700">
          <p className="mb-4">You need to sign in to access this feature.</p>
          <Link
            href={`/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`}
          >
            <Button>Sign In</Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  let hasRequiredPlan = false;

  if (requiredPlan === "any") {
    // Any paid plan is sufficient
    hasRequiredPlan = subscription !== "free";
  } else if (requiredPlan === "business") {
    // Business or premium plan is required
    hasRequiredPlan = subscription === "business" || subscription === "premium";
  } else if (requiredPlan === "premium") {
    // Only premium plan is sufficient
    hasRequiredPlan = subscription === "premium";
  }

  if (!hasRequiredPlan) {
    return (
      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle className="text-yellow-800">
          Subscription Required
        </AlertTitle>
        <AlertDescription className="text-yellow-700">
          <p className="mb-4">
            You need a{" "}
            {requiredPlan === "premium"
              ? "Premium"
              : requiredPlan === "business" && subscription === "free"
                ? "Business or Premium"
                : requiredPlan === "any"
                  ? "paid"
                  : "Premium"}{" "}
            subscription to access this feature.
          </p>
          <Link href={redirectUrl}>
            <Button>View Plans</Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
