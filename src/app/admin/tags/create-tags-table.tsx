"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function CreateTagsTable() {
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const createTagsTable = async () => {
    setIsCreating(true);
    setStatus("loading");
    setMessage("Creating tags table...");

    try {
      const supabase = createClient();

      // Create tags table
      const { error: tagsError } = await supabase.rpc("create_tags_table");

      if (tagsError) {
        throw tagsError;
      }

      setStatus("success");
      setMessage("Tags table created successfully!");
    } catch (error: any) {
      console.error("Error creating tags table:", error);
      setStatus("error");
      setMessage(`Error: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Tags Table</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This will create the tags table and related junction table in your
          database.
        </p>

        {status === "success" && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <Button
          onClick={createTagsTable}
          disabled={isCreating || status === "success"}
          className="w-full"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Table Created
            </>
          ) : (
            "Create Tags Table"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
