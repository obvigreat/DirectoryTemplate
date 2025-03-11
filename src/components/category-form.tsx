"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
  };
  onCancel?: () => void;
}

export default function CategoryForm({
  category,
  onCancel,
}: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    icon: category?.icon || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from name if slug field is empty or unchanged from initial value
    if (
      name === "name" &&
      (!formData.slug || formData.slug === category?.slug)
    ) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const endpoint = category
        ? `/api/admin/categories/${category.id}`
        : "/api/admin/categories";
      const method = category ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formDataObj,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast({
        title: category ? "Category updated" : "Category created",
        description: data.message,
      });

      router.refresh();
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Restaurants"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
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
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Brief description of this category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Icon (URL)</Label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="URL to category icon"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Link href="/admin/categories">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Save Category"}
        </Button>
      </div>
    </form>
  );
}

import Link from "next/link";
