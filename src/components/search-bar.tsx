"use client";

import { useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import SearchWithSuggestions from "./search/search-with-suggestions";

interface SearchBarProps {
  className?: string;
  initialQuery?: string;
  initialLocation?: string;
}

export default function SearchBar({
  className = "",
  initialQuery = "",
  initialLocation = "",
}: SearchBarProps) {
  const router = useRouter();

  const handleSearch = (
    query: string,
    category?: string,
    location?: string,
  ) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    if (category) params.set("category", category);

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className={`bg-white p-2 rounded-lg shadow-lg ${className}`}>
      <SearchWithSuggestions
        placeholder="What are you looking for?"
        initialQuery={initialQuery}
        initialLocation={initialLocation}
        onSearch={handleSearch}
        className="w-full"
      />
    </div>
  );
}
