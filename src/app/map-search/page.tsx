import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MapSearchEnhanced from "@/components/map-search-enhanced";

export const metadata: Metadata = {
  title: "Map Search | Directory",
  description: "Find local businesses on the map",
};

interface MapSearchPageProps {
  searchParams: {
    q?: string;
    location?: string;
    lat?: string;
    lng?: string;
    radius?: string;
    category?: string;
    view?: string;
  };
}

export default async function MapSearchPage({
  searchParams,
}: MapSearchPageProps) {
  // Parse query parameters
  const query = searchParams.q || "";
  const location = searchParams.location || "";
  const lat = parseFloat(searchParams.lat || "0");
  const lng = parseFloat(searchParams.lng || "0");
  const radius = parseInt(searchParams.radius || "10");
  const category = searchParams.category || "";
  const view = searchParams.view || "map";

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Listings on the Map</h1>

        <div className="mb-8">
          <MapSearchEnhanced
            initialLocation={location}
            initialRadius={radius}
            initialCategory={category}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Restaurants",
              "Hotels",
              "Coffee Shops",
              "Gyms",
              "Coworking Spaces",
              "Shopping",
              "Entertainment",
              "Services",
            ].map((term) => (
              <a
                key={term}
                href={`/map-search?q=${encodeURIComponent(term)}&view=${view}`}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
