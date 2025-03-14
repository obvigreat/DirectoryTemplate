"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

type TagGroup = {
  name: string;
  id: string;
  tags: {
    id: string;
    name: string;
    slug: string;
    color: string;
  }[];
};

export default function TagSelector({
  selectedTags = [],
  onChange,
  maxTags = 10,
}: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagGroups, setTagGroups] = useState<TagGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("business-type");
  const supabase = createClient();

  // Fetch tags from Supabase
  useEffect(() => {
    async function fetchTags() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("tags")
          .select("id, name, slug, color, description")
          .order("name");

        if (error) throw error;

        // Group tags by color (which we're using to represent categories)
        const groups: Record<string, any[]> = {};

        // Define our main groups
        const groupDefinitions = [
          { id: "business-type", name: "Business Type", colors: ["blue"] },
          { id: "business-model", name: "Business Model", colors: ["green"] },
          { id: "growth-stage", name: "Growth Stage", colors: ["purple"] },
          { id: "operational", name: "Operational", colors: ["orange"] },
          { id: "special", name: "Special Categories", colors: ["red"] },
          {
            id: "financial",
            name: "Financial & Profitability",
            colors: ["teal"],
          },
          { id: "market", name: "Market Position", colors: ["indigo"] },
          {
            id: "scalability",
            name: "Scalability & Expansion",
            colors: ["cyan"],
          },
          { id: "customer", name: "Customer Base", colors: ["pink"] },
          { id: "risk", name: "Risk & Stability", colors: ["yellow"] },
          {
            id: "lifestyle",
            name: "Lifestyle & Owner Alignment",
            colors: ["lime"],
          },
          { id: "mission", name: "Mission & Values", colors: ["emerald"] },
          {
            id: "technology",
            name: "Technology & Innovation",
            colors: ["violet"],
          },
          { id: "metrics", name: "Advanced Metrics", colors: ["amber"] },
          { id: "deal", name: "Deal & Transaction", colors: ["rose"] },
          { id: "other", name: "Other Tags", colors: ["gray"] },
        ];

        // Initialize groups
        groupDefinitions.forEach((group) => {
          groups[group.id] = [];
        });

        // Sort tags into groups
        data?.forEach((tag) => {
          // Find which group this tag belongs to based on color
          const group =
            groupDefinitions.find((g) => g.colors.includes(tag.color)) ||
            groupDefinitions[groupDefinitions.length - 1];
          groups[group.id].push(tag);
        });

        // Convert to array format for state
        const groupsArray = groupDefinitions
          .map((group) => ({
            name: group.name,
            id: group.id,
            tags: groups[group.id] || [],
          }))
          .filter((group) => group.tags.length > 0);

        setTagGroups(groupsArray);
        setActiveTab(groupsArray[0]?.id || "business-type");
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, [supabase]);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId));
    } else {
      if (selectedTags.length >= maxTags) {
        alert(`You can only select up to ${maxTags} tags`);
        return;
      }
      onChange([...selectedTags, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    onChange(selectedTags.filter((id) => id !== tagId));
  };

  const filteredTagGroups = tagGroups
    .map((group) => ({
      ...group,
      tags: group.tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((group) => group.tags.length > 0);

  // Find tag by ID
  const findTagById = (tagId: string) => {
    for (const group of tagGroups) {
      const tag = group.tags.find((t) => t.id === tagId);
      if (tag) return tag;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Selected Tags */}
      <div>
        <Label className="mb-2 block">
          Selected Tags ({selectedTags.length}/{maxTags})
        </Label>
        <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md bg-muted/20">
          {selectedTags.length === 0 ? (
            <p className="text-sm text-muted-foreground p-1">
              No tags selected
            </p>
          ) : (
            selectedTags.map((tagId) => {
              const tag = findTagById(tagId);
              if (!tag) return null;
              return (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => removeTag(tag.id)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tag Selection */}
      {loading ? (
        <div className="text-center py-4">Loading tags...</div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto">
            {tagGroups.map((group) => (
              <TabsTrigger key={group.id} value={group.id} className="text-xs">
                {group.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredTagGroups.map((group) => (
            <TabsContent key={group.id} value={group.id} className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {group.tags.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onCheckedChange={() => toggleTag(tag.id)}
                    />
                    <Label
                      htmlFor={`tag-${tag.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {tag.name}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
