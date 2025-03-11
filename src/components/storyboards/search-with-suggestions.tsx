import SearchWithSuggestions from "@/components/search/search-with-suggestions";

export default function SearchWithSuggestionsDemo() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8 bg-white">
      <div>
        <h2 className="text-xl font-bold mb-4">Search With Suggestions</h2>
        <SearchWithSuggestions
          placeholder="Search for listings..."
          className="w-full"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">With Initial Values</h3>
        <SearchWithSuggestions
          placeholder="Find restaurants, shops, and more..."
          initialQuery="coffee"
          initialCategory="restaurants"
          className="w-full"
        />
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Search Hero Example</h3>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Find Local Businesses</h2>
          <p className="text-gray-600 mb-6">
            Discover the best local businesses in your area
          </p>
          <SearchWithSuggestions
            placeholder="Search for restaurants, shops, services..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
