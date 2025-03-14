import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog & Articles | Directory",
  description: "Read the latest news, tips, and updates from our community",
};

export default function BlogPage() {
  // Mock data for blog posts
  const featuredPosts = [
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
    },
  ];

  const recentPosts = [
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
    },
  ];

  const categories = [
    { name: "All", count: 15 },
    { name: "Business", count: 4 },
    { name: "Marketing", count: 3 },
    { name: "SEO", count: 2 },
    { name: "Tips & Tricks", count: 5 },
    { name: "Trends", count: 3 },
    { name: "Community", count: 2 },
    { name: "Customer Service", count: 1 },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Blog & Articles
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100">
                Discover insights, tips, and stories from our community of
                business owners and experts.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  Browse Categories
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Blog Posts */}
          <div className="md:w-2/3">
            {/* Featured Posts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
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
            </section>

            {/* Recent Posts */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Articles</h2>
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-5">
                          <h3 className="font-bold text-xl mb-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More Articles</Button>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:w-1/3">
            {/* Categories */}
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

            {/* Newsletter Signup */}
            <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest articles, tips, and insights delivered directly
                  to your inbox.
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

            {/* Popular Tags */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Business",
                    "Marketing",
                    "SEO",
                    "Local",
                    "Tips",
                    "Growth",
                    "Social Media",
                    "Customer Service",
                    "Reviews",
                    "Strategy",
                  ].map((tag) => (
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

            {/* Featured Authors */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-4">Featured Authors</h3>
                <div className="space-y-4">
                  {["Jane Smith", "John Doe", "Sarah Johnson"].map((author) => (
                    <div key={author} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        {author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{author}</p>
                        <p className="text-xs text-gray-500">Content Writer</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
