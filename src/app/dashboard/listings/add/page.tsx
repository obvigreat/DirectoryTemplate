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
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h1 className="text-3xl font-bold mb-2">Add New Listing</h1>
        <p className="text-muted-foreground">
          Create a new business listing to showcase on our platform
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <span className="text-blue-700 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Standard Form</h3>
              <p className="text-gray-500">
                Step-by-step form with all the details you need to provide
              </p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <span className="text-purple-700 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">AI-Enhanced Builder</h3>
              <p className="text-gray-500">
                Let AI help you create a professional listing in minutes
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <ListingFormTabs />
      </div>
    </div>
  );
}
