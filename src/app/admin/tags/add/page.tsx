import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TagBadge from "@/components/tag-badge";

export const metadata = {
  title: "Add Tag | Admin Dashboard",
  description: "Add a new tag to your directory platform",
};

async function createTag(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug =
    (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-");
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;

  const { error } = await supabase.from("tags").insert({
    name,
    slug,
    description,
    color,
  });

  if (error) {
    console.error("Error creating tag:", error);
    return { error: error.message };
  }

  redirect("/admin/tags");
}

export default async function AddTagPage() {
  const colors = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "gray",
    "orange",
    "teal",
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New Tag</h1>
          <p className="text-muted-foreground">
            Create a new tag for categorizing listings
          </p>
        </div>
        <Link href="/admin/tags">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tags
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tag Information</CardTitle>
              <CardDescription>
                Enter the details for the new tag
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createTag} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter tag name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="slug" className="text-sm font-medium">
                    Slug
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="enter-tag-slug (leave blank to auto-generate)"
                  />
                  <p className="text-xs text-gray-500">
                    Used in URLs. Will be auto-generated if left blank.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter tag description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center">
                        <input
                          type="radio"
                          id={`color-${color}`}
                          name="color"
                          value={color}
                          className="sr-only"
                          defaultChecked={color === "blue"}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="relative">
                            <TagBadge name={color} color={color} />
                            <div className="absolute inset-0 rounded-md ring-offset-2 ring-offset-white peer-checked:ring-2 peer-checked:ring-blue-500"></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Create Tag
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Tag Appearance:</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <TagBadge key={color} name="Sample Tag" color={color} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Usage:</p>
                  <p className="text-sm text-gray-600">
                    Tags help users filter and find relevant listings. They
                    appear on listing cards and detail pages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
