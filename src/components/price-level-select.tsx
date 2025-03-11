"use client";

import { useState } from "react";

interface PriceLevelSelectProps {
  defaultValue?: string;
  name: string;
  className?: string;
}

export default function PriceLevelSelect({
  defaultValue = "",
  name,
  className = "",
}: PriceLevelSelectProps) {
  const [priceLevel, setPriceLevel] = useState(defaultValue);

  return (
    <select
      id={name}
      name={name}
      className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
      value={priceLevel}
      onChange={(e) => setPriceLevel(e.target.value)}
    >
      <option value="">Select price level</option>
      <option value="1">$ (Inexpensive)</option>
      <option value="2">$$ (Moderate)</option>
      <option value="3">$$$ (Expensive)</option>
      <option value="4">$$$$ (Very Expensive)</option>
    </select>
  );
}
