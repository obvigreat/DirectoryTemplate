"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  HelpCircle,
  FileText,
  BookOpen,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Video,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";

type HelpArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function HelpCenterWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Mock data for popular articles
  const popularArticles: HelpArticle[] = [
    {
      id: "1",
      title: "Getting started with your listing",
      excerpt: "Learn how to create and optimize your first listing",
      category: "Listings",
      url: "/help/articles/getting-started-with-listings",
    },
    {
      id: "2",
      title: "Understanding subscription plans",
      excerpt: "Compare different subscription options and features",
      category: "Billing",
      url: "/help/articles/subscription-plans-comparison",
    },
    {
      id: "3",
      title: "How to respond to reviews",
      excerpt: "Best practices for managing customer reviews",
      category: "Reviews",
      url: "/help/articles/responding-to-reviews",
    },
  ];

  // Mock data for FAQs
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I edit my listing information?",
      answer:
        "You can edit your listing by going to your Dashboard, selecting 'Listings' from the sidebar, and clicking the 'Edit' button next to the listing you want to modify. From there, you can update all information including photos, business hours, and contact details.",
    },
    {
      id: "2",
      question: "Can I upgrade or downgrade my subscription?",
      answer:
        "Yes, you can change your subscription plan at any time. Go to Dashboard > Subscription and select 'Change Plan'. If you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. If you downgrade, the new rate will apply at the start of your next billing cycle.",
    },
    {
      id: "3",
      question: "How do I respond to a negative review?",
      answer:
        "To respond to any review, go to your Dashboard > Listings > select the listing > scroll to the Reviews section. Find the review and click 'Respond'. We recommend acknowledging the customer's experience, apologizing if appropriate, explaining any improvements you've made, and offering to continue the conversation privately.",
    },
    {
      id: "4",
      question: "How can I feature my listing on the homepage?",
      answer:
        "Featured listings on the homepage are available to Premium and Business subscription plan members. If you have an eligible subscription, go to Dashboard > Listings > select the listing > click 'Promote Listing' and choose the 'Feature on Homepage' option.",
    },
  ];

  // Mock search results
  const searchResults: HelpArticle[] = [
    {
      id: "4",
      title: "How to update your business hours",
      excerpt:
        "Step-by-step guide to updating your business hours and special holiday schedules",
      category: "Listings",
      url: "/help/articles/updating-business-hours",
    },
    {
      id: "5",
      title: "Setting up booking availability",
      excerpt:
        "Learn how to configure your booking calendar and availability slots",
      category: "Bookings",
      url: "/help/articles/booking-availability-setup",
    },
    {
      id: "6",
      title: "Managing customer messages",
      excerpt: "Tips for efficiently handling customer inquiries and messages",
      category: "Messages",
      url: "/help/articles/managing-customer-messages",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
          Help Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <Tabs defaultValue="articles">
          <TabsList className="w-full">
            <TabsTrigger value="articles" className="flex-1">
              <FileText className="h-4 w-4 mr-2" /> Articles
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" /> FAQs
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">
              <Video className="h-4 w-4 mr-2" /> Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-4">
            {showSearchResults ? (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Search Results</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
                <div className="space-y-3">
                  {searchResults.map((article) => (
                    <div
                      key={article.id}
                      className="border rounded-md p-3 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">
                            {article.title}
                          </h4>
                          <span className="inline-block text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 mt-1">
                            {article.category}
                          </span>
                        </div>
                        <Link href={article.url}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {article.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-sm font-medium mb-3">Popular Articles</h3>
                <div className="space-y-3">
                  {popularArticles.map((article) => (
                    <div
                      key={article.id}
                      className="border rounded-md p-3 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">
                            {article.title}
                          </h4>
                          <span className="inline-block text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 mt-1">
                            {article.category}
                          </span>
                        </div>
                        <Link href={article.url}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {article.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-4 text-center">
              <Link href="/help/articles">
                <Button variant="outline" size="sm" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" /> Browse All Articles
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="mt-4">
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-md overflow-hidden">
                  <button
                    className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-50"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${expandedFaq === faq.id ? "rotate-90" : ""}`}
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-3 bg-gray-50 border-t">
                      <p className="text-sm text-gray-700">{faq.answer}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" /> Not Helpful
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link href="/help/faqs">
                <Button variant="outline" size="sm" className="text-xs">
                  <MessageCircle className="h-3 w-3 mr-1" /> View All FAQs
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Getting Started Tutorial
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs">
                    Watch Video
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-md p-3 hover:bg-gray-50">
                  <h4 className="font-medium text-sm">
                    How to Create a Listing
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">3:45 min</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs justify-between"
                  >
                    <span>
                      Watch <Video className="h-3 w-3 ml-1 inline" />
                    </span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                <div className="border rounded-md p-3 hover:bg-gray-50">
                  <h4 className="font-medium text-sm">Managing Bookings</h4>
                  <p className="text-xs text-gray-600 mt-1">4:20 min</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs justify-between"
                  >
                    <span>
                      Watch <Video className="h-3 w-3 ml-1 inline" />
                    </span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link href="/help/videos">
                <Button variant="outline" size="sm" className="text-xs">
                  <Video className="h-3 w-3 mr-1" /> Browse All Videos
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Need more help?</h3>
              <p className="text-xs text-gray-600 mt-1">
                Contact our support team
              </p>
            </div>
            <Link href="/help/contact">
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" /> Get Support
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
