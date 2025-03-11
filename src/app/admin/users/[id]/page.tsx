import { createClient } from "../../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "User Details | Admin Dashboard",
  description: "View user details and activity",
};

export default async function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the user
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !userData) {
    notFound();
  }

  // Fetch user's listings
  const { data: userListings } = await supabase
    .from("listings")
    .select("id, title, status, created_at")
    .eq("user_id", params.id)
    .order("created_at", { ascending: false });

  // Fetch user's reviews
  const { data: userReviews } = await supabase
    .from("reviews")
    .select("id, rating, comment, created_at, listings(id, title)")
    .eq("user_id", params.id)
    .order("created_at", { ascending: false });

  // Fetch user's saved listings
  const { data: savedListings } = await supabase
    .from("saved_listings")
    .select("id, saved_at, listings(id, title)")
    .eq("user_id", params.id)
    .order("saved_at", { ascending: false });

  // Fetch user's subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", params.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {userData.name || userData.email || "User"}
          </h1>
          <p className="text-muted-foreground">User ID: {userData.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/users">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Users
            </Button>
          </Link>
          <Link href={`/admin/users/${userData.id}/edit`}>
            <Button>
              <Edit className="w-4 h-4 mr-2" /> Edit User
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>
              Personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                {userData.avatar_url ? (
                  <img
                    src={userData.avatar_url}
                    alt={userData.name || "User"}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {userData.name || "No name provided"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm capitalize">
                  {userData.role || "user"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${userData.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {userData.status || "active"}
                  </span>
                </dd>
              </div>
              {userData.phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <Phone className="w-4 h-4 inline mr-1" /> Phone
                  </dt>
                  <dd className="mt-1 text-sm">{userData.phone}</dd>
                </div>
              )}
              {userData.location && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <MapPin className="w-4 h-4 inline mr-1" /> Location
                  </dt>
                  <dd className="mt-1 text-sm">{userData.location}</dd>
                </div>
              )}
              {userData.bio && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bio</dt>
                  <dd className="mt-1 text-sm">{userData.bio}</dd>
                </div>
              )}
              {userData.website && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {userData.website}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  <Calendar className="w-4 h-4 inline mr-1" /> Last Updated
                </dt>
                <dd className="mt-1 text-sm">
                  {userData.updated_at
                    ? new Date(userData.updated_at).toLocaleString()
                    : "Never updated"}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <form action={`/api/admin/users/${userData.id}`} method="DELETE">
                <Button type="submit" variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete User
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>User's subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Plan</dt>
                  <dd className="mt-1 text-sm">
                    {subscription.price_id || "Standard Plan"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscription.status === "active"
                          ? "bg-green-100 text-green-800"
                          : subscription.status === "trialing"
                            ? "bg-blue-100 text-blue-800"
                            : subscription.status === "canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-sm">
                    {subscription.currency
                      ? `${(subscription.amount / 100).toFixed(2)} ${subscription.currency.toUpperCase()}`
                      : "--"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Interval
                  </dt>
                  <dd className="mt-1 text-sm capitalize">
                    {subscription.interval || "--"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Current Period
                  </dt>
                  <dd className="mt-1 text-sm">
                    {subscription.current_period_start
                      ? `${new Date(subscription.current_period_start * 1000).toLocaleDateString()} to ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`
                      : "--"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm">
                    {new Date(subscription.created_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No subscription found for this user.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listings</CardTitle>
            <CardDescription>
              {userListings?.length || 0} listings created by this user
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userListings && userListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Title</th>
                      <th className="text-left py-2 px-4">Status</th>
                      <th className="text-left py-2 px-4">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userListings.map((listing) => (
                      <tr
                        key={listing.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-2 px-4">
                          <Link
                            href={`/admin/listings/${listing.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {listing.title}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              listing.status === "active"
                                ? "bg-green-100 text-green-800"
                                : listing.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {listing.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          {new Date(listing.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No listings found for this user.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              {userReviews?.length || 0} reviews written by this user
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userReviews && userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/admin/listings/${review.listings.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {review.listings.title}
                        </Link>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-500">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No reviews found for this user.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Listings</CardTitle>
            <CardDescription>
              {savedListings?.length || 0} listings saved by this user
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedListings && savedListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Listing</th>
                      <th className="text-left py-2 px-4">Saved Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedListings.map((saved) => (
                      <tr key={saved.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <Link
                            href={`/admin/listings/${saved.listings.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {saved.listings.title}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          {new Date(saved.saved_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No saved listings found for this user.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
