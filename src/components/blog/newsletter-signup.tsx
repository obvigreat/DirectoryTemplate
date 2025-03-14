import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "inline" | "card";
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
}

export default function NewsletterSignup({
  variant = "card",
  title = "Subscribe to Our Newsletter",
  description = "Get the latest articles, tips, and insights delivered directly to your inbox.",
  onSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // In a real app, you would call an API endpoint here
      // For now, we'll just simulate a successful submission
      if (onSubmit) {
        onSubmit(email);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (variant === "inline") {
    return (
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
      </div>
    );
  }

  // Card variant (default)
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> {message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
