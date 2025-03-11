import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Listings | Directory",
  description: "Manage your business listings on our directory platform.",
};

export default async function MyListingsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?callbackUrl=/dashboard/listings");
  }

  // Fetch user's listings
  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching listings:", error);
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Listings</h1>
          <p className="text-muted-foreground">
            Manage your business listings on our platform
          </p>
        </div>
        <Link href="/dashboard/listings/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add New Listing
          </Button>
        </Link>
      </header>

      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <div className="h-40 overflow-hidden">
                <img
                  src={
                    listing.images?.[0] ||
                    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                  }
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${listing.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {listing.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {listing.category}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{listing.rating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span>{listing.reviews_count} reviews</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/listings/${listing.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                  <Link href={`/listings/${listing.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-blue-50 p-3 mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Listings Yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You haven't created any business listings yet. Add your first
              listing to get started.
            </p>
            <Link href="/dashboard/listings/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add New Listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
