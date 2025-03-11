"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  Heart,
  CreditCard,
  FileText,
  LogOut,
  Home,
  Search,
  Bell,
  LayoutDashboard,
  ListFilter,
  Plus,
  MessageSquare,
  Calendar,
  ChevronRight,
  HelpCircle,
  BarChart,
  Bookmark,
  MapPin,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "./auth-state-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.id) return;

      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        setSubscription(data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [user?.id]);

  const mainNavItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "My Listings",
      href: "/dashboard/listings",
      icon: <ListFilter className="w-5 h-5" />,
    },
    {
      title: "Saved Listings",
      href: "/dashboard/saved",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-5 h-5" />,
      label: "3",
    },
    {
      title: "Bookings",
      href: "/dashboard/bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Activity",
      href: "/dashboard/activity",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const accountNavItems: NavItem[] = [
    {
      title: "Subscription",
      href: "/dashboard/subscription",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const quickLinks: NavItem[] = [
    {
      title: "Add New Listing",
      href: "/dashboard/listings/add",
      icon: <Plus className="w-5 h-5" />,
    },
    {
      title: "Explore Listings",
      href: "/listings",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: "Map Search",
      href: "/map-search",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "Return to Home",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
  ];

  // Determine user role badge
  const getUserRoleBadge = () => {
    if (subscription && subscription.status === "active") {
      if (subscription.product_name?.toLowerCase().includes("business")) {
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <Zap className="w-3 h-3 mr-1" /> Business
          </Badge>
        );
      }
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          <Zap className="w-3 h-3 mr-1" /> Premium
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="bg-gray-50 text-gray-700 hover:bg-gray-100"
      >
        Free
      </Badge>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          {getUserRoleBadge()}
        </div>

        {/* User Profile Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user?.user_metadata?.name || user?.email}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm" className="w-full">
                Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Subscription Status */}
        {subscription && subscription.status === "active" && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-green-800">
                {subscription.product_name || "Premium"} Active
              </h3>
            </div>
            <p className="text-xs text-green-700">
              Your subscription is active until{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        )}

        {subscription && subscription.cancel_at_period_end && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-medium text-yellow-800">
                Subscription Ending
              </h3>
            </div>
            <p className="text-xs text-yellow-700">
              Your subscription will end on{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
            <Link
              href="/dashboard/subscription"
              className="text-xs text-blue-600 hover:underline mt-1 block"
            >
              Resume subscription
            </Link>
          </div>
        )}

        {/* Main Navigation */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Main
            </h3>
            <SidebarNav items={mainNavItems} />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Account
            </h3>
            <SidebarNav items={accountNavItems} />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Quick Links
            </h3>
            <SidebarNav items={quickLinks} />
          </div>
        </div>
      </div>

      {/* Upgrade Banner - only show for free users */}
      {(!subscription || subscription.status !== "active") && (
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="rounded-lg p-3">
            <div className="flex items-start">
              <div className="flex-1">
                <h4 className="font-medium text-sm">Upgrade to Premium</h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Get more features & priority support
                </p>
              </div>
              <Link href="/pricing">
                <Button size="sm" className="text-xs">
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
