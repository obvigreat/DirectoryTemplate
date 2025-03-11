"use client";

import { useState } from "react";

interface ClientSelectProps {
  name: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function ClientSelect({
  name,
  defaultValue = "",
  className = "",
  required = false,
  children,
}: ClientSelectProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <select
      id={name}
      name={name}
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
    >
      {children}
    </select>
  );
}
