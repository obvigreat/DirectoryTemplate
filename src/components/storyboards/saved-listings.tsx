import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SavedListingsStoryboard() {
  // Mock data for saved listings
  const savedListings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      category: "Food & Drink",
      location: "New York, NY",
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      savedDate: "2023-10-15",
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
      savedDate: "2023-10-12",
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
      savedDate: "2023-10-10",
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
      savedDate: "2023-10-05",
    },
    {
      id: 5,
      title: "Urban Fitness Center",
      category: "Health & Fitness",
      location: "Chicago, IL",
      rating: 4.6,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      savedDate: "2023-10-01",
    },
    {
      id: 6,
      title: "Gourmet Restaurant",
      category: "Food & Drink",
      location: "Miami, FL",
      rating: 4.8,
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      savedDate: "2023-09-28",
    },
  ];

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-bold mb-2">Saved Listings</h1>
        <p className="text-muted-foreground">Manage your bookmarked listings</p>
      </header>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
                <option value="all">All Categories</option>
                <option value="food">Food & Drink</option>
                <option value="health">Health & Fitness</option>
                <option value="business">Business Services</option>
                <option value="hotels">Hotels & Travel</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
                <option value="recent">Recently Saved</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="px-4">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white bg-opacity-90 text-red-500 hover:bg-white hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
                Saved on {listing.savedDate}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {listing.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
              <div className="flex items-center text-gray-500 mb-3">
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
                <Link href={`/listings/${listing.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
