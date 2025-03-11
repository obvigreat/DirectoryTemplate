import ListingPreview from "@/components/add-listing/listing-preview";

export default function ListingPreviewDemo() {
  // Sample listing data
  const sampleListing = {
    title: "Coastal Breeze Cafe",
    description:
      "A charming cafe located by the beach, offering specialty coffee, fresh pastries, and a relaxing atmosphere. Our outdoor seating area provides stunning ocean views, making it the perfect spot to unwind and enjoy the sea breeze.",
    category: "Cafe",
    location: "123 Ocean Drive, Miami Beach, FL 33139",
    phone: "(555) 123-4567",
    email: "contact@coastalbreezecafe.com",
    website: "https://www.coastalbreezecafe.com",
    price_range: "$$",
    amenities: [
      "WiFi",
      "Outdoor Seating",
      "Pet Friendly",
      "Takeout",
      "Wheelchair Accessible",
    ],
    hours: {
      monday: { open: "07:00", close: "19:00", closed: false },
      tuesday: { open: "07:00", close: "19:00", closed: false },
      wednesday: { open: "07:00", close: "19:00", closed: false },
      thursday: { open: "07:00", close: "19:00", closed: false },
      friday: { open: "07:00", close: "21:00", closed: false },
      saturday: { open: "08:00", close: "21:00", closed: false },
      sunday: { open: "08:00", close: "17:00", closed: false },
    },
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold mb-2">Listing Preview</h1>
        <p className="text-muted-foreground mb-6">
          Preview how your listing will appear to users
        </p>
      </header>

      <ListingPreview listing={sampleListing} />
    </div>
  );
}
