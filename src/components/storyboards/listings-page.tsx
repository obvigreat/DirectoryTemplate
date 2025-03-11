import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Filter, ChevronDown, Star } from "lucide-react";

export default function ListingsPageStoryboard() {
  // This would normally come from a database query
  const listings = [
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

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Listings Page</h2>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for businesses, services, or locations..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>Restaurants & Cafes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>Health & Fitness</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>Professional Services</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>Retail & Shopping</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>Entertainment</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Rating</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-500" />
                      ))}
                      <span className="ml-1">& Up</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-500" />
                      ))}
                      <span className="ml-1">& Up</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Locations</option>
                  <option>New York, NY</option>
                  <option>Los Angeles, CA</option>
                  <option>Chicago, IL</option>
                  <option>Houston, TX</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>$</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>$$</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>$$$</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 mr-2"
                    />
                    <span>$$$$</span>
                  </label>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full">
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">128 Results</h3>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Sort by:</span>
              <select className="p-2 border border-gray-300 rounded-md text-sm">
                <option>Relevance</option>
                <option>Highest Rated</option>
                <option>Most Reviewed</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="ml-1 text-sm">{listing.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({listing.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {listing.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full ml-2">
                      $$
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto font-medium hover:text-blue-800"
                    >
                      View Details
                    </Button>
                    <button className="p-2 text-gray-400 hover:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm" variant="default">
                1
              </Button>
              <Button size="sm" variant="outline">
                2
              </Button>
              <Button size="sm" variant="outline">
                3
              </Button>
              <span className="px-2 text-gray-500">...</span>
              <Button size="sm" variant="outline">
                10
              </Button>
              <Button size="sm" variant="outline">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
