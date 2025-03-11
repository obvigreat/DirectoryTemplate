import { createClient } from "../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Listing Management | Admin Dashboard",
  description: "Manage listings on your directory platform",
};

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    page?: string;
    status?: string;
    category?: string;
  };
}) {
  const supabase = await createClient();

  // Parse query parameters
  const query = searchParams.q || "";
  const currentPage = parseInt(searchParams.page || "1");
  const status = searchParams.status || "";
  const categoryId = searchParams.category || "";
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  // Fetch categories for filter
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  // Build the query
  let listingsQuery = supabase
    .from("listings")
    .select("*, categories(*)", { count: "exact" });

  // Apply filters
  if (query) {
    listingsQuery = listingsQuery.ilike("title", `%${query}%`);
  }

  if (status) {
    listingsQuery = listingsQuery.eq("status", status);
  }

  if (categoryId) {
    listingsQuery = listingsQuery.eq("category_id", categoryId);
  }

  // Apply pagination
  listingsQuery = listingsQuery
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  // Execute the query
  const { data: listings, count, error } = await listingsQuery;

  // Calculate pagination info
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Listing Management</h1>
          <p className="text-muted-foreground">
            Manage listings on your directory platform
          </p>
        </div>
        <Link href="/admin/listings/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Listing
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>
            {count} {count === 1 ? "listing" : "listings"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <form action="/admin/listings" method="GET">
                <Input
                  name="q"
                  placeholder="Search listings..."
                  className="pl-10"
                  defaultValue={query}
                />
                {status && <input type="hidden" name="status" value={status} />}
                {categoryId && (
                  <input type="hidden" name="category" value={categoryId} />
                )}
              </form>
            </div>
            <div className="w-full sm:w-48">
              <form
                action="/admin/listings"
                method="GET"
                className="flex items-center gap-2"
              >
                <select
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={status}
                  onChange="this.form.submit()"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                {query && <input type="hidden" name="q" value={query} />}
                {categoryId && (
                  <input type="hidden" name="category" value={categoryId} />
                )}
              </form>
            </div>
            <div className="w-full sm:w-48">
              <form
                action="/admin/listings"
                method="GET"
                className="flex items-center gap-2"
              >
                <select
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={categoryId}
                  onChange="this.form.submit()"
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {query && <input type="hidden" name="q" value={query} />}
                {status && <input type="hidden" name="status" value={status} />}
              </form>
            </div>
          </div>

          {/* Listings Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings && listings.length > 0 ? (
                  listings.map((listing) => (
                    <tr key={listing.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{listing.title}</td>
                      <td className="py-3 px-4">
                        {listing.categories?.name || "--"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            listing.status === "active"
                              ? "bg-green-100 text-green-800"
                              : listing.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {listing.rating ? listing.rating.toFixed(1) : "--"} (
                        {listing.reviews_count || 0})
                      </td>
                      <td className="py-3 px-4">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/listings/${listing.id}`}
                            target="_blank"
                          >
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/listings/${listing.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <form
                            action={`/api/admin/listings/${listing.id}`}
                            method="DELETE"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No listings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={{
                        pathname: "/admin/listings",
                        query: {
                          ...(query ? { q: query } : {}),
                          ...(status ? { status } : {}),
                          ...(categoryId ? { category: categoryId } : {}),
                          page: page.toString(),
                        },
                      }}
                    >
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-9"
                      >
                        {page}
                      </Button>
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
