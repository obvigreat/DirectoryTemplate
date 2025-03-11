import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ClipboardList, ArrowRight, Save } from "lucide-react";

export default function ImprovedAddListing() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h1 className="text-3xl font-bold mb-2">Add New Listing</h1>
        <p className="text-muted-foreground">
          Create a new business listing to showcase on our platform
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <span className="text-blue-700 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Standard Form</h3>
              <p className="text-gray-500">
                Step-by-step form with all the details you need to provide
              </p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <span className="text-purple-700 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">AI-Enhanced Builder</h3>
              <p className="text-gray-500">
                Let AI help you create a professional listing in minutes
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <Tabs defaultValue="traditional" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="traditional"
              className="flex items-center justify-center py-3"
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              <span>Standard Form</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-builder"
              className="flex items-center justify-center py-3"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>AI-Enhanced Builder</span>
            </TabsTrigger>
          </TabsList>
          <Card className="mt-6 p-6 shadow-md border border-gray-100">
            <TabsContent value="traditional" className="space-y-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Create New Listing</h2>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <div className="flex space-x-1 mr-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`w-2 h-2 rounded-full ${2 >= step ? "bg-blue-600" : "bg-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-medium text-blue-700">
                      Step 2 of 4
                    </div>
                  </div>
                </div>

                {/* Form content would go here */}
                <div className="p-6 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center text-gray-500">
                  Form content placeholder
                </div>

                <div className="flex justify-between pt-6 border-t mt-6">
                  <div className="flex items-center space-x-3">
                    <Button type="button" variant="outline" className="px-4">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back
                    </Button>
                  </div>
                  <Button
                    type="button"
                    className="px-5 bg-blue-600 hover:bg-blue-700"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ai-builder" className="space-y-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    AI-Enhanced Listing Builder
                  </h2>
                  <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center font-medium">
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI-Powered
                  </div>
                </div>

                {/* AI builder content would go here */}
                <div className="p-6 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center text-gray-500">
                  AI builder content placeholder
                </div>

                <Button
                  type="button"
                  className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg font-medium"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Generate Listing with AI
                </Button>
              </div>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
