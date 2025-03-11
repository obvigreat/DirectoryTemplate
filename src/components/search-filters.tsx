"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronDown, Star, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFiltersProps {
  onFilterChange?: (filters: any) => void;
  className?: string;
  categories?: any[];
  selectedCategory?: string;
  selectedRating?: string;
  selectedPrice?: string;
}

export default function SearchFilters({
  onFilterChange,
  className,
  categories = [],
  selectedCategory = "",
  selectedRating = "0",
  selectedPrice = "",
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState(selectedCategory);
  const [rating, setRating] = useState(selectedRating);
  const [price, setPrice] = useState(selectedPrice);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [features, setFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const [activeFiltersCount, setActiveFiltersCount] = useState(() => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedRating && selectedRating !== "0") count++;
    if (selectedPrice) count++;
    return count;
  });

  const featuresList = [
    "Free Wi-Fi",
    "Parking",
    "Outdoor Seating",
    "Pet Friendly",
    "Wheelchair Accessible",
    "Delivery",
    "Takeout",
    "Reservations",
  ];

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = features.includes(feature)
      ? features.filter((f) => f !== feature)
      : [...features, feature];
    setFeatures(newFeatures);
  };

  // Apply filters when user clicks the button
  const applyFilters = () => {
    try {
      const params = new URLSearchParams(searchParams.toString());

      // Update or remove category parameter
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      // Update or remove rating parameter
      if (rating && rating !== "0") {
        params.set("rating", rating);
      } else {
        params.delete("rating");
      }

      // Update or remove price parameter
      if (price) {
        params.set("price", price);
      } else {
        params.delete("price");
      }

      // Reset to page 1 when filters change
      params.delete("page");

      // If there are features, add them
      if (features.length > 0) {
        params.set("features", features.join(","));
      } else {
        params.delete("features");
      }

      // Add sort parameter if not default
      if (sortBy !== "relevance") {
        params.set("sort", sortBy);
      } else {
        params.delete("sort");
      }

      router.push(`/listings?${params.toString()}`);

      // Also call the callback if provided
      if (onFilterChange) {
        onFilterChange({
          category,
          rating,
          price,
          priceRange,
          features,
          sortBy,
        });
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      // Provide a fallback in case of error
      router.push("/listings");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setRating("0");
    setPrice("");
    setPriceRange([0, 1000]);
    setFeatures([]);
    setSortBy("relevance");
    setActiveFiltersCount(0);

    const params = new URLSearchParams();
    // Keep search query and location if present
    if (searchParams.has("q")) params.set("q", searchParams.get("q")!);
    if (searchParams.has("location"))
      params.set("location", searchParams.get("location")!);

    router.push(`/listings?${params.toString()}`);

    if (onFilterChange) {
      onFilterChange({
        category: "",
        rating: "0",
        price: "",
        priceRange: [0, 1000],
        features: [],
        sortBy: "relevance",
      });
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4 border-b border-gray-200">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {/* Filter Content */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:block">
        <CollapsibleContent className="md:block">
          <div className="p-4 space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Rating</Label>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div
                    key={star}
                    className={`flex items-center p-2 rounded-md cursor-pointer ${
                      rating === star.toString()
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      setRating(
                        rating === star.toString() ? "0" : star.toString(),
                      )
                    }
                  >
                    <div className="flex items-center flex-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < star ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm">
                        {star}+ {star === 1 ? "star" : "stars"}
                      </span>
                    </div>
                    {rating === star.toString() && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Price Level
              </Label>
              <div className="space-y-2">
                {[
                  { id: "1", label: "$" },
                  { id: "2", label: "$$" },
                  { id: "3", label: "$$$" },
                  { id: "4", label: "$$$$" },
                ].map((priceOption) => (
                  <div
                    key={priceOption.id}
                    className={`flex items-center p-2 rounded-md cursor-pointer ${
                      price === priceOption.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      setPrice(price === priceOption.id ? "" : priceOption.id)
                    }
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-sm">{priceOption.label}</span>
                    </div>
                    {price === priceOption.id && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Features</Label>
              <div className="grid grid-cols-2 gap-2">
                {featuresList.map((feature) => (
                  <div
                    key={feature}
                    className={`flex items-center p-2 rounded-md cursor-pointer ${
                      features.includes(feature)
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 mr-2 rounded flex items-center justify-center ${
                          features.includes(feature)
                            ? "bg-blue-600"
                            : "border border-gray-300"
                        }`}
                      >
                        {features.includes(feature) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating_high">Highest Rating</SelectItem>
                  <SelectItem value="rating_low">Lowest Rating</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full" onClick={applyFilters}>
              Apply Filters
            </Button>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
