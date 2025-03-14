import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface DiscussionFormProps {
  categories: { name: string; count: number }[];
  onSubmit?: (data: {
    title: string;
    category: string;
    content: string;
  }) => void;
}

export default function DiscussionForm({
  categories = [],
  onSubmit,
}: DiscussionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form after submission
    setFormData({ title: "", category: "", content: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Discussion</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              placeholder="Share your thoughts, questions, or insights..."
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <MessageSquare className="mr-2 h-4 w-4" /> Post Discussion
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
