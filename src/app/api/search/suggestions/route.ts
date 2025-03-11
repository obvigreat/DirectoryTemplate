import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get query parameters
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category") || null;
    const location = url.searchParams.get("location") || null;
    const limit = parseInt(url.searchParams.get("limit") || "10");

    if (!query && !category && !location) {
      // If no specific query, return popular searches
      const { data: popularSearches, error: popularError } = await supabase
        .from("popular_searches")
        .select("query, category, location, count")
        .order("count", { ascending: false })
        .limit(limit);

      if (popularError) throw popularError;

      return NextResponse.json(popularSearches);
    }

    // Search for suggestions based on query
    let suggestionsQuery = supabase
      .from("popular_searches")
      .select("query, category, location, count")
      .ilike("query", `%${query}%`)
      .order("count", { ascending: false })
      .limit(limit);

    // Add category filter if provided
    if (category) {
      suggestionsQuery = suggestionsQuery.eq("category", category);
    }

    // Add location filter if provided
    if (location) {
      suggestionsQuery = suggestionsQuery.eq("location", location);
    }

    const { data: suggestions, error } = await suggestionsQuery;

    if (error) throw error;

    // If we have few or no suggestions, also search listings directly
    if (suggestions.length < limit) {
      const { data: listingSuggestions, error: listingError } = await supabase
        .from("listings")
        .select("title, category, location")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(limit - suggestions.length);

      if (listingError) throw listingError;

      // Convert listing results to suggestion format
      const formattedListingSuggestions = listingSuggestions.map((listing) => ({
        query: listing.title,
        category: listing.category,
        location: listing.location,
        count: 0, // Not from popular searches
      }));

      // Combine both sets of suggestions
      return NextResponse.json([
        ...suggestions,
        ...formattedListingSuggestions,
      ]);
    }

    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error("Error in search suggestions API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
