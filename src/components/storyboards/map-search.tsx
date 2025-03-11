import MapSearch from "@/components/map-search";

export default function MapSearchStoryboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Map Search Interface</h1>
      <p className="text-muted-foreground mb-6">
        A map-based search interface for finding listings by location
      </p>

      <MapSearch initialQuery="coffee" initialLocation="New York" />
    </div>
  );
}
