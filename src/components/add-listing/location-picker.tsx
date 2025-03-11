"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Search, Loader2 } from "lucide-react";

interface LocationPickerProps {
  value: string;
  onChange: (location: string) => void;
}

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(value);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map when dialog opens
  useEffect(() => {
    if (open && mapRef.current && !mapInstanceRef.current) {
      // Load Google Maps script if not already loaded
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }
  }, [open]);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    // Default to a central location
    const defaultLocation = { lat: 40.7128, lng: -74.006 }; // New York City

    const mapOptions: google.maps.MapOptions = {
      center: defaultLocation,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    };

    const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = mapInstance;

    // Add marker for selected location
    if (value) {
      // Geocode the address to get coordinates
      geocodeAddress(value, (location) => {
        if (location) {
          mapInstance.setCenter(location);
          setMarker(location);
        }
      });
    }

    // Add click listener to map
    mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        setMarker(e.latLng.toJSON());
        reverseGeocode(e.latLng.toJSON());
      }
    });
  };

  const setMarker = (position: google.maps.LatLngLiteral) => {
    if (!mapInstanceRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Create new marker
    const marker = new google.maps.Marker({
      position,
      map: mapInstanceRef.current,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    // Add drag end listener
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      if (position) {
        reverseGeocode(position.toJSON());
      }
    });

    markerRef.current = marker;
  };

  const geocodeAddress = (
    address: string,
    callback: (location: google.maps.LatLngLiteral | null) => void,
  ) => {
    if (!window.google) return callback(null);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location.toJSON();
        callback(location);
      } else {
        callback(null);
      }
    });
  };

  const reverseGeocode = (location: google.maps.LatLngLiteral) => {
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setSelectedLocation(results[0].formatted_address);
      }
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !window.google) return;

    setSearching(true);
    setResults([]);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results) {
        setResults(results);
      }
      setSearching(false);
    });
  };

  const selectLocation = (result: any) => {
    const location = result.geometry.location.toJSON();
    setSelectedLocation(result.formatted_address);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(location);
      mapInstanceRef.current.setZoom(15);
      setMarker(location);
    }

    setResults([]);
    setSearchQuery("");
  };

  const confirmLocation = () => {
    onChange(selectedLocation);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter location..."
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <MapPin className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <div className="py-4">
              <h2 className="text-xl font-bold mb-4">Select Location</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Search for a location</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button
                        type="button"
                        onClick={handleSearch}
                        disabled={searching}
                      >
                        {searching ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {results.length > 0 && (
                    <div className="space-y-2">
                      <Label>Results</Label>
                      <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {results.map((result, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => selectLocation(result)}
                          >
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                              {result.formatted_address}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Selected Location</Label>
                    <Input value={selectedLocation} readOnly />
                    <p className="text-xs text-muted-foreground">
                      You can also click on the map to select a location
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={confirmLocation}
                    className="w-full"
                  >
                    Confirm Location
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <div
                    ref={mapRef}
                    className="w-full h-[400px] rounded-md border"
                    style={{ background: "#f0f0f0" }}
                  ></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
