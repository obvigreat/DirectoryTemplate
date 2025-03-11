"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Star,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Listing {
  id: string | number;
  title: string;
  description?: string;
  status: string;
  created_at: string;
  user_id: string;
  category_id?: string;
  image_url?: string;
  rating?: number;
  reviews_count?: number;
  location?: string;
  price_level?: string;
  user?: {
    name: string;
    email: string;
  };
  categories?: {
    name: string;
  };
}

interface AdminListingTableProps {
  listings: Listing[];
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onCategoryFilterChange: (category: string) => void;
  onStatusFilterChange: (status: string) => void;
  onDelete?: (listingId: string | number) => void;
  onApprove?: (listingId: string | number) => void;
  onReject?: (listingId: string | number) => void;
  onFeature?: (listingId: string | number) => void;
}

export default function AdminListingTable({
  listings,
  searchQuery,
  categoryFilter,
  statusFilter,
  onSearchChange,
  onCategoryFilterChange,
  onStatusFilterChange,
  onDelete,
  onApprove,
  onReject,
  onFeature,
}: AdminListingTableProps) {
  const router = useRouter();
  const [selectedListings, setSelectedListings] = useState<(string | number)[]>(
    [],
  );

  // Filter listings based on search query and filters
  const filteredListings = listings.filter((listing) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (listing.description &&
        listing.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (listing.location &&
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory =
      categoryFilter === "all" || listing.category_id === categoryFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" || listing.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedListings(filteredListings.map((listing) => listing.id));
    } else {
      setSelectedListings([]);
    }
  };

  const handleSelectListing = (listingId: string | number) => {
    if (selectedListings.includes(listingId)) {
      setSelectedListings(selectedListings.filter((id) => id !== listingId));
    } else {
      setSelectedListings([...selectedListings, listingId]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <XCircle className="w-3 h-3 mr-1" /> Inactive
          </Badge>
        );
      case "featured":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Star className="w-3 h-3 mr-1" /> Featured
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const getPriceLevelDisplay = (priceLevel?: string) => {
    if (!priceLevel) return "--";

    const level = parseInt(priceLevel);
    const symbols = Array(level).fill("$").join("");

    return <span className="text-gray-700">{symbols}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedListings.length} listings selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={() => {
                // Handle bulk approve
                selectedListings.forEach((listingId) => onApprove?.(listingId));
                setSelectedListings([]);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
              onClick={() => {
                // Handle bulk feature
                selectedListings.forEach((listingId) => onFeature?.(listingId));
                setSelectedListings([]);
              }}
            >
              <Star className="w-4 h-4 mr-1" /> Feature
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${selectedListings.length} listings?`,
                  )
                ) {
                  // Handle bulk delete
                  selectedListings.forEach((listingId) =>
                    onDelete?.(listingId),
                  );
                  setSelectedListings([]);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      )}

      {/* Listings Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={handleSelectAll}
                  checked={
                    selectedListings.length === filteredListings.length &&
                    filteredListings.length > 0
                  }
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Listing
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedListings.includes(listing.id)}
                      onChange={() => handleSelectListing(listing.id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden bg-gray-100">
                        {listing.image_url ? (
                          <img
                            src={listing.image_url}
                            alt={listing.title}
                            className="h-10 w-10 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-500">
                            <MapPin className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 max-w-md">
                        <div className="text-sm font-medium text-gray-900">
                          {listing.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {listing.location || "No location"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {listing.user?.name || "Unknown user"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {listing.categories?.name || "Uncategorized"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(listing.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {listing.rating ? (
                        <>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">
                            {listing.rating.toFixed(1)}
                            <span className="text-gray-400 text-xs ml-1">
                              ({listing.reviews_count || 0})
                            </span>
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No ratings
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getPriceLevelDisplay(listing.price_level)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/listings/${listing.id}`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/listings/${listing.id}/edit`)
                          }
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {listing.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => onApprove?.(listing.id)}
                            className="text-green-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                          </DropdownMenuItem>
                        )}
                        {listing.status !== "featured" && (
                          <DropdownMenuItem
                            onClick={() => onFeature?.(listing.id)}
                            className="text-yellow-600"
                          >
                            <Star className="w-4 h-4 mr-2" /> Feature
                          </DropdownMenuItem>
                        )}
                        {listing.status !== "inactive" && (
                          <DropdownMenuItem
                            onClick={() => onReject?.(listing.id)}
                            className="text-gray-600"
                          >
                            <XCircle className="w-4 h-4 mr-2" /> Deactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${listing.title}?`,
                              )
                            ) {
                              onDelete?.(listing.id);
                            }
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No listings found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
