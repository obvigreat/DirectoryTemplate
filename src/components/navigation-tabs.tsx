"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationTab {
  label: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface NavigationTabsProps {
  tabs: NavigationTab[];
  className?: string;
  variant?: "underline" | "pills" | "buttons";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (href: string) => void;
}

export function NavigationTabs({
  tabs,
  className = "",
  variant = "underline",
  fullWidth = false,
  size = "md",
  onChange,
}: NavigationTabsProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    // Find the tab that matches the current path
    const matchedTab = tabs.find(
      (tab) => pathname === tab.href || pathname?.startsWith(`${tab.href}/`),
    );
    if (matchedTab) {
      setActiveTab(matchedTab.href);
    } else {
      setActiveTab("");
    }
  }, [pathname, tabs]);

  const handleTabClick = (href: string) => {
    setActiveTab(href);
    if (onChange) {
      onChange(href);
    }
  };

  const sizeClasses = {
    sm: "text-xs py-2 px-3",
    md: "text-sm py-2.5 px-4",
    lg: "text-base py-3 px-5",
  };

  const getTabClasses = (tab: NavigationTab) => {
    const isActive = activeTab === tab.href;
    const baseClasses =
      "flex items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
    const sizeClass = sizeClasses[size];

    if (variant === "underline") {
      return cn(
        baseClasses,
        sizeClass,
        "border-b-2 relative",
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
        tab.disabled && "opacity-50 cursor-not-allowed",
        className,
      );
    }

    if (variant === "pills") {
      return cn(
        baseClasses,
        sizeClass,
        "rounded-full",
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        tab.disabled && "opacity-50 cursor-not-allowed",
        className,
      );
    }

    // Default to buttons
    return cn(
      baseClasses,
      sizeClass,
      "rounded-md",
      isActive
        ? "bg-blue-50 text-blue-600 border border-blue-200"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent",
      tab.disabled && "opacity-50 cursor-not-allowed",
      className,
    );
  };

  return (
    <div
      className={cn(
        "flex overflow-x-auto scrollbar-hide",
        variant === "underline" ? "border-b border-gray-200" : "gap-2",
        fullWidth && "w-full",
      )}
    >
      <div
        className={cn(
          "flex",
          fullWidth && "w-full",
          variant === "underline" ? "space-x-8" : "space-x-2",
        )}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.disabled ? "#" : tab.href}
            onClick={(e) => {
              if (tab.disabled) {
                e.preventDefault();
                return;
              }
              handleTabClick(tab.href);
            }}
            className={cn(
              getTabClasses(tab),
              fullWidth && "flex-1 justify-center",
            )}
            aria-current={activeTab === tab.href ? "page" : undefined}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
