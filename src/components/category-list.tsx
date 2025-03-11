"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import CategoryCard from "./category-card";
import { Skeleton } from "./ui/skeleton";
import {
  Coffee,
  Hotel,
  ShoppingBag,
  Utensils,
  Briefcase,
  Dumbbell,
  Car,
  Landmark,
  Music,
  Camera,
} from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();

      try {
        // Fetch categories with listing counts
        const { data, error } = await supabase
          .from("categories")
          .select("*, listings(count)")
          .order("name");

        if (error) throw error;

        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Map of category icons by name (case insensitive)
  const categoryIcons: Record<string, React.ReactNode> = {
    restaurants: <Utensils className="w-6 h-6" />,
    cafes: <Coffee className="w-6 h-6" />,
    hotels: <Hotel className="w-6 h-6" />,
    shopping: <ShoppingBag className="w-6 h-6" />,
    services: <Briefcase className="w-6 h-6" />,
    fitness: <Dumbbell className="w-6 h-6" />,
    automotive: <Car className="w-6 h-6" />,
    attractions: <Landmark className="w-6 h-6" />,
    entertainment: <Music className="w-6 h-6" />,
    photography: <Camera className="w-6 h-6" />,
  };

  // Get icon for a category
  const getCategoryIcon = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase();

    // Find a matching icon or partial match
    for (const [key, icon] of Object.entries(categoryIcons)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return icon;
      }
    }

    // Default icon if no match found
    return <Briefcase className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl"
            >
              <Skeleton className="w-12 h-12 rounded-full mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          icon={getCategoryIcon(category.name)}
          count={category.listings?.length || 0}
          href={`/listings?category=${category.id}`}
        />
      ))}
    </div>
  );
}
