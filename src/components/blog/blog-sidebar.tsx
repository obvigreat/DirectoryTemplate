import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  categories?: { name: string; count: number }[];
  tags?: string[];
  featuredAuthors?: { name: string; role: string }[];
  showNewsletter?: boolean;
}

export default function BlogSidebar({
  categories = [],
  tags = [],
  featuredAuthors = [],
  showNewsletter = true,
}: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex justify-between items-center"
                >
                  <Link
                    href={`/blog/category/${category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      {showNewsletter && (
        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest articles, tips, and insights delivered directly to
              your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Popular Tags */}
      {tags.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Authors */}
      {featuredAuthors.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-4">Featured Authors</h3>
            <div className="space-y-4">
              {featuredAuthors.map((author) => (
                <div key={author.name} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
