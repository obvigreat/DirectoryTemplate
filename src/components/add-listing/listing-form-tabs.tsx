"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TraditionalListingForm from "./traditional-listing-form";
import AiListingBuilder from "./ai-listing-builder";
import { Sparkles, ClipboardList } from "lucide-react";

export default function ListingFormTabs() {
  const [activeTab, setActiveTab] = useState("traditional");

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="traditional"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
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
            <TraditionalListingForm />
          </TabsContent>
          <TabsContent value="ai-builder" className="space-y-4">
            <AiListingBuilder />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
