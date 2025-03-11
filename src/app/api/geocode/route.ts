import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  const latlng = url.searchParams.get("latlng");

  if (!address && !latlng) {
    return NextResponse.json(
      { error: "Address or latlng parameter is required" },
      { status: 400 },
    );
  }

  try {
    // In a real application, you would use a geocoding service like Google Maps or Mapbox
    // For this demo, we'll simulate with some hardcoded values
    if (address) {
      const geocodingResults: Record<string, { lat: number; lng: number }> = {
        "new york": { lat: 40.7128, lng: -74.006 },
        "los angeles": { lat: 34.0522, lng: -118.2437 },
        chicago: { lat: 41.8781, lng: -87.6298 },
        "san francisco": { lat: 37.7749, lng: -122.4194 },
        miami: { lat: 25.7617, lng: -80.1918 },
        seattle: { lat: 47.6062, lng: -122.3321 },
        austin: { lat: 30.2672, lng: -97.7431 },
        denver: { lat: 39.7392, lng: -104.9903 },
        boston: { lat: 42.3601, lng: -71.0589 },
        "washington dc": { lat: 38.9072, lng: -77.0369 },
        philadelphia: { lat: 39.9526, lng: -75.1652 },
        atlanta: { lat: 33.749, lng: -84.388 },
        dallas: { lat: 32.7767, lng: -96.797 },
        houston: { lat: 29.7604, lng: -95.3698 },
        phoenix: { lat: 33.4484, lng: -112.074 },
      };

      const normalizedAddress = address.toLowerCase();
      const result = Object.keys(geocodingResults).find((key) =>
        normalizedAddress.includes(key),
      );

      if (result) {
        return NextResponse.json({
          results: [
            {
              formatted_address: result
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              geometry: {
                location: geocodingResults[result],
              },
            },
          ],
        });
      }

      // If no match, return an empty result
      return NextResponse.json({ results: [] });
    } else if (latlng) {
      // Handle reverse geocoding
      const [lat, lng] = latlng.split(",").map(parseFloat);

      // Mock reverse geocoding result
      return NextResponse.json({
        results: [
          {
            formatted_address: "123 Main St, Anytown, USA",
            geometry: {
              location: { lat, lng },
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error("Error geocoding:", error);
    return NextResponse.json({ error: "Failed to geocode" }, { status: 500 });
  }
}
