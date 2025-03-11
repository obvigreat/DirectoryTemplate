"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, X, ArrowRight } from "lucide-react";
import { trackSearch } from "@/components/analytics/event-tracking";

interface SearchSuggestion {
  query: string;
  category?: string;
  location?: string;
  count?: number;
}

interface SearchWithSuggestionsProps {
  placeholder?: string;
  initialQuery?: string;
  initialCategory?: string;
  initialLocation?: string;
  onSearch?: (query: string, category?: string, location?: string) => void;
  className?: string;
}

export default function SearchWithSuggestions({
  placeholder = "Search...",
  initialQuery = "",
  initialCategory,
  initialLocation,
  onSearch,
  className = "",
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim() && !category && !location) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (query.trim()) params.append("q", query.trim());
        if (category) params.append("category", category);
        if (location) params.append("location", location);

        const response = await fetch(`/api/search/suggestions?${params}`);
        if (!response.ok) throw new Error("Failed to fetch suggestions");

        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the fetch request
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query, category, location]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearch = (
    searchQuery = query,
    searchCategory = category,
    searchLocation = location,
  ) => {
    if (!searchQuery.trim() && !searchCategory && !searchLocation) return;

    // Save to recent searches
    if (searchQuery.trim()) {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery).slice(0, 4),
      ];
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }

    // Track the search event
    trackSearch(
      searchQuery.trim(),
      searchCategory || "",
      searchLocation || "",
      0, // We don't know the results count yet
    );

    // Close suggestions
    setShowSuggestions(false);

    // Call onSearch prop if provided
    if (onSearch) {
      onSearch(searchQuery, searchCategory, searchLocation);
      return;
    }

    // Otherwise, navigate to search page
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (searchCategory) params.append("category", searchCategory);
    if (searchLocation) params.append("location", searchLocation);

    router.push(`/listings?${params}`);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.query);
    if (suggestion.category) setCategory(suggestion.category);
    if (suggestion.location) setLocation(suggestion.location);
    handleSearch(suggestion.query, suggestion.category, suggestion.location);
  };

  // Clear search input
  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`} ref={suggestionsRef}>
      <div className="flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="button"
          onClick={() => handleSearch()}
          className="ml-2"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions &&
        (query || recentSearches.length > 0 || suggestions.length > 0) && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                <p>Loading suggestions...</p>
              </div>
            ) : (
              <>
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-500 px-2 mb-1">
                      Recent Searches
                    </h3>
                    {recentSearches.map((search, index) => (
                      <button
                        key={`recent-${index}`}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
                        onClick={() => handleSearch(search)}
                      >
                        <span className="truncate">{search}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Divider if we have both recent searches and suggestions */}
                {recentSearches.length > 0 && suggestions.length > 0 && (
                  <div className="border-t border-gray-200 my-1"></div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 ? (
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-500 px-2 mb-1">
                      Suggestions
                    </h3>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={`suggestion-${index}`}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div>
                          <div className="font-medium">{suggestion.query}</div>
                          {(suggestion.category || suggestion.location) && (
                            <div className="text-xs text-gray-500">
                              {suggestion.category && `${suggestion.category}`}
                              {suggestion.category &&
                                suggestion.location &&
                                " · "}
                              {suggestion.location && `${suggestion.location}`}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                ) : query && !loading ? (
                  <div className="p-4 text-center text-gray-500">
                    No suggestions found
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
    </div>
  );
}
