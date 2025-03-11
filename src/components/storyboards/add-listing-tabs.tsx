import ListingFormTabs from "@/components/add-listing/listing-form-tabs";

export default function AddListingTabsDemo() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold mb-2">Add Listing</h1>
        <p className="text-muted-foreground">
          Create a new listing for your business or service
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ListingFormTabs />
      </div>
    </div>
  );
}
