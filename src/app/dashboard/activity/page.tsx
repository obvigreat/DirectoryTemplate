import { createClient } from "../../../../supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Star, MessageCircle, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default async function ActivityPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock activity data - in a real app, this would come from the database
  const activityData = [
    {
      id: 1,
      type: "view",
      listing: {
        id: 1,
        title: "Downtown Coffee Shop",
        image:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      },
      date: "2023-10-20T14:30:00Z",
      formattedDate: "Today at 2:30 PM",
    },
    {
      id: 2,
      type: "save",
      listing: {
        id: 2,
        title: "Sunset Yoga Studio",
        image:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
      },
      date: "2023-10-19T10:15:00Z",
      formattedDate: "Yesterday at 10:15 AM",
    },
    {
      id: 3,
      type: "review",
      listing: {
        id: 3,
        title: "Tech Hub Coworking",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      },
      rating: 4,
      comment: "Great workspace with excellent amenities and friendly staff.",
      date: "2023-10-17T16:45:00Z",
      formattedDate: "Oct 17 at 4:45 PM",
    },
    {
      id: 4,
      type: "message",
      listing: {
        id: 4,
        title: "Lakeside Retreat",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      },
      message:
        "I'm interested in booking for next weekend. Do you have availability?",
      date: "2023-10-15T09:20:00Z",
      formattedDate: "Oct 15 at 9:20 AM",
    },
    {
      id: 5,
      type: "appointment",
      listing: {
        id: 5,
        title: "Urban Fitness Center",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      },
      appointmentDate: "2023-10-25T11:00:00Z",
      formattedAppointmentDate: "Oct 25 at 11:00 AM",
      status: "upcoming",
      date: "2023-10-10T13:10:00Z",
      formattedDate: "Oct 10 at 1:10 PM",
    },
    {
      id: 6,
      type: "view",
      listing: {
        id: 6,
        title: "Gourmet Restaurant",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      },
      date: "2023-10-08T19:30:00Z",
      formattedDate: "Oct 8 at 7:30 PM",
    },
    {
      id: 7,
      type: "save",
      listing: {
        id: 7,
        title: "Modern Art Gallery",
        image:
          "https://images.unsplash.com/photo-1594784237741-f9db8ebb3d8a?w=800&q=80",
      },
      date: "2023-10-05T15:45:00Z",
      formattedDate: "Oct 5 at 3:45 PM",
    },
    {
      id: 8,
      type: "review",
      listing: {
        id: 8,
        title: "Beachfront Hotel",
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      },
      rating: 5,
      comment:
        "Absolutely stunning views and exceptional service. Will definitely return!",
      date: "2023-10-01T10:20:00Z",
      formattedDate: "Oct 1 at 10:20 AM",
    },
  ];

  // Group activities by date
  const groupedActivities: Record<string, typeof activityData> = {};
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  activityData.forEach((activity) => {
    const activityDate = new Date(activity.date).toDateString();
    let groupKey;

    if (activityDate === today) {
      groupKey = "Today";
    } else if (activityDate === yesterday) {
      groupKey = "Yesterday";
    } else {
      groupKey = new Date(activity.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    if (!groupedActivities[groupKey]) {
      groupedActivities[groupKey] = [];
    }

    groupedActivities[groupKey].push(activity);
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-bold mb-2">Activity History</h1>
        <p className="text-muted-foreground">
          Track your interactions with listings
        </p>
      </header>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
                <option value="all">All Activity Types</option>
                <option value="view">Views</option>
                <option value="save">Saved Listings</option>
                <option value="review">Reviews</option>
                <option value="message">Messages</option>
                <option value="appointment">Appointments</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="px-4">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, activities]) => (
          <div key={date}>
            <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-gray-50 py-2">
              {date}
            </h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={activity.listing.image}
                          alt={activity.listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {activity.type === "view" && (
                            <Eye className="w-4 h-4 text-blue-600" />
                          )}
                          {activity.type === "save" && (
                            <Heart className="w-4 h-4 text-red-500" />
                          )}
                          {activity.type === "review" && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                          {activity.type === "message" && (
                            <MessageCircle className="w-4 h-4 text-green-600" />
                          )}
                          {activity.type === "appointment" && (
                            <Calendar className="w-4 h-4 text-purple-600" />
                          )}
                          <span className="font-medium">
                            {activity.type === "view" && "Viewed"}
                            {activity.type === "save" && "Saved"}
                            {activity.type === "review" && "Reviewed"}
                            {activity.type === "message" && "Messaged"}
                            {activity.type === "appointment" &&
                              "Booked an appointment with"}
                          </span>
                          <Link
                            href={`/listings/${activity.listing.id}`}
                            className="font-semibold hover:text-blue-600"
                          >
                            {activity.listing.title}
                          </Link>
                        </div>

                        {activity.type === "review" && (
                          <div className="mb-2">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < activity.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 text-sm">
                              "{activity.comment}"
                            </p>
                          </div>
                        )}

                        {activity.type === "message" && (
                          <div className="mb-2">
                            <p className="text-gray-700 text-sm">
                              "{activity.message}"
                            </p>
                          </div>
                        )}

                        {activity.type === "appointment" && (
                          <div className="flex items-center gap-2 mb-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {activity.formattedAppointmentDate}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${activity.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {activity.status === "upcoming"
                                ? "Upcoming"
                                : "Completed"}
                            </span>
                          </div>
                        )}

                        <div className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <Button variant="ghost" size="sm">
                          <Link href={`/listings/${activity.listing.id}`}>
                            View Listing
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
