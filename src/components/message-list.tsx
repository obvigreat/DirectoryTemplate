"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Send,
  User,
  Search,
  Clock,
  ArrowLeft,
} from "lucide-react";

type Message = {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  recipient_id: string;
  recipient_name: string;
  recipient_avatar?: string;
  content: string;
  created_at: string;
  read: boolean;
  listing_id?: string;
  listing_title?: string;
};

type Conversation = {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  listing_id?: string;
  listing_title?: string;
};

interface MessageListProps {
  userId?: string;
}

export default function MessageList({ userId }: MessageListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchConversations() {
      try {
        setLoading(true);

        // Fetch conversations from API
        const response = await fetch("/api/messages/conversations");

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json();
        setConversations(data);

        // Fallback to mock data if no conversations found
        if (!data || data.length === 0) {
          // Mock data for demonstration
          const mockConversations: Conversation[] = [
            {
              id: "1",
              participant_id: "user1",
              participant_name: "John Smith",
              participant_avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
              last_message:
                "Hi, I'm interested in your Downtown Apartment listing. Is it still available?",
              last_message_time: new Date(
                Date.now() - 1000 * 60 * 30,
              ).toISOString(), // 30 minutes ago
              unread_count: 2,
              listing_id: "listing1",
              listing_title: "Downtown Apartment",
            },
            {
              id: "2",
              participant_id: "user2",
              participant_name: "Sarah Johnson",
              participant_avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              last_message:
                "Thanks for the information. I'd like to schedule a viewing for tomorrow if possible.",
              last_message_time: new Date(
                Date.now() - 1000 * 60 * 60 * 2,
              ).toISOString(), // 2 hours ago
              unread_count: 0,
              listing_id: "listing2",
              listing_title: "Beachfront Condo",
            },
            {
              id: "3",
              participant_id: "user3",
              participant_name: "Michael Brown",
              participant_avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              last_message:
                "I've sent the booking request. Please confirm when you can.",
              last_message_time: new Date(
                Date.now() - 1000 * 60 * 60 * 24,
              ).toISOString(), // 1 day ago
              unread_count: 1,
              listing_id: "listing3",
              listing_title: "Mountain Cabin",
            },
            {
              id: "4",
              participant_id: "user4",
              participant_name: "Emily Davis",
              participant_avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              last_message: "Do you offer any discounts for longer stays?",
              last_message_time: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 3,
              ).toISOString(), // 3 days ago
              unread_count: 0,
              listing_id: "listing4",
              listing_title: "Luxury Villa",
            },
            {
              id: "5",
              participant_id: "user5",
              participant_name: "David Wilson",
              participant_avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
              last_message: "I'm looking forward to my stay next week!",
              last_message_time: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 5,
              ).toISOString(), // 5 days ago
              unread_count: 0,
              listing_id: "listing5",
              listing_title: "City Loft",
            },
          ];

          setConversations(mockConversations);
        }
      } catch (err: any) {
        console.error("Error fetching conversations:", err);
        setError(err.message || "Failed to load conversations");
      } finally {
        setLoading(false);
      }
    }

    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const fetchMessages = async (conversationId: string) => {
    try {
      // Fetch messages from API
      const response = await fetch(`/api/messages?with=${conversationId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);

      // Update unread count in conversations
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation?.unread_count && conversation.unread_count > 0) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId ? { ...conv, unread_count: 0 } : conv,
          ),
        );
      }

      // Fallback to mock data if no messages found
      if (!data || data.length === 0) {
        // Mock data for demonstration
        const conversation = conversations.find((c) => c.id === conversationId);
        const mockMessages: Message[] = [
          {
            id: "m1",
            sender_id: conversationId,
            sender_name: conversation?.participant_name || "User",
            sender_avatar: conversation?.participant_avatar,
            recipient_id: "current-user",
            recipient_name: "You",
            content: `Hi, I'm interested in your ${conversation?.listing_title} listing. Is it still available?`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            read: true,
          },
          {
            id: "m2",
            sender_id: "current-user",
            sender_name: "You",
            recipient_id: conversationId,
            recipient_name: conversation?.participant_name || "User",
            recipient_avatar: conversation?.participant_avatar,
            content: `Yes, the ${conversation?.listing_title} is still available. When would you like to view it?`,
            created_at: new Date(
              Date.now() - 1000 * 60 * 60 * 1.5,
            ).toISOString(), // 1.5 hours ago
            read: true,
          },
          {
            id: "m3",
            sender_id: conversationId,
            sender_name: conversation?.participant_name || "User",
            sender_avatar: conversation?.participant_avatar,
            recipient_id: "current-user",
            recipient_name: "You",
            content:
              "Great! I'm available tomorrow afternoon around 3 PM. Would that work for you?",
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
            read: true,
          },
          {
            id: "m4",
            sender_id: conversationId,
            sender_name: conversation?.participant_name || "User",
            sender_avatar: conversation?.participant_avatar,
            recipient_id: "current-user",
            recipient_name: "You",
            content: "Also, does the property have parking available?",
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            read: conversation?.unread_count === 0,
          },
        ];

        setMessages(mockMessages);
      }
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      setError(err.message || "Failed to load messages");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSendingMessage(true);

      const conversation = conversations.find(
        (c) => c.id === selectedConversation,
      );

      // Send message via API
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_id: selectedConversation,
          content: newMessage,
          listing_id: conversation?.listing_id,
          listing_title: conversation?.listing_title,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const sentMessage = await response.json();

      // Add the sent message to the messages list
      setMessages((prev) => [...prev, sentMessage]);

      // Update conversation last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                last_message: newMessage,
                last_message_time: new Date().toISOString(),
              }
            : conv,
        ),
      );

      setNewMessage("");
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participant_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (conversation.listing_title &&
        conversation.listing_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      {/* Conversations List */}
      <div
        className={`w-full md:w-1/3 border-r ${selectedConversation ? "hidden md:block" : ""}`}
      >
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchQuery
                ? "No conversations match your search"
                : "No conversations yet"}
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedConversation === conversation.id ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={conversation.participant_avatar} />
                    <AvatarFallback>
                      {conversation.participant_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium truncate">
                        {conversation.participant_name}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(conversation.last_message_time)}
                      </span>
                    </div>
                    {conversation.listing_title && (
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {conversation.listing_title}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {conversation.last_message}
                    </p>
                    {conversation.unread_count > 0 && (
                      <Badge className="mt-1 bg-blue-500">
                        {conversation.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Thread */}
      {selectedConversation ? (
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={
                    conversations.find((c) => c.id === selectedConversation)
                      ?.participant_avatar
                  }
                />
                <AvatarFallback>
                  {conversations
                    .find((c) => c.id === selectedConversation)
                    ?.participant_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.participant_name
                  }
                </h3>
                {conversations.find((c) => c.id === selectedConversation)
                  ?.listing_title && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {
                      conversations.find((c) => c.id === selectedConversation)
                        ?.listing_title
                    }
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === "current-user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${message.sender_id === "current-user" ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg" : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"} p-3`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${message.sender_id === "current-user" ? "text-blue-100" : "text-gray-500"} flex items-center`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(message.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <form
              className="flex space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Textarea
                placeholder="Type your message..."
                className="flex-1 resize-none"
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                type="submit"
                disabled={!newMessage.trim() || sendingMessage}
              >
                <Send className="h-4 w-4 mr-2" /> Send
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:w-2/3 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">Your Messages</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              Select a conversation from the list to view messages or start a
              new conversation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
