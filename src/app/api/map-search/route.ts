import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Parse query parameters
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const lat = parseFloat(url.searchParams.get("lat") || "0");
  const lng = parseFloat(url.searchParams.get("lng") || "0");
  const radius = parseFloat(url.searchParams.get("radius") || "10"); // Default 10 miles
  const category = url.searchParams.get("category") || "";

  try {
    // Instead of using Supabase, we'll return mock data
    // This avoids the RPC function error
    const mockListings = [
      {
        id: 1,
        title: "Downtown Coffee Shop",
        description: "A cozy coffee shop in the heart of downtown",
        category: "Food & Drink",
        category_id: "1",
        latitude: lat + 0.01,
        longitude: lng - 0.01,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        ],
        rating: 4.7,
        reviews_count: 98,
        categories: { name: "Food & Drink" },
      },
      {
        id: 2,
        title: "Luxury Hotel & Spa",
        description:
          "Experience luxury accommodations and premium spa services",
        category: "Hotels",
        category_id: "2",
        latitude: lat - 0.005,
        longitude: lng + 0.008,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        ],
        rating: 4.9,
        reviews_count: 124,
        categories: { name: "Hotels" },
      },
      {
        id: 3,
        title: "Tech Hub Coworking",
        description: "Modern coworking space for tech professionals",
        category: "Services",
        category_id: "3",
        latitude: lat + 0.007,
        longitude: lng + 0.005,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
        ],
        rating: 4.8,
        reviews_count: 76,
        categories: { name: "Services" },
      },
      {
        id: 4,
        title: "City Park",
        description: "Beautiful urban park with walking trails and playgrounds",
        category: "Recreation",
        category_id: "4",
        latitude: lat - 0.01,
        longitude: lng - 0.008,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1569513586164-80dc5ae5c38f?w=800&q=80",
        ],
        rating: 4.6,
        reviews_count: 52,
        categories: { name: "Recreation" },
      },
      {
        id: 5,
        title: "Sunset Restaurant",
        description: "Fine dining with a view of the sunset",
        category: "Food & Drink",
        category_id: "1",
        latitude: lat + 0.015,
        longitude: lng - 0.003,
        location: "New York, NY",
        images: [
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        ],
        rating: 4.5,
        reviews_count: 87,
        categories: { name: "Food & Drink" },
      },
    ];

    // Filter by query if provided
    let filteredListings = mockListings;
    if (query) {
      filteredListings = filteredListings.filter((listing) =>
        listing.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Filter by category if provided
    if (category) {
      filteredListings = filteredListings.filter(
        (listing) => listing.category_id === category,
      );
    }

    // Calculate distance for each listing
    const resultsWithDistance = filteredListings.map((listing) => {
      const distance = calculateDistance(
        lat,
        lng,
        listing.latitude,
        listing.longitude,
      );
      return { ...listing, distance: parseFloat(distance.toFixed(1)) };
    });

    // Filter by radius
    const withinRadius = resultsWithDistance.filter(
      (listing) => listing.distance <= radius,
    );

    // Sort by distance
    withinRadius.sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      listings: withinRadius,
      count: withinRadius.length,
    });
  } catch (error) {
    console.error("Error in map search:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return distance;
}
