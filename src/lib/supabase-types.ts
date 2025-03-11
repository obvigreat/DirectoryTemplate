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
      listings: {
        Row: {
          id: number;
          title: string;
          category: string;
          description: string;
          location: string;
          phone: string;
          email: string;
          website: string;
          rating: number;
          reviews_count: number;
          created_at: string;
          updated_at: string;
          user_id: string;
          amenities: string[] | null;
          hours: Json | null;
          images: string[] | null;
          price_range: string | null;
          featured: boolean;
          status: string;
        };
        Insert: {
          id?: number;
          title: string;
          category: string;
          description: string;
          location: string;
          phone: string;
          email: string;
          website: string;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          amenities?: string[] | null;
          hours?: Json | null;
          images?: string[] | null;
          price_range?: string | null;
          featured?: boolean;
          status?: string;
        };
        Update: {
          id?: number;
          title?: string;
          category?: string;
          description?: string;
          location?: string;
          phone?: string;
          email?: string;
          website?: string;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          amenities?: string[] | null;
          hours?: Json | null;
          images?: string[] | null;
          price_range?: string | null;
          featured?: boolean;
          status?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          listing_id: number;
          rating: number;
          comment: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: number;
          rating: number;
          comment: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: number;
          rating?: number;
          comment?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      saved_listings: {
        Row: {
          id: string;
          user_id: string;
          listing_id: number;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: number;
          saved_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: number;
          saved_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string | null;
          role: string;
          subscription_tier: string | null;
          subscription_status: string | null;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          role?: string;
          subscription_tier?: string | null;
          subscription_status?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          role?: string;
          subscription_tier?: string | null;
          subscription_status?: string | null;
        };
      };
    };
  };
}
