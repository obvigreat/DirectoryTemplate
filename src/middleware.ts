import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Create a response object that we can modify
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
          });
        },
        remove(name: string, options: any) {
          res.cookies.delete({
            name,
            ...options,
            path: "/",
          });
        },
      },
    },
  );

  // Refresh session if expired
  await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/listings",
    "/dashboard/saved",
    "/dashboard/activity",
    "/dashboard/messages",
    "/dashboard/bookings",
    "/dashboard/subscription",
    "/dashboard/settings",
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // If the route is protected and the user is not authenticated, redirect to sign-in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is already authenticated and tries to access auth pages, redirect to dashboard
  if (
    session &&
    (request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
