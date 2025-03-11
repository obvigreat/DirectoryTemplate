"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function MessageNotification() {
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch unread messages count
        const { count, error } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("recipient_id", user.id)
          .eq("read", false);

        if (error) throw error;
        setUnreadCount(count || 0);

        // Set up realtime subscription for new messages
        const subscription = supabase
          .channel("messages_channel")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "messages",
              filter: `recipient_id=eq.${user.id}`,
            },
            (payload) => {
              // Increment unread count when a new message is received
              setUnreadCount((prev) => prev + 1);
            },
          )
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "messages",
              filter: `recipient_id=eq.${user.id}`,
            },
            (payload) => {
              // If a message is marked as read, update the count
              if (payload.new.read && !payload.old.read) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
              }
            },
          )
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    }

    fetchUnreadCount();
  }, [supabase]);

  if (unreadCount === 0) {
    return (
      <Link href="/dashboard/messages" className="flex items-center">
        <MessageSquare className="h-5 w-5" />
        <span className="ml-2">Messages</span>
      </Link>
    );
  }

  return (
    <Link href="/dashboard/messages" className="flex items-center">
      <div className="relative">
        <MessageSquare className="h-5 w-5" />
        <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      </div>
      <span className="ml-2">Messages</span>
    </Link>
  );
}
