import { createClient } from "../../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddListingForm from "@/components/add-listing-form";

export const metadata = {
  title: "Add Listing | Admin Dashboard",
  description: "Add a new listing to the directory",
};

export default async function AddListingPage() {
  const supabase = await createClient();

  // Fetch categories for the form
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  // Get current admin user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function createListing(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const price_range = formData.get("price_range") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const website = formData.get("website") as string;

    // Parse amenities from comma-separated string
    const amenitiesString = formData.get("amenities") as string;
    const amenities = amenitiesString
      ? amenitiesString.split(",").map((item) => item.trim())
      : [];

    // Parse images from comma-separated string
    const imagesString = formData.get("images") as string;
    const images = imagesString
      ? imagesString.split(",").map((item) => item.trim())
      : [];

    // Parse business hours
    const hoursJson = formData.get("hours") as string;
    let hours = null;
    try {
      if (hoursJson) {
        hours = JSON.parse(hoursJson);
      }
    } catch (e) {
      console.error("Error parsing business hours:", e);
    }

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Create listing
    const { data, error } = await supabase
      .from("listings")
      .insert({
        title,
        description,
        category_id,
        location,
        status,
        price_range,
        email,
        phone,
        website,
        amenities,
        images,
        hours,
        user_id: user.id,
        created_at: new Date().toISOString(),
        rating: 0,
        reviews_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating listing:", error);
      return { success: false, error: error.message };
    }

    redirect(`/admin/listings/${data.id}`);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New Listing</h1>
          <p className="text-muted-foreground">
            Create a new listing in the directory
          </p>
        </div>
        <Link href="/admin/listings">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Listing Information</CardTitle>
          <CardDescription>
            Fill in the details for the new listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddListingForm
            categories={categories || []}
            createAction={createListing}
            cancelHref="/admin/listings"
            isAdmin={true}
            initialData={{
              email: user?.email || "",
              status: "active",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
