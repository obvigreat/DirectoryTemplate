"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "./auth-state-provider";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import {
  Home,
  ListFilter,
  Map,
  Tag,
  CreditCard,
  Search,
  MessageSquare,
  Heart,
  Plus,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Calendar,
  User,
} from "lucide-react";

export function EnhancedNavbar() {
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { label: "Listings", href: "/listings", icon: <ListFilter className="w-4 h-4 mr-2" /> },
    { label: "Map Search", href: "/map-search", icon: <Map className="w-4 h-4 mr-2" /> },
    { label: "Categories", href: "/categories", icon: <Tag className="w-4 h-4 mr-2" /> },
    { label: "Pricing", href: "/pricing", icon: <CreditCard className="w-4 h-4 mr-2" /> },
  ];

  const userNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    { label: "My Listings", href: "/dashboard/listings", icon: <ListFilter className="w-4 h-4 mr-2" /> },
    { label: "Saved Listings", href: "/dashboard/saved", icon: <Heart className="w-4 h-4 mr-2" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { label: "Bookings", href: "/dashboard/bookings", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-