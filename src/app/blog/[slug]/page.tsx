import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // In a real app, fetch the article data from your database
  const article = getBlogPostBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | Blog`,
    description: article.excerpt,
  };
}

// This would be replaced with a real database query in a production app
function getBlogPostBySlug(slug: string) {
  const posts = [
    {
      id: 1,
      title: "10 Tips for Creating an Effective Business Listing",
      excerpt:
        "Learn how to create a business listing that stands out and attracts more customers.",
      category: "Tips & Tricks",
      author: "Jane Smith",
      authorBio:
        "Jane is a digital marketing specialist with over 10 years of experience helping small businesses grow their online presence.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      date: "2023-11-15",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
      slug: "10-tips-for-creating-effective-business-listing",
      content: `
        <p>Creating an effective business listing is crucial for attracting potential customers and standing out from the competition. Whether you're listing your business on our directory or other platforms, these tips will help you create a listing that gets results.</p>
        
        <h2>1. Use a Clear, Descriptive Title</h2>
        <p>Your listing title should clearly communicate what your business offers. Avoid using excessive keywords or unnecessary punctuation. Instead, focus on being descriptive and straightforward.</p>
        
        <h2>2. Write a Compelling Description</h2>
        <p>Your business description should be comprehensive yet concise. Start with a strong opening that captures attention, then highlight your unique selling points, services offered, and why customers should choose you over competitors.</p>
        
        <h2>3. Add High-Quality Photos</h2>
        <p>Visual content significantly increases engagement. Include professional, high-resolution photos of your business, products, or services. Show your physical location, team members, and customers enjoying your offerings.</p>
        
        <h2>4. Include Complete Contact Information</h2>
        <p>Make it easy for potential customers to reach you by providing complete and accurate contact information, including phone number, email, website, and physical address if applicable.</p>
        
        <h2>5. Highlight Your Business Hours</h2>
        <p>Clearly display your operating hours to help customers plan their visit. Be sure to update this information if your hours change seasonally or for holidays.</p>
        
        <h2>6. Showcase Customer Reviews</h2>
        <p>Positive reviews build trust and credibility. Encourage satisfied customers to leave reviews on your listing and respond to them professionally.</p>
        
        <h2>7. List Your Products or Services</h2>
        <p>Provide a comprehensive list of what you offer, including prices if appropriate. This helps potential customers understand if your business meets their needs.</p>
        
        <h2>8. Add Relevant Categories and Tags</h2>
        <p>Select the most appropriate categories and tags for your business to ensure your listing appears in relevant searches.</p>
        
        <h2>9. Include Special Features or Amenities</h2>
        <p>Highlight any special features, amenities, or accessibility options your business offers, such as free Wi-Fi, parking, wheelchair accessibility, or pet-friendly policies.</p>
        
        <h2>10. Keep Your Listing Updated</h2>
        <p>Regularly review and update your listing to ensure all information remains accurate and current. This includes updating photos, hours, contact information, and services as they change.</p>
        
        <p>By following these tips, you'll create a business listing that effectively showcases what makes your business special and attracts more potential customers.</p>
      `,
      tags: ["Business Listing", "Marketing", "Tips", "Online Presence"],
      relatedPosts: [4, 5, 6],
    },
    {
      id: 2,
      title: "How Local Businesses Are Thriving in the Digital Age",
      excerpt:
        "Discover strategies that successful local businesses are using to compete in today's digital marketplace.",
      category: "Business",
      author: "John Doe",
      authorBio:
        "John is a business consultant specializing in helping local businesses adapt to the digital landscape.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      date: "2023-11-10",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      slug: "local-businesses-thriving-digital-age",
      content: `<p>The digital age has transformed how businesses operate, but local businesses continue to thrive by adapting and leveraging new technologies...</p>`,
      tags: ["Digital Marketing", "Local Business", "Growth Strategies"],
      relatedPosts: [1, 3, 7],
    },
    {
      id: 3,
      title: "The Future of Local Search: What Business Owners Need to Know",
      excerpt:
        "Stay ahead of the curve with insights into upcoming trends in local search and directory listings.",
      category: "Trends",
      author: "Sarah Johnson",
      authorBio:
        "Sarah is an SEO specialist focusing on local search optimization for small businesses.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      date: "2023-11-05",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80",
      slug: "future-of-local-search",
      content: `<p>Local search is constantly evolving, and staying informed about upcoming trends is crucial for business owners who want to maintain visibility...</p>`,
      tags: ["SEO", "Local Search", "Trends", "Google Business Profile"],
      relatedPosts: [1, 2, 6],
    },
    {
      id: 4,
      title: "5 Ways to Improve Your Business's Online Presence",
      excerpt:
        "Simple strategies to enhance your visibility and attract more customers online.",
      category: "Marketing",
      author: "Michael Brown",
      authorBio:
        "Michael is a digital marketing consultant who helps small businesses build effective online strategies.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      date: "2023-11-01",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      slug: "improve-business-online-presence",
      content: `<p>Having a strong online presence is essential for businesses of all sizes in today's digital world...</p>`,
      tags: ["Online Presence", "Digital Marketing", "Website", "Social Media"],
      relatedPosts: [1, 5, 7],
    },
    {
      id: 5,
      title: "Understanding Customer Reviews: The Good, The Bad, and The Ugly",
      excerpt:
        "Learn how to effectively manage and respond to all types of customer reviews.",
      category: "Customer Service",
      author: "Emily Wilson",
      authorBio:
        "Emily specializes in customer experience management and reputation building for local businesses.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      date: "2023-10-28",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      slug: "understanding-customer-reviews",
      content: `<p>Customer reviews can make or break a business in today's digital marketplace...</p>`,
      tags: ["Customer Reviews", "Reputation Management", "Customer Service"],
      relatedPosts: [1, 4, 6],
    },
    {
      id: 6,
      title: "The Power of Local SEO for Small Businesses",
      excerpt:
        "Discover how local SEO can help your small business reach more customers in your area.",
      category: "SEO",
      author: "David Clark",
      authorBio:
        "David is an SEO expert who focuses on helping small businesses improve their local search rankings.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      date: "2023-10-25",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
      slug: "power-of-local-seo",
      content: `<p>Local SEO is a powerful tool for small businesses looking to attract more customers from their surrounding area...</p>`,
      tags: ["SEO", "Local Business", "Google Maps", "Search Rankings"],
      relatedPosts: [1, 3, 5],
    },
    {
      id: 7,
      title: "Building Community Around Your Business",
      excerpt:
        "Strategies for creating a loyal customer base and fostering community engagement.",
      category: "Community",
      author: "Lisa Chen",
      authorBio:
        "Lisa is a community building expert who helps businesses create meaningful connections with their customers.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      date: "2023-10-20",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
      slug: "building-community-around-business",
      content: `<p>Building a community around your business can lead to increased customer loyalty, word-of-mouth marketing, and sustainable growth...</p>`,
      tags: ["Community Building", "Customer Loyalty", "Engagement"],
      relatedPosts: [2, 4, 5],
    },
  ];

  return posts.find((post) => post.slug === slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = post.relatedPosts
    .map((id) => {
      const allPosts = [
        // Same array as above, but we're simplifying for this example
        // In a real app, you'd fetch this from your database
      ];
      return allPosts.find((p) => p.id === id);
    })
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>{" "}
          {" / "}
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>{" "}
          {" / "}
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
            className="hover:text-blue-600"
          >
            {post.category}
          </Link>{" "}
          {" / "}
          <span className="text-gray-700">{post.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Article Header */}
            <div className="mb-8">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Share This Article</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Facebook className="h-4 w-4 mr-2" /> Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">
                        About {post.author}
                      </h3>
                      <p className="text-gray-600">{post.authorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Comments (3)</h3>

              {/* Comment Form */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium mb-4">Leave a Comment</h4>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium mb-1"
                      >
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit">Post Comment</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Sample Comments */}
              <div className="space-y-4">
                {[
                  {
                    name: "Robert Johnson",
                    date: "2023-11-16",
                    content:
                      "Great article! These tips have been really helpful for my business listing. I've already seen an increase in engagement since implementing some of these strategies.",
                  },
                  {
                    name: "Maria Garcia",
                    date: "2023-11-15",
                    content:
                      "I especially appreciate the tip about high-quality photos. It's something I overlooked initially, but after updating my listing with professional images, I've noticed a significant difference in customer interest.",
                  },
                  {
                    name: "Alex Thompson",
                    date: "2023-11-14",
                    content:
                      "Would love to see a follow-up article about how to effectively respond to customer reviews. That's an area I'm still struggling with as a business owner.",
                  },
                ].map((comment, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{comment.name}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Related Articles */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {post.relatedPosts.map((id) => {
                    const relatedPost = getBlogPostBySlug(
                      posts.find((p) => p.id === id)?.slug || "",
                    );
                    if (!relatedPost) return null;

                    return (
                      <div
                        key={relatedPost.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">
                            <Link
                              href={`/blog/${relatedPost.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(relatedPost.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
                    "Business Listing",
                    "Marketing",
                    "SEO",
                    "Local Business",
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// This would be replaced with a database query in a real app
const posts = [
  {
    id: 1,
    slug: "10-tips-for-creating-effective-business-listing",
  },
  {
    id: 2,
    slug: "local-businesses-thriving-digital-age",
  },
  {
    id: 3,
    slug: "future-of-local-search",
  },
  {
    id: 4,
    slug: "improve-business-online-presence",
  },
  {
    id: 5,
    slug: "understanding-customer-reviews",
  },
  {
    id: 6,
    slug: "power-of-local-seo",
  },
  {
    id: 7,
    slug: "building-community-around-business",
  },
];
