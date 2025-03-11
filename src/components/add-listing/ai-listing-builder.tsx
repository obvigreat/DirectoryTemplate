"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Loader2,
  Save,
  Sparkles,
  RefreshCw,
  Check,
  FileText,
  Upload,
} from "lucide-react";
import CategorySelect from "@/components/category-select";
import FileUpload from "@/components/file-upload";
import ListingFormPreview from "./listing-form-preview";
import LocationPicker from "./location-picker";
import AiSuggestions from "./ai-suggestions";
import DocumentUploadProcessor from "./document-upload-processor";

export default function AiListingBuilder() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [documentProcessing, setDocumentProcessing] = useState(false);
  const [inputData, setInputData] = useState({
    businessName: "",
    businessType: "",
    customBusinessType: "",
    location: "",
    keyFeatures: "",
    targetAudience: "",
  });
  const [generatedListing, setGeneratedListing] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (urls: string[]) => {
    setImages(urls);
  };

  const generateListing = async () => {
    setGenerating(true);
    setError(null);

    try {
      // In a real implementation, this would call an AI service
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate amenities based on business type
      const suggestedAmenities = generateSuggestedAmenities(
        inputData.businessType,
      );

      // Generate price range based on business type and features
      const suggestedPriceRange = generatePriceRange(
        inputData.businessType,
        inputData.keyFeatures,
      );

      // Generate business hours based on business type
      const suggestedHours = generateBusinessHours(inputData.businessType);

      // Generate a more detailed description
      const description = generateDescription(inputData);

      // Generate a mock listing based on input data
      const listing = {
        title: inputData.businessName,
        description,
        category: inputData.businessType.toLowerCase(),
        location: inputData.location,
        phone: "(555) 123-4567", // Placeholder
        email: "contact@example.com", // Placeholder
        website: `https://www.${inputData.businessName.toLowerCase().replace(/\s+/g, "")}.com`, // Generate a website URL
        price_range: suggestedPriceRange,
        amenities: suggestedAmenities,
        hours: suggestedHours,
      };

      setGeneratedListing(listing);
      setActiveTab("review");
    } catch (err: any) {
      console.error("Error generating listing:", err);
      setError(err.message || "Failed to generate listing");
    } finally {
      setGenerating(false);
    }
  };

  // Helper function to generate amenities based on business type
  const generateSuggestedAmenities = (businessType: string) => {
    const businessTypeLower = businessType.toLowerCase();
    const commonAmenities = ["WiFi", "Wheelchair Accessible"];

    if (
      businessTypeLower.includes("restaurant") ||
      businessTypeLower.includes("cafe") ||
      businessTypeLower.includes("coffee")
    ) {
      return [
        ...commonAmenities,
        "Takeout",
        "Outdoor Seating",
        "Reservations",
        "Credit Cards",
        "Family Friendly",
      ];
    } else if (
      businessTypeLower.includes("hotel") ||
      businessTypeLower.includes("lodging")
    ) {
      return [
        ...commonAmenities,
        "Parking",
        "Air Conditioning",
        "24-Hour Front Desk",
        "Room Service",
        "Pool",
      ];
    } else if (
      businessTypeLower.includes("retail") ||
      businessTypeLower.includes("shop") ||
      businessTypeLower.includes("store")
    ) {
      return [
        ...commonAmenities,
        "Credit Cards",
        "Fitting Rooms",
        "Gift Cards",
        "Returns Accepted",
      ];
    } else if (
      businessTypeLower.includes("gym") ||
      businessTypeLower.includes("fitness")
    ) {
      return [
        ...commonAmenities,
        "Showers",
        "Lockers",
        "Personal Training",
        "Group Classes",
        "Towel Service",
      ];
    } else if (
      businessTypeLower.includes("salon") ||
      businessTypeLower.includes("spa")
    ) {
      return [
        ...commonAmenities,
        "Appointments",
        "Walk-Ins Welcome",
        "Gift Cards",
        "Credit Cards",
      ];
    } else {
      return [...commonAmenities, "Parking", "Credit Cards", "Appointments"];
    }
  };

  // Helper function to generate price range based on business type and features
  const generatePriceRange = (businessType: string, features: string) => {
    const businessTypeLower = businessType.toLowerCase();
    const featuresLower = features.toLowerCase();

    // Check for luxury indicators
    const luxuryKeywords = [
      "luxury",
      "premium",
      "high-end",
      "exclusive",
      "gourmet",
      "fine",
      "upscale",
    ];
    const hasLuxuryKeywords = luxuryKeywords.some((keyword) =>
      featuresLower.includes(keyword),
    );

    // Check for budget indicators
    const budgetKeywords = [
      "affordable",
      "budget",
      "cheap",
      "discount",
      "economical",
      "inexpensive",
    ];
    const hasBudgetKeywords = budgetKeywords.some((keyword) =>
      featuresLower.includes(keyword),
    );

    if (hasLuxuryKeywords) {
      return businessTypeLower.includes("restaurant") ||
        businessTypeLower.includes("hotel")
        ? "$$$$"
        : "$$$";
    } else if (hasBudgetKeywords) {
      return "$";
    } else {
      // Default based on business type
      if (
        businessTypeLower.includes("restaurant") &&
        (featuresLower.includes("steak") || featuresLower.includes("seafood"))
      ) {
        return "$$$";
      } else if (
        businessTypeLower.includes("cafe") ||
        businessTypeLower.includes("coffee")
      ) {
        return "$$";
      } else if (businessTypeLower.includes("hotel")) {
        return "$$$";
      } else {
        return "$$";
      }
    }
  };

  // Helper function to generate business hours based on business type
  const generateBusinessHours = (businessType: string) => {
    const businessTypeLower = businessType.toLowerCase();

    // Restaurant/Cafe hours
    if (
      businessTypeLower.includes("restaurant") ||
      businessTypeLower.includes("cafe") ||
      businessTypeLower.includes("coffee")
    ) {
      return {
        monday: { open: "07:00", close: "21:00", closed: false },
        tuesday: { open: "07:00", close: "21:00", closed: false },
        wednesday: { open: "07:00", close: "21:00", closed: false },
        thursday: { open: "07:00", close: "21:00", closed: false },
        friday: { open: "07:00", close: "22:00", closed: false },
        saturday: { open: "08:00", close: "22:00", closed: false },
        sunday: { open: "08:00", close: "20:00", closed: false },
      };
    }
    // Retail store hours
    else if (
      businessTypeLower.includes("retail") ||
      businessTypeLower.includes("shop") ||
      businessTypeLower.includes("store")
    ) {
      return {
        monday: { open: "10:00", close: "20:00", closed: false },
        tuesday: { open: "10:00", close: "20:00", closed: false },
        wednesday: { open: "10:00", close: "20:00", closed: false },
        thursday: { open: "10:00", close: "20:00", closed: false },
        friday: { open: "10:00", close: "21:00", closed: false },
        saturday: { open: "10:00", close: "21:00", closed: false },
        sunday: { open: "11:00", close: "18:00", closed: false },
      };
    }
    // Service business hours (salon, spa, etc.)
    else if (
      businessTypeLower.includes("salon") ||
      businessTypeLower.includes("spa") ||
      businessTypeLower.includes("service")
    ) {
      return {
        monday: { open: "09:00", close: "19:00", closed: false },
        tuesday: { open: "09:00", close: "19:00", closed: false },
        wednesday: { open: "09:00", close: "19:00", closed: false },
        thursday: { open: "09:00", close: "19:00", closed: false },
        friday: { open: "09:00", close: "19:00", closed: false },
        saturday: { open: "09:00", close: "17:00", closed: false },
        sunday: { open: "10:00", close: "16:00", closed: true },
      };
    }
    // Default business hours
    else {
      return {
        monday: { open: "09:00", close: "17:00", closed: false },
        tuesday: { open: "09:00", close: "17:00", closed: false },
        wednesday: { open: "09:00", close: "17:00", closed: false },
        thursday: { open: "09:00", close: "17:00", closed: false },
        friday: { open: "09:00", close: "17:00", closed: false },
        saturday: { open: "10:00", close: "15:00", closed: false },
        sunday: { open: "10:00", close: "15:00", closed: true },
      };
    }
  };

  // Helper function to generate a detailed description
  const generateDescription = (inputData: any) => {
    const {
      businessName,
      businessType,
      location,
      keyFeatures,
      targetAudience,
    } = inputData;

    // Generate introduction paragraph
    let intro = `${businessName} is a premier ${businessType} located in ${location}.`;

    if (targetAudience) {
      intro += ` We specialize in providing exceptional services to ${targetAudience}.`;
    }

    // Generate features paragraph
    let features = ` Our key features include ${keyFeatures}.`;

    // Generate mission statement
    const missionStatements = [
      "Our mission is to deliver outstanding experiences and exceed customer expectations.",
      `At ${businessName}, we're committed to providing the highest quality service in the area.`,
      `We pride ourselves on our attention to detail and dedication to customer satisfaction.`,
      `${businessName} was founded with a simple goal: to provide exceptional ${businessType.toLowerCase()} services to our community.`,
    ];

    // Randomly select a mission statement
    const missionStatement =
      missionStatements[Math.floor(Math.random() * missionStatements.length)];

    // Generate closing paragraph
    const closingStatements = [
      "With our dedicated team and attention to detail, we ensure that every visit is memorable and satisfying.",
      "We look forward to welcoming you and providing an exceptional experience.",
      "Visit us today and discover why our customers keep coming back.",
      "We're constantly evolving to meet our customers' needs while maintaining our commitment to excellence.",
    ];

    // Randomly select a closing statement
    const closingStatement =
      closingStatements[Math.floor(Math.random() * closingStatements.length)];

    // Combine all paragraphs
    return `${intro}${features}\n\n${missionStatement} ${closingStatement}`;
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
          ...generatedListing,
          images,
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

  const isInputValid = () => {
    return (
      inputData.businessName &&
      inputData.businessType &&
      inputData.location &&
      inputData.keyFeatures
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI-Enhanced Listing Builder</h2>
        <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center font-medium">
          <Sparkles className="h-4 w-4 mr-1" />
          AI-Powered
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">Input Details</TabsTrigger>
          <TabsTrigger value="documents">Document Upload</TabsTrigger>
          <TabsTrigger value="review" disabled={!generatedListing}>
            Review & Submit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6 pt-4">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Provide some basic information about your business, and our AI
              will generate a comprehensive listing for you.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={inputData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g. Coastal Breeze Cafe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type/Category *</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={inputData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a business type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Coffee Shop">Coffee Shop</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Bar">Bar</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Retail Store">Retail Store</option>
                  <option value="Clothing Store">Clothing Store</option>
                  <option value="Electronics Store">Electronics Store</option>
                  <option value="Grocery Store">Grocery Store</option>
                  <option value="Salon">Salon</option>
                  <option value="Spa">Spa</option>
                  <option value="Gym">Gym</option>
                  <option value="Fitness Center">Fitness Center</option>
                  <option value="Yoga Studio">Yoga Studio</option>
                  <option value="Medical Clinic">Medical Clinic</option>
                  <option value="Dental Clinic">Dental Clinic</option>
                  <option value="Law Firm">Law Firm</option>
                  <option value="Real Estate Agency">Real Estate Agency</option>
                  <option value="Auto Repair">Auto Repair</option>
                  <option value="Other">Other</option>
                </select>
                {inputData.businessType === "Other" && (
                  <Input
                    className="mt-2"
                    placeholder="Please specify your business type"
                    value={inputData.customBusinessType || ""}
                    onChange={(e) =>
                      setInputData((prev) => ({
                        ...prev,
                        customBusinessType: e.target.value,
                      }))
                    }
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <LocationPicker
                  value={inputData.location}
                  onChange={(value) =>
                    setInputData((prev) => ({ ...prev, location: value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyFeatures">Key Features/Services *</Label>
                <Textarea
                  id="keyFeatures"
                  name="keyFeatures"
                  value={inputData.keyFeatures}
                  onChange={handleInputChange}
                  placeholder="e.g. specialty coffee, breakfast menu, outdoor seating, live music on weekends"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">
                  Target Audience (Optional)
                </Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  value={inputData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g. young professionals, families, tourists"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={generateListing}
              disabled={generating || !isInputValid()}
              className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg font-medium"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" /> Generate Listing with AI
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6 pt-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">
                  Document-Based Listing Builder
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload business documents like brochures, menus, or marketing
                  materials and let AI extract the information to create your
                  listing.
                </p>
              </div>
              <div className="flex items-center text-blue-600">
                <FileText className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  AI Document Analysis
                </span>
              </div>
            </div>

            <Card className="p-6">
              <DocumentUploadProcessor
                onAnalysisComplete={(analysisData) => {
                  // Set the generated listing from document analysis
                  setGeneratedListing({
                    title: analysisData.title || "",
                    description: analysisData.description || "",
                    category: analysisData.category?.toLowerCase() || "",
                    location: analysisData.location || "",
                    phone: analysisData.contact?.phone || "",
                    email: analysisData.contact?.email || "",
                    website: analysisData.contact?.website || "",
                    price_range: analysisData.price_range || "$",
                    amenities: analysisData.amenities || [],
                    hours: analysisData.hours || {
                      monday: { open: "09:00", close: "17:00", closed: false },
                      tuesday: { open: "09:00", close: "17:00", closed: false },
                      wednesday: {
                        open: "09:00",
                        close: "17:00",
                        closed: false,
                      },
                      thursday: {
                        open: "09:00",
                        close: "17:00",
                        closed: false,
                      },
                      friday: { open: "09:00", close: "17:00", closed: false },
                      saturday: {
                        open: "10:00",
                        close: "15:00",
                        closed: false,
                      },
                      sunday: { open: "10:00", close: "15:00", closed: true },
                    },
                  });

                  // Move to review tab when analysis is complete
                  setActiveTab("review");
                }}
                onProcessingStateChange={setDocumentProcessing}
              />
            </Card>

            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() => setActiveTab("review")}
                disabled={!generatedListing || documentProcessing}
                className="w-full max-w-md"
              >
                {documentProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                    Documents...
                  </>
                ) : !generatedListing ? (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Documents to
                    Continue
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Continue to Review
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-6 pt-4">
          {generatedListing && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-800">
                    AI-Generated Listing
                  </h3>
                </div>
                <p className="text-sm text-blue-700">
                  Your listing has been generated based on your input. You can
                  review and edit the details below before submitting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Listing Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={generatedListing.title}
                      onChange={(e) =>
                        setGeneratedListing({
                          ...generatedListing,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                    <AiSuggestions
                      field="Title"
                      suggestions={[
                        `${inputData.businessName} - ${inputData.businessType} in ${inputData.location.split(",")[0]}`,
                        `${inputData.businessName} | Premier ${inputData.businessType}`,
                        `${inputData.businessName} - Exceptional ${inputData.businessType} Services`,
                      ]}
                      onSelect={(suggestion) =>
                        setGeneratedListing({
                          ...generatedListing,
                          title: suggestion,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={generatedListing.description}
                      onChange={(e) =>
                        setGeneratedListing({
                          ...generatedListing,
                          description: e.target.value,
                        })
                      }
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <CategorySelect
                      name="category"
                      value={generatedListing.category}
                      onChange={(value) =>
                        setGeneratedListing({
                          ...generatedListing,
                          category: value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={generatedListing.phone}
                      onChange={(e) =>
                        setGeneratedListing({
                          ...generatedListing,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                    <AiSuggestions
                      field="Phone Number"
                      suggestions={[
                        "(555) 123-4567",
                        "(555) 987-6543",
                        "(555) 555-5555",
                      ]}
                      onSelect={(suggestion) =>
                        setGeneratedListing({
                          ...generatedListing,
                          phone: suggestion,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={generatedListing.email}
                      onChange={(e) =>
                        setGeneratedListing({
                          ...generatedListing,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                    <AiSuggestions
                      field="Email Address"
                      suggestions={[
                        `info@${inputData.businessName.toLowerCase().replace(/\s+/g, "")}.com`,
                        `contact@${inputData.businessName.toLowerCase().replace(/\s+/g, "")}.com`,
                        `hello@${inputData.businessName.toLowerCase().replace(/\s+/g, "")}.com`,
                      ]}
                      onSelect={(suggestion) =>
                        setGeneratedListing({
                          ...generatedListing,
                          email: suggestion,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={generatedListing.website}
                      onChange={(e) =>
                        setGeneratedListing({
                          ...generatedListing,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Images</Label>
                    <FileUpload
                      onUploadComplete={handleImagesChange}
                      maxFiles={5}
                      existingFiles={images}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload up to 5 images of your business.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("input");
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                  </Button>

                  <ListingFormPreview formData={generatedListing} />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => generateListing()}
                    disabled={generating}
                  >
                    {generating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Regenerate Listing
                  </Button>
                </div>

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
              </div>
            </form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
