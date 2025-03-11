import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  name: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function TagBadge({
  name,
  color = "blue",
  className = "",
  onClick,
}: TagBadgeProps) {
  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    green: "bg-green-100 text-green-800 hover:bg-green-200",
    red: "bg-red-100 text-red-800 hover:bg-red-200",
    yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    pink: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    indigo: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    orange: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    teal: "bg-teal-100 text-teal-800 hover:bg-teal-200",
  };

  const colorClass = colorMap[color] || colorMap.blue;

  return (
    <Badge
      className={`${colorClass} ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {name}
    </Badge>
  );
}
