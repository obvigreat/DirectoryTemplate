"use server";

import { createClient } from "../../../supabase/server";

/**
 * Search for listings based on location and other criteria
 */
export async function searchListingsByLocation({
  query,
  lat,
  lng,
  radius,
  category,
}: {
  query?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  category?: string;
}) {
  const supabase = await createClient();

  try {
    // Start building the query
    let listingsQuery = supabase.from("listings").select("*, categories(*)");

    // Apply text search if provided
    if (query) {
      listingsQuery = listingsQuery.ilike("title", `%${query}%`);
    }

    // Apply category filter if provided
    if (category) {
      listingsQuery = listingsQuery.eq("category_id", category);
    }

    // If coordinates are provided, filter by distance
    if (lat && lng && radius) {
      // Use the custom function for radius search
      try {
        const { data: radiusResults, error: rpcError } = await supabase.rpc(
          "find_listings_within_radius",
          {
            center_lat: lat,
            center_lon: lng,
            radius_miles: radius,
          },
        );

        if (rpcError) throw rpcError;

        if (radiusResults) {
          // Apply additional filters to the results
          let filteredResults = radiusResults;
          if (query) {
            filteredResults = filteredResults.filter((listing) =>
              listing.title.toLowerCase().includes(query.toLowerCase()),
            );
          }
          if (category) {
            filteredResults = filteredResults.filter(
              (listing) => listing.category_id === category,
            );
          }

          // Calculate distance for each listing
          const resultsWithDistance = filteredResults.map((listing) => {
            if (listing.latitude && listing.longitude) {
              const distance = calculateDistance(
                lat,
                lng,
                listing.latitude,
                listing.longitude,
              );
              return { ...listing, distance: parseFloat(distance.toFixed(1)) };
            }
            return listing;
          });

          // Sort by distance
          resultsWithDistance.sort((a, b) => {
            return (a.distance || Infinity) - (b.distance || Infinity);
          });

          return {
            listings: resultsWithDistance,
            count: resultsWithDistance.length,
          };
        }
      } catch (error) {
        console.error("RPC error, falling back to regular query:", error);
        // If RPC fails, fall back to regular query
      }
    }

    // Regular query without distance filtering or if RPC failed
    const { data, error } = await listingsQuery;

    if (error) throw error;

    // Calculate distance for each listing if coordinates are provided
    let resultsWithDistance = data || [];
    if (lat && lng) {
      resultsWithDistance = resultsWithDistance.map((listing) => {
        if (listing.latitude && listing.longitude) {
          const distance = calculateDistance(
            lat,
            lng,
            listing.latitude,
            listing.longitude,
          );
          return { ...listing, distance: parseFloat(distance.toFixed(1)) };
        }
        return listing;
      });

      // Sort by distance
      resultsWithDistance.sort((a, b) => {
        return (a.distance || Infinity) - (b.distance || Infinity);
      });
    }

    return {
      listings: resultsWithDistance,
      count: resultsWithDistance.length,
    };
  } catch (error) {
    console.error("Error in map search:", error);
    throw error;
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
