import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Users,
  Award,
  Calendar,
  Search,
  ThumbsUp,
  MessageCircle,
  Clock,
  User,
  Filter,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Bell,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Forum | Directory",
  description:
    "Join our community forum to connect with other business owners and share insights",
};

export default function CommunityPage() {
  // Mock data for forum discussions
  const discussions = [
    {
      id: 1,
      title:
        "What marketing strategies have worked best for your local business?",
      author: "Jane Smith",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      category: "Marketing",
      replies: 24,
      views: 342,
      votes: 18,
      lastActivity: "2023-11-15T14:30:00Z",
      isPinned: true,
      isHot: true,
    },
    {
      id: 2,
      title: "How do you handle negative customer reviews?",
      author: "John Doe",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      category: "Customer Service",
      replies: 36,
      views: 512,
      votes: 27,
      lastActivity: "2023-11-14T09:15:00Z",
      isPinned: false,
      isHot: true,
    },
    {
      id: 3,
      title: "Tips for optimizing your business listing for local SEO",
      author: "Sarah Johnson",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      category: "SEO",
      replies: 19,
      views: 287,
      votes: 15,
      lastActivity: "2023-11-13T16:45:00Z",
      isPinned: true,
      isHot: false,
    },
    {
      id: 4,
      title:
        "Best tools for managing social media accounts for small businesses",
      author: "Michael Brown",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      category: "Tools & Resources",
      replies: 28,
      views: 376,
      votes: 22,
      lastActivity: "2023-11-12T11:20:00Z",
      isPinned: false,
      isHot: false,
    },
    {
      id: 5,
      title:
        "How to price your services competitively without undervaluing your work",
      author: "Emily Wilson",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      category: "Business Strategy",
      replies: 42,
      views: 589,
      votes: 31,
      lastActivity: "2023-11-11T13:10:00Z",
      isPinned: false,
      isHot: true,
    },
    {
      id: 6,
      title: "Strategies for building a loyal customer base",
      author: "David Clark",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      category: "Customer Retention",
      replies: 17,
      views: 245,
      votes: 13,
      lastActivity: "2023-11-10T15:30:00Z",
      isPinned: false,
      isHot: false,
    },
    {
      id: 7,
      title: "How has the pandemic changed your business model?",
      author: "Lisa Chen",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      category: "Business Strategy",
      replies: 53,
      views: 678,
      votes: 39,
      lastActivity: "2023-11-09T10:45:00Z",
      isPinned: false,
      isHot: true,
    },
  ];

  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: "Small Business Networking Mixer",
      date: "2023-11-25T18:00:00Z",
      location: "Virtual Event",
      attendees: 42,
    },
    {
      id: 2,
      title: "Marketing Workshop: Social Media Strategies",
      date: "2023-12-05T14:00:00Z",
      location: "Business Hub, New York",
      attendees: 28,
    },
    {
      id: 3,
      title: "Q&A Session with Successful Entrepreneurs",
      date: "2023-12-12T16:00:00Z",
      location: "Virtual Event",
      attendees: 65,
    },
  ];

  // Mock data for active members
  const activeMembers = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      posts: 87,
      joined: "2022-05-12",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      posts: 64,
      joined: "2022-07-23",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      posts: 53,
      joined: "2022-09-05",
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      posts: 42,
      joined: "2022-11-18",
    },
    {
      id: 5,
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      posts: 38,
      joined: "2023-01-07",
    },
  ];

  // Forum categories
  const categories = [
    { name: "Marketing", count: 42 },
    { name: "SEO", count: 28 },
    { name: "Customer Service", count: 35 },
    { name: "Business Strategy", count: 47 },
    { name: "Tools & Resources", count: 31 },
    { name: "Customer Retention", count: 24 },
    { name: "Local Business", count: 39 },
    { name: "Success Stories", count: 18 },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Community Forum
              </h1>
              <p className="text-lg md:text-xl mb-6 text-purple-100">
                Connect with other business owners, share insights, and learn
                from each other's experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-purple-700 hover:bg-purple-50">
                  <PlusCircle className="mr-2 h-4 w-4" /> Start a Discussion
                </Button>
                <Button
                  variant="outline"
                  className="bg-purple-700/20 hover:bg-purple-700/30 text-white border-white/20"
                >
                  <Bell className="mr-2 h-4 w-4" /> Subscribe to Updates
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forum Content */}
          <div className="lg:w-2/3">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
            </div>

            {/* Forum Tabs */}
            <Tabs defaultValue="discussions" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="discussions"
                  className="flex items-center justify-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex items-center justify-center"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" /> Popular
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="flex items-center justify-center"
                >
                  <Clock className="h-4 w-4 mr-2" /> Recent
                </TabsTrigger>
                <TabsTrigger
                  value="unanswered"
                  className="flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> Unanswered
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="mt-6">
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className={`hover:shadow-md transition-shadow ${discussion.isPinned ? "border-l-4 border-l-blue-500" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Vote Controls */}
                          <div className="flex flex-col items-center space-y-1 pt-2">
                            <button className="text-gray-400 hover:text-blue-500">
                              <ArrowUp className="h-5 w-5" />
                            </button>
                            <span className="font-medium text-sm">
                              {discussion.votes}
                            </span>
                            <button className="text-gray-400 hover:text-blue-500">
                              <ArrowDown className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Discussion Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {discussion.category}
                              </span>
                              {discussion.isPinned && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Pinned
                                </span>
                              )}
                              {discussion.isHot && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Hot
                                </span>
                              )}
                            </div>

                            <h3 className="font-bold text-lg mb-2">
                              <Link
                                href={`/community/discussion/${discussion.id}`}
                                className="hover:text-purple-600 transition-colors"
                              >
                                {discussion.title}
                              </Link>
                            </h3>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                                  <img
                                    src={discussion.authorAvatar}
                                    alt={discussion.author}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {discussion.author}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {discussion.replies} replies
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(
                                  discussion.lastActivity,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Discussions</Button>
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Popular discussions content would go here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Recent discussions content would go here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="unanswered" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Unanswered discussions content would go here
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Start a Discussion */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Start a New Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-1"
                    >
                      Title
                    </label>
                    <Input
                      id="title"
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
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium mb-1"
                    >
                      Content
                    </label>
                    <Textarea
                      id="content"
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
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            {/* Community Stats */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      1,245
                    </div>
                    <div className="text-sm text-gray-500">Members</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      3,872
                    </div>
                    <div className="text-sm text-gray-500">Discussions</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      15,634
                    </div>
                    <div className="text-sm text-gray-500">Replies</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">87</div>
                    <div className="text-sm text-gray-500">Online Now</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Upcoming Events</h3>
                  <Link
                    href="/community/events"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border-b pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="font-medium mb-1">
                        <Link
                          href={`/community/events/${event.id}`}
                          className="hover:text-purple-600 transition-colors"
                        >
                          {event.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="text-purple-500">
                          {event.attendees} attending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Members */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Active Members</h3>
                  <Link
                    href="/community/members"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeMembers.map((member) => (
                    <div key={member.id} className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          <Link
                            href={`/community/members/${member.id}`}
                            className="hover:text-purple-600 transition-colors"
                          >
                            {member.name}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-500">
                          {member.posts} posts
                        </div>
                      </div>
                      {member.id <= 3 && (
                        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" /> Top Contributor
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex justify-between items-center"
                    >
                      <Link
                        href={`/community/category/${category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors"
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
