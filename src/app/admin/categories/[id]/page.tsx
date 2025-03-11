import { createClient } from "../../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Category Details | Admin Dashboard",
  description: "View category details and related listings",
};

export default async function CategoryDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the category
  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !category) {
    notFound();
  }

  // Fetch listings in this category
  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, status, rating, reviews_count, created_at")
    .eq("category_id", params.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">Category ID: {category.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/categories">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
            </Button>
          </Link>
          <Link href={`/admin/categories/${category.id}/edit`}>
            <Button>
              <Edit className="w-4 h-4 mr-2" /> Edit Category
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Information about this category</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm">{category.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Slug</dt>
                <dd className="mt-1 text-sm">{category.slug}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm">
                  {category.description || "No description provided"}
                </dd>
              </div>
              {category.icon && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Icon</dt>
                  <dd className="mt-1 text-sm">
                    <img
                      src={category.icon}
                      alt={`${category.name} icon`}
                      className="w-8 h-8 object-contain"
                    />
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Created At
                </dt>
                <dd className="mt-1 text-sm">
                  {new Date(category.created_at).toLocaleString()}
                </dd>
              </div>
              {category.updated_at && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Last Updated
                  </dt>
                  <dd className="mt-1 text-sm">
                    {new Date(category.updated_at).toLocaleString()}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <form
                action={`/api/admin/categories/${category.id}/delete`}
                method="POST"
                onSubmit={(e) => {
                  if (
                    !confirm(
                      "Are you sure you want to delete this category? This action cannot be undone.",
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={listings && listings.length > 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Category
                </Button>
                {listings && listings.length > 0 && (
                  <p className="text-xs text-red-500 mt-2">
                    Cannot delete category with associated listings. Remove all
                    listings first.
                  </p>
                )}
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Listings in this Category</CardTitle>
            <CardDescription>
              {listings?.length || 0} listings found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {listings && listings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr
                        key={listing.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{listing.title}</td>
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
                            <Link href={`/admin/listings/${listing.id}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                            <Link href={`/admin/listings/${listing.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No listings found in this category.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
