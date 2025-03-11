"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingFormPreview from "./listing-form-preview";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Loader2, Save, ArrowRight } from "lucide-react";
import CategorySelect from "@/components/category-select";
import PriceLevelSelect from "@/components/price-level-select";
import FileUpload from "@/components/file-upload";
import BusinessHours from "@/components/business-hours";
import LocationPicker from "./location-picker";

export default function TraditionalListingForm() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    price_range: "$",
    amenities: [] as string[],
    images: [] as string[],
    hours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "17:00", closed: false },
      friday: { open: "09:00", close: "17:00", closed: false },
      saturday: { open: "10:00", close: "15:00", closed: false },
      sunday: { open: "10:00", close: "15:00", closed: true },
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleHoursChange = (day: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day as keyof typeof prev.hours],
          [field]: value,
        },
      },
    }));
  };

  const handleImagesChange = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to create a listing");

      // Create the listing
      const { data, error } = await supabase
        .from("listings")
        .insert({
          ...formData,
          user_id: user.id,
          status: "pending",
        })
        .select();

      if (error) throw error;

      // Redirect to the listing page
      router.push(`/dashboard/listings/${data[0].id}`);
      router.refresh();
    } catch (err: any) {
      console.error("Error creating listing:", err);
      setError(err.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.title &&
          formData.description &&
          formData.category &&
          formData.location
        );
      case 2:
        return formData.phone && formData.email;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional fields
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create New Listing</h2>
        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
          <div className="flex space-x-1 mr-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${currentStep >= step ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-sm font-medium text-blue-700">
            Step {currentStep} of 4
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Downtown Coffee Shop"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your business or service"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <CategorySelect
                  name="category"
                  value={formData.category}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <LocationPicker
                  value={formData.location}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, location: value }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. (555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. contact@business.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. https://www.business.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price_range">Price Range</Label>
                <PriceLevelSelect
                  value={formData.price_range}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, price_range: value }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Business Hours</h3>
            <BusinessHours
              hours={formData.hours}
              onChange={handleHoursChange}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Parking",
                    "WiFi",
                    "Delivery",
                    "Takeout",
                    "Outdoor Seating",
                    "Wheelchair Accessible",
                    "Pet Friendly",
                    "Reservations",
                    "Credit Cards",
                    "Family Friendly",
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(amenity, checked as boolean)
                        }
                      />
                      <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Images</h3>
                <FileUpload
                  onUploadComplete={handleImagesChange}
                  maxFiles={5}
                  existingFiles={formData.images}
                />
                <p className="text-sm text-muted-foreground">
                  Upload up to 5 images of your business. Recommended size:
                  1200x800 pixels.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t mt-6">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="px-4"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back
              </Button>
            )}

            {currentStep === 4 && (
              <div className="inline-block">
                <ListingFormPreview formData={formData} />
              </div>
            )}
          </div>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="px-5 bg-blue-600 hover:bg-blue-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="px-5 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Create Listing
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
