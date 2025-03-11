interface LocationMapProps {
  location: string;
}

export default function LocationMap({ location }: LocationMapProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
