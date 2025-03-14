import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Award, Search, Filter, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Members | Directory",
  description: "Browse and connect with members of our community",
};

export default function CommunityMembersPage() {
  // Mock data for members
  const members = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      role: "Business Owner",
      company: "Coastal Breeze Cafe",
      location: "Miami, FL",
      joined: "2022-05-12",
      posts: 87,
      badges: ["Top Contributor", "Verified Business"],
      bio: "Owner of Coastal Breeze Cafe, a beachside coffee shop specializing in organic brews and fresh pastries.",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      role: "Marketing Consultant",
      company: "Digital Marketing Solutions",
      location: "New York, NY",
      joined: "2022-07-23",
      posts: 64,
      badges: ["Expert"],
      bio: "Digital marketing consultant specializing in helping small businesses grow their online presence.",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "SEO Specialist",
      company: "Search Rank Pro",
      location: "Chicago, IL",
      joined: "2022-09-05",
      posts: 53,
      badges: ["Top Contributor"],
      bio: "SEO specialist with 8+ years of experience helping businesses improve their search rankings and visibility.",
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      role: "Business Owner",
      company: "Tech Hub Coworking",
      location: "Austin, TX",
      joined: "2022-11-18",
      posts: 42,
      badges: ["Verified Business"],
      bio: "Founder of Tech Hub Coworking, a modern workspace for entrepreneurs, freelancers, and remote workers.",
    },
    {
      id: 5,
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      role: "Customer Experience Manager",
      company: "Stellar Service Inc.",
      location: "San Francisco, CA",
      joined: "2023-01-07",
      posts: 38,
      badges: [],
      bio: "Customer experience professional passionate about helping businesses create exceptional service experiences.",
    },
    {
      id: 6,
      name: "David Clark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      role: "Business Owner",
      company: "Sunset Yoga Studio",
      location: "Los Angeles, CA",
      joined: "2023-02-15",
      posts: 31,
      badges: ["Verified Business"],
      bio: "Owner of Sunset Yoga Studio, offering a variety of yoga classes for all levels in a peaceful, welcoming environment.",
    },
    {
      id: 7,
      name: "Lisa Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      role: "Community Manager",
      company: "Business Network Association",
      location: "Seattle, WA",
      joined: "2023-03-22",
      posts: 76,
      badges: ["Top Contributor", "Moderator"],
      bio: "Community manager dedicated to fostering meaningful connections between business professionals.",
    },
    {
      id: 8,
      name: "Robert Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      role: "Financial Advisor",
      company: "Prosperity Financial Planning",
      location: "Boston, MA",
      joined: "2023-04-10",
      posts: 29,
      badges: ["Expert"],
      bio: "Financial advisor specializing in small business financial planning, retirement strategies, and investment management.",
    },
  ];

  // Member roles for filtering
  const roles = [
    "All Roles",
    "Business Owner",
    "Marketing Consultant",
    "SEO Specialist",
    "Customer Experience Manager",
    "Community Manager",
    "Financial Advisor",
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Members</h1>
          <p className="text-gray-600">
            Browse and connect with members of our business community
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              {roles.map((role) => (
                <option key={role} value={role === "All Roles" ? "" : role}>
                  {role}
                </option>
              ))}
            </select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {members.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden hover:shadow-md transition-shadow h-full"
            >
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">
                    <Link
                      href={`/community/members/${member.id}`}
                      className="hover:text-purple-600 transition-colors"
                    >
                      {member.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.company}</p>

                  {member.badges.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {member.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`text-xs px-2 py-1 rounded-full flex items-center ${badge === "Top Contributor" ? "bg-yellow-100 text-yellow-800" : badge === "Verified Business" ? "bg-blue-100 text-blue-800" : badge === "Expert" ? "bg-green-100 text-green-800" : badge === "Moderator" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {badge === "Top Contributor" && (
                            <Award className="h-3 w-3 mr-1" />
                          )}
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {new Date(member.joined).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {member.posts} posts
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" /> Message
                  </Button>
                  <Button size="sm" className="flex-1 text-xs">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
