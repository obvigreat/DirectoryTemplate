import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { getListingById } from "@/lib/actions/listings";
import EditListingForm from "@/components/edit-listing-form";

export const metadata = {
  title: "Edit Listing | Directory",
  description: "Update your business listing on our directory platform.",
};

export default async function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const id = parseInt(params.id);

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(`/sign-in?callbackUrl=/dashboard/listings/${id}/edit`);
  }

  // Fetch the listing
  const listing = await getListingById(id);

  // Check if listing exists and belongs to the user
  if (!listing) {
    return redirect("/dashboard/listings");
  }

  if (listing.user_id !== user.id) {
    return redirect("/dashboard/listings");
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Edit Listing</h1>
        <p className="text-muted-foreground">
          Update your business listing information
        </p>
      </header>

      <EditListingForm listing={listing} />
    </div>
  );
}
