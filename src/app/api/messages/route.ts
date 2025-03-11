import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const body = await request.json();
    const { recipient_id, content, listing_id, listing_title } = body;

    // Validate required fields
    if (!recipient_id || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get sender info
    const { data: senderData } = await supabase
      .from("users")
      .select("name, avatar_url")
      .eq("id", user.id)
      .single();

    // Get recipient info
    const { data: recipientData } = await supabase
      .from("users")
      .select("name, avatar_url")
      .eq("id", recipient_id)
      .single();

    if (!recipientData) {
      return NextResponse.json(
        { error: "Recipient not found" },
        { status: 404 },
      );
    }

    // Create the message
    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: user.id,
        sender_name: senderData?.name || user.email,
        sender_avatar: senderData?.avatar_url,
        recipient_id,
        recipient_name: recipientData.name,
        recipient_avatar: recipientData.avatar_url,
        content,
        listing_id,
        listing_title,
        created_at: new Date().toISOString(),
        read: false,
      })
      .select();

    if (error) {
      console.error("Error creating message:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    console.error("Error in POST message:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

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

    // Get query parameters
    const url = new URL(request.url);
    const conversationWith = url.searchParams.get("with");
    const listingId = url.searchParams.get("listing_id");

    // Build the query
    let messagesQuery = supabase.from("messages").select("*");

    if (conversationWith) {
      // Get messages between the current user and the specified user
      messagesQuery = messagesQuery.or(
        `(sender_id.eq.${user.id}.and.recipient_id.eq.${conversationWith}),` +
          `(sender_id.eq.${conversationWith}.and.recipient_id.eq.${user.id})`,
      );
    } else {
      // Get all messages for the current user
      messagesQuery = messagesQuery.or(
        `sender_id.eq.${user.id},recipient_id.eq.${user.id}`,
      );
    }

    // Filter by listing if specified
    if (listingId) {
      messagesQuery = messagesQuery.eq("listing_id", listingId);
    }

    // Execute the query
    const { data, error } = await messagesQuery.order("created_at", {
      ascending: true,
    });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Mark messages as read if they were sent to the current user
    const unreadMessages = data
      ?.filter((m) => m.recipient_id === user.id && !m.read)
      .map((m) => m.id);

    if (unreadMessages && unreadMessages.length > 0) {
      await supabase
        .from("messages")
        .update({ read: true })
        .in("id", unreadMessages);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET messages:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
