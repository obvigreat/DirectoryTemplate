import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Bookings | Directory",
  description: "Manage your bookings and appointments",
};

export default async function BookingsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?callbackUrl=/dashboard/bookings");
  }

  // Get user's listings
  const { data: userListings } = await supabase
    .from("listings")
    .select("id")
    .eq("user_id", user.id);

  const listingIds = userListings?.map((listing) => listing.id) || [];

  // Get bookings for user's listings and bookings made by the user
  let bookingsQuery = supabase
    .from("bookings")
    .select("*, listings:listing_id(id, title, category, location, images)")
    .order("booking_date", { ascending: true });

  if (listingIds.length > 0) {
    bookingsQuery = bookingsQuery.or(
      `listing_id.in.(${listingIds.join(",")}),user_id.eq.${user.id}`,
    );
  } else {
    bookingsQuery = bookingsQuery.eq("user_id", user.id);
  }

  const { data: bookings } = await bookingsQuery;

  // Separate bookings by role and status
  const myBookings =
    bookings?.filter((booking) => booking.user_id === user.id) || [];
  const receivedBookings =
    bookings?.filter((booking) => booking.user_id !== user.id) || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Bookings</h1>
        <p className="text-muted-foreground">
          Manage your appointments and reservations
        </p>
      </header>

      <Tabs defaultValue="my-bookings">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="received-bookings">
            Received Bookings{" "}
            {receivedBookings.length > 0 && `(${receivedBookings.length})`}
          </TabsTrigger>
        </TabsList>

        {/* My Bookings Tab */}
        <TabsContent value="my-bookings" className="mt-6">
          {myBookings.length > 0 ? (
            <div className="grid gap-4">
              {myBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={
                              booking.listings.images?.[0] ||
                              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&q=80"
                            }
                            alt={booking.listings.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {booking.listings.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{booking.listings.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{formatDate(booking.booking_date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{booking.booking_time}</span>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">{booking.notes}</p>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end gap-2">
                      <Link href={`/listings/${booking.listing_id}`}>
                        <Button variant="outline" size="sm">
                          View Listing
                        </Button>
                      </Link>
                      {booking.status === "pending" && (
                        <Button variant="destructive" size="sm">
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You haven't made any bookings yet. Browse listings to find
                  businesses to book appointments with.
                </p>
                <Link href="/listings">
                  <Button>Browse Listings</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Received Bookings Tab */}
        <TabsContent value="received-bookings" className="mt-6">
          {receivedBookings.length > 0 ? (
            <div className="grid gap-4">
              {receivedBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {booking.listings.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{formatDate(booking.booking_date)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{booking.booking_time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">
                          Customer Details
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 text-gray-500 mr-2" />
                            <span>{booking.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 text-gray-500 mr-2" />
                            <span>{booking.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 text-gray-500 mr-2" />
                            <span>{booking.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">{booking.notes}</p>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end gap-2">
                      {booking.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                          <Button size="sm">Confirm</Button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <Button size="sm">Mark as Completed</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  No Bookings Received
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You haven't received any bookings for your listings yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
