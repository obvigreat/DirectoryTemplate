"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

export default function ProcessAnalyticsButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const processAnalytics = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analytics/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to process analytics");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error processing analytics:", error);
      setResult({ error: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={processAnalytics}
        disabled={loading}
        variant="outline"
        size="sm"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" /> Process Analytics Data
          </>
        )}
      </Button>

      {result && (
        <div className="mt-2 text-sm">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <p className="text-green-500">
              {result.message || "Processing complete"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
