"use client";

import { useState } from "react";

interface StatusOption {
  value: string;
  label: string;
  color?: string;
}

interface StatusSelectProps {
  defaultValue?: string;
  name: string;
  className?: string;
  required?: boolean;
  options: StatusOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function StatusSelect({
  defaultValue = "",
  name,
  className = "",
  required = false,
  options,
  onChange,
  disabled = false,
}: StatusSelectProps) {
  const [status, setStatus] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setStatus(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Get color class based on selected status
  const getStatusColorClass = () => {
    const selectedOption = options.find((option) => option.value === status);
    if (!selectedOption?.color) return "";

    switch (selectedOption.color) {
      case "green":
        return "text-green-700 border-green-300 bg-green-50";
      case "yellow":
        return "text-yellow-700 border-yellow-300 bg-yellow-50";
      case "red":
        return "text-red-700 border-red-300 bg-red-50";
      case "blue":
        return "text-blue-700 border-blue-300 bg-blue-50";
      case "purple":
        return "text-purple-700 border-purple-300 bg-purple-50";
      case "gray":
        return "text-gray-700 border-gray-300 bg-gray-50";
      default:
        return "";
    }
  };

  return (
    <select
      id={name}
      name={name}
      className={`w-full p-2 border border-gray-300 rounded-md ${getStatusColorClass()} ${className}`}
      value={status}
      onChange={handleChange}
      required={required}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
