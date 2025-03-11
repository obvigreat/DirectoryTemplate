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
import { Edit, Trash2, Plus, Search } from "lucide-react";
import Link from "next/link";
import TagBadge from "@/components/tag-badge";

export const metadata = {
  title: "Tag Management | Admin Dashboard",
  description: "Manage tags for your directory platform",
};

export default async function AdminTagsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const supabase = await createClient();

  // Parse query parameters
  const query = searchParams.q || "";
  const currentPage = parseInt(searchParams.page || "1");
  const pageSize = 20;
  const offset = (currentPage - 1) * pageSize;

  // Build the query
  let tagsQuery = supabase
    .from("tags")
    .select("*, listing_tags(count)", { count: "exact" });

  // Apply search filter if provided
  if (query) {
    tagsQuery = tagsQuery.ilike("name", `%${query}%`);
  }

  // Apply pagination
  tagsQuery = tagsQuery.order("name").range(offset, offset + pageSize - 1);

  // Execute the query
  const { data: tags, count, error } = await tagsQuery;

  // Calculate pagination info
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tag Management</h1>
          <p className="text-muted-foreground">
            Manage tags for your directory listings
          </p>
        </div>
        <Link href="/admin/tags/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Tag
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>
            {count} {count === 1 ? "tag" : "tags"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <form action="/admin/tags" method="GET">
                <Input
                  name="q"
                  placeholder="Search tags..."
                  className="pl-10"
                  defaultValue={query}
                />
              </form>
            </div>
          </div>

          {/* Tags Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Tag</th>
                  <th className="text-left py-3 px-4">Slug</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Listings</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <tr key={tag.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <TagBadge name={tag.name} color={tag.color || "blue"} />
                      </td>
                      <td className="py-3 px-4">{tag.slug}</td>
                      <td className="py-3 px-4">
                        {tag.description ? (
                          <span className="line-clamp-1">
                            {tag.description}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">
                            No description
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {tag.listing_tags?.length || 0}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/tags/${tag.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <form
                            action={`/api/admin/tags/${tag.id}`}
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
                      colSpan={5}
                      className="py-6 text-center text-muted-foreground"
                    >
                      {error ? `Error: ${error.message}` : "No tags found"}
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
                        pathname: "/admin/tags",
                        query: {
                          ...(query ? { q: query } : {}),
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
