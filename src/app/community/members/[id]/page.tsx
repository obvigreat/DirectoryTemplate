import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Globe,
  MessageSquare,
  User,
  Clock,
  ThumbsUp,
  Share,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // In a real app, fetch the member data from your database
  const member = getMemberById(parseInt(params.id));

  if (!member) {
    return {
      title: "Member Not Found",
      description: "The requested member could not be found.",
    };
  }

  return {
    title: `${member.name} | Community Member Profile`,
    description: member.bio.substring(0, 160),
  };
}

// This would be replaced with a real database query in a production app
function getMemberById(id: number) {
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
      bio: "Owner of Coastal Breeze Cafe, a beachside coffee shop specializing in organic brews and fresh pastries. With over 10 years of experience in the food and beverage industry, I'm passionate about creating a welcoming space where people can enjoy quality coffee and delicious treats while taking in the ocean views.",
      website: "https://www.coastalbreezecafe.com",
      email: "jane@coastalbreezecafe.com",
      social: {
        twitter: "@CoastalBreezeCafe",
        linkedin: "janesmith",
        instagram: "@coastalbreezecafe",
      },
      interests: [
        "Coffee",
        "Baking",
        "Sustainable Business",
        "Local Sourcing",
        "Community Building",
      ],
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
      bio: "Digital marketing consultant specializing in helping small businesses grow their online presence. I focus on creating effective, data-driven marketing strategies that deliver real results without breaking the bank.",
      website: "https://www.digitalmarketingsolutions.com",
      email: "john@digitalmarketingsolutions.com",
      social: {
        twitter: "@JohnDoeMarketing",
        linkedin: "johndoe",
        instagram: "@johndoemarketing",
      },
      interests: [
        "Digital Marketing",
        "SEO",
        "Content Strategy",
        "Social Media",
        "Analytics",
      ],
    },
  ];

  return members.find((member) => member.id === id);
}

export default function MemberProfilePage({ params }: { params: { id: string } }) {
  const member = getMemberById(parseInt(params.id));

  if (!member) {
    notFound();
  }

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "discussion",
      title: "What marketing strategies have worked best for your local business?",
      date: "2023-11-15T14:30:00Z",
      link: "/community/discussion/1",
    },
    {
      id: 2,
      type: "comment",
      title: "Commented on 'How do you handle negative customer reviews?'",
      date: "2023-11-14T09:15:00Z",
      link: "/community/discussion/2",
    },
    {
      id: 3,
      type: "event",
      title: "Attending 'Small Business Networking Mixer'",
      date: "2023-11-13T16:45:00Z",
      link: "/community/events/1",
    },
  ];

  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "What marketing strategies have worked best for your local business?",
      excerpt:
        "I've been running my local bakery for about two years now, and I'm always looking for new ways to attract customers...",
      date: "2023-11-15T14:30:00Z",
      replies: 24,
      views: 342,
      votes: 18,
    },
    {
      id: 4,
      title:
        "Best tools for managing social media accounts for small businesses",
      excerpt:
        "I'm looking for recommendations on tools to help manage multiple social media accounts efficiently...",
      date: "2023-11-12T11:20:00Z",
      replies: 28,
      views: 376,
      votes: 22,
    },
    {
      id: 7,
      title: "How has the pandemic changed your business model?",
      excerpt:
        "I'm curious to hear how other business owners have adapted their operations in response to the pandemic...",
      date: "2023-11-09T10:45:00Z",
      replies: 53,
      views: 678,
      votes: 39,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>{" "}
          {" / "}
          <Link href="/community" className="hover:text-purple-600">
            Community
          </Link>{" "}
          {" / "}
          <Link href="/community/members" className="hover:text-purple-600">
            Members
          </Link>{" "}
          {" / "}
          <span className="text-gray-700">{member.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:w-1/3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-2xl font-bold mb-1">{member.name}</h1>
                  <p className="text-gray-600">{member.role}</p>
                  <p className="text-gray-500 mb-3">{member.company}</p>

                  {member.badges.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
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

                  <div className="flex gap-2 w-full">
                    <Button className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" /> Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share className="h-4 w-4 mr-2" /> Share Profile
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{member.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Company</p>
                      <p className="text-gray-600">{member.company}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Member Since</p>
                      <p className="text-gray-600">
                        {new Date(member.joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {member.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {member.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}

                  {member.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            {member.interests && member.interests.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Links */}
            {member.social && Object.keys(member.social).length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Social Media</h3>
                  <div className="space-y-2">
                    {Object.entries(member.social).map(([platform, handle]) => (
                      <div key={platform} className="flex items-center">
                        <span className="capitalize mr-2">{platform}:</span>
                        <a
                          href={`https://www.${platform}.com/${handle.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {handle}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-2/3">
            {/* Bio */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">About</h2>
                <p className="text-gray-700">{member.bio}</p>
              </CardContent>
            </Card>

            {/* Tabs for Activity, Discussions,