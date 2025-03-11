import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function AdminCategoryForm() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add Category</h1>
          <p className="text-muted-foreground">
            Create a new category for listings
          </p>
        </div>
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Fill in the details for the new category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Restaurants"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g. restaurants"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Brief description of this category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (URL)</Label>
              <Input id="icon" name="icon" placeholder="URL to category icon" />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
