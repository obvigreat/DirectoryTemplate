"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
}

export default function CategoryBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
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
  }, [supabase]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string | null) => {
    // Default to a generic icon if none provided
    if (!iconName) return "🏢";

    // Map icon names to emoji for simplicity
    // In a real app, you might use an icon library like lucide-react
    const iconMap: Record<string, string> = {
      Leaf: "🌿",
      Car: "🚗",
      Hammer: "🔨",
      GraduationCap: "🎓",
      DollarSign: "💰",
      Dumbbell: "💪",
      Utensils: "🍽️",
      Stethoscope: "⚕️",
      Home: "🏠",
      Hotel: "🏨",
      Factory: "🏭",
      Code: "💻",
      Film: "🎬",
      Paw: "🐾",
      Briefcase: "💼",
      Building: "🏢",
      ShoppingBag: "🛍️",
      Cloud: "☁️",
      Truck: "🚚",
      Plane: "✈️",
    };

    return iconMap[iconName] || "🏢";
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <Link
              href={`/listings?category=${category.slug}`}
              key={category.id}
              className="block h-full"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-3xl mb-3">
                    {getIconComponent(category.icon)}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {category.description}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto w-full"
                  >
                    Browse <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
