import LocationFilter from "@/components/location-filter";

export default function LocationFilterStoryboard() {
  return (
    <div className="p-6 max-w-md mx-auto space-y-6 bg-gray-50">
      <h1 className="text-xl font-bold mb-2">Location Filter Component</h1>
      <p className="text-muted-foreground mb-6">
        Filter listings by location and distance
      </p>

      <LocationFilter initialLocation="New York, NY" initialRadius={15} />
    </div>
  );
}
