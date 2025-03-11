import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star, Heart } from "lucide-react";
import Link from "next/link";
import SearchFilters from "@/components/search-filters";

export default function ListingsPageWithFiltersStoryboard() {
  // Mock listings data
  const listings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      category: "Food & Drink",
      location: "New York, NY",
      rating: 4.8,
      reviews: 124,
      price: "$$",
      features: ["Free Wi-Fi", "Outdoor Seating"],
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      isSaved: false,
    },
    {
      id: 2,
      title: "Sunset Yoga Studio",
      category: "Health & Fitness",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 89,
      price: "$$$",
      features: ["Parking", "Wheelchair Accessible"],
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
      isSaved: true,
    },
    {
      id: 3,
      title: "Tech Hub Coworking",
      category: "Business Services",
      location: "San Francisco, CA",
      rating: 4.7,
      reviews: 156,
      price: "$$$",
      features: ["Free Wi-Fi", "Parking", "Pet Friendly"],
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      isSaved: false,
    },
    {
      id: 4,
      title: "Lakeside Retreat",
      category: "Hotels & Travel",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 201,
      price: "$$$$",
      features: ["Parking", "Pet Friendly"],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      isSaved: false,
    },
    {
      id: 5,
      title: "Urban Fitness Center",
      category: "Health & Fitness",
      location: "Chicago, IL",
      rating: 4.6,
      reviews: 78,
      price: "$$",
      features: ["Parking", "Wheelchair Accessible"],
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      isSaved: false,
    },
    {
      id: 6,
      title: "Gourmet Restaurant",
      category: "Food & Drink",
      location: "Miami, FL",
      rating: 4.8,
      reviews: 112,
      price: "$$$$",
      features: ["Reservations", "Outdoor Seating"],
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      isSaved: false,
    },
  ];

  // Popular categories
  const categories = [
    { name: "All", count: 9 },
    { name: "Food & Drink", count: 2 },
    { name: "Health & Fitness", count: 2 },
    { name: "Business Services", count: 1 },
    { name: "Hotels & Travel", count: 2 },
    { name: "Entertainment", count: 1 },
    { name: "Shopping", count: 1 },
  ];

  return (
    <div className="bg-gray-50 p-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find Local Businesses</h1>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-lg shadow-sm flex flex-col md:flex-row">
          <div className="flex-1 flex items-center px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="border-0 focus-visible:ring-0 flex-1"
            />
          </div>
          <div className="flex-1 flex items-center px-3 py-2 border-t md:border-t-0 md:border-l border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Location"
              className="border-0 focus-visible:ring-0 flex-1"
            />
          </div>
          <Button className="w-full md:w-auto mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <SearchFilters />
        </div>

        {/* Listings Content */}
        <div className="flex-1">
          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-2">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${index === 0 ? "bg-blue-100 text-blue-800" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{listings.length} results found</p>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="text-sm border-0 focus:ring-0 bg-transparent">
                <option>Relevance</option>
                <option>Highest Rated</option>
                <option>Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <Heart
                      className={`w-4 h-4 ${listing.isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    {listing.price}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {listing.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    <Link
                      href={`#`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {listing.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{listing.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">
                      ({listing.reviews})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {listing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0"
                disabled
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 bg-blue-50 border-blue-200 text-blue-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                3
              </Button>
              <span className="text-gray-400">...</span>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                8
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
