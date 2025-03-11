import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";

export default function MessagingSystem() {
  // Mock data for demonstration
  const conversations = [
    {
      id: "1",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      lastMessage: "Hi, I'm interested in your listing",
      time: "30m ago",
      unread: 2,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "Is this still available?",
      time: "3h ago",
      unread: 0,
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      lastMessage: "Thanks for the information",
      time: "1d ago",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: "1",
      sender: "John Smith",
      content:
        "Hi, I'm interested in your Downtown Coffee Shop listing. Is it still available?",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: "Me",
      content:
        "Yes, it's still available! What would you like to know about it?",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: "3",
      sender: "John Smith",
      content:
        "Great! I'm looking to book a visit this weekend. Do you have availability on Saturday?",
      time: "10:40 AM",
      isMe: false,
    },
    {
      id: "4",
      sender: "Me",
      content: "Yes, Saturday works for me. Would 2 PM work for you?",
      time: "10:45 AM",
      isMe: true,
    },
    {
      id: "5",
      sender: "John Smith",
      content:
        "Perfect! I'll see you at 2 PM on Saturday. Looking forward to it!",
      time: "10:50 AM",
      isMe: false,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Messaging System</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversation List */}
        <Card className="md:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Conversations</h2>
            </div>
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${conversation.id === "1" ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>
                        {conversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="p-4 border-b flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <h3 className="font-medium ml-2">John Smith</h3>
            </div>

            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[70%]">
                    {!message.isMe && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 ${message.isMe ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                      >
                        <p>{message.content}</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center">
                <Textarea
                  placeholder="Type a message..."
                  className="flex-1 resize-none"
                  rows={2}
                />
                <Button className="ml-2" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Button Example */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Contact Button Example</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Downtown Coffee Shop</h3>
                <p className="text-gray-500">123 Main St, New York, NY</p>
              </div>
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Owner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
