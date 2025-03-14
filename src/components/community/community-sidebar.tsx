import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Award, MapPin } from "lucide-react";

interface CommunitySidebarProps {
  stats?: {
    members: number;
    discussions: number;
    replies: number;
    online: number;
  };
  events?: {
    id: number;
    title: string;
    date: string;
    location: string;
    attendees: number;
  }[];
  activeMembers?: {
    id: number;
    name: string;
    avatar: string;
    posts: number;
    joined: string;
  }[];
  categories?: { name: string; count: number }[];
}

export default function CommunitySidebar({
  stats = {
    members: 1245,
    discussions: 3872,
    replies: 15634,
    online: 87,
  },
  events = [],
  activeMembers = [],
  categories = [],
}: CommunitySidebarProps) {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-4">Community Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.members.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.discussions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Discussions</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.replies.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Replies</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.online}
              </div>
              <div className="text-sm text-gray-500">Online Now</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      {events.length > 0 && (
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
      )}

      {/* Active Members */}
      {activeMembers.length > 0 && (
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
      )}

      {/* Categories */}
      {categories.length > 0 && (
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
      )}
    </div>
  );
}
