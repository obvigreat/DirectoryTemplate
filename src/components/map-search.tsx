"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface MapSearchProps {
  onSearch?: (
    query: string,
    location: string,
    coordinates: { lat: number; lng: number },
    radius: number,
  ) => void;
  initialQuery?: string;
  initialLocation?: string;
  initialRadius?: number;
  initialCoordinates?: { lat: number; lng: number };
}

export default function MapSearch({
  onSearch,
  initialQuery = "",
  initialLocation = "",
  initialRadius = 10,
  initialCoordinates,
}: MapSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [coordinates, setCoordinates] = useState(
    initialCoordinates || { lat: 40.7128, lng: -74.006 },
  ); // Default to NYC
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Fetch listings based on search parameters
  const fetchListings = useCallback(async () => {
    setIsSearching(true);
    try {
      // Instead of using the API, we'll manually filter listings
      // This avoids potential fetch errors in the development environment

      // Simulate a successful response with mock data
      const mockListings = [
        {
          id: 1,
          title: "Downtown Coffee Shop",
          latitude: coordinates.lat + 0.01,
          longitude: coordinates.lng - 0.01,
          category: "Food & Drink",
          images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
          ],
          distance: 0.7,
        },
        {
          id: 2,
          title: "Luxury Hotel & Spa",
          latitude: coordinates.lat - 0.005,
          longitude: coordinates.lng + 0.008,
          category: "Hotels",
          images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
          ],
          distance: 1.2,
        },
        {
          id: 3,
          title: "Tech Hub Coworking",
          latitude: coordinates.lat + 0.007,
          longitude: coordinates.lng + 0.005,
          category: "Services",
          images: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
          ],
          distance: 0.9,
        },
        {
          id: 4,
          title: "City Park",
          latitude: coordinates.lat - 0.01,
          longitude: coordinates.lng - 0.008,
          category: "Recreation",
          images: [
            "https://images.unsplash.com/photo-1569513586164-80dc5ae5c38f?w=800&q=80",
          ],
          distance: 1.5,
        },
        {
          id: 5,
          title: "Sunset Restaurant",
          latitude: coordinates.lat + 0.015,
          longitude: coordinates.lng - 0.003,
          category: "Food & Drink",
          images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
          ],
          distance: 1.8,
        },
      ];

      // Filter by query if provided
      let filteredListings = mockListings;
      if (query) {
        filteredListings = filteredListings.filter((listing) =>
          listing.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Format markers
      const formattedMarkers = filteredListings.map((listing) => ({
        id: listing.id,
        title: listing.title,
        lat: listing.latitude || 0,
        lng: listing.longitude || 0,
        category: listing.category || "Uncategorized",
        image:
          listing.images?.[0] ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        distance: listing.distance,
      }));

      setMarkers(formattedMarkers);
    } catch (error) {
      console.error("Error processing listings:", error);
    } finally {
      setIsSearching(false);
      setMapLoaded(true);
    }
  }, [query, coordinates, radius]);

  // Get coordinates from location name using geocoding
  const geocodeLocation = useCallback(async (locationName: string) => {
    if (!locationName) return;

    try {
      // In a real app, you would use a geocoding service like Google Maps or Mapbox
      // For this demo, we'll simulate with some hardcoded values
      const geocodingResults: Record<string, { lat: number; lng: number }> = {
        "new york": { lat: 40.7128, lng: -74.006 },
        "los angeles": { lat: 34.0522, lng: -118.2437 },
        chicago: { lat: 41.8781, lng: -87.6298 },
        "san francisco": { lat: 37.7749, lng: -122.4194 },
      };

      const normalizedLocation = locationName.toLowerCase();
      const result = Object.keys(geocodingResults).find((key) =>
        normalizedLocation.includes(key),
      );

      if (result) {
        setCoordinates(geocodingResults[result]);
        return geocodingResults[result];
      }

      // If no match, use a default
      return { lat: 40.7128, lng: -74.006 };
    } catch (error) {
      console.error("Error geocoding location:", error);
      return { lat: 40.7128, lng: -74.006 }; // Default to NYC
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(currentCoords);
          setLocation("Current Location");
        },
        (error) => {
          console.error("Error getting current location:", error);
          setUseCurrentLocation(false);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUseCurrentLocation(false);
    }
  }, []);

  // Handle current location toggle
  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    }
  }, [useCurrentLocation, getCurrentLocation]);

  // Initial load
  useEffect(() => {
    setMapLoaded(false);
    if (initialLocation && !initialCoordinates) {
      geocodeLocation(initialLocation).then((coords) => {
        if (coords) setCoordinates(coords);
        fetchListings();
      });
    } else {
      fetchListings();
    }
  }, [initialLocation, initialCoordinates, geocodeLocation, fetchListings]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMapLoaded(false);

    let searchCoordinates = coordinates;

    if (location && !useCurrentLocation) {
      const coords = await geocodeLocation(location);
      if (coords) searchCoordinates = coords;
    }

    if (onSearch) {
      onSearch(query, location, searchCoordinates, radius);
    } else {
      // Navigate to map search page with parameters
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);
      if (searchCoordinates.lat && searchCoordinates.lng) {
        params.set("lat", searchCoordinates.lat.toString());
        params.set("lng", searchCoordinates.lng.toString());
      }
      params.set("radius", radius.toString());

      router.push(`/map-search?${params.toString()}`);
    }

    // Refetch listings with new parameters
    setCoordinates(searchCoordinates);
    fetchListings();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Location"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={useCurrentLocation}
            />
            {location && !useCurrentLocation && (
              <button
                type="button"
                onClick={() => setLocation("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="w-full md:w-auto mt-2 md:mt-0"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>

        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="useCurrentLocation"
            checked={useCurrentLocation}
            onChange={() => setUseCurrentLocation(!useCurrentLocation)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
          />
          <label htmlFor="useCurrentLocation" className="text-sm text-gray-700">
            Use my current location
          </label>

          <div className="ml-auto flex items-center">
            <label htmlFor="radius" className="text-sm text-gray-700 mr-2">
              Radius: {radius} miles
            </label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded p-1"
            >
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Map container */}
        <div className="h-[500px] bg-gray-100 relative">
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-200">
              {/* This would be replaced with an actual map component */}
              <div className="w-full h-full relative overflow-hidden">
                {/* Simulated map background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{
                    backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${coordinates.lng},${coordinates.lat},12,0/1200x500?access_token=pk.placeholder')`,
                  }}
                ></div>

                {/* Map markers */}
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${(marker.lng - coordinates.lng + 0.02) * 5000 + 600}px`,
                      top: `${(coordinates.lat - marker.lat + 0.02) * 5000 + 250}px`,
                    }}
                  >
                    <div className="relative group">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg group-hover:bg-blue-700 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="text-sm font-medium">
                          {marker.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {marker.category}
                        </div>
                        {marker.distance && (
                          <div className="text-xs text-blue-600 mt-1">
                            {marker.distance} miles away
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full"
          >
            +
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full"
          >
            -
          </Button>
        </div>

        {/* Results count */}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <span className="font-medium">{markers.length}</span> results found
        </div>
      </div>

      {/* List view toggle */}
      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {markers.length} listings in this area
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const params = new URLSearchParams();
            if (query) params.set("q", query);
            if (location) params.set("location", location);
            if (coordinates.lat && coordinates.lng) {
              params.set("lat", coordinates.lat.toString());
              params.set("lng", coordinates.lng.toString());
            }
            params.set("radius", radius.toString());
            params.set("view", "list");

            router.push(`/map-search?${params.toString()}`);
          }}
        >
          Switch to List View
        </Button>
      </div>
    </div>
  );
}
