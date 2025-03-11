import { createClient } from "../../../../../../supabase/server";
import { redirect, notFound } from "next/navigation";
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
  title: "Edit Tag | Admin Dashboard",
  description: "Edit an existing tag",
};

interface EditTagPageProps {
  params: { id: string };
}

async function updateTag(id: string, formData: FormData) {
  "use server";

  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;

  const { error } = await supabase
    .from("tags")
    .update({
      name,
      slug,
      description,
      color,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating tag:", error);
    return { error: error.message };
  }

  redirect("/admin/tags");
}

export default async function EditTagPage({ params }: EditTagPageProps) {
  const supabase = await createClient();

  // Fetch the tag
  const { data: tag, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !tag) {
    notFound();
  }

  // Fetch listings count for this tag
  const { count: listingsCount } = await supabase
    .from("listing_tags")
    .select("*", { count: "exact", head: true })
    .eq("tag_id", params.id);

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

  const updateTagWithId = updateTag.bind(null, params.id);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Tag</h1>
          <p className="text-muted-foreground">Update tag information</p>
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
              <CardDescription>Update the details for this tag</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateTagWithId} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={tag.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="slug" className="text-sm font-medium">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    defaultValue={tag.slug}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Used in URLs. Changing this may break existing links.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={tag.description || ""}
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
                          className="sr-only peer"
                          defaultChecked={color === tag.color}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="flex items-center space-x-2 cursor-pointer relative"
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
                    Update Tag
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tag Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Current Appearance:
                  </p>
                  <TagBadge name={tag.name} color={tag.color || "blue"} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Usage Statistics:</p>
                  <p className="text-sm">
                    This tag is used in <strong>{listingsCount || 0}</strong>{" "}
                    listings.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(tag.created_at).toLocaleDateString()}
                  </p>
                  {tag.updated_at && (
                    <p className="text-sm text-gray-600">
                      Last updated:{" "}
                      {new Date(tag.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                action={`/api/admin/tags/${tag.id}`}
                method="DELETE"
                onSubmit={(e) => {
                  if (
                    !confirm(
                      "Are you sure you want to delete this tag? This action cannot be undone.",
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <Button type="submit" variant="destructive" className="w-full">
                  Delete Tag
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Deleting this tag will remove it from all associated listings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
