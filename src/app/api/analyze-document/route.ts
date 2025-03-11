import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

// Mock OpenAI functionality since we don't have the package installed
const mockOpenAI = {
  chat: {
    completions: {
      create: async ({ messages, temperature, max_tokens }: any) => {
        // Return a mock response with structured data
        return {
          choices: [
            {
              message: {
                content: JSON.stringify({
                  title: "Coastal Breeze Cafe",
                  description:
                    "A charming cafe located by the beach, offering specialty coffee, fresh pastries, and a relaxing atmosphere with ocean views.",
                  category: "cafe",
                  location: "123 Ocean Drive, Miami Beach, FL 33139",
                  contact: {
                    phone: "(555) 123-4567",
                    email: "info@coastalbreezecafe.com",
                    website: "www.coastalbreezecafe.com",
                  },
                  features: [
                    "Specialty Coffee",
                    "Fresh Pastries",
                    "Ocean Views",
                  ],
                  amenities: [
                    "WiFi",
                    "Outdoor Seating",
                    "Pet Friendly",
                    "Takeout",
                  ],
                  hours: {
                    monday: { open: "07:00", close: "19:00", closed: false },
                    tuesday: { open: "07:00", close: "19:00", closed: false },
                    wednesday: { open: "07:00", close: "19:00", closed: false },
                    thursday: { open: "07:00", close: "19:00", closed: false },
                    friday: { open: "07:00", close: "21:00", closed: false },
                    saturday: { open: "08:00", close: "21:00", closed: false },
                    sunday: { open: "08:00", close: "17:00", closed: false },
                  },
                  price_range: "$",
                  highlights: [
                    "Ocean Views",
                    "Specialty Coffee",
                    "Relaxing Atmosphere",
                  ],
                }),
              },
            },
          ],
        };
      },
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { documentId, documentUrl, documentType, documentName } =
      await request.json();

    if (!documentId || !documentUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Determine document type and extraction strategy
    const extractionStrategy = determineExtractionStrategy(
      documentType,
      documentName,
    );

    // Extract text from document (simplified for demo)
    // In a real implementation, you would use different extraction methods based on file type
    const documentText = await extractTextFromDocument(
      documentUrl,
      documentType,
    );

    // Process with OpenAI
    const structuredData = await processWithOpenAI(
      documentText,
      extractionStrategy,
    );

    return NextResponse.json({
      success: true,
      documentId,
      structuredData,
    });
  } catch (error: any) {
    console.error("Error analyzing document:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze document" },
      { status: 500 },
    );
  }
}

// Helper function to determine extraction strategy based on document type
function determineExtractionStrategy(
  documentType: string,
  documentName: string,
) {
  const filenameLower = documentName.toLowerCase();
  const fileExtension = filenameLower.split(".").pop();

  if (documentType.includes("pdf") || fileExtension === "pdf") {
    return "pdf";
  } else if (
    documentType.includes("word") ||
    documentType.includes("doc") ||
    fileExtension === "doc" ||
    fileExtension === "docx"
  ) {
    return "word";
  } else if (
    documentType.includes("image") ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png"
  ) {
    return "image";
  } else if (
    fileExtension === "csv" ||
    fileExtension === "xlsx" ||
    fileExtension === "xls" ||
    documentType.includes("spreadsheet") ||
    documentType.includes("csv") ||
    documentType.includes("excel")
  ) {
    return "spreadsheet";
  } else if (filenameLower.includes("menu")) {
    return "menu";
  } else if (filenameLower.includes("brochure")) {
    return "brochure";
  } else {
    return "generic";
  }
}

// Helper function to extract text from document (simplified for demo)
async function extractTextFromDocument(
  documentUrl: string,
  documentType: string,
) {
  // In a real implementation, you would use different libraries based on file type
  // For example, pdf.js for PDFs, mammoth for Word docs, Tesseract for images, etc.

  // For this demo, we'll simulate text extraction
  return `This is a sample business document for Coastal Breeze Cafe.
  
  Located at 123 Ocean Drive, Miami Beach, FL 33139.
  
  We offer specialty coffee, fresh pastries, and a relaxing atmosphere with ocean views.
  
  Contact us at (555) 123-4567 or info@coastalbreezecafe.com.
  
  Hours of operation:
  Monday-Friday: 7am-7pm
  Saturday-Sunday: 8am-8pm
  
  Amenities include WiFi, outdoor seating, pet-friendly areas, and takeout options.
  
  Visit our website at www.coastalbreezecafe.com`;
}

// Helper function to process text with OpenAI
async function processWithOpenAI(text: string, strategy: string) {
  try {
    // Define the prompt based on extraction strategy
    let systemPrompt = "";

    switch (strategy) {
      case "menu":
        systemPrompt =
          "You are an AI assistant that extracts menu items, prices, and categories from restaurant menus. Format the output as structured JSON.";
        break;
      case "brochure":
        systemPrompt =
          "You are an AI assistant that extracts business details, services, and features from marketing brochures. Format the output as structured JSON.";
        break;
      case "image":
        systemPrompt =
          "You are an AI assistant that extracts visible text and details from business images. Format the output as structured JSON.";
        break;
      case "spreadsheet":
        systemPrompt =
          "You are an AI assistant that extracts tabular data, product information, pricing, and business details from spreadsheets (CSV, Excel). Format the output as structured JSON.";
        break;
      case "pdf":
        systemPrompt =
          "You are an AI assistant that extracts comprehensive business information from PDF documents, including contact details, services, and business hours. Format the output as structured JSON.";
        break;
      default:
        systemPrompt =
          "You are an AI assistant that extracts business details from documents. Format the output as structured JSON.";
    }

    // Call mock OpenAI API
    const response = await mockOpenAI.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `${systemPrompt} Extract the following information into a structured JSON format suitable for a business listing: business name, description, category, location, contact information (phone, email, website), business hours, amenities/features, and any other relevant details. The JSON should include these fields: title, description, category, location, contact (object with phone, email, website), features (array), amenities (array), hours (object with days), price_range (if available), highlights (array of key selling points), and details (object for any additional information).`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to get a valid response from OpenAI");
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from OpenAI response");
    }

    const jsonString = jsonMatch[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error processing with OpenAI:", error);
    // Return a basic structure if OpenAI processing fails
    return {
      title: "Extracted Business",
      description: text.substring(0, 200) + "...",
      category: "Business",
      location: "",
      contact: {
        phone: "",
        email: "",
        website: "",
      },
      features: [],
      amenities: [],
      hours: {},
      price_range: "",
      highlights: [],
      details: {},
    };
  }
}
