import AiListingBuilder from "@/components/add-listing/ai-listing-builder";

export default function AiListingBuilderDemo() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold mb-2">AI-Enhanced Listing Builder</h1>
        <p className="text-muted-foreground mb-6">
          Create a comprehensive listing with AI assistance
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <AiListingBuilder />
      </div>
    </div>
  );
}
