import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ListingGallery from "@/components/listing-gallery";
import ReviewsSection from "@/components/reviews-section";
import RelatedListings from "@/components/related-listings";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Heart,
  Share2,
  Flag,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface ListingPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("title, description")
    .eq("id", params.id)
    .single();

  if (!listing) {
    return {
      title: "Listing Not Found | Directory",
      description: "The requested listing could not be found.",
    };
  }

  return {
    title: `${listing.title} | Directory`,
    description:
      listing.description?.substring(0, 160) ||
      "View details about this listing",
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const supabase = await createClient();

  // Get the current user (if logged in)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the listing details
  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      categories(name),
      business_hours(*)
    `,
    )
    .eq("id", params.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  // Get the listing reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users(name, avatar_url)
    `,
    )
    .eq("listing_id", params.id)
    .order("created_at", { ascending: false });

  // Get related listings in the same category
  const { data: relatedListings } = await supabase
    .from("listings")
    .select("*")
    .eq("category_id", listing.category_id)
    .neq("id", listing.id)
    .limit(3);

  // Check if the listing is saved by the current user
  let isSaved = false;
  if (user) {
    const { data } = await supabase
      .from("saved_listings")
      .select("*")
      .eq("user_id", user.id)
      .eq("listing_id", params.id)
      .single();

    isSaved = !!data;
  }

  // Format price level as dollar signs
  const formatPriceLevel = (level: number) => {
    return level ? "$".repeat(level) : "$";
  };

  // Check if listing has business hours
  const hasBusinessHours =
    listing.business_hours && listing.business_hours.length > 0;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/listings" className="hover:text-blue-600">
            Listings
          </Link>
          {listing.categories && (
            <>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link
                href={`/listings?category=${listing.category_id}`}
                className="hover:text-blue-600"
              >
                {listing.categories.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-700">{listing.title}</span>
        </div>

        {/* Listing Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center mb-2">
              {listing.categories && (
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full mr-2">
                  {listing.categories.name}
                </span>
              )}
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="font-medium">
                  {listing.rating ? listing.rating.toFixed(1) : "New"}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  ({listing.reviews_count || 0} reviews)
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{listing.location}</span>
            </div>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <form action="/api/save-listing" method="POST">
              <input type="hidden" name="listingId" value={listing.id} />
              <Button
                type="submit"
                variant={isSaved ? "default" : "outline"}
                className={`flex items-center gap-1 ${isSaved ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </form>
            <Button variant="outline" className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Flag className="w-4 h-4" />
              Report
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <ListingGallery
            images={listing.images || [listing.image_url]}
            title={listing.title}
          />
        </div>

        {/* Listing Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className="text-gray-700 mb-4 whitespace-pre-line">
                {listing.description}
              </div>

              {/* Amenities */}
              {listing.features && listing.features.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mt-6 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {listing.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Business Hours */}
            {hasBusinessHours && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                <div className="space-y-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => {
                    const dayHours = listing.business_hours.find(
                      (hours: any) =>
                        hours.day.toLowerCase() === day.toLowerCase(),
                    );

                    return (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        <span>
                          {dayHours
                            ? dayHours.is_closed
                              ? "Closed"
                              : `${dayHours.open_time} - ${dayHours.close_time}`
                            : "Not specified"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <ReviewsSection
              listingId={listing.id}
              reviews={reviews || []}
              listingTitle={listing.title}
            />
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                {listing.phone && (
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Phone
                      </p>
                      <p>
                        <a
                          href={`tel:${listing.phone}`}
                          className="hover:text-blue-600"
                        >
                          {listing.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {listing.email && (
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Email
                      </p>
                      <p>
                        <a
                          href={`mailto:${listing.email}`}
                          className="hover:text-blue-600"
                        >
                          {listing.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {listing.website && (
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Website
                      </p>
                      <p>
                        <a
                          href={
                            listing.website.startsWith("http")
                              ? listing.website
                              : `https://${listing.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
                        >
                          {listing.website.replace(/^https?:\/\//i, "")}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {listing.location && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Address
                      </p>
                      <p>{listing.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price Level */}
            {listing.price_level && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Price Range</h2>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">
                    {formatPriceLevel(listing.price_level)}
                  </span>
                  <span className="ml-2 text-gray-500">
                    {listing.price_level === 1
                      ? "Budget friendly"
                      : listing.price_level === 2
                        ? "Moderately priced"
                        : listing.price_level === 3
                          ? "Expensive"
                          : "Very expensive"}
                  </span>
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map view coming soon</p>
              </div>
              <p className="mt-3 text-gray-600">{listing.location}</p>
              <Button className="w-full mt-4" variant="outline" asChild>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(listing.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {relatedListings && relatedListings.length > 0 && (
          <RelatedListings
            listings={relatedListings}
            category={listing.categories?.name}
            currentListingId={listing.id}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
