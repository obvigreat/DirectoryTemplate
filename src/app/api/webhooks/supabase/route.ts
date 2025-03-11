import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  // Verify the webhook signature
  const headersList = headers();
  const signature = headersList.get("x-supabase-webhook-signature");
  const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const event = payload.type;

    // Handle different webhook events
    switch (event) {
      case "INSERT":
        // Handle new record insertion
        await handleInsert(payload);
        break;
      case "UPDATE":
        // Handle record update
        await handleUpdate(payload);
        break;
      case "DELETE":
        // Handle record deletion
        await handleDelete(payload);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleInsert(payload: any) {
  // Handle insert event
  const { table, record } = payload;
  console.log(`New record inserted in ${table}:`, record);

  // Example: Send notification when a new review is added
  if (table === "reviews") {
    await sendNotification(record);
  }
}

async function handleUpdate(payload: any) {
  // Handle update event
  const { table, old_record, record } = payload;
  console.log(`Record updated in ${table}:`, { old: old_record, new: record });
}

async function handleDelete(payload: any) {
  // Handle delete event
  const { table, old_record } = payload;
  console.log(`Record deleted from ${table}:`, old_record);
}

async function sendNotification(record: any) {
  // Example function to send a notification
  // This could be an email, push notification, etc.
  console.log("Sending notification for new review:", record);

  // In a real implementation, you might use a service like SendGrid, Twilio, etc.
  // Example:
  // await sendEmail({
  //   to: 'business-owner@example.com',
  //   subject: 'New Review Received',
  //   body: `You received a new ${record.rating}-star review!`
  // })
}
