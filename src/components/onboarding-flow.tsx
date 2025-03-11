"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Building,
  MapPin,
  Image,
  Tag,
  Info,
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function OnboardingFlow({
  onComplete,
  initialData = {},
}: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const totalSteps = 5;

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
      </div>

      <Card className="border-none shadow-lg">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" /> Basic Information
              </CardTitle>
              <CardDescription>
                Let's start with some basic information about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName || ""}
                  onChange={(e) =>
                    updateFormData({ businessName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Business Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your business in a few sentences"
                  value={formData.description || ""}
                  onChange={(e) =>
                    updateFormData({ description: e.target.value })
                  }
                  required
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://"
                  value={formData.website || ""}
                  onChange={(e) => updateFormData({ website: e.target.value })}
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" /> Location & Contact
              </CardTitle>
              <CardDescription>
                Add your location and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your business address"
                  value={formData.address || ""}
                  onChange={(e) => updateFormData({ address: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city || ""}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">
                    Zip Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode || ""}
                    onChange={(e) =>
                      updateFormData({ zipCode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone || ""}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ""}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" /> Categories & Tags
              </CardTitle>
              <CardDescription>
                Help customers find your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Business Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.category || ""}
                  onChange={(e) => updateFormData({ category: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="service">Service</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Business Tags (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Family Friendly",
                    "Pet Friendly",
                    "Outdoor Seating",
                    "Delivery",
                    "Takeout",
                    "Parking Available",
                    "Wheelchair Accessible",
                    "Open Late",
                  ].map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag.replace(/\s+/g, "-").toLowerCase()}
                        checked={formData.tags?.includes(tag) || false}
                        onCheckedChange={(checked) => {
                          const currentTags = formData.tags || [];
                          if (checked) {
                            updateFormData({ tags: [...currentTags, tag] });
                          } else {
                            updateFormData({
                              tags: currentTags.filter(
                                (t: string) => t !== tag,
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={tag.replace(/\s+/g, "-").toLowerCase()}>
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <select
                  id="priceRange"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.priceRange || ""}
                  onChange={(e) =>
                    updateFormData({ priceRange: e.target.value })
                  }
                >
                  <option value="">Select price range</option>
                  <option value="$">$ (Inexpensive)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Expensive)</option>
                  <option value="$$$$">$$$$ (Very Expensive)</option>
                </select>
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5" /> Photos & Media
              </CardTitle>
              <CardDescription>
                Add photos to showcase your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop your logo here, or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or SVG, max 2MB
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Business Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop photos here, or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG or JPG, max 5MB each (up to 10 photos)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Photos
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (YouTube or Vimeo)</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://"
                  value={formData.videoUrl || ""}
                  onChange={(e) => updateFormData({ videoUrl: e.target.value })}
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" /> Additional Information
              </CardTitle>
              <CardDescription>
                Final details to complete your listing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div key={day} className="flex items-center space-x-2 mb-2">
                    <div className="w-24">
                      <Label>{day}</Label>
                    </div>
                    <select
                      className="p-2 border border-gray-300 rounded-md text-sm"
                      value={formData.hours?.[day]?.status || "open"}
                      onChange={(e) => {
                        const hours = { ...(formData.hours || {}) };
                        hours[day] = {
                          ...hours[day],
                          status: e.target.value,
                        };
                        updateFormData({ hours });
                      }}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                    {(!formData.hours?.[day]?.status ||
                      formData.hours?.[day]?.status === "open") && (
                      <>
                        <Input
                          type="time"
                          className="w-32"
                          value={formData.hours?.[day]?.open || "09:00"}
                          onChange={(e) => {
                            const hours = { ...(formData.hours || {}) };
                            hours[day] = {
                              ...hours[day],
                              open: e.target.value,
                            };
                            updateFormData({ hours });
                          }}
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          className="w-32"
                          value={formData.hours?.[day]?.close || "17:00"}
                          onChange={(e) => {
                            const hours = { ...(formData.hours || {}) };
                            hours[day] = {
                              ...hours[day],
                              close: e.target.value,
                            };
                            updateFormData({ hours });
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialFeatures">
                  Special Features or Amenities
                </Label>
                <Textarea
                  id="specialFeatures"
                  placeholder="List any special features or amenities your business offers"
                  value={formData.specialFeatures || ""}
                  onChange={(e) =>
                    updateFormData({ specialFeatures: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="termsAgreed"
                  checked={formData.termsAgreed || false}
                  onCheckedChange={(checked) => {
                    updateFormData({ termsAgreed: !!checked });
                  }}
                  required
                />
                <Label htmlFor="termsAgreed" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className="flex justify-between pt-6">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={step === 5 && !formData.termsAgreed}
          >
            {step === totalSteps ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Complete
              </>
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
