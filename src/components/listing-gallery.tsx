"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingGalleryProps {
  images: string[];
  title?: string;
}

export default function ListingGallery({
  images,
  title = "Listing",
}: ListingGalleryProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use a default image if no images are provided
  const galleryImages =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        ];

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openGallery(0)}
        >
          <img
            src={galleryImages[0]}
            alt={`${title} - Main Image`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="h-40 md:h-[11.5rem] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openGallery(index + 1)}
            >
              <img
                src={image}
                alt={`${title} - Image ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          {galleryImages.length > 5 && (
            <Button
              variant="secondary"
              className="h-40 md:h-[11.5rem] rounded-lg flex flex-col items-center justify-center"
              onClick={() => openGallery(5)}
            >
              <span className="text-lg font-medium">
                +{galleryImages.length - 5}
              </span>
              <span className="text-sm">more photos</span>
            </Button>
          )}

          {/* If there are fewer than 5 images, fill with placeholders */}
          {galleryImages.length < 5 &&
            Array.from({ length: 5 - galleryImages.length }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="h-40 md:h-[11.5rem] bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400">No Image</span>
              </div>
            ))}
        </div>
      </div>

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-5xl p-0 bg-black/90 border-none">
          <div className="relative h-[80vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={closeGallery}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <img
              src={galleryImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
