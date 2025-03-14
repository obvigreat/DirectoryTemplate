import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowUp, ArrowDown, MessageCircle, Clock, 
  ThumbsUp, Flag, Share, Bookmark, Award,
  CheckCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch the discussion data from your database
  const discussion = getDiscussionById(parseInt(params.id));
  
  if (!discussion) {
    return {
      title: "Discussion Not Found",
      description: "The requested discussion could not be found.",
    };
  }
  
  return {
    title: `${discussion.title} | Community Forum`,
    description: discussion.content.substring(0, 160),
  };
}

// This would be replaced with a real database query in a production app
function getDiscussionById(id: number) {
  const discussions = [
    {
      id: 1,
      title: "What marketing strategies have worked best for your local business?",
      author: "Jane Smith",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      authorRole: "Business Owner",
      authorBadges: ["Top Contributor", "Verified Business"],
      category: "Marketing",
      content: `<p>I've been running my local bakery for about two years now, and I'm always looking for new ways to attract customers. So far, I've tried:</p>
      <ul>
        <li>Social media marketing (Instagram and Facebook)</li>
        <li>Local newspaper ads</li>
        <li>Flyers in nearby businesses</li>
        <li>A loyalty card program</li>
      </ul>
      <p>The loyalty program has been great for retention, but I'm struggling with new customer acquisition. What marketing strategies have worked well for your local businesses? I'd love to hear some success stories and maybe get some fresh ideas to try!</p>`,
      replies: 24,
      views: 342,
      votes: 18,
      createdAt: "2023-11-15T14:30:00Z",
      lastActivity: "2023-11-17T09:45:00Z",
      isPinned: true,
      isHot: true,
    },
    {
      id: 2,
      title: "How do you handle negative customer reviews?",
      author: "John Doe",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      authorRole: "Marketing Consultant",
      authorBadges: ["Expert"],
      category: "Customer Service",
      content: `<p>We all get them at some point - those dreaded negative reviews. I'm curious how other business owners approach responding to negative feedback online.</p>
      <p>Do you have a specific protocol? How do you strike the balance between addressing the customer's concerns and protecting your business's reputation? Any success stories of turning a negative reviewer into a loyal customer?</p>`,
      replies: 36,
      views: 512,
      votes: 27,
      createdAt: "2023-11-14T09:15:00Z",
      lastActivity: "2023-11-16T16:20:00Z",
      isPinned: false,
      isHot: true,
    },
  ];
  
  return discussions.find(discussion => discussion.id === id);
}

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const discussion = getDiscussionById(parseInt(params.id));
  
  if (!discussion) {
    notFound();
  }
  
  // Mock data for replies
  const replies = [
    {
      id: 1,
      author: "Michael Brown",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      authorRole: "Business Owner",
      authorBadges: ["Verified Business"],
      content: `<p>I've found that local partnerships have been the most effective marketing strategy for my small bookstore. We collaborate with nearby cafes, restaurants, and even the local library for events and cross-promotions.</p>
      <p>For example, we offer a 10% discount to customers who bring in a receipt from the cafe next door, and they do the same for our customers. It's a win-win that drives foot traffic for both businesses.</p>
      <p>Also, don't underestimate the power