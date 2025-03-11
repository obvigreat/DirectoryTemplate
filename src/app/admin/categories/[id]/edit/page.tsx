import { createClient } from "../../../../../../supabase/server";
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
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Category | Admin Dashboard",
  description: "Edit an existing category on your directory platform",
};

export default async function EditCategoryPage({
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

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Category</h1>
          <p className="text-muted-foreground">
            Update details for {category.name}
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
          <CardDescription>Edit the details for this category</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
