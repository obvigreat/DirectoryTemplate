"use client";

import { useState } from "react";

interface RoleSelectProps {
  defaultValue?: string;
  name: string;
  className?: string;
  required?: boolean;
}

export default function RoleSelect({
  defaultValue = "user",
  name,
  className = "",
  required = false,
}: RoleSelectProps) {
  const [role, setRole] = useState(defaultValue);

  return (
    <select
      id={name}
      name={name}
      className={`p-2 border border-gray-300 rounded-md w-full ${className}`}
      value={role}
      onChange={(e) => setRole(e.target.value)}
      required={required}
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
      <option value="moderator">Moderator</option>
    </select>
  );
}
