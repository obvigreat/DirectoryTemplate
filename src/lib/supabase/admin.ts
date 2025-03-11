import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// This client has admin privileges and should only be used in server-side code
// or in secure API routes that require admin access
export const createAdminClient = () => {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );
};
