"use client";

import { useRouter } from "next/navigation";
import AutoSubmitForm from "./auto-submit-form";

interface ClientSortSelectProps {
  sortBy: string;
  searchParams: Record<string, string>;
}

export default function ClientSortSelect({
  sortBy,
  searchParams,
}: ClientSortSelectProps) {
  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();

    // Add all existing search params except sort and page
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "sort" && key !== "page") {
        params.set(key, value);
      }
    });

    // Add the new sort value
    params.set("sort", e.target.value);

    // Navigate to the new URL
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <select
      name="sort"
      defaultValue={sortBy}
      className="p-2 border border-gray-300 rounded-md text-sm"
      onChange={handleSortChange}
    >
      <option value="relevance">Relevance</option>
      <option value="rating_high">Highest Rated</option>
      <option value="rating_low">Lowest Rated</option>
      <option value="price_high">Price: High to Low</option>
      <option value="price_low">Price: Low to High</option>
    </select>
  );
}
