"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check, X } from "lucide-react";

interface AiSuggestionsProps {
  field: string;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function AiSuggestions({
  field,
  suggestions,
  onSelect,
}: AiSuggestionsProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );

  const handleSelect = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    onSelect(suggestion);
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="mt-2 border-blue-200 bg-blue-50">
      <CardContent className="p-3">
        <div className="flex items-center mb-2">
          <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-800">
            AI Suggestions for {field}
          </span>
        </div>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-sm text-blue-700">{suggestion}</p>
              <div className="flex space-x-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 rounded-full text-green-600 hover:text-green-700 hover:bg-green-100"
                  onClick={() => handleSelect(suggestion)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 rounded-full text-red-600 hover:text-red-700 hover:bg-red-100"
                  onClick={() => setSelectedSuggestion(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
