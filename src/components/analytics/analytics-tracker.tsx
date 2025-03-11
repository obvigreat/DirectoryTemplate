"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "../auth-state-provider";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const supabase = createClient();
  const sessionIdRef = useRef<string | null>(null);

  // Generate a session ID if one doesn't exist
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
  }, []);

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Don't track admin pages
        if (pathname.startsWith("/admin")) return;

        // Record page view
        await supabase.from("analytics_page_views").insert({
          page_path: pathname,
          user_id: user?.id || null,
          session_id: sessionIdRef.current,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        });

        // Track listing view if on a listing page
        if (pathname.startsWith("/listings/") && pathname.length > 10) {
          const listingId = pathname.split("/")[2];
          if (listingId && !isNaN(parseInt(listingId))) {
            await supabase.from("analytics_listing_views").insert({
              listing_id: parseInt(listingId),
              user_id: user?.id || null,
              session_id: sessionIdRef.current,
            });
          }
        }

        // Track search queries
        if (pathname === "/listings" || pathname === "/map-search") {
          const query = searchParams.get("q");
          const category = searchParams.get("category");
          const location = searchParams.get("location");

          if (query || category || location) {
            await supabase.from("analytics_search_queries").insert({
              query: query || null,
              category: category || null,
              location: location || null,
              filters: Object.fromEntries(searchParams.entries()),
              user_id: user?.id || null,
              session_id: sessionIdRef.current,
            });
          }
        }
      } catch (error) {
        console.error("Error tracking analytics:", error);
      }
    };

    trackPageView();
  }, [pathname, searchParams, user, supabase]);

  // Track user events (can be called from other components)
  const trackEvent = async (eventType: string, eventData: any = {}) => {
    try {
      await supabase.from("analytics_events").insert({
        event_type: eventType,
        event_data: eventData,
        user_id: user?.id || null,
        session_id: sessionIdRef.current,
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  // Expose trackEvent to window for global access
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).trackEvent = trackEvent;
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).trackEvent;
      }
    };
  }, [user]);

  return null; // This component doesn't render anything
}
