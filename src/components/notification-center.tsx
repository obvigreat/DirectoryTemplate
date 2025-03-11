"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  Info,
  AlertTriangle,
  MessageSquare,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

type Notification = {
  id: string;
  type: "message" | "booking" | "review" | "system" | "alert";
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
};

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    // Fetch notifications from API or use mock data for now
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "message",
        title: "New Message",
        content: "You have a new message from John Doe about your listing",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        read: false,
        actionUrl: "/dashboard/messages",
      },
      {
        id: "2",
        type: "booking",
        title: "Booking Confirmed",
        content: "Your booking with Downtown Restaurant has been confirmed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
        actionUrl: "/dashboard/bookings",
      },
      {
        id: "3",
        type: "review",
        title: "New Review",
        content: "Someone left a 5-star review on your listing",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        read: true,
        actionUrl: "/dashboard/listings",
      },
      {
        id: "4",
        type: "system",
        title: "Profile Updated",
        content: "Your profile information has been successfully updated",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        read: true,
      },
      {
        id: "5",
        type: "alert",
        title: "Subscription Expiring",
        content: "Your premium subscription will expire in 3 days",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        read: false,
        actionUrl: "/dashboard/subscription",
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);

    // In a real app, you would fetch from your API
    // const fetchNotifications = async () => {
    //   const { data: { user } } = await supabase.auth.getUser();
    //   if (!user) return;
    //
    //   const { data, error } = await supabase
    //     .from('notifications')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .order('created_at', { ascending: false });
    //
    //   if (data) {
    //     setNotifications(data);
    //     setUnreadCount(data.filter(n => !n.read).length);
    //   }
    // };
    //
    // fetchNotifications();

    // Set up realtime subscription for new notifications
    // const subscription = supabase
    //   .channel('notifications')
    //   .on('postgres_changes', {
    //     event: 'INSERT',
    //     schema: 'public',
    //     table: 'notifications',
    //     filter: `user_id=eq.${user?.id}`,
    //   }, (payload) => {
    //     setNotifications(prev => [payload.new, ...prev]);
    //     setUnreadCount(count => count + 1);
    //   })
    //   .subscribe();
    //
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  const markAsRead = async (id: string) => {
    // In a real app, update in the database
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('id', id);

    // Update local state
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    // In a real app, update in the database
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('user_id', user.id)
    //   .eq('read', false);

    // Update local state
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
    setUnreadCount(0);
  };

  const deleteNotification = async (id: string) => {
    // In a real app, delete from the database
    // await supabase
    //   .from('notifications')
    //   .delete()
    //   .eq('id', id);

    // Update local state
    const notification = notifications.find((n) => n.id === id);
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "booking":
        return <Calendar className="h-5 w-5 text-green-500" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs h-8"
              >
                Mark all as read
              </Button>
            )}
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="border-b">
              <TabsList className="w-full justify-start p-0 h-auto bg-transparent">
                <TabsTrigger
                  value="all"
                  className="px-3 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="px-3 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
                >
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
                <TabsTrigger
                  value="message"
                  className="px-3 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
                >
                  Messages
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b hover:bg-gray-50 flex ${!notification.read ? "bg-blue-50" : ""}`}
                    >
                      <div className="mr-3 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.content}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              View Details
                            </a>
                          )}
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No unread notifications
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b hover:bg-gray-50 flex bg-blue-50"
                    >
                      <div className="mr-3 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.content}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              View Details
                            </a>
                          )}
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="message" className="m-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No message notifications
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b hover:bg-gray-50 flex ${!notification.read ? "bg-blue-50" : ""}`}
                    >
                      <div className="mr-3 mt-1">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.content}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              View Message
                            </a>
                          )}
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-2 border-t text-center">
            <a
              href="/dashboard/notifications"
              className="text-xs text-blue-600 hover:underline"
            >
              View All Notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
