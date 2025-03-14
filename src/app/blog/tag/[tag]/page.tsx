import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tagName = params.tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${tagName} Articles | Blog`,
    description: `Browse our collection of articles tagged with ${tagName.toLowerCase()}.`,
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  // Format the tag name for display
  const tagName = params.tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Mock data - in a real app, you would filter posts by tag from your database
  const posts = [
    {
      id: 1,
      title: "10 Tips for Creating an Effective Business Listing",
      excerpt:
        "Learn how to create a business listing that stands out and attracts more customers.",
      category: "Tips & Tricks",
      author: "Jane Smith",
      date: "2023-11-15",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
      slug: "10-tips-for-creating-effective-business-listing",
      tags: ["Business Listing", "Marketing", "Tips", "Online Presence"],
    },
    {
      id: 2,
      title: "How Local Businesses Are Thriving in the Digital Age",
      excerpt:
        "Discover strategies that successful local businesses are using to compete in today's digital marketplace.",
      category: "Business",
      author: "John Doe",
      date: "2023-11-10",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      slug: "local-businesses-thriving-digital-age",
      tags: ["Digital Marketing", "Local Business", "Growth Strategies"],
    },
    {
      id: 3,
      title: "The Future of Local Search: What Business Owners Need to Know",
      excerpt:
        "Stay ahead of the curve with insights into upcoming trends in local search and directory listings.",
      category: "Trends",
      author: "Sarah Johnson",
      date: "2023-11-05",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
      slug: "future-of-local-search",
      tags: ["SEO", "Local Search", "Trends", "Google Business Profile"],
    },
    {
      id: 4,
      title: "5 Ways to Improve Your Business's Online Presence",
      excerpt:
        "Simple strategies to enhance your visibility and attract more customers online.",
      category: "Marketing",
      author: "Michael Brown",
      date: "2023-11-01",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      slug: "improve-business-online-presence",
      tags: ["Online Presence", "Digital Marketing", "Website", "Social Media"],
    },
    {
      id: 5,
      title: "Understanding Customer Reviews: The Good, The Bad, and The Ugly",
      excerpt:
        "Learn how to effectively manage and respond to all types of customer reviews.",
      category: "Customer Service",
      author: "Emily Wilson",
      date: "2023-10-28",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      slug: "understanding-customer-reviews",
      tags: ["Customer Reviews", "Reputation Management", "Customer Service"],
    },
    {
      id: 6,
      title: "The Power of Local SEO for Small Businesses",
      excerpt:
        "Discover how local SEO can help your small business reach more customers in your area.",
      category: "SEO",
      author: "David Clark",
      date: "2023-10-25",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
      slug: "power-of-local-seo",
      tags: ["SEO", "Local Business", "Google Maps", "Search Rankings"],
    },
    {
      id: 7,
      title: "Building Community Around Your Business",
      excerpt:
        "Strategies for creating a loyal customer base and fostering community engagement.",
      category: "Community",
      author: "Lisa Chen",
      date: "2023-10-20",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      slug: "building-community-around-business",
      tags: ["Community Building", "Customer Loyalty", "Engagement"],
    },
  ];

  // Filter posts by tag
  const filteredPosts = posts.filter(
    (post) =>
      post.tags &&
      post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase()),
  );

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>{" "}
            {" / "}
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>{" "}
            {" / "}
            <span className="text-gray-700">Tag: {tagName}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Articles Tagged: {tagName}
          </h1>
          <p className="text-gray-600">
            Browse our collection of articles tagged with{" "}
            {tagName.toLowerCase()}.
          </p>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium mb-2">No articles found</h2>
            <p className="text-gray-600 mb-4">
              We couldn't find any articles with this tag.
            </p>
            <Button asChild>
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
