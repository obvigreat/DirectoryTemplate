export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string;
          booking_time: string;
          created_at: string | null;
          email: string;
          id: string;
          listing_id: number;
          name: string;
          notes: string | null;
          phone: string;
          status: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          booking_date: string;
          booking_time: string;
          created_at?: string | null;
          email: string;
          id?: string;
          listing_id: number;
          name: string;
          notes?: string | null;
          phone: string;
          status: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          booking_date?: string;
          booking_time?: string;
          created_at?: string | null;
          email?: string;
          id?: string;
          listing_id?: number;
          name?: string;
          notes?: string | null;
          phone?: string;
          status?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
      };
      listings: {
        Row: {
          amenities: string[] | null;
          category: string;
          created_at: string | null;
          description: string;
          email: string;
          featured: boolean | null;
          hours: Json | null;
          id: number;
          images: string[] | null;
          location: string;
          phone: string;
          price_range: string | null;
          rating: number | null;
          reviews_count: number | null;
          status: string | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
          website: string;
        };
        Insert: {
          amenities?: string[] | null;
          category: string;
          created_at?: string | null;
          description: string;
          email: string;
          featured?: boolean | null;
          hours?: Json | null;
          id?: number;
          images?: string[] | null;
          location: string;
          phone: string;
          price_range?: string | null;
          rating?: number | null;
          reviews_count?: number | null;
          status?: string | null;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
          website: string;
        };
        Update: {
          amenities?: string[] | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          email?: string;
          featured?: boolean | null;
          hours?: Json | null;
          id?: number;
          images?: string[] | null;
          location?: string;
          phone?: string;
          price_range?: string | null;
          rating?: number | null;
          reviews_count?: number | null;
          status?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
          website?: string;
        };
      };
      messages: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          listing_id: number;
          message: string;
          name: string;
          phone: string | null;
          read: boolean | null;
          subject: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: string;
          listing_id: number;
          message: string;
          name: string;
          phone?: string | null;
          read?: boolean | null;
          subject: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          listing_id?: number;
          message?: string;
          name?: string;
          phone?: string | null;
          read?: boolean | null;
          subject?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
      };
      reviews: {
        Row: {
          comment: string;
          created_at: string | null;
          id: string;
          listing_id: number;
          rating: number;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          comment: string;
          created_at?: string | null;
          id?: string;
          listing_id: number;
          rating: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          comment?: string;
          created_at?: string | null;
          id?: string;
          listing_id?: number;
          rating?: number;
          updated_at?: string | null;
          user_id?: string | null;
        };
      };
      saved_listings: {
        Row: {
          id: string;
          listing_id: number;
          saved_at: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          listing_id: number;
          saved_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          listing_id?: number;
          saved_at?: string | null;
          user_id?: string | null;
        };
      };
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null;
          created_at: string;
          current_period_end: string | null;
          current_period_start: string | null;
          id: string;
          price_id: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cancel_at_period_end?: boolean | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          price_id?: string | null;
          status: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cancel_at_period_end?: boolean | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          price_id?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
      users: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          email: string;
          id: string;
          location: string | null;
          name: string | null;
          phone: string | null;
          subscription: string | null;
          updated_at: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email: string;
          id: string;
          location?: string | null;
          name?: string | null;
          phone?: string | null;
          subscription?: string | null;
          updated_at?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          location?: string | null;
          name?: string | null;
          phone?: string | null;
          subscription?: string | null;
          updated_at?: string | null;
          website?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Insertables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updateables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Listing = Tables<"listings">;
export type Review = Tables<"reviews">;
export type SavedListing = Tables<"saved_listings">;
export type User = Tables<"users">;
export type Message = Tables<"messages">;
export type Booking = Tables<"bookings">;
export type Subscription = Tables<"subscriptions">;
