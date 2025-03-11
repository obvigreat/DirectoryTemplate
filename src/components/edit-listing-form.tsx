"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { X, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Listing {
  id: string | number;
  title: string;
  description: string;
  category_id?: string;
  location: string;
  status?: string;
  price_range?: string;
  email: string;
  phone: string;
  website?: string;
  amenities?: string[];
  images?: string[];
  hours?: any;
}

interface EditListingFormProps {
  listing: Listing;
  categories: Category[];
  updateAction: (formData: FormData) => Promise<any>;
  cancelHref: string;
  isAdmin?: boolean;
}

export default function EditListingForm({
  listing,
  categories,
  updateAction,
  cancelHref,
  isAdmin = false,
}: EditListingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(listing.images || []);
  const [newImage, setNewImage] = useState("");
  const [amenities, setAmenities] = useState<string[]>(listing.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");
  const [hours, setHours] = useState<{ day: string; hours: string }[]>(
    (listing.hours as { day: string; hours: string }[]) || [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  );

  // Format hours for display in textarea
  const formatHoursForDisplay = () => {
    if (!listing.hours) return "";
    try {
      return JSON.stringify(listing.hours, null, 2);
    } catch (e) {
      console.error("Error formatting hours:", e);
      return "";
    }
  };

  const addImage = () => {
    if (newImage && !images.includes(newImage)) {
      setImages([...images, newImage]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const updateHours = (index: number, value: string) => {
    const updatedHours = [...hours];
    updatedHours[index].hours = value;
    setHours(updatedHours);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const formData = new FormData(e.currentTarget);

      // Add arrays and objects as JSON strings
      formData.append("images", JSON.stringify(images));
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("hours", JSON.stringify(hours));

      const result = await updateAction(formData);

      if (result && !result.success) {
        setFormError(result.error || "Failed to update listing");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      setFormError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Listing Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={listing.title}
            placeholder="Listing Title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category_id">Category</Label>
          <select
            id="category_id"
            name="category_id"
            className="w-full p-2 border border-gray-300 rounded-md"
            defaultValue={listing.category_id || ""}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={listing.location}
            placeholder="Location"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price_range">Price Range</Label>
          <select
            id="price_range"
            name="price_range"
            className="w-full p-2 border border-gray-300 rounded-md"
            defaultValue={listing.price_range || ""}
          >
            <option value="">Select price range</option>
            <option value="$">$ (Inexpensive)</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Expensive)</option>
            <option value="$$$$">$$$$ (Very Expensive)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={listing.email}
            placeholder="Contact Email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={listing.phone}
            placeholder="Contact Phone"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            defaultValue={listing.website || ""}
            placeholder="Website URL"
          />
        </div>

        {isAdmin && (
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              className="w-full p-2 border border-gray-300 rounded-md"
              defaultValue={listing.status || "active"}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={listing.description}
          placeholder="Detailed description of your listing"
          required
        />
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="flex gap-2">
          <Input
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
          />
          <Button type="button" onClick={addImage} className="flex-shrink-0">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Listing image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Amenities</h3>
        <div className="flex gap-2">
          <Input
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="e.g. Free Wi-Fi"
          />
          <Button type="button" onClick={addAmenity} className="flex-shrink-0">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center"
              >
                <span>{amenity}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Business Hours */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Business Hours</h3>
        <div className="space-y-3">
          {hours.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-24 flex-shrink-0">
                <Label>{item.day}</Label>
              </div>
              <div className="flex-1">
                <Input
                  value={item.hours}
                  onChange={(e) => updateHours(index, e.target.value)}
                  placeholder="e.g. 9:00 AM - 5:00 PM or Closed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Link href={cancelHref}>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Listing"}
        </Button>
      </div>
    </form>
  );
}
