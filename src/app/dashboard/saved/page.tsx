import { Metadata } from "next";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import ListingCard from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saved Listings | Directory",
  description: "View and manage your saved listings",
};

export default async function SavedListingsPage() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?callbackUrl=/dashboard/saved");
  }

  // Fetch saved listings for the user
  const { data: savedListings, error } = await supabase
    .from("saved_listings")
    .select("*, listings(*)")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved listings:", error);
  }

  // Format listings for display
  const listings =
    savedListings?.map((item) => ({
      ...item.listings,
      isSaved: true,
      savedDate: new Date(item.saved_at).toLocaleDateString(),
    })) || [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Saved Listings</h1>
        <p className="text-muted-foreground">Manage your bookmarked listings</p>
      </header>

      {listings.length > 0 ? (
        <>
          {/* Saved Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Saved Listings</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't saved any listings yet. Browse listings and click the
            heart icon to save them for later.
          </p>
          <Link href="/listings">
            <Button>Browse Listings</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
