import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import ListingFormTabs from "@/components/add-listing/listing-form-tabs";

export const metadata = {
  title: "Add New Listing | Directory",
  description: "Create a new business listing on our directory platform.",
};

export default async function AddListingPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?callbackUrl=/dashboard/listings/add");
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Add New Listing</h1>
        <p className="text-muted-foreground">
          Create a new business listing to showcase on our platform
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ListingFormTabs />
      </div>
    </div>
  );
}
