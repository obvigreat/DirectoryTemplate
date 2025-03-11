import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "@/components/category-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Add Category | Admin Dashboard",
  description: "Add a new category to your directory platform",
};

export default function AddCategoryPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add Category</h1>
          <p className="text-muted-foreground">
            Create a new category for listings
          </p>
        </div>
        <Link href="/admin/categories">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Fill in the details for the new category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
