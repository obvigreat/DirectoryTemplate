import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Star,
  Building,
  Users,
  Clock,
  Filter,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function HomePageStoryboard() {
  // Featured listings - would normally come from database
  const featuredListings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      category: "Food & Drink",
      location: "New York, NY",
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    },
    {
      id: 2,
      title: "Sunset Yoga Studio",
      category: "Health & Fitness",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    },
    {
      id: 3,
      title: "Tech Hub Coworking",
      category: "Business Services",
      location: "San Francisco, CA",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    },
    {
      id: 4,
      title: "Lakeside Retreat",
      category: "Hotels & Travel",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 201,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
  ];

  // Popular categories
  const categories = [
    { name: "Restaurants", icon: <MapPin className="w-5 h-5" />, count: 1243 },
    { name: "Shopping", icon: <Building className="w-5 h-5" />, count: 879 },
    { name: "Hotels", icon: <Star className="w-5 h-5" />, count: 432 },
    { name: "Services", icon: <Users className="w-5 h-5" />, count: 657 },
    { name: "Entertainment", icon: <Clock className="w-5 h-5" />, count: 321 },
    { name: "Real Estate", icon: <Building className="w-5 h-5" />, count: 198 },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Search */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover & Connect with Local Businesses
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find the best places, read reviews, and connect with businesses in
              your area
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row">
              <div className="flex-1 flex items-center px-3 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  className="border-0 focus-visible:ring-0 text-black flex-1"
                />
              </div>
              <div className="flex-1 flex items-center px-3 py-2 border-t md:border-t-0 md:border-l border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="border-0 focus-visible:ring-0 text-black flex-1"
                />
              </div>
              <Button className="w-full md:w-auto mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular categories with thousands of options
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                href="#"
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.count} listings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Listings</h2>
              <p className="text-gray-600">
                Discover our handpicked premium listings
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {listing.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{listing.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">
                        ({listing.reviews})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and connect with businesses in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Search",
                description:
                  "Enter what you're looking for and your location to find relevant businesses",
              },
              {
                icon: <Filter className="w-8 h-8" />,
                title: "Filter & Compare",
                description:
                  "Use filters to narrow down options and compare ratings and reviews",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Connect",
                description:
                  "Contact businesses directly or book services through our platform",
              },
            ].map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
