"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Search,
  Menu,
  X,
  Heart,
  Bell,
  Plus,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
  ListFilter,
  Map,
  Tag,
  CreditCard,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "./auth-state-provider";
import { cn } from "@/lib/utils";

function Navbar() {
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      name: "Listings",
      href: "/listings",
      icon: <ListFilter className="w-4 h-4 mr-2" />,
    },
    {
      name: "Map Search",
      href: "/map-search",
      icon: <Map className="w-4 h-4 mr-2" />,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: <Tag className="w-4 h-4 mr-2" />,
    },
    {
      name: "Community",
      href: "/community",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
    },
    {
      name: "Blog",
      href: "/blog",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
    },
  ];

  const dashboardLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      name: "My Listings",
      href: "/dashboard/listings",
      icon: <ListFilter className="w-4 h-4 mr-2" />,
    },
    {
      name: "Saved",
      href: "/dashboard/saved",
      icon: <Heart className="w-4 h-4 mr-2" />,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
    },
    {
      name: "Bookings",
      href: "/dashboard/bookings",
      icon: <Calendar className="w-4 h-4 mr-2" />,
    },
    {
      name: "Subscription",
      href: "/dashboard/subscription",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <nav
      className={`w-full border-b border-gray-200 sticky top-0 z-50 transition-all duration-200 ${isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"}`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            prefetch
            className="text-2xl font-bold text-blue-600 mr-8"
          >
            Directory
          </Link>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-gray-600 hover:text-blue-600 font-medium py-4 relative group ${pathname === link.href ? "text-blue-600" : ""}`}
              >
                <span className="flex items-center">{link.name}</span>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200",
                    pathname === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                ></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/listings" className="hidden md:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-blue-600"
                      aria-label="Search listings"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    className="hidden md:flex relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-blue-600"
                      aria-label="Messages"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/saved" className="hidden md:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-blue-600"
                      aria-label="Saved listings"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="/dashboard/listings/add"
                    className="hidden md:flex"
                  >
                    <Button variant="outline" className="items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Add Listing
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        className="hidden md:flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {dashboardLinks.map((link) => (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link
                              href={link.href}
                              className="cursor-pointer w-full"
                            >
                              <span className="flex items-center">
                                {link.icon}
                                {link.name}
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <UserCircle className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium truncate">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="cursor-pointer w-full"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/listings"
                            className="cursor-pointer w-full"
                          >
                            <ListFilter className="w-4 h-4 mr-2" />
                            My Listings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/saved"
                            className="cursor-pointer w-full"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Saved Listings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/messages"
                            className="cursor-pointer w-full"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Messages
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="cursor-pointer w-full"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/subscription"
                            className="cursor-pointer w-full"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Subscription
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <button
                          onClick={signOut}
                          className="cursor-pointer text-red-600 w-full text-left flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="hidden md:block">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </>
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
        <div className="md:hidden bg-white border-t border-gray-100 py-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 space-y-1">
            <div className="py-2">
              <h3 className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">
                Main Navigation
              </h3>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {!isLoading && user && (
              <div className="py-2 border-t border-gray-100">
                <h3 className="text-xs uppercase text-gray-500 font-semibold px-3 my-2">
                  Dashboard
                </h3>
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}

                <div className="mt-4 px-3">
                  <Link
                    href="/dashboard/listings/add"
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Listing
                  </Link>
                </div>

                <div className="mt-2 px-3">
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {!isLoading && !user && (
              <div className="py-2 border-t border-gray-100">
                <div className="flex flex-col gap-2 px-3 pt-2">
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Export both default and named exports properly
export default Navbar;
export { Navbar };
