import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = await createClient();

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(listing);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to update a listing" },
      { status: 401 },
    );
  }

  // Check if the listing exists and belongs to the user
  const { data: existingListing } = await supabase
    .from("listings")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!existingListing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (existingListing.user_id !== user.id) {
    return NextResponse.json(
      { error: "You do not have permission to update this listing" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();

    // Add updated_at timestamp
    const listing = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("listings")
      .update(listing)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to delete a listing" },
      { status: 401 },
    );
  }

  // Check if the listing exists and belongs to the user
  const { data: existingListing } = await supabase
    .from("listings")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!existingListing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (existingListing.user_id !== user.id) {
    return NextResponse.json(
      { error: "You do not have permission to delete this listing" },
      { status: 403 },
    );
  }

  const { error } = await supabase.from("listings").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
