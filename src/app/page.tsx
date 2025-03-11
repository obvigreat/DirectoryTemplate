import { createClient } from "../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import SearchSection from "@/components/search-section";
import CategoryList from "@/components/category-list";
import FeaturedListings from "@/components/featured-listings";
import RecentReviews from "@/components/recent-reviews";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <SearchSection />
          </div>
        </section>

        {/* Featured Listings - Client Component */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <FeaturedListings
              limit={6}
              title="Featured Listings"
              showViewAll={true}
            />
          </div>
        </section>

        {/* Categories Section - Client Component */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Browse by Category</h2>
              <Link href="/categories">
                <Button variant="ghost" className="text-blue-600">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <CategoryList />
          </div>
        </section>

        {/* Recent Reviews - Client Component */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RecentReviews
              limit={3}
              title="Recent Reviews"
              showViewAll={true}
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover, connect, and engage with local businesses in just a
                few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search</h3>
                <p className="text-gray-600">
                  Find businesses by category, location, or keyword using our
                  powerful search tools
                </p>
              </div>

              <div className="text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-gray-600">
                  Contact businesses directly through our platform and book
                  services
                </p>
              </div>

              <div className="text-center bg-white p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Review</h3>
                <p className="text-gray-600">
                  Share your experiences and help others make informed decisions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl mx-4 sm:mx-8 lg:mx-auto my-12 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community today and discover the best local businesses in
              your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/listings">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700"
                >
                  Browse Listings
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
