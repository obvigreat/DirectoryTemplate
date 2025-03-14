import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Filter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Events | Directory",
  description: "Browse and join upcoming events in our community",
};

export default function CommunityEventsPage() {
  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Small Business Networking Mixer",
      description:
        "Connect with other local business owners in a relaxed setting. Share experiences, exchange ideas, and build valuable relationships.",
      date: "2023-11-25T18:00:00Z",
      endDate: "2023-11-25T20:00:00Z",
      location: "Virtual Event",
      organizer: "Business Network Association",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bna",
      attendees: 42,
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80",
      type: "Networking",
      isFree: true,
    },
    {
      id: 2,
      title: "Marketing Workshop: Social Media Strategies",
      description:
        "Learn effective social media marketing strategies specifically designed for small businesses. This hands-on workshop will cover content creation, scheduling, analytics, and more.",
      date: "2023-12-05T14:00:00Z",
      endDate: "2023-12-05T17:00:00Z",
      location: "Business Hub, New York",
      organizer: "Digital Marketing Experts",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dme",
      attendees: 28,
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
      type: "Workshop",
      isFree: false,
      price: "$49.99",
    },
    {
      id: 3,
      title: "Q&A Session with Successful Entrepreneurs",
      description:
        "Join us for an interactive Q&A session with a panel of successful entrepreneurs. Get insights into their journeys, challenges they've overcome, and advice for your business.",
      date: "2023-12-12T16:00:00Z",
      endDate: "2023-12-12T18:00:00Z",
      location: "Virtual Event",
      organizer: "Entrepreneur Network",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=en",
      attendees: 65,
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      type: "Q&A",
      isFree: true,
    },
    {
      id: 4,
      title: "Local Business Expo 2023",
      description:
        "The largest gathering of local businesses in the region. Showcase your products or services, meet potential customers, and connect with other business owners.",
      date: "2023-12-18T10:00:00Z",
      endDate: "2023-12-19T18:00:00Z",
      location: "City Convention Center",
      organizer: "Chamber of Commerce",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=coc",
      attendees: 120,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      type: "Expo",
      isFree: false,
      price: "$99.99",
    },
    {
      id: 5,
      title: "Financial Planning for Small Businesses",
      description:
        "A comprehensive workshop on financial planning and management for small business owners. Learn about budgeting, cash flow management, tax planning, and more.",
      date: "2024-01-10T15:00:00Z",
      endDate: "2024-01-10T17:30:00Z",
      location: "Financial District, Boston",
      organizer: "Business Financial Advisors",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bfa",
      attendees: 35,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      type: "Workshop",
      isFree: false,
      price: "$75.00",
    },
    {
      id: 6,
      title: "Community Business Awards 2024",
      description:
        "Annual awards ceremony recognizing outstanding local businesses and entrepreneurs. Join us to celebrate excellence in our business community.",
      date: "2024-01-20T19:00:00Z",
      endDate: "2024-01-20T22:00:00Z",
      location: "Grand Hotel Ballroom",
      organizer: "Business Excellence Foundation",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bef",
      attendees: 150,
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
      type: "Ceremony",
      isFree: false,
      price: "$120.00",
    },
  ];

  // Event types for filtering
  const eventTypes = [
    "All Types",
    "Networking",
    "Workshop",
    "Q&A",
    "Expo",
    "Ceremony",
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Events</h1>
          <p className="text-gray-600">
            Browse and join upcoming events in our business community
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              {eventTypes.map((type) => (
                <option key={type} value={type === "All Types" ? "" : type}>
                  {type}
                </option>
              ))}
            </select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" /> Create Event
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {event.type}
                  </span>
                </div>
                {!event.isFree && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {event.price}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="mb-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()},{" "}
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <h3 className="font-bold text-lg mb-2">
                  <Link
                    href={`/community/events/${event.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {event.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                <div className="mt-auto">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                        <img
                          src={event.organizerAvatar}
                          alt={event.organizer}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attending
                    </div>
                  </div>
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
