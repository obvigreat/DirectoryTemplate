"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, X, Image, FileText, Check } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  bucket?: string;
  path?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export default function FileUpload({
  onUploadComplete,
  bucket = "listings",
  path = "",
  accept = "image/*",
  maxSize = 5, // 5MB default
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // Validate file type
    if (!file.type.match(accept.replace("*", ".*"))) {
      setError(`Invalid file type. Please upload ${accept}`);
      return;
    }

    setError(null);
    setIsUploading(true);
    setProgress(0);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("path", path);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      // Upload file
      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      setProgress(100);

      // Call the callback with the URL
      onUploadComplete(data.url);
    } catch (err: any) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="w-full">
            <div className="flex items-center justify-center mb-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-2 text-gray-500">
              Uploading... {progress}%
            </p>
          </div>
        ) : progress === 100 ? (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-2 mb-2">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Upload complete!</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                setProgress(0);
              }}
            >
              Upload another
            </Button>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm font-medium mb-1">
              Drag and drop your file here
            </p>
            <p className="text-xs text-gray-500 mb-3">or click to browse</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleChange}
              accept={accept}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Select File
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Max file size: {maxSize}MB
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center">
          <X className="w-4 h-4 mr-1" /> {error}
        </div>
      )}
    </div>
  );
}
