import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const messageId = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get message by ID
    const { data: message, error } = await supabase
      .from("messages")
      .select(
        "*, sender:sender_id(id, name, avatar_url), receiver:receiver_id(id, name, avatar_url)",
      )
      .eq("id", messageId)
      .single();

    if (error) throw error;

    // Check if user is authorized to view this message
    if (message.sender_id !== user.id && message.receiver_id !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to view this message" },
        { status: 403 },
      );
    }

    // Mark as read if user is the receiver
    if (message.receiver_id === user.id && !message.is_read) {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", messageId);
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json(
      { error: "Failed to fetch message" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const messageId = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { is_read } = await request.json();

    // Get message to check ownership
    const { data: message, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .single();

    if (fetchError) throw fetchError;

    // Only the receiver can mark a message as read
    if (message.receiver_id !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to update this message" },
        { status: 403 },
      );
    }

    // Update message
    const { data: updatedMessage, error } = await supabase
      .from("messages")
      .update({ is_read })
      .eq("id", messageId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: updatedMessage });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();
  const messageId = params.id;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get message to check ownership
    const { data: message, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .single();

    if (fetchError) throw fetchError;

    // Only sender or receiver can delete a message
    if (message.sender_id !== user.id && message.receiver_id !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to delete this message" },
        { status: 403 },
      );
    }

    // Delete message
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
