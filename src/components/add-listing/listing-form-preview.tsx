"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import ListingPreview from "./listing-preview";

interface ListingFormPreviewProps {
  formData: any;
}

export default function ListingFormPreview({
  formData,
}: ListingFormPreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Eye className="mr-2 h-4 w-4" /> Preview Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="py-4">
          <h2 className="text-xl font-bold mb-4">Listing Preview</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This is how your listing will appear to users after it's approved.
          </p>
          <ListingPreview listing={formData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
