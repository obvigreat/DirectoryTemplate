import MapSearch from "@/components/map-search";
import LocationFilter from "@/components/location-filter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingCard from "@/components/listing-card";

export default function MapSearchPageStoryboard() {
  // Mock data for listings
  const mockListings = [
    {
      id: 1,
      title: "Downtown Coffee Shop",
      category: "Food & Drink",
      location: "New York, NY",
      rating: 4.7,
      reviews: 98,
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    },
    {
      id: 2,
      title: "Luxury Hotel & Spa",
      category: "Hotels",
      location: "New York, NY",
      rating: 4.9,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    {
      id: 3,
      title: "Tech Hub Coworking",
      category: "Services",
      location: "New York, NY",
      rating: 4.8,
      reviews: 76,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Find Listings on the Map</h1>

      <Tabs defaultValue="map" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <LocationFilter
                initialLocation="New York, NY"
                initialRadius={10}
                initialCoordinates={{ lat: 40.7128, lng: -74.006 }}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {[
                    "Restaurants",
                    "Hotels",
                    "Shopping",
                    "Entertainment",
                    "Services",
                    "Health & Fitness",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant={
                        category === "Restaurants" ? "default" : "outline"
                      }
                      size="sm"
                      className="w-full justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <MapSearch
                initialQuery="coffee"
                initialLocation="New York, NY"
                initialRadius={10}
                initialCoordinates={{ lat: 40.7128, lng: -74.006 }}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <LocationFilter
                initialLocation="New York, NY"
                initialRadius={10}
                initialCoordinates={{ lat: 40.7128, lng: -74.006 }}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {[
                    "Restaurants",
                    "Hotels",
                    "Shopping",
                    "Entertainment",
                    "Services",
                    "Health & Fitness",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant={
                        category === "Restaurants" ? "default" : "outline"
                      }
                      size="sm"
                      className="w-full justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search listings..."
                      defaultValue="coffee"
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </span>
                  </div>
                  <Button>Search</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Popular Searches</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Restaurants",
            "Hotels",
            "Coffee Shops",
            "Gyms",
            "Coworking Spaces",
            "Shopping",
            "Entertainment",
            "Services",
          ].map((term) => (
            <Button
              key={term}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
