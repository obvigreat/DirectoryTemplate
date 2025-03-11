"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100",
              item.disabled && "opacity-50 cursor-not-allowed",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span className="flex-1">{item.title}</span>
            {item.label && (
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
