"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  AlertCircle,
  Database,
} from "lucide-react";
import Link from "next/link";
import TagBadge from "@/components/tag-badge";

export default function AdminTagsClient() {
  const router = useRouter();
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableExists, setTableExists] = useState(true);

  useEffect(() => {
    async function checkAndFetchTags() {
      try {
        const supabase = createClient();

        // Check if tags table exists
        const { error: checkError } = await supabase
          .from("tags")
          .select("id")
          .limit(1);

        if (checkError && checkError.code === "PGRST116") {
          // Table doesn't exist
          setTableExists(false);
          setLoading(false);
          return;
        }

        // Fetch tags
        const { data, error } = await supabase
          .from("tags")
          .select("*, listing_tags(count)")
          .order("name");

        if (error) throw error;

        setTags(data || []);
      } catch (error: any) {
        console.error("Error fetching tags:", error);
        setError(error.message || "Failed to load tags");
      } finally {
        setLoading(false);
      }
    }

    checkAndFetchTags();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/tags?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("tags").delete().eq("id", id);

      if (error) throw error;

      // Update local state
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (error: any) {
      console.error("Error deleting tag:", error);
      alert(`Error deleting tag: ${error.message}`);
    }
  };

  if (!tableExists) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tag Management</h1>
            <p className="text-muted-foreground">
              Manage tags for your directory listings
            </p>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Setup Required</CardTitle>
            <CardDescription>
              The tags system needs to be set up before you can use it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Tags table not found</p>
                <p className="text-sm mt-1">
                  You need to set up the tags system before you can manage tags.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <h3 className="font-medium">Create Tags Database</h3>
                  <p className="text-sm text-gray-600">
                    Set up the required database tables for the tag system
                  </p>
                </div>
              </div>
              <Link href="/admin/tags/setup">
                <Button>Setup Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tag Management</h1>
            <p className="text-muted-foreground">
              Manage tags for your directory listings
            </p>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Loading tags...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredTags = searchQuery
    ? tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tags;

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
            {filteredTags.length} {filteredTags.length === 1 ? "tag" : "tags"}{" "}
            found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search tags..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              <p>{error}</p>
            </div>
          ) : filteredTags.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? "No tags match your search" : "No tags found"}
            </div>
          ) : (
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
                  {filteredTags.map((tag) => (
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete(tag.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
