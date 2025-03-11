"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TraditionalListingForm from "./traditional-listing-form";
import AiListingBuilder from "./ai-listing-builder";

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
          <TabsTrigger value="traditional">Traditional Form</TabsTrigger>
          <TabsTrigger value="ai-builder">AI-Enhanced Builder</TabsTrigger>
        </TabsList>
        <Card className="mt-6 p-6">
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
