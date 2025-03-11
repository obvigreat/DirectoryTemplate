import { Metadata } from "next";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  FileText,
  MessageSquare,
  Video,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import HelpCenterWidget from "@/components/help-center-widget";

export const metadata: Metadata = {
  title: "Help & Support | Dashboard",
  description: "Get help and support for your account",
};

export default async function HelpPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/dashboard/help");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="faq" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">
                <FileText className="h-4 w-4 mr-2" /> FAQs
              </TabsTrigger>
              <TabsTrigger value="contact">
                <MessageSquare className="h-4 w-4 mr-2" /> Contact Us
              </TabsTrigger>
              <TabsTrigger value="tutorials">
                <Video className="h-4 w-4 mr-2" /> Tutorials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search FAQs..." className="pl-10" />
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account & Profile</CardTitle>
                    <CardDescription>
                      Frequently asked questions about your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I change my password?
                      </h3>
                      <p className="text-sm text-gray-600">
                        You can change your password by going to Settings in
                        your dashboard. Click on the "Security" tab and select
                        "Change Password".
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I update my profile information?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Go to Settings in your dashboard and update your
                        information in the "Profile" tab. Don't forget to click
                        "Save Changes" when you're done.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Can I delete my account?</h3>
                      <p className="text-sm text-gray-600">
                        Yes, you can delete your account from the Settings page.
                        Go to the "Security" tab and click on "Delete Account".
                        Please note that this action is irreversible.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Listings Management</CardTitle>
                    <CardDescription>
                      Questions about creating and managing listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I create a new listing?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Click on "My Listings" in the dashboard sidebar, then
                        click the "Add New Listing" button. Fill out the
                        required information and submit the form.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How many photos can I upload per listing?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Free users can upload up to 5 photos per listing.
                        Premium users can upload up to 20 photos per listing.
                        Business users have unlimited photo uploads.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I edit or delete a listing?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Go to "My Listings" in your dashboard, find the listing
                        you want to modify, and click the "Edit" or "Delete"
                        button next to it.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription & Billing</CardTitle>
                    <CardDescription>
                      Questions about payments and subscription plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I upgrade my subscription?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Go to the "Subscription" page in your dashboard and
                        click on "Upgrade" or "Change Plan". Select your desired
                        plan and follow the payment instructions.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        Can I cancel my subscription?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Yes, you can cancel your subscription at any time from
                        the "Subscription" page. Your premium features will
                        remain active until the end of your current billing
                        period.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        How do I update my payment method?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Go to the "Subscription" page and click on "Update
                        Payment Method". Enter your new payment details and save
                        the changes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Link href="/help/faqs">
                  <Button variant="outline">
                    View All FAQs <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Send a message to our support team and we'll get back to you
                    as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What is your question about?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a category</option>
                        <option value="account">Account & Profile</option>
                        <option value="listings">Listings Management</option>
                        <option value="billing">Subscription & Billing</option>
                        <option value="technical">Technical Issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue in detail"
                        rows={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="attachment"
                        className="text-sm font-medium"
                      >
                        Attachment (optional)
                      </label>
                      <Input id="attachment" type="file" />
                      <p className="text-xs text-gray-500">
                        Max file size: 5MB. Supported formats: JPG, PNG, PDF
                      </p>
                    </div>
                    <Button type="submit" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                  <CardDescription>Alternative contact methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Chat with our support team in real-time during business
                        hours
                      </p>
                      <Button variant="outline" size="sm">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Call our support team at{" "}
                        <strong>+1 (800) 123-4567</strong>
                        <br />
                        Monday-Friday, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Send an email to{" "}
                        <a
                          href="mailto:support@example.com"
                          className="text-blue-600 hover:underline"
                        >
                          support@example.com
                        </a>
                        <br />
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search tutorials..." className="pl-10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">
                        Getting Started Guide
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Learn the basics of creating and managing your listings
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">5:32 min</span>
                        <Button variant="outline" size="sm">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">
                        Optimizing Your Listings
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Tips and tricks to make your listings stand out
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">7:15 min</span>
                        <Button variant="outline" size="sm">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">Managing Bookings</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        How to handle booking requests and manage your calendar
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">4:48 min</span>
                        <Button variant="outline" size="sm">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">
                        Subscription Features
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Explore the benefits of premium and business plans
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">6:22 min</span>
                        <Button variant="outline" size="sm">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Link href="/help/tutorials">
                  <Button variant="outline">
                    View All Tutorials <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <HelpCenterWidget />
        </div>
      </div>
    </div>
  );
}
