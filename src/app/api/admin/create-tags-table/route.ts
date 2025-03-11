import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user role
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Create tags table
    const { error: tagsError } = await supabase.rpc("exec_sql", {
      sql_query: `
        -- Create tags table if it doesn't exist
        CREATE TABLE IF NOT EXISTS tags (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(50) NOT NULL,
          slug VARCHAR(50) NOT NULL UNIQUE,
          description TEXT,
          color VARCHAR(20),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    if (tagsError) {
      console.error("Error creating tags table:", tagsError);
      return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }

    // Create listing_tags junction table
    const { error: junctionError } = await supabase.rpc("exec_sql", {
      sql_query: `
        -- Create listing_tags junction table for many-to-many relationship
        CREATE TABLE IF NOT EXISTS listing_tags (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
          tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(listing_id, tag_id)
        );
      `,
    });

    if (junctionError) {
      console.error("Error creating listing_tags table:", junctionError);
      return NextResponse.json(
        { error: junctionError.message },
        { status: 500 },
      );
    }

    // Create RLS policies
    const { error: policiesError } = await supabase.rpc("exec_sql", {
      sql_query: `
        -- Enable row level security
        ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
        ALTER TABLE listing_tags ENABLE ROW LEVEL SECURITY;

        -- Create policies
        DROP POLICY IF EXISTS "Allow public read access to tags" ON tags;
        CREATE POLICY "Allow public read access to tags"
          ON tags FOR SELECT
          USING (true);

        DROP POLICY IF EXISTS "Allow admin full access to tags" ON tags;
        CREATE POLICY "Allow admin full access to tags"
          ON tags FOR ALL
          USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

        DROP POLICY IF EXISTS "Allow public read access to listing_tags" ON listing_tags;
        CREATE POLICY "Allow public read access to listing_tags"
          ON listing_tags FOR SELECT
          USING (true);

        DROP POLICY IF EXISTS "Allow admin full access to listing_tags" ON listing_tags;
        CREATE POLICY "Allow admin full access to listing_tags"
          ON listing_tags FOR ALL
          USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
      `,
    });

    if (policiesError) {
      console.error("Error creating RLS policies:", policiesError);
      return NextResponse.json(
        { error: policiesError.message },
        { status: 500 },
      );
    }

    // Add realtime
    const { error: realtimeError } = await supabase.rpc("exec_sql", {
      sql_query: `
        -- Add realtime
        ALTER PUBLICATION supabase_realtime ADD TABLE tags;
        ALTER PUBLICATION supabase_realtime ADD TABLE listing_tags;
      `,
    });

    if (realtimeError) {
      console.error("Error enabling realtime:", realtimeError);
      return NextResponse.json(
        { error: realtimeError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tags tables created successfully",
    });
  } catch (error: any) {
    console.error("Error in create-tags-table:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
