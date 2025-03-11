import { createClient } from "../../../../../../supabase/server";
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
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ListingStatusSelect from "@/components/listing-status-select";
import CategorySelect from "@/components/category-select";
import PriceLevelSelect from "@/components/price-level-select";

export const metadata = {
  title: "Edit Listing | Admin Dashboard",
  description: "Edit listing details",
};

export default async function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the listing
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*, categories(name)")
    .eq("id", params.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  // Fetch categories for the form
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  async function updateListing(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const price_level = formData.get("price_level") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const website = formData.get("website") as string;

    const supabase = await createClient();

    // Update listing
    const { error } = await supabase
      .from("listings")
      .update({
        title,
        description,
        category_id,
        location,
        status,
        price_level: price_level ? parseInt(price_level) : null,
        email,
        phone,
        website,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error updating listing:", error);
      return { success: false, error: error.message };
    }

    redirect(`/admin/listings/${params.id}`);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Listing</h1>
          <p className="text-muted-foreground">
            Update information for {listing.title}
          </p>
        </div>
        <Link href={`/admin/listings/${listing.id}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listing
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Listing Information</CardTitle>
          <CardDescription>Edit listing details</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateListing} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={listing.title}
                  placeholder="Listing Title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <CategorySelect
                  name="category_id"
                  defaultValue={listing.category_id}
                  categories={categories || []}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={listing.location}
                  placeholder="Location"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <ListingStatusSelect
                  name="status"
                  defaultValue={listing.status || "pending"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price_level">Price Level</Label>
                <PriceLevelSelect
                  name="price_level"
                  defaultValue={listing.price_level?.toString() || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={listing.email}
                  placeholder="Contact Email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={listing.phone}
                  placeholder="Contact Phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={listing.website}
                  placeholder="Website URL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={6}
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={listing.description}
                placeholder="Detailed description of your listing"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Link href={`/admin/listings/${listing.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
