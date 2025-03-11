import { createClient } from "../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Category Management | Admin Dashboard",
  description: "Manage categories on your directory platform",
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*, listings(count)")
    .order("name");

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Category Management</h1>
          <p className="text-muted-foreground">
            Manage categories on your directory platform
          </p>
        </div>
        <Link href="/admin/categories/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            {categories?.length || 0}{" "}
            {categories?.length === 1 ? "category" : "categories"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Slug</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Listings</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{category.name}</td>
                      <td className="py-3 px-4">{category.slug}</td>
                      <td className="py-3 px-4">
                        {category.description
                          ? category.description.length > 50
                            ? `${category.description.substring(0, 50)}...`
                            : category.description
                          : "--"}
                      </td>
                      <td className="py-3 px-4">
                        {category.listings?.length || 0}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/categories/${category.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <form
                            action={`/api/admin/categories/${category.id}/delete`}
                            method="POST"
                            onSubmit={(e) => {
                              if (
                                !confirm(
                                  "Are you sure you want to delete this category?",
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              disabled={category.listings?.length > 0}
                              title={
                                category.listings?.length > 0
                                  ? "Cannot delete category with listings"
                                  : "Delete category"
                              }
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
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
