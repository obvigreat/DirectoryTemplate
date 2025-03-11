import Link from "next/link";
import { ArrowUpRight, Check, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              Discover & Connect with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 block mt-2">
                Local Businesses
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Find the best places, read reviews, and connect with businesses in
              your area
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row mb-12">
              <div className="flex-1 flex items-center px-3 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  className="border-0 focus-visible:ring-0 text-black flex-1"
                />
              </div>
              <div className="flex-1 flex items-center px-3 py-2 border-t md:border-t-0 md:border-l border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="border-0 focus-visible:ring-0 text-black flex-1"
                />
              </div>
              <Button className="w-full md:w-auto mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-200" />
                <span>10,000+ Business Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-200" />
                <span>Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-200" />
                <span>200+ Cities Covered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
