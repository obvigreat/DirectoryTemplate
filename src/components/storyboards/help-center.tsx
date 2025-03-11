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

export default function HelpCenter() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
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
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="outline">
                  View All FAQs <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
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
                    <Button type="submit" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
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
              </div>

              <div className="text-center">
                <Button variant="outline">
                  View All Tutorials <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
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
