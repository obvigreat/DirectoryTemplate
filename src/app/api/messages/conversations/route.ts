import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all messages for the current user
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Process messages into conversations
    const conversationsMap = new Map();
    data?.forEach((message) => {
      const isUserSender = message.sender_id === user.id;
      const conversationParticipantId = isUserSender
        ? message.recipient_id
        : message.sender_id;
      const participantName = isUserSender
        ? message.recipient_name
        : message.sender_name;
      const participantAvatar = isUserSender
        ? message.recipient_avatar
        : message.sender_avatar;

      if (!conversationsMap.has(conversationParticipantId)) {
        conversationsMap.set(conversationParticipantId, {
          id: conversationParticipantId,
          participant_id: conversationParticipantId,
          participant_name: participantName,
          participant_avatar: participantAvatar,
          last_message: message.content,
          last_message_time: message.created_at,
          unread_count: !isUserSender && !message.read ? 1 : 0,
          listing_id: message.listing_id,
          listing_title: message.listing_title,
        });
      } else {
        const conversation = conversationsMap.get(conversationParticipantId);
        if (
          new Date(message.created_at) >
          new Date(conversation.last_message_time)
        ) {
          conversation.last_message = message.content;
          conversation.last_message_time = message.created_at;
        }
        if (!isUserSender && !message.read) {
          conversation.unread_count += 1;
        }
      }
    });

    return NextResponse.json(Array.from(conversationsMap.values()));
  } catch (error: any) {
    console.error("Error in GET conversations:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
