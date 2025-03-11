"use client";

import { useState } from "react";

interface ListingStatusSelectProps {
  defaultValue?: string;
  name: string;
  className?: string;
}

export default function ListingStatusSelect({
  defaultValue = "pending",
  name,
  className = "",
}: ListingStatusSelectProps) {
  const [status, setStatus] = useState(defaultValue);

  return (
    <select
      id={name}
      name={name}
      className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="active">Active</option>
      <option value="pending">Pending</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}
