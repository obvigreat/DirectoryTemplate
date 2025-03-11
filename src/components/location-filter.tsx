"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X, ChevronDown, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

interface LocationFilterProps {
  onFilterChange?: (filters: {
    location: string;
    radius: number;
    useCurrentLocation: boolean;
    coordinates?: { lat: number; lng: number };
  }) => void;
  initialLocation?: string;
  initialRadius?: number;
  initialCoordinates?: { lat: number; lng: number };
  showApplyButton?: boolean;
}

export default function LocationFilter({
  onFilterChange,
  initialLocation = "",
  initialRadius = 5,
  initialCoordinates,
  showApplyButton = true,
}: LocationFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(currentCoords);
          setLocation("Current Location");
          setIsGettingLocation(false);

          if (onFilterChange) {
            onFilterChange({
              location: "Current Location",
              radius,
              useCurrentLocation: true,
              coordinates: currentCoords,
            });
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setUseCurrentLocation(false);
          setIsGettingLocation(false);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUseCurrentLocation(false);
    }
  }, [radius, onFilterChange]);

  // Geocode location to coordinates
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
        miami: { lat: 25.7617, lng: -80.1918 },
        seattle: { lat: 47.6062, lng: -122.3321 },
        austin: { lat: 30.2672, lng: -97.7431 },
        denver: { lat: 39.7392, lng: -104.9903 },
      };

      const normalizedLocation = locationName.toLowerCase();
      const result = Object.keys(geocodingResults).find((key) =>
        normalizedLocation.includes(key),
      );

      if (result) {
        setCoordinates(geocodingResults[result]);
        return geocodingResults[result];
      }

      // If no match, return null
      return null;
    } catch (error) {
      console.error("Error geocoding location:", error);
      return null;
    }
  }, []);

  // Handle current location toggle
  const handleCurrentLocationToggle = () => {
    const newValue = !useCurrentLocation;
    setUseCurrentLocation(newValue);
    if (newValue) {
      getCurrentLocation();
    }
  };

  // Apply filters
  const applyFilters = async () => {
    let coords = coordinates;

    if (location && !useCurrentLocation && !coords) {
      coords = await geocodeLocation(location);
    }

    if (onFilterChange) {
      onFilterChange({
        location,
        radius,
        useCurrentLocation,
        coordinates: coords,
      });
    } else {
      // Navigate with updated parameters
      const params = new URLSearchParams(searchParams.toString());

      if (location) {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      params.set("radius", radius.toString());

      if (coords) {
        params.set("lat", coords.lat.toString());
        params.set("lng", coords.lng.toString());
      }

      // Reset to page 1 when changing filters
      params.delete("page");

      router.push(`/map-search?${params.toString()}`);
    }
  };

  // Update filter when props change
  useEffect(() => {
    setLocation(initialLocation);
    setRadius(initialRadius);
    setCoordinates(initialCoordinates);
  }, [initialLocation, initialRadius, initialCoordinates]);

  // Auto-apply filters when values change if not showing apply button
  useEffect(() => {
    if (!showApplyButton && onFilterChange) {
      onFilterChange({
        location,
        radius,
        useCurrentLocation,
        coordinates,
      });
    }
  }, [
    location,
    radius,
    useCurrentLocation,
    coordinates,
    showApplyButton,
    onFilterChange,
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium">Location & Distance</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? "transform rotate-180" : ""}`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="Enter location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={useCurrentLocation || isGettingLocation}
              />
              {location && !useCurrentLocation && !isGettingLocation && (
                <button
                  type="button"
                  onClick={() => setLocation("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="useCurrentLocation"
              checked={useCurrentLocation}
              onChange={handleCurrentLocationToggle}
              disabled={isGettingLocation}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            <label
              htmlFor="useCurrentLocation"
              className="text-sm text-gray-700 flex items-center"
            >
              {isGettingLocation && (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              )}
              Use my current location
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="radius" className="text-sm font-medium">
                Search Radius
              </label>
              <span className="text-sm text-gray-500">{radius} miles</span>
            </div>
            <Slider
              id="radius"
              defaultValue={[radius]}
              value={[radius]}
              max={50}
              step={1}
              onValueChange={(value) => setRadius(value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 mile</span>
              <span>25 miles</span>
              <span>50 miles</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Popular Locations</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "New York, NY",
                "Los Angeles, CA",
                "Chicago, IL",
                "San Francisco, CA",
              ].map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setLocation(city);
                    setUseCurrentLocation(false);
                    geocodeLocation(city);
                  }}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>

          {showApplyButton && (
            <div className="pt-2">
              <Button
                className="w-full"
                size="sm"
                onClick={applyFilters}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  "Apply Filters"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
