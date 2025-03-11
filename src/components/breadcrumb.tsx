import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-gray-500 ${className}`}
    >
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span className="font-medium text-gray-900 flex items-center">
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="hover:text-blue-600 flex items-center"
                >
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
