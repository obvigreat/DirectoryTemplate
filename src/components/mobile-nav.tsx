"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Home,
  ListFilter,
  Map,
  Tag,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "./auth-state-provider";

export function MobileNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const mainNavItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5 mr-3" /> },
    {
      name: "Listings",
      href: "/listings",
      icon: <ListFilter className="w-5 h-5 mr-3" />,
    },
    {
      name: "Map Search",
      href: "/map-search",
      icon: <Map className="w-5 h-5 mr-3" />,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: <Tag className="w-5 h-5 mr-3" />,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <CreditCard className="w-5 h-5 mr-3" />,
    },
  ];

  const dashboardItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Listings", href: "/dashboard/listings" },
    { name: "Saved Listings", href: "/dashboard/saved" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600"
              onClick={() => setOpen(false)}
            >
              Directory
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex-1 overflow-auto py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center py-2 px-4 rounded-md text-base font-medium ${pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {user && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4 pt-2 border-t border-gray-100">
                    Dashboard
                  </h3>
                  <div className="space-y-1">
                    {dashboardItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center py-2 px-4 rounded-md text-base font-medium ${pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="border-t border-gray-200 pt-4 pb-2 px-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{user.email}</p>
                    <p className="text-sm text-gray-500">Account</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
