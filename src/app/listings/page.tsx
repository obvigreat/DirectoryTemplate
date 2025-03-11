import { Metadata } from "next";
import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import SearchFilters from "@/components/search-filters";
import ListingCard from "@/components/listing-card";
import SortSelect from "@/components/sort-select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryFilter from "./components/category-filter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Listings | Directory",
  description: "Discover and explore local businesses in your area",
};

interface ListingsPageProps {
  searchParams: {
    q?: string;
    location?: string;
    category?: string;
    page?: string;
    rating?: string;
    price?: string;
    features?: string;
    sort?: string;
  };
}

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const supabase = await createClient();

  // Get the current user (if logged in)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Parse query parameters
  const query = searchParams.q || "";
  const location = searchParams.location || "";
  const category = searchParams.category || "";
  const currentPage = parseInt(searchParams.page || "1");
  const minRating = parseFloat(searchParams.rating || "0");
  const priceLevel = searchParams.price || "";
  const features = searchParams.features?.split(",") || [];
  const sortBy = searchParams.sort || "relevance";

  // Set up pagination
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  // Build the query
  let listingsQuery = supabase
    .from("listings")
    .select("*, categories(*)", { count: "exact" });

  // Apply filters
  if (query) {
    listingsQuery = listingsQuery.ilike("title", `%${query}%`);
  }

  if (location) {
    listingsQuery = listingsQuery.ilike("location", `%${location}%`);
  }

  if (category) {
    listingsQuery = listingsQuery.eq("category_id", category);
  }

  if (minRating > 0) {
    listingsQuery = listingsQuery.gte("rating", minRating);
  }

  if (priceLevel) {
    listingsQuery = listingsQuery.eq("price_level", parseInt(priceLevel));
  }

  // Apply sorting
  switch (sortBy) {
    case "rating_high":
      listingsQuery = listingsQuery.order("rating", { ascending: false });
      break;
    case "rating_low":
      listingsQuery = listingsQuery.order("rating", { ascending: true });
      break;
    case "price_high":
      listingsQuery = listingsQuery.order("price_level", { ascending: false });
      break;
    case "price_low":
      listingsQuery = listingsQuery.order("price_level", { ascending: true });
      break;
    default:
      listingsQuery = listingsQuery.order("created_at", { ascending: false });
  }

  // Apply pagination
  listingsQuery = listingsQuery.range(offset, offset + pageSize - 1);

  // Execute the query
  let listings = [];
  let count = 0;
  let error = null;

  try {
    const response = await listingsQuery;
    listings = response.data || [];
    count = response.count || 0;
    error = response.error;
  } catch (err) {
    console.error("Error fetching listings:", err);
    error = err;
  }

  // Fetch categories for filter
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  // Check which listings are saved by the current user
  let savedListingIds: number[] = [];
  if (user) {
    const { data: savedListings } = await supabase
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", user.id);

    savedListingIds = savedListings?.map((item) => item.listing_id) || [];
  }

  // Add isSaved property to listings
  const listingsWithSavedStatus =
    listings?.map((listing) => ({
      ...listing,
      isSaved: savedListingIds.includes(listing.id),
    })) || [];

  // Calculate pagination info
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar initialQuery={query} initialLocation={location} />
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategoryId={category}
          />
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <SearchFilters
              categories={categories || []}
              selectedCategory={category}
              selectedRating={minRating.toString()}
              selectedPrice={priceLevel}
            />
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {count ? `${count} Results` : "No Results Found"}
              </h2>

              {/* Sort Dropdown - Client Component */}
              <div>
                <SortSelect sortBy={sortBy} searchParams={searchParams} />
              </div>
            </div>

            {error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-md flex flex-col items-center">
                <p className="mb-2">
                  Error loading listings. Please try again.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/listings">Refresh</Link>
                </Button>
              </div>
            ) : listingsWithSavedStatus.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listingsWithSavedStatus.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-2">No listings found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search filters or browse all listings.
                </p>
                <Button asChild>
                  <a href="/listings">View All Listings</a>
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    asChild
                  >
                    <a
                      href={`/listings?${new URLSearchParams({
                        ...searchParams,
                        page: (currentPage - 1).toString(),
                      } as any)}`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </a>
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 3 + i;
                      }
                      if (pageNum > totalPages) {
                        pageNum = totalPages - (4 - i);
                      }
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        asChild
                      >
                        <a
                          href={`/listings?${new URLSearchParams({
                            ...searchParams,
                            page: pageNum.toString(),
                          } as any)}`}
                        >
                          {pageNum}
                        </a>
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    asChild
                  >
                    <a
                      href={`/listings?${new URLSearchParams({
                        ...searchParams,
                        page: (currentPage + 1).toString(),
                      } as any)}`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
