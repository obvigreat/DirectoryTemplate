"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface SettingsFormProps {
  settingKey: string;
  initialValues: Record<string, any>;
  onSuccess?: () => void;
}

export default function SettingsForm({
  settingKey,
  initialValues,
  onSuccess,
}: SettingsFormProps) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: settingKey,
          value: values,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update settings");
      }

      toast({
        title: "Settings updated",
        description: "Your settings have been saved successfully.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(values).map(([key, value]) => {
        // Handle different types of inputs based on value type
        if (typeof value === "boolean") {
          return (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <h4 className="font-medium capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {`Enable or disable ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={value}
                  onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                />
              </div>
            </div>
          );
        } else if (key.toLowerCase().includes("color")) {
          return (
            <div
              key={key}
              className="space-y-2 py-3 border-b border-gray-100 last:border-0"
            >
              <Label htmlFor={key} className="capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={key}
                  name={key}
                  value={value as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
                <input
                  type="color"
                  value={value as string}
                  className="h-10 w-10 rounded-md border border-input"
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            </div>
          );
        } else if (
          key.toLowerCase().includes("description") ||
          key.toLowerCase().includes("about")
        ) {
          return (
            <div
              key={key}
              className="space-y-2 py-3 border-b border-gray-100 last:border-0"
            >
              <Label htmlFor={key} className="capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
              <textarea
                id={key}
                name={key}
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
                rows={3}
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          );
        } else if (
          key.toLowerCase().includes("password") ||
          key.toLowerCase().includes("key") ||
          key.toLowerCase().includes("secret")
        ) {
          return (
            <div
              key={key}
              className="space-y-2 py-3 border-b border-gray-100 last:border-0"
            >
              <Label htmlFor={key} className="capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
              <Input
                id={key}
                name={key}
                type="password"
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          );
        } else {
          return (
            <div
              key={key}
              className="space-y-2 py-3 border-b border-gray-100 last:border-0"
            >
              <Label htmlFor={key} className="capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
              <Input
                id={key}
                name={key}
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          );
        }
      })}

      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
