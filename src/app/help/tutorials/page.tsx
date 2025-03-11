import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Video, Clock, Play } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Video Tutorials | Help Center",
  description:
    "Learn how to use our platform with step-by-step video tutorials",
};

export default function TutorialsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Video Tutorials</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to use our platform with step-by-step video tutorials
            </p>
            <div className="relative max-w-2xl mx-auto mt-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search tutorials..." className="pl-10" />
            </div>
          </header>

          <section id="getting-started" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Platform Overview</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    A complete tour of our platform and its features
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 5:32 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Creating Your Account</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    How to sign up and set up your profile
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 3:45 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Dashboard Navigation</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn how to navigate your dashboard efficiently
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 4:20 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="listings" className="scroll-mt-20 pt-8">
            <h2 className="text-2xl font-bold mb-6">
              Creating & Managing Listings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">
                    Creating Your First Listing
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Step-by-step guide to creating an effective listing
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 7:15 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Optimizing Your Listings</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Tips and tricks to make your listings stand out
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 6:50 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Managing Photos & Media</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    How to upload and manage photos for your listings
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 5:10 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="advanced" className="scroll-mt-20 pt-8">
            <h2 className="text-2xl font-bold mb-6">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Managing Bookings</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    How to handle booking requests and manage your calendar
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 8:30 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Analytics & Insights</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Understanding your listing performance and visitor analytics
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 6:45 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400 group-hover:hidden" />
                    <div className="hidden group-hover:flex items-center justify-center bg-blue-600 rounded-full w-16 h-16">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Subscription Features</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Explore the benefits of premium and business plans
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 5:55 min
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="bg-blue-50 rounded-lg p-8 mt-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-4">
                Need personalized help?
              </h2>
              <p className="text-gray-600 mb-6">
                Our support team is available to provide one-on-one assistance
                with any questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/help/contact">
                  <Button className="w-full sm:w-auto">Contact Support</Button>
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
    </>
  );
}
