import { Metadata } from "next";
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
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import HelpCenterWidget from "@/components/help-center-widget";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Help Center | Directory",
  description: "Get help and support for your account",
};

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or contact our support team for
              assistance
            </p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for help..."
                className="pl-10 py-6 text-lg"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to the most common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">
                    <Link
                      href="/help/faqs#account"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Account & Profile <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/faqs#listings"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Listings Management{" "}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/faqs#billing"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Subscription & Billing{" "}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                </ul>
                <Link href="/help/faqs">
                  <Button variant="outline" className="w-full">
                    Browse All FAQs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Learn how to use our platform with step-by-step videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">
                    <Link
                      href="/help/tutorials#getting-started"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Getting Started Guide{" "}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/tutorials#listings"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Creating Perfect Listings{" "}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/tutorials#advanced"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Advanced Features <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                </ul>
                <Link href="/help/tutorials">
                  <Button variant="outline" className="w-full">
                    Watch Tutorials
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get in touch with our customer support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">
                    <Link
                      href="/help/contact"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Submit a Support Ticket{" "}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/contact#chat"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Live Chat Support <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="/help/contact#phone"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Phone Support <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </li>
                </ul>
                <Link href="/help/contact">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">How to create a listing</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn how to create and optimize your listings to attract
                    more visitors
                  </p>
                  <Link
                    href="/help/articles/create-listing"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">
                    Managing your subscription
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    How to upgrade, downgrade, or cancel your subscription plan
                  </p>
                  <Link
                    href="/help/articles/manage-subscription"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Responding to reviews</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Best practices for managing and responding to customer
                    reviews
                  </p>
                  <Link
                    href="/help/articles/respond-to-reviews"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Booking management</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    How to handle booking requests and manage your calendar
                  </p>
                  <Link
                    href="/help/articles/booking-management"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Payment processing</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Understanding payment methods and transaction processing
                  </p>
                  <Link
                    href="/help/articles/payment-processing"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Account security</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Tips for keeping your account secure and managing privacy
                    settings
                  </p>
                  <Link
                    href="/help/articles/account-security"
                    className="text-blue-600 hover:underline text-sm flex items-center"
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 mt-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is available to assist you with any questions
                or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/help/contact">
                  <Button className="w-full sm:w-auto">
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
