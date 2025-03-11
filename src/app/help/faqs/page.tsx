import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Help Center",
  description: "Find answers to common questions about our platform",
};

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about our platform
            </p>
            <div className="relative max-w-2xl mx-auto mt-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search FAQs..." className="pl-10" />
            </div>
          </header>

          <div className="space-y-8">
            <section id="account" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle>Account & Profile</CardTitle>
                  <CardDescription>
                    Questions about your account, profile settings, and security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        How do I create an account?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To create an account, click on the "Sign Up" button in
                          the top right corner of the homepage. You can sign up
                          using your email address or with your Google or
                          Facebook account. Follow the prompts to complete your
                          registration.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        How do I change my password?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To change your password, go to your Dashboard and
                          click on "Settings" in the sidebar. Navigate to the
                          "Security" tab and click on "Change Password". You'll
                          need to enter your current password and then your new
                          password twice to confirm.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How do I update my profile information?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To update your profile information, go to your
                          Dashboard and click on "Settings" in the sidebar. In
                          the "Profile" tab, you can edit your name, contact
                          information, bio, and profile picture. Don't forget to
                          click "Save Changes" when you're done.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Can I delete my account?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          Yes, you can delete your account. Go to your
                          Dashboard, click on "Settings" in the sidebar, and
                          navigate to the "Security" tab. At the bottom of the
                          page, you'll find the "Delete Account" option. Please
                          note that this action is irreversible and will
                          permanently delete all your data, including listings
                          and messages.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section id="listings" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle>Listings Management</CardTitle>
                  <CardDescription>
                    Questions about creating and managing your listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        How do I create a new listing?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To create a new listing, go to your Dashboard and
                          click on "My Listings" in the sidebar. Click the "Add
                          New Listing" button and fill out the required
                          information about your business or service. You'll
                          need to provide details such as the title,
                          description, location, contact information, and
                          category. You can also add photos, business hours, and
                          other relevant information.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        How many listings can I create?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          The number of listings you can create depends on your
                          subscription plan:
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Free plan: Up to 3 listings</li>
                            <li>Premium plan: Unlimited listings</li>
                            <li>
                              Business plan: Unlimited listings with additional
                              features
                            </li>
                          </ul>
                          You can upgrade your subscription at any time to
                          create more listings.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How do I edit or delete a listing?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To edit or delete a listing, go to your Dashboard and
                          click on "My Listings" in the sidebar. Find the
                          listing you want to modify and click the "Edit" button
                          to make changes, or the "Delete" button to remove it.
                          When editing, make sure to save your changes by
                          clicking the "Update Listing" button at the bottom of
                          the form.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        How do I feature my listing?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          Featured listings appear at the top of search results
                          and on the homepage. To feature your listing, you need
                          to have a Premium or Business subscription. Go to your
                          Dashboard, click on "My Listings", find the listing
                          you want to feature, and click the "Feature" button.
                          Premium users can feature up to 2 listings per month,
                          while Business users can feature up to 5 listings per
                          month.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section id="billing" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>
                    Questions about subscription plans, payments, and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What subscription plans do you offer?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          We offer three subscription plans:
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>
                              <strong>Free:</strong> Basic features with up to 3
                              listings
                            </li>
                            <li>
                              <strong>Premium ($29/month):</strong> Unlimited
                              listings, featured listings, advanced analytics,
                              and priority support
                            </li>
                            <li>
                              <strong>Business ($99/month):</strong> All Premium
                              features plus API access, custom branding, and
                              dedicated account manager
                            </li>
                          </ul>
                          You can view detailed plan comparisons on our{" "}
                          <Link
                            href="/pricing"
                            className="text-blue-600 hover:underline"
                          >
                            Pricing page
                          </Link>
                          .
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        How do I upgrade my subscription?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To upgrade your subscription, go to your Dashboard and
                          click on "Subscription" in the sidebar. Click on
                          "Upgrade" or "Change Plan" and select your desired
                          plan. Follow the payment instructions to complete your
                          upgrade. Your new plan will be activated immediately
                          after payment is processed.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Can I cancel my subscription?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          Yes, you can cancel your subscription at any time. Go
                          to your Dashboard, click on "Subscription" in the
                          sidebar, and click on "Cancel Subscription". Your
                          premium features will remain active until the end of
                          your current billing period. After that, your account
                          will be downgraded to the Free plan, but you won't
                          lose any data unless you exceed the Free plan limits.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        How do I update my payment method?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 mb-4">
                          To update your payment method, go to your Dashboard
                          and click on "Subscription" in the sidebar. Click on
                          "Update Payment Method" and enter your new payment
                          details. Your payment information will be securely
                          updated for future billing cycles.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Was this helpful?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" /> No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <div className="bg-blue-50 rounded-lg p-8 mt-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-4">
                  Couldn't find what you're looking for?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our support team is available to assist you with any questions
                  or issues you may have.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/help/contact">
                    <Button className="w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/dashboard/help">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Go to Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
