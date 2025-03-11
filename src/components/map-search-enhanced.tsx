"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Search,
  Sliders,
  X,
  List,
  Map as MapIcon,
  Star,
  Heart,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  Filter,
  RefreshCw,
  Bookmark,
  Navigation,
  Locate,
} from "lucide-react";
import Link from "next/link";

interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  reviews_count: number;
  price_range: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  distance?: number;
  amenities?: string[];
  phone?: string;
  email?: string;
  website?: string;
  hours?: any;
}

interface MapSearchProps {
  initialLocation?: string;
  initialRadius?: number;
  initialCategory?: string;
}

export default function MapSearchEnhanced({
  initialLocation = "",
  initialRadius = 10,
  initialCategory = "",
}: MapSearchProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [category, setCategory] = useState(initialCategory);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4]); // 0-4 representing $ to $$$$$
  const [minRating, setMinRating] = useState(0);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<
    { name: string; params: any }[]
  >([]);
  const supabase = createClient();

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initializeMap;
      document.head.appendChild(googleMapsScript);
    };

    if (!window.google) {
      loadGoogleMapsAPI();
    } else {
      initializeMap();
    }

    return () => {
      // Clean up markers when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
      }
    };
  }, []);

  // Initialize map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Default to a central location if no user location
    const defaultLocation = { lat: 40.7128, lng: -74.006 }; // New York City

    const mapOptions: google.maps.MapOptions = {
      center: userLocation || defaultLocation,
      zoom: 12,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
    };

    const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = mapInstance;
    setMap(mapInstance);

    // Create info window instance
    infoWindowRef.current = new google.maps.InfoWindow();

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setMapCenter(userPos);
          mapInstance.setCenter(userPos);

          // Add marker for user's location
          new google.maps.Marker({
            position: userPos,
            map: mapInstance,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
            },
            title: "Your Location",
          });
        },
        () => {
          // Handle geolocation error
          console.log("Error: The Geolocation service failed.");
        },
      );
    }
  };

  // Add markers to map
  const addMarkersToMap = (listings: Listing[]) => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    const bounds = new google.maps.LatLngBounds();

    listings.forEach((listing) => {
      if (listing.latitude && listing.longitude) {
        const position = { lat: listing.latitude, lng: listing.longitude };
        const marker = new google.maps.Marker({
          position,
          map,
          title: listing.title,
          animation: google.maps.Animation.DROP,
        });

        // Create info window content
        const contentString = `
          <div style="max-width: 200px; padding: 10px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">${listing.title}</h3>
            <div style="margin-bottom: 5px;">
              ${Array(Math.round(listing.rating || 0))
                .fill("★")
                .join("")}
              ${listing.reviews_count ? `(${listing.reviews_count})` : ""}
            </div>
            <p style="margin: 0 0 5px; font-size: 14px;">${listing.price_range || ""}</p>
            <p style="margin: 0; font-size: 12px;">${listing.location}</p>
            <a href="/listings/${listing.id}" style="display: block; margin-top: 8px; color: #3b82f6; font-size: 14px;">View Details</a>
          </div>
        `;

        // Add click listener to marker
        marker.addListener("click", () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(contentString);
            infoWindowRef.current.open(map, marker);
            setSelectedListing(listing);
          }
        });

        markersRef.current.push(marker);
        bounds.extend(position);
      }
    });

    // Adjust map to fit all markers
    if (markersRef.current.length > 0) {
      map.fitBounds(bounds);

      // Don't zoom in too far on only one marker
      if (map.getZoom() > 15) {
        map.setZoom(15);
      }
    }
  };

  // Geocode location string to coordinates
  const geocodeLocation = async (locationString: string) => {
    if (!locationString) return null;

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(locationString)}`,
      );
      if (!response.ok) throw new Error("Geocoding failed");

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  // Search for listings
  const searchListings = async () => {
    setLoading(true);
    setError(null);

    try {
      // Add to search history
      if (location && !searchHistory.includes(location)) {
        setSearchHistory((prev) => [location, ...prev.slice(0, 4)]);
      }

      // Geocode the location
      const coordinates = await geocodeLocation(location);

      if (!coordinates) {
        setError("Could not find the specified location. Please try again.");
        setLoading(false);
        return;
      }

      // Center map on the searched location
      if (map && coordinates) {
        map.setCenter(coordinates);
        setMapCenter(coordinates);
      }

      // Call API to search listings
      const response = await fetch(
        `/api/map-search?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}${category ? `&category=${category}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      setListings(data);
      setFilteredListings(data);

      // Add markers to map
      addMarkersToMap(data);
    } catch (err: any) {
      console.error("Error searching listings:", err);
      setError(err.message || "An error occurred while searching");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to listings
  const applyFilters = () => {
    const filtered = listings.filter((listing) => {
      // Filter by price range
      const listingPriceLevel = listing.price_range
        ? listing.price_range.length
        : 0;
      const inPriceRange =
        listingPriceLevel >= priceRange[0] &&
        listingPriceLevel <= priceRange[1];

      // Filter by minimum rating
      const hasMinRating = (listing.rating || 0) >= minRating;

      // Filter by amenities
      const hasAmenities =
        amenities.length === 0 ||
        (listing.amenities &&
          amenities.every((a) => listing.amenities?.includes(a)));

      return inPriceRange && hasMinRating && hasAmenities;
    });

    setFilteredListings(filtered);

    // Update markers on map
    addMarkersToMap(filtered);
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchListings();
  };

  // Save current search
  const saveSearch = () => {
    const searchName = prompt("Enter a name for this search:");
    if (searchName) {
      const searchParams = {
        location,
        radius,
        category,
        priceRange,
        minRating,
        amenities,
      };
      setSavedSearches((prev) => [
        ...prev,
        { name: searchName, params: searchParams },
      ]);
    }
  };

  // Load a saved search
  const loadSavedSearch = (search: { name: string; params: any }) => {
    const { location, radius, category, priceRange, minRating, amenities } =
      search.params;
    setLocation(location);
    setRadius(radius);
    setCategory(category);
    setPriceRange(priceRange);
    setMinRating(minRating);
    setAmenities(amenities);

    // Execute search with new parameters
    setTimeout(searchListings, 0);
  };

  // Use current location
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Reverse geocode to get address
          try {
            const response = await fetch(`/api/geocode?latlng=${lat},${lng}`);
            if (response.ok) {
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                setLocation(data.results[0].formatted_address);
              }
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          }

          // Center map and search
          if (map) {
            const userPos = { lat, lng };
            map.setCenter(userPos);
            setMapCenter(userPos);
            searchListings();
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Could not get your current location. Please check your browser settings.",
          );
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 4]);
    setMinRating(0);
    setAmenities([]);
    setFilteredListings(listings);
    addMarkersToMap(listings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-12rem)]">
      <div className="flex flex-col h-full">
        {/* Search Bar */}
        <div className="p-4 border-b">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter location..."
                  className="pl-10 pr-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  list="search-history"
                />
                {location && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setLocation("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <datalist id="search-history">
                  {searchHistory.map((item, index) => (
                    <option key={index} value={item} />
                  ))}
                </datalist>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={useCurrentLocation}
                title="Use my current location"
              >
                <Locate className="h-4 w-4" />
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" /> Search
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="radius" className="whitespace-nowrap text-sm">
                  Radius: {radius} miles
                </Label>
                <div className="w-32">
                  <Slider
                    id="radius"
                    min={1}
                    max={50}
                    step={1}
                    value={[radius]}
                    onValueChange={(value) => setRadius(value[0])}
                  />
                </div>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <div className="flex items-center space-x-2">
                <Label htmlFor="category" className="whitespace-nowrap text-sm">
                  Category:
                </Label>
                <select
                  id="category"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="restaurants">Restaurants</option>
                  <option value="hotels">Hotels</option>
                  <option value="shopping">Shopping</option>
                  <option value="services">Services</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health & Medical</option>
                </select>
              </div>

              <Separator
                orientation="vertical"
                className="h-6 mx-2 hidden sm:block"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "More Filters"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={saveSearch}
                title="Save this search"
              >
                <Bookmark className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">
                      {Array(priceRange[0] + 1)
                        .fill("$")
                        .join("")}
                    </span>
                    <span className="text-xs">
                      {Array(priceRange[1] + 1)
                        .fill("$")
                        .join("")}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={4}
                    step={1}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(value) =>
                      setPriceRange([value[0], value[1]])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Minimum Rating</h3>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        type="button"
                        variant={minRating >= rating ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          setMinRating(rating === minRating ? 0 : rating)
                        }
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Parking",
                      "WiFi",
                      "Delivery",
                      "Takeout",
                      "Outdoor Seating",
                      "Wheelchair Accessible",
                    ].map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label
                          htmlFor={`amenity-${amenity}`}
                          className="text-xs"
                        >
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="mr-2"
                  >
                    <RefreshCw className="h-3 w-3 mr-2" /> Reset
                  </Button>
                  <Button type="button" size="sm" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center">
                <h3 className="text-sm font-medium">Saved Searches:</h3>
                <div className="flex flex-wrap gap-2 ml-2">
                  {savedSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => loadSavedSearch(search)}
                    >
                      {search.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* View Toggle */}
          <div className="p-2 border-b md:border-b-0 flex justify-center md:hidden">
            <div className="inline-flex rounded-md shadow-sm">
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4 mr-2" /> Map
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" /> List
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="p-2 border-b flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {filteredListings.length} results found
            </span>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>

          {/* Map View (Hidden on mobile when list view is active) */}
          <div
            className={`${viewMode === "list" ? "hidden md:block" : ""} md:w-2/3 h-full`}
            ref={mapRef}
          ></div>

          {/* List View (Hidden on mobile when map view is active) */}
          <div
            className={`${viewMode === "map" ? "hidden md:block" : ""} md:w-1/3 border-l overflow-y-auto`}
          >
            {filteredListings.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Searching for listings...</p>
                  </div>
                ) : (
                  <p>No listings found. Try adjusting your search criteria.</p>
                )}
              </div>
            ) : (
              <div className="divide-y">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedListing?.id === listing.id ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      setSelectedListing(listing);
                      // Center map on this listing and open info window
                      if (map && listing.latitude && listing.longitude) {
                        const position = {
                          lat: listing.latitude,
                          lng: listing.longitude,
                        };
                        map.setCenter(position);
                        map.setZoom(15);

                        // Find and click the marker
                        const marker = markersRef.current.find(
                          (m) =>
                            m.getPosition()?.lat() === listing.latitude &&
                            m.getPosition()?.lng() === listing.longitude,
                        );
                        if (marker) {
                          google.maps.event.trigger(marker, "click");
                        }
                      }
                    }}
                  >
                    <div className="flex">
                      <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <MapPin className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-blue-600 hover:underline truncate">
                          <Link href={`/listings/${listing.id}`}>
                            {listing.title}
                          </Link>
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.round(listing.rating || 0) ? "fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            {listing.reviews_count
                              ? `(${listing.reviews_count})`
                              : ""}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {listing.category}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {listing.location}
                          {listing.distance && (
                            <span className="ml-1">
                              • {listing.distance.toFixed(1)} miles away
                            </span>
                          )}
                        </p>
                        {listing.price_range && (
                          <p className="text-xs text-gray-500 mt-1">
                            {listing.price_range}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Listing Detail Panel (Mobile Only) */}
        {selectedListing && viewMode === "map" && (
          <div className="p-4 border-t md:hidden bg-white">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium">{selectedListing.title}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.round(selectedListing.rating || 0) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {selectedListing.reviews_count
                      ? `(${selectedListing.reviews_count})`
                      : ""}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedListing.location}
                </p>
              </div>
              <Link href={`/listings/${selectedListing.id}`}>
                <Button size="sm">View Details</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
