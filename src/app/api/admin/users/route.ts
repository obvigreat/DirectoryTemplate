import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/users - Get all users with pagination and filtering
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Parse query parameters
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const role = url.searchParams.get("role") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const offset = (page - 1) * pageSize;

  // Build the query
  let usersQuery = supabase.from("users").select("*", { count: "exact" });

  // Apply filters
  if (query) {
    usersQuery = usersQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  if (role) {
    usersQuery = usersQuery.eq("role", role);
  }

  // Apply pagination
  usersQuery = usersQuery
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  // Execute the query
  const { data: users, count, error } = await usersQuery;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    users,
    pagination: {
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  });
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, password, name, role = "user" } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Create user in auth
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Create user profile
    const { error: profileError } = await supabase.from("users").upsert({
      id: authUser.user.id,
      email,
      name,
      role,
      status: "active",
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to create user profile" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: authUser.user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
