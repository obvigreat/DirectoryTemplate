"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home, Menu, X, Bell, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth-state-provider";

export default function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-xl font-bold text-blue-600">
            Directory
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              <Home className="h-4 w-4 inline mr-1" />
              Home
            </Link>
            <Link
              href="/listings"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          {!isLoading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer w-full">
                    Overview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/saved"
                    className="cursor-pointer w-full"
                  >
                    Saved Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/activity"
                    className="cursor-pointer w-full"
                  >
                    Activity
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/subscription"
                    className="cursor-pointer w-full"
                  >
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="cursor-pointer w-full"
                  >
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={signOut}
                    className="cursor-pointer text-red-600 w-full text-left"
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-200 mt-2">
              {!isLoading && user && (
                <>
                  <Link
                    href="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Overview
                  </Link>
                  <Link
                    href="/dashboard/saved"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard/saved" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Saved Listings
                  </Link>
                  <Link
                    href="/dashboard/activity"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard/activity" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Activity
                  </Link>
                  <Link
                    href="/dashboard/subscription"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard/subscription" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Subscription
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard/settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
