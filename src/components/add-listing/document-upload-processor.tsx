"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Check, X, Upload, FileUp } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface DocumentUploadProcessorProps {
  onAnalysisComplete: (analysisData: any) => void;
  onProcessingStateChange: (isProcessing: boolean) => void;
}

export default function DocumentUploadProcessor({
  onAnalysisComplete,
  onProcessingStateChange,
}: DocumentUploadProcessorProps) {
  const supabase = createClient();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<
    { id: string; name: string; status: string }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAndProcessFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProcessing(true);
    setProgress(0);
    setError(null);
    onProcessingStateChange(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to upload documents");

      const userId = user.id;
      const folderPath = `${userId}`;
      const uploadedDocuments = [];

      // Upload each file to Supabase storage
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileId = uuidv4();
        const fileExt = file.name.split(".").pop();
        const fileName = `${fileId}.${fileExt}`;
        const filePath = `${folderPath}/${fileName}`;

        // Update progress
        setProgress((i / files.length) * 30); // First 30% is upload progress

        // Upload to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get file URL
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(filePath);

        // Store metadata in documents table
        const { data: docData, error: docError } = await supabase
          .from("documents")
          .insert({
            id: fileId,
            user_id: userId,
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            file_path: filePath,
            file_url: urlData.publicUrl,
            status: "uploaded",
          })
          .select();

        if (docError) throw docError;

        uploadedDocuments.push({
          id: fileId,
          name: file.name,
          url: urlData.publicUrl,
          type: file.type,
        });

        setUploadedDocs((prev) => [
          ...prev,
          { id: fileId, name: file.name, status: "processing" },
        ]);
      }

      setUploading(false);
      setProgress(30); // Upload complete, now processing

      // Process each document with OpenAI
      const documentAnalyses = [];

      for (let i = 0; i < uploadedDocuments.length; i++) {
        const doc = uploadedDocuments[i];

        // Update progress - remaining 70% is for processing
        setProgress(30 + (i / uploadedDocuments.length) * 70);

        // Call API to process document
        const response = await fetch("/api/analyze-document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId: doc.id,
            documentUrl: doc.url,
            documentType: doc.type,
            documentName: doc.name,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to process document: ${doc.name}`);
        }

        const analysisResult = await response.json();

        // Update document status in database
        await supabase
          .from("documents")
          .update({
            status: "processed",
            analysis: analysisResult.structuredData,
            processed_at: new Date().toISOString(),
          })
          .eq("id", doc.id);

        documentAnalyses.push(analysisResult.structuredData);
        setUploadedDocs((prev) =>
          prev.map((d) =>
            d.id === doc.id ? { ...d, status: "processed" } : d,
          ),
        );
      }

      // Combine all analyses into a master document
      if (documentAnalyses.length > 0) {
        // Create master analysis
        const masterAnalysis = combineAnalyses(documentAnalyses);

        // Store master analysis
        const { data: masterData, error: masterError } = await supabase
          .from("listing_analysis_master")
          .insert({
            user_id: userId,
            document_ids: uploadedDocuments.map((d) => d.id),
            analysis: masterAnalysis,
            created_at: new Date().toISOString(),
          })
          .select();

        if (masterError) throw masterError;

        // Return the analysis data to parent component
        onAnalysisComplete(masterAnalysis);
      }

      setProgress(100);
      setFiles([]);
    } catch (err: any) {
      console.error("Error processing documents:", err);
      setError(err.message || "Failed to process documents");
    } finally {
      setUploading(false);
      setProcessing(false);
      onProcessingStateChange(false);
    }
  };

  // Helper function to combine multiple document analyses
  const combineAnalyses = (analyses: any[]) => {
    // This is a simplified version - in a real implementation,
    // you would have more sophisticated logic to merge the analyses
    const masterAnalysis = {
      title: "",
      description: "",
      category: "",
      location: "",
      contact: {
        phone: "",
        email: "",
        website: "",
      },
      features: [],
      amenities: [],
      hours: {},
      images: [],
      price_range: "",
      highlights: [],
      details: {},
    };

    // Merge analyses by taking the most complete information
    analyses.forEach((analysis) => {
      // Use the first non-empty value for simple fields
      if (!masterAnalysis.title && analysis.title)
        masterAnalysis.title = analysis.title;
      if (!masterAnalysis.description && analysis.description)
        masterAnalysis.description = analysis.description;
      if (!masterAnalysis.category && analysis.category)
        masterAnalysis.category = analysis.category;
      if (!masterAnalysis.location && analysis.location)
        masterAnalysis.location = analysis.location;
      if (!masterAnalysis.price_range && analysis.price_range)
        masterAnalysis.price_range = analysis.price_range;

      // Merge contact information
      if (analysis.contact) {
        if (!masterAnalysis.contact.phone && analysis.contact.phone)
          masterAnalysis.contact.phone = analysis.contact.phone;
        if (!masterAnalysis.contact.email && analysis.contact.email)
          masterAnalysis.contact.email = analysis.contact.email;
        if (!masterAnalysis.contact.website && analysis.contact.website)
          masterAnalysis.contact.website = analysis.contact.website;
      }

      // Merge arrays
      if (analysis.features)
        masterAnalysis.features = [
          ...new Set([...masterAnalysis.features, ...analysis.features]),
        ];
      if (analysis.amenities)
        masterAnalysis.amenities = [
          ...new Set([...masterAnalysis.amenities, ...analysis.amenities]),
        ];
      if (analysis.highlights)
        masterAnalysis.highlights = [
          ...new Set([...masterAnalysis.highlights, ...analysis.highlights]),
        ];

      // Merge hours (take the first complete set)
      if (
        analysis.hours &&
        Object.keys(analysis.hours).length > 0 &&
        Object.keys(masterAnalysis.hours).length === 0
      ) {
        masterAnalysis.hours = analysis.hours;
      }

      // Merge images
      if (analysis.images)
        masterAnalysis.images = [...masterAnalysis.images, ...analysis.images];

      // Merge details object
      if (analysis.details) {
        masterAnalysis.details = {
          ...masterAnalysis.details,
          ...analysis.details,
        };
      }
    });

    return masterAnalysis;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <FileUp className="h-5 w-5" />
            <span>Upload Documents</span>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.csv,.xlsx,.xls"
            disabled={uploading || processing}
          />
        </label>
        <span className="text-sm text-gray-500">
          Upload brochures, menus, spreadsheets (CSV, XLSX), PDFs, or other
          business documents
        </span>
      </div>

      {files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Selected Documents</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={uploadAndProcessFiles}
                  disabled={uploading || processing}
                >
                  {uploading || processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploading ? "Uploading..." : "Processing..."}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Process Documents
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={uploading || processing}
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(uploading || processing) && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {uploading ? "Uploading documents..." : "Processing documents..."}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {uploadedDocs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Processed Documents</h3>
          <div className="space-y-2">
            {uploadedDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-sm truncate max-w-[200px]">
                    {doc.name}
                  </span>
                </div>
                <Badge
                  variant={doc.status === "processed" ? "success" : "secondary"}
                >
                  {doc.status === "processed" ? (
                    <>
                      <Check className="h-3 w-3 mr-1" /> Processed
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />{" "}
                      Processing
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 flex items-center space-x-1">
          <X className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
