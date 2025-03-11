"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CategoryFilterProps {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  selectedCategoryId?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    selectedCategoryId,
  );

  useEffect(() => {
    setActiveCategory(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // If clicking the already selected category, remove the filter
    if (categoryId === activeCategory) {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    // Reset to page 1 when changing category
    params.delete("page");

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={!activeCategory ? "default" : "outline"}
        size="sm"
        onClick={() => handleCategoryClick("")}
        className="rounded-full"
      >
        All Categories
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick(category.id)}
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
