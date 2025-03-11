import Link from "next/link";
import { ReactNode } from "react";

interface CategoryCardProps {
  name: string;
  icon: ReactNode;
  count: number;
  href?: string;
}

export default function CategoryCard({
  name,
  icon,
  count,
  href = "#",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{name}</h3>
      <p className="text-sm text-gray-500">{count} listings</p>
    </Link>
  );
}
