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
  MapPin,
  Users,
  Share,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  User,
  Tag,
  Info,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // In a real app, fetch the event data from your database
  const event = getEventById(parseInt(params.id));

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.title} | Community Events`,
    description: event.description.substring(0, 160),
  };
}

// This would be replaced with a real database query in a production app
function getEventById(id: number) {
  const events = [
    {
      id: 1,
      title: "Small Business Networking Mixer",
      description:
        "Connect with other local business owners in a relaxed setting. Share experiences, exchange ideas, and build valuable relationships.\n\nThis virtual networking event is designed to help you expand your professional network and discover potential collaboration opportunities. Whether you're a seasoned entrepreneur or just starting out, you'll find value in connecting with peers who understand the challenges and rewards of running a business.\n\nWhat to expect:\n- Brief introduction from each participant\n- Structured networking activities\n- Open discussion on current business trends\n- Opportunity to share your services or products\n\nBring your business cards (virtually) and come ready to make meaningful connections!",
      date: "2023-11-25T18:00:00Z",
      endDate: "2023-11-25T20:00:00Z",
      location: "Virtual Event",
      organizer: "Business Network Association",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bna",
      organizerDescription:
        "The Business Network Association is dedicated to connecting entrepreneurs and business owners through quality networking events and educational resources.",
      attendees: 42,
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80",
      type: "Networking",
      isFree: true,
      tags: [
        "Networking",
        "Small Business",
        "Virtual",
        "Professional Development",
      ],
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
      organizerDescription:
        "Digital Marketing Experts provides training and consulting services to help businesses maximize their online presence and marketing effectiveness.",
      attendees: 28,
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
      type: "Workshop",
      isFree: false,
      price: "$49.99",
      tags: ["Marketing", "Social Media", "Workshop", "In-Person"],
    },
  ];

  return events.find((event) => event.id === id);
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventById(parseInt(params.id));

  if (!event) {
    notFound();
  }

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const startDateTime = formatDateTime(event.date);
  const endDateTime = formatDateTime(event.endDate);

  // Calculate event duration
  const calculateDuration = () => {
    const start = new Date(event.date);
    const end = new Date(event.endDate);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
    }
  };

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
          <Link href="/community/events" className="hover:text-purple-600">
            Events
          </Link>{" "}
          {" / "}
          <span className="text-gray-700">{event.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Event Header */}
            <div className="mb-8">
              <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                {event.type}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {startDateTime.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {startDateTime.time} - {endDateTime.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div className="prose max-w-none">
                {event.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Date and Time</h3>
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{startDateTime.date}</p>
                          <p className="text-gray-700">
                            {startDateTime.time} - {endDateTime.time}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Duration: {calculateDuration()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{event.location}</p>
                          {event.location === "Virtual Event" && (
                            <p className="text-gray-500 text-sm">
                              Link will be provided after registration
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Attendees</h3>
                      <div className="flex items-start space-x-2">
                        <Users className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">
                            {event.attendees} people attending
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Price</h3>
                      <div className="flex items-start space-x-2">
                        <Tag className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">
                            {event.isFree ? "Free" : event.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Organizer */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Organizer</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={event.organizerAvatar}
                        alt={event.organizer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">
                        {event.organizer}
                      </h3>
                      <p className="text-gray-600">
                        {event.organizerDescription}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <User className="h-4 w-4 mr-2" /> View Organizer Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/community/events/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Share This Event</h3>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" /> Email
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Registration Card */}
            <Card className="mb-6 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Register for this Event
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Price</span>
                    <span className="font-bold text-lg">
                      {event.isFree ? "Free" : event.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Date</span>
                    <span>{startDateTime.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Time</span>
                    <span>
                      {startDateTime.time} - {endDateTime.time}
                    </span>
                  </div>
                </div>

                <Button className="w-full mb-3">Register Now</Button>

                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {event.attendees} people attending
                </div>

                <Separator className="my-4" />

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    By registering, you agree to our terms of service and
                    privacy policy. You'll receive event updates and reminders
                    via email.
                  </p>
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
