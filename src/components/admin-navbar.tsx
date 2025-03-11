"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home, Menu, X, Bell, Search, Shield } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/app/actions/auth";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            prefetch
            className="text-xl font-bold text-blue-600"
          >
            <span className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Admin
            </span>
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
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Dashboard
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin" className="cursor-pointer w-full">
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer w-full">
                  User Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action={signOut} className="w-full">
                  <button
                    type="submit"
                    className="cursor-pointer text-red-600 w-full text-left"
                  >
                    Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              href="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/admin" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
            <Link
              href="/admin/users"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/admin/users" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              href="/admin/listings"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/admin/listings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Listings
            </Link>
            <Link
              href="/admin/categories"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/admin/categories" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/admin/analytics"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/admin/analytics" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-200 mt-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                User Dashboard
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
