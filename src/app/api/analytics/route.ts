import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated and is an admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query parameters
    const url = new URL(request.url);
    const period = url.searchParams.get("period") || "week";
    const metric = url.searchParams.get("metric") || "page_views";

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "day":
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case "week":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    let data;

    // Fetch the requested metric
    switch (metric) {
      case "page_views":
        const { data: pageViews, error: pageViewsError } = await supabase
          .from("analytics_page_views")
          .select("*")
          .gte("created_at", startDate.toISOString())
          .order("created_at", { ascending: true });

        if (pageViewsError) throw pageViewsError;
        data = pageViews;
        break;

      case "listing_views":
        const { data: listingViews, error: listingViewsError } = await supabase
          .from("analytics_listing_views")
          .select("*, listings(title)")
          .gte("created_at", startDate.toISOString())
          .order("created_at", { ascending: true });

        if (listingViewsError) throw listingViewsError;
        data = listingViews;
        break;

      case "search_queries":
        const { data: searchQueries, error: searchQueriesError } =
          await supabase
            .from("analytics_search_queries")
            .select("*")
            .gte("created_at", startDate.toISOString())
            .order("created_at", { ascending: true });

        if (searchQueriesError) throw searchQueriesError;
        data = searchQueries;
        break;

      case "events":
        const { data: events, error: eventsError } = await supabase
          .from("analytics_events")
          .select("*")
          .gte("created_at", startDate.toISOString())
          .order("created_at", { ascending: true });

        if (eventsError) throw eventsError;
        data = events;
        break;

      case "summary":
        // Get summary statistics
        const [
          pageViewsCount,
          listingViewsCount,
          searchQueriesCount,
          eventsCount,
          usersCount,
        ] = await Promise.all([
          supabase
            .from("analytics_page_views")
            .select("id", { count: "exact" })
            .gte("created_at", startDate.toISOString()),
          supabase
            .from("analytics_listing_views")
            .select("id", { count: "exact" })
            .gte("created_at", startDate.toISOString()),
          supabase
            .from("analytics_search_queries")
            .select("id", { count: "exact" })
            .gte("created_at", startDate.toISOString()),
          supabase
            .from("analytics_events")
            .select("id", { count: "exact" })
            .gte("created_at", startDate.toISOString()),
          supabase
            .from("users")
            .select("id", { count: "exact" })
            .gte("created_at", startDate.toISOString()),
        ]);

        data = {
          page_views: pageViewsCount.count || 0,
          listing_views: listingViewsCount.count || 0,
          search_queries: searchQueriesCount.count || 0,
          events: eventsCount.count || 0,
          new_users: usersCount.count || 0,
          period,
          start_date: startDate.toISOString(),
          end_date: new Date().toISOString(),
        };
        break;

      default:
        return NextResponse.json(
          { error: "Invalid metric requested" },
          { status: 400 },
        );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in analytics API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
