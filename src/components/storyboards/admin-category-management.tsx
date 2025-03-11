import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

export default function AdminCategoryManagement() {
  // Mock data for demonstration
  const categories = [
    {
      id: 1,
      name: "Restaurants",
      slug: "restaurants",
      description: "Places to eat and dine",
      listings: { length: 24 },
    },
    {
      id: 2,
      name: "Hotels",
      slug: "hotels",
      description: "Places to stay overnight",
      listings: { length: 18 },
    },
    {
      id: 3,
      name: "Shopping",
      slug: "shopping",
      description: "Retail stores and malls",
      listings: { length: 32 },
    },
    {
      id: 4,
      name: "Entertainment",
      slug: "entertainment",
      description: "Fun activities and venues",
      listings: { length: 15 },
    },
    {
      id: 5,
      name: "Services",
      slug: "services",
      description: "Professional services and businesses",
      listings: { length: 27 },
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Category Management</h1>
          <p className="text-muted-foreground">
            Manage categories on your directory platform
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} found
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
                {categories.map((category) => (
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
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
