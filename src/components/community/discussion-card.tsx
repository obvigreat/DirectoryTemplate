import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, MessageCircle, Clock } from "lucide-react";

interface DiscussionCardProps {
  discussion: {
    id: number;
    title: string;
    author: string;
    authorAvatar: string;
    category: string;
    replies: number;
    views: number;
    votes: number;
    lastActivity: string;
    isPinned?: boolean;
    isHot?: boolean;
  };
}

export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Card
      className={`hover:shadow-md transition-shadow ${discussion.isPinned ? "border-l-4 border-l-blue-500" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Vote Controls */}
          <div className="flex flex-col items-center space-y-1 pt-2">
            <button className="text-gray-400 hover:text-blue-500">
              <ArrowUp className="h-5 w-5" />
            </button>
            <span className="font-medium text-sm">{discussion.votes}</span>
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
                {new Date(discussion.lastActivity).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
