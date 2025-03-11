"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Clock, Tag } from "lucide-react";

interface ListingPreviewProps {
  listing: {
    title: string;
    description: string;
    category: string;
    location: string;
    phone: string;
    email: string;
    website: string;
    price_range: string;
    amenities?: string[];
    hours?: any;
    images?: string[];
  };
}

export default function ListingPreview({ listing }: ListingPreviewProps) {
  const formatHours = (hours: any) => {
    if (!hours) return "Not specified";

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    return days
      .map((day) => {
        const dayHours = hours[day];
        if (dayHours.closed)
          return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed`;
        return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayHours.open} - ${dayHours.close}`;
      })
      .join("\n");
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {listing.images && listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image available
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-blue-500">{listing.category}</Badge>
        </div>
        {listing.price_range && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-white">
              {listing.price_range}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{listing.location}</p>
          </div>

          <div className="flex items-start space-x-2">
            <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{listing.phone}</p>
          </div>

          <div className="flex items-start space-x-2">
            <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{listing.email}</p>
          </div>

          {listing.website && (
            <div className="flex items-start space-x-2">
              <Globe className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{listing.website}</p>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {listing.amenities && listing.amenities.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {listing.hours && (
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Business Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(listing.hours).map(
                  ([day, hours]: [string, any]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}:</span>
                      <span>
                        {hours.closed ? (
                          <span className="text-gray-500">Closed</span>
                        ) : (
                          <span>
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
