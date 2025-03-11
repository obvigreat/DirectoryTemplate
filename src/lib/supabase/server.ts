import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database.types";

export const createClient = async () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore.get(name)?.value;
          } catch (error) {
            return undefined;
          }
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
              path: "/",
            });
          } catch (error) {
            // Ignore cookie setting errors in non-server action contexts
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.delete({
              name,
              ...options,
              path: "/",
            });
          } catch (error) {
            // Ignore cookie removal errors in non-server action contexts
          }
        },
      },
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  );
};
