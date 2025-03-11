import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase-types";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const supabaseAnonKey = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Listing = Tables<"listings">;
export type Review = Tables<"reviews">;
export type SavedListing = Tables<"saved_listings">;
export type User = Tables<"users">;

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type InsertListing = InsertTables<"listings">;
export type UpdateListing = UpdateTables<"listings">;
export type InsertReview = InsertTables<"reviews">;
export type UpdateReview = UpdateTables<"reviews">;
export type InsertSavedListing = InsertTables<"saved_listings">;
export type UpdateSavedListing = UpdateTables<"saved_listings">;
export type InsertUser = InsertTables<"users">;
export type UpdateUser = UpdateTables<"users">;
