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
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Listing Details | Admin Dashboard",
  description: "View and manage listing details",
};

export default async function ListingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the listing with related data
  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      categories(*),
      users(*)
    `,
    )
    .eq("id", params.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  // Fetch reviews for this listing
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, users(id, name, email)")
    .eq("listing_id", params.id)
    .order("created_at", { ascending: false });

  // Fetch bookings for this listing
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("listing_id", params.id)
    .order("booking_date", { ascending: false });

  // Format business hours if available
  const formatBusinessHours = (hours: any) => {
    if (!hours) return "Not specified";

    try {
      if (typeof hours === "string") {
        hours = JSON.parse(hours);
      }

      return Object.entries(hours)
        .map(([day, time]: [string, any]) => {
          return `${day}: ${time.open ? `${time.open} - ${time.close}` : "Closed"}`;
        })
        .join("\n");
    } catch (e) {
      console.error("Error parsing business hours:", e);
      return "Invalid format";
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <p className="text-muted-foreground">Listing ID: {listing.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/listings">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
            </Button>
          </Link>
          <Link href={`/admin/listings/${listing.id}/edit`}>
            <Button>
              <Edit className="w-4 h-4 mr-2" /> Edit Listing
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Listing Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              {listing.images && listing.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-video rounded-md overflow-hidden bg-gray-100"
                    >
                      <img
                        src={image}
                        alt={`${listing.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No images available for this listing.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{listing.description}</p>
            </CardContent>
          </Card>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {listing.amenities.map((amenity: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-md"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                {reviews?.length || 0} reviews,{" "}
                {listing.rating?.toFixed(1) || "0.0"} average rating
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {review.users?.name ||
                              review.users?.email ||
                              "Anonymous"}
                          </div>
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
                  No reviews yet for this listing.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>
                {bookings?.length || 0} bookings for this listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookings && bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Customer</th>
                        <th className="text-left py-2 px-4">Date & Time</th>
                        <th className="text-left py-2 px-4">Status</th>
                        <th className="text-left py-2 px-4">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-2 px-4">{booking.name}</td>
                          <td className="py-2 px-4">
                            {new Date(
                              booking.booking_date,
                            ).toLocaleDateString()}{" "}
                            at {booking.booking_time}
                          </td>
                          <td className="py-2 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            <a
                              href={`mailto:${booking.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {booking.email}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No bookings yet for this listing.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Listing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-800"
                          : listing.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={`/admin/categories/${listing.categories?.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.categories?.name || "Uncategorized"}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <MapPin className="w-4 h-4 inline mr-1" /> Location
                  </dt>
                  <dd className="mt-1">{listing.location}</dd>
                </div>
                {listing.price_range && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Price Range
                    </dt>
                    <dd className="mt-1">{listing.price_range}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <Star className="w-4 h-4 inline mr-1" /> Rating
                  </dt>
                  <dd className="mt-1">
                    {listing.rating ? listing.rating.toFixed(1) : "--"}/5 (
                    {listing.reviews_count || 0} reviews)
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" /> Business Hours
                  </dt>
                  <dd className="mt-1 whitespace-pre-line">
                    {formatBusinessHours(listing.hours)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1">
                    {new Date(listing.created_at).toLocaleString()}
                  </dd>
                </div>
                {listing.updated_at && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Last Updated
                    </dt>
                    <dd className="mt-1">
                      {new Date(listing.updated_at).toLocaleString()}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <Mail className="w-4 h-4 inline mr-1" /> Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${listing.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    <Phone className="w-4 h-4 inline mr-1" /> Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${listing.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.phone}
                    </a>
                  </dd>
                </div>
                {listing.website && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      <Globe className="w-4 h-4 inline mr-1" /> Website
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={listing.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {listing.website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
            </CardHeader>
            <CardContent>
              {listing.users ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium uppercase">
                      {listing.users.avatar_url ? (
                        <img
                          src={listing.users.avatar_url}
                          alt={listing.users.name || "User"}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        listing.users.name?.charAt(0) || "U"
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/admin/users/${listing.users.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {listing.users.name ||
                          listing.users.email ||
                          "Unknown User"}
                      </Link>
                      <p className="text-xs text-gray-500">
                        Member since{" "}
                        {new Date(
                          listing.users.created_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Owner information not available.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href={`/admin/listings/${listing.id}/edit`}
                className="w-full"
              >
                <Button className="w-full">
                  <Edit className="w-4 h-4 mr-2" /> Edit Listing
                </Button>
              </Link>
              <Link
                href={`/listings/${listing.id}`}
                target="_blank"
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  View Public Listing
                </Button>
              </Link>
              <form
                action={`/api/admin/listings/${listing.id}`}
                method="DELETE"
              >
                <Button type="submit" variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Listing
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
