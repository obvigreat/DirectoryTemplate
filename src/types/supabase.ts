export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_listing_views: {
        Row: {
          created_at: string | null
          id: string
          listing_id: number | null
          session_id: string | null
          user_id: string | null
          view_duration: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id?: number | null
          session_id?: string | null
          user_id?: string | null
          view_duration?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: number | null
          session_id?: string | null
          user_id?: string | null
          view_duration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_listing_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_page_views: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_search_queries: {
        Row: {
          category: string | null
          created_at: string | null
          filters: Json | null
          id: string
          location: string | null
          query: string | null
          results_count: number | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          location?: string | null
          query?: string | null
          results_count?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          location?: string | null
          query?: string | null
          results_count?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string | null
          email: string
          id: string
          listing_id: number
          name: string
          notes: string | null
          phone: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string | null
          email: string
          id?: string
          listing_id: number
          name: string
          notes?: string | null
          phone: string
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string | null
          email?: string
          id?: string
          listing_id?: number
          name?: string
          notes?: string | null
          phone?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          analysis: Json | null
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          processed_at: string | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis?: Json | null
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis?: Json | null
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      listing_analysis_master: {
        Row: {
          analysis: Json
          created_at: string | null
          document_ids: string[]
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis: Json
          created_at?: string | null
          document_ids: string[]
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis?: Json
          created_at?: string | null
          document_ids?: string[]
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      listing_tags: {
        Row: {
          created_at: string | null
          id: string
          listing_id: number
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id: number
          tag_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: number
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_tags_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          amenities: string[] | null
          category: string
          created_at: string | null
          description: string
          email: string
          featured: boolean | null
          hours: Json | null
          id: number
          images: string[] | null
          location: string
          phone: string
          price_range: string | null
          rating: number | null
          reviews_count: number | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          views_count: number | null
          website: string
        }
        Insert: {
          amenities?: string[] | null
          category: string
          created_at?: string | null
          description: string
          email: string
          featured?: boolean | null
          hours?: Json | null
          id?: number
          images?: string[] | null
          location: string
          phone: string
          price_range?: string | null
          rating?: number | null
          reviews_count?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
          website: string
        }
        Update: {
          amenities?: string[] | null
          category?: string
          created_at?: string | null
          description?: string
          email?: string
          featured?: boolean | null
          hours?: Json | null
          id?: number
          images?: string[] | null
          location?: string
          phone?: string
          price_range?: string | null
          rating?: number | null
          reviews_count?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
          website?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          listing_id: number | null
          listing_title: string | null
          read: boolean | null
          recipient_avatar: string | null
          recipient_id: string
          recipient_name: string | null
          sender_avatar: string | null
          sender_id: string
          sender_name: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          listing_id?: number | null
          listing_title?: string | null
          read?: boolean | null
          recipient_avatar?: string | null
          recipient_id: string
          recipient_name?: string | null
          sender_avatar?: string | null
          sender_id: string
          sender_name?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          listing_id?: number | null
          listing_title?: string | null
          read?: boolean | null
          recipient_avatar?: string | null
          recipient_id?: string
          recipient_name?: string | null
          sender_avatar?: string | null
          sender_id?: string
          sender_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      popular_searches: {
        Row: {
          category: string | null
          count: number | null
          created_at: string | null
          id: string
          last_searched_at: string | null
          location: string | null
          query: string
        }
        Insert: {
          category?: string | null
          count?: number | null
          created_at?: string | null
          id?: string
          last_searched_at?: string | null
          location?: string | null
          query: string
        }
        Update: {
          category?: string | null
          count?: number | null
          created_at?: string | null
          id?: string
          last_searched_at?: string | null
          location?: string | null
          query?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          admin_id: string | null
          admin_notes: string | null
          content_id: string
          content_title: string | null
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_id: string | null
          reporter_name: string | null
          resolution: string | null
          resolved_at: string | null
          status: string
          type: string
        }
        Insert: {
          admin_id?: string | null
          admin_notes?: string | null
          content_id: string
          content_title?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          reporter_name?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          type: string
        }
        Update: {
          admin_id?: string | null
          admin_notes?: string | null
          content_id?: string
          content_title?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          reporter_name?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string
          created_at: string | null
          id: string
          listing_id: number
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: string
          listing_id: number
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: string
          listing_id?: number
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      saved_listings: {
        Row: {
          id: string
          listing_id: number
          saved_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          listing_id: number
          saved_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          listing_id?: number
          saved_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_saved_listings_listing"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          cancel_at_period_end: boolean | null
          canceled_at: number | null
          created_at: string
          currency: string | null
          current_period_end: number | null
          current_period_start: number | null
          custom_field_data: Json | null
          customer_cancellation_comment: string | null
          customer_cancellation_reason: string | null
          customer_id: string | null
          ended_at: number | null
          ends_at: number | null
          id: string
          interval: string | null
          metadata: Json | null
          price_id: string | null
          started_at: number | null
          status: string | null
          stripe_id: string | null
          stripe_price_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          credits: string | null
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          lifetime_value: number | null
          location: string | null
          name: string | null
          phone: string | null
          role: string | null
          social_links: Json | null
          subscription: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          credits?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          lifetime_value?: number | null
          location?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
          social_links?: Json | null
          subscription?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          credits?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          lifetime_value?: number | null
          location?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
          social_links?: Json | null
          subscription?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string
          data: Json | null
          event_type: string
          id: string
          modified_at: string
          stripe_event_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          event_type: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          event_type?: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_listing_views: {
        Args: {
          listing_id: number
        }
        Returns: undefined
      }
      increment_search_count: {
        Args: {
          search_query: string
          search_category: string
          search_location: string
        }
        Returns: undefined
      }
      update_user_lifetime_value: {
        Args: {
          user_id: string
          amount: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
