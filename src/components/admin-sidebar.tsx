"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  ListFilter,
  Settings,
  Flag,
  BarChart,
  Tag,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Home,
  Bell,
  MessageSquare,
  LogOut,
  HelpCircle,
  ShieldAlert,
  Database,
  Globe,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(3);

  useEffect(() => {
    // Auto-expand the section based on current path
    const currentSection = navItems.find(
      (item) => item.subItems && pathname.startsWith(item.href),
    );

    if (currentSection) {
      setExpandedSection(currentSection.name);
    }
  }, [pathname]);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { name: "All Users", href: "/admin/users" },
        { name: "Add User", href: "/admin/users/add" },
      ],
      badge: "12",
    },
    {
      name: "Listings",
      href: "/admin/listings",
      icon: <ListFilter className="w-5 h-5" />,
      subItems: [
        { name: "All Listings", href: "/admin/listings" },
        { name: "Add Listing", href: "/admin/listings/add" },
      ],
      badge: "24",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: <Tag className="w-5 h-5" />,
      subItems: [
        { name: "All Categories", href: "/admin/categories" },
        { name: "Add Category", href: "/admin/categories/add" },
      ],
    },
    {
      name: "Tags",
      href: "/admin/tags",
      icon: <Tag className="w-5 h-5" />,
      subItems: [
        { name: "All Tags", href: "/admin/tags" },
        { name: "Add Tag", href: "/admin/tags/add" },
      ],
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: <Flag className="w-5 h-5" />,
      badge: notifications > 0 ? notifications.toString() : undefined,
      badgeColor: "red",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const systemItems = [
    {
      name: "System Status",
      href: "/admin/system",
      icon: <Database className="w-5 h-5" />,
    },
    {
      name: "Security",
      href: "/admin/security",
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      name: "API",
      href: "/admin/api",
      icon: <Layers className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`bg-white border-r w-64 flex-shrink-0 fixed md:relative top-0 h-full md:h-screen z-40 transition-transform duration-200 ease-in-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6 border-b hidden md:flex items-center justify-between">
        <h1 className="font-bold text-xl">Admin Panel</h1>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          Admin
        </Badge>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-b hidden md:block">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              AD
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Main
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleSection(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between p-2 rounded-md",
                          isActive(item.href)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100",
                        )}
                        aria-expanded={expandedSection === item.name}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3 font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          {item.badge && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "mr-2",
                                item.badgeColor === "red"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-blue-50 text-blue-700",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {expandedSection === item.name ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      {expandedSection === item.name && (
                        <div className="pl-10 space-y-1 mt-1 animate-in fade-in-50 slide-in-from-top-5 duration-200">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "block p-2 rounded-md",
                                isActive(subItem.href)
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-100",
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md",
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3 font-medium">{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className={cn(
                            item.badgeColor === "red"
                              ? "bg-red-50 text-red-700"
                              : "bg-blue-50 text-blue-700",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              System
            </h3>
            <div className="space-y-1">
              {systemItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 rounded-md",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Help & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Resources
            </h3>
            <div className="space-y-1">
              <Link
                href="/admin/help"
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="ml-3 font-medium">Help & Documentation</span>
              </Link>
              <Link
                href="/"
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Globe className="w-5 h-5" />
                <span className="ml-3 font-medium">View Website</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t bg-white">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
