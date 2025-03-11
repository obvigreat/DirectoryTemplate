import { Metadata } from "next";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CreditCard, Zap, Info, ArrowRight } from "lucide-react";
import SubscriptionBenefits from "@/components/subscription-benefits";
import SubscriptionHistory from "@/components/subscription-history";
import ViewPlansButton from "@/components/view-plans-button";

export const metadata: Metadata = {
  title: "Subscription | Directory",
  description: "Manage your subscription plan",
};

export default async function SubscriptionPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/dashboard/subscription");
  }

  // Get user profile and subscription info
  const { data: profile } = await supabase
    .from("users")
    .select("*, subscriptions(*)")
    .eq("id", user.id)
    .single();

  const hasActiveSubscription =
    profile?.subscription === "premium" ||
    (profile?.subscriptions &&
      profile.subscriptions.length > 0 &&
      profile.subscriptions[0].status === "active");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription plan and billing
        </p>
      </header>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <Card className={!hasActiveSubscription ? "border-blue-500" : ""}>
              <CardHeader>
                <CardTitle>Free Plan</CardTitle>
                <CardDescription>
                  Basic features for personal use
                </CardDescription>
                <div className="mt-4 text-3xl font-bold">$0</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Up to 3 listings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Standard support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!hasActiveSubscription}
                >
                  {!hasActiveSubscription ? "Current Plan" : "Downgrade"}
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className={hasActiveSubscription ? "border-blue-500" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Premium</CardTitle>
                  {hasActiveSubscription && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Current Plan
                    </span>
                  )}
                </div>
                <CardDescription>
                  Advanced features for businesses
                </CardDescription>
                <div className="mt-4 text-3xl font-bold">$29</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited listings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Featured listings</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={hasActiveSubscription}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {hasActiveSubscription ? "Current Plan" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>

            {/* Business Plan */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <CardTitle>Business</CardTitle>
                  <div className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Popular
                  </div>
                </div>
                <CardDescription>Enterprise-grade features</CardDescription>
                <div className="mt-4 text-3xl font-bold">$99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" /> Plan Comparison
              </CardTitle>
              <CardDescription>
                Compare features across different subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionBenefits showBusinessTier={true} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/pricing" target="_blank" rel="noopener noreferrer">
                  View Full Pricing Details{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          {hasActiveSubscription ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>
                    Manage your current subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Premium Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Renews on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>•••• •••• •••• 4242</span>
                      <Button variant="ghost" size="sm" className="ml-4">
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Benefits</CardTitle>
                  <CardDescription>
                    Features included in your current plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Unlimited Listings</h3>
                      <p className="text-sm text-muted-foreground">
                        Create and manage as many listings as you need
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Featured Listings</h3>
                      <p className="text-sm text-muted-foreground">
                        2 featured listings per month included
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Advanced Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed insights about your listings performance
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Priority Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Get faster responses from our support team
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Active Subscription</CardTitle>
                <CardDescription>
                  You are currently on the Free plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upgrade to Premium or Business plan to access more features
                  and benefits.
                </p>
                <ViewPlansButton />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <SubscriptionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
