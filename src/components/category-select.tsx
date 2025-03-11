"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  defaultValue?: string;
  name: string;
  className?: string;
  categories: Category[];
  required?: boolean;
}

export default function CategorySelect({
  defaultValue = "",
  name,
  className = "",
  categories = [],
  required = false,
}: CategorySelectProps) {
  const [category, setCategory] = useState(defaultValue);

  return (
    <select
      id={name}
      name={name}
      className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required={required}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
