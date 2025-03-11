"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchWithSuggestions from "./search/search-with-suggestions";

export default function SearchSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
          Find the Perfect Local Business
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Discover top-rated businesses in your area
        </p>

        <div className="max-w-3xl mx-auto">
          <SearchWithSuggestions
            placeholder="Search for restaurants, shops, services..."
            className="w-full"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            onClick={() => router.push("/map-search")}
          >
            <MapPin className="w-4 h-4 mr-2" /> Map Search
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            onClick={() => router.push("/categories")}
          >
            Browse Categories <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
