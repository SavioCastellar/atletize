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
      athletes: {
        Row: {
          course: string
          description: string | null
          graduation: string
          id: string
          image: string | null
          instagram: string | null
          name: string
        }
        Insert: {
          course: string
          description?: string | null
          graduation: string
          id?: string
          image?: string | null
          instagram?: string | null
          name: string
        }
        Update: {
          course?: string
          description?: string | null
          graduation?: string
          id?: string
          image?: string | null
          instagram?: string | null
          name?: string
        }
        Relationships: []
      }
      athletes_modalities: {
        Row: {
          athlete_id: string
          id: string
          modality_id: string
        }
        Insert: {
          athlete_id?: string
          id?: string
          modality_id?: string
        }
        Update: {
          athlete_id?: string
          id?: string
          modality_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "athletes_modalities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_modalities_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
        }
        Insert: {
          amount: number
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          event_type: string
          id: string
          location: string | null
          modality: string | null
          recurrence: string | null
          start_time: string
          team1: string | null
          team2: string | null
          title: string
          tournament: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          event_type: string
          id?: string
          location?: string | null
          modality?: string | null
          recurrence?: string | null
          start_time: string
          team1?: string | null
          team2?: string | null
          title: string
          tournament?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          event_type?: string
          id?: string
          location?: string | null
          modality?: string | null
          recurrence?: string | null
          start_time?: string
          team1?: string | null
          team2?: string | null
          title?: string
          tournament?: string | null
        }
        Relationships: []
      }
      functions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      histories: {
        Row: {
          description: string | null
          id: string
          image: string | null
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          image?: string | null
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          image?: string | null
          title?: string
        }
        Relationships: []
      }
      managers: {
        Row: {
          contact_number: string | null
          course: string | null
          email: string | null
          id: string
          image: string | null
          instagram: string | null
          name: string
          period: string | null
          position_id: string
          reg_number: string | null
          x: string | null
        }
        Insert: {
          contact_number?: string | null
          course?: string | null
          email?: string | null
          id?: string
          image?: string | null
          instagram?: string | null
          name: string
          period?: string | null
          position_id?: string
          reg_number?: string | null
          x?: string | null
        }
        Update: {
          contact_number?: string | null
          course?: string | null
          email?: string | null
          id?: string
          image?: string | null
          instagram?: string | null
          name?: string
          period?: string | null
          position_id?: string
          reg_number?: string | null
          x?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "managers_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          id: string
          message: string
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      modalities: {
        Row: {
          description: string | null
          icon: string
          id: string
          instagram: string | null
          name: string
          status: boolean | null
        }
        Insert: {
          description?: string | null
          icon: string
          id?: string
          instagram?: string | null
          name?: string
          status?: boolean | null
        }
        Update: {
          description?: string | null
          icon?: string
          id?: string
          instagram?: string | null
          name?: string
          status?: boolean | null
        }
        Relationships: []
      }
      order_product: {
        Row: {
          id: number
          order_id: number
          product_id: string
          product_variant_id: string
          quantity: number
        }
        Insert: {
          id?: number
          order_id: number
          product_id: string
          product_variant_id: string
          quantity: number
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: string
          product_variant_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_product_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created: string | null
          id: number
          receipt_URL: string | null
          status: string
          total: number
          user_id: string
        }
        Insert: {
          created?: string | null
          id?: number
          receipt_URL?: string | null
          status: string
          total: number
          user_id?: string
        }
        Update: {
          created?: string | null
          id?: number
          receipt_URL?: string | null
          status?: string
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      periods: {
        Row: {
          id: string
          range: string
        }
        Insert: {
          id?: string
          range: string
        }
        Update: {
          id?: string
          range?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          function_id: string
          id: string
          name: string
        }
        Insert: {
          function_id?: string
          id?: string
          name: string
        }
        Update: {
          function_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_function_id_fkey"
            columns: ["function_id"]
            isOneToOne: false
            referencedRelation: "functions"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          id: string
          key: string
          name: string
          order: number
          product_id: string
          size: number
          url: string
        }
        Insert: {
          id?: string
          key?: string
          name: string
          order?: number
          product_id: string
          size: number
          url: string
        }
        Update: {
          id?: string
          key?: string
          name?: string
          order?: number
          product_id?: string
          size?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tags: {
        Row: {
          id: string
          product_id: string | null
          tag: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          tag: string
        }
        Update: {
          id?: string
          product_id?: string | null
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          name: string
          order: number
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order?: number
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order?: number
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          plan: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          plan: string
          start_date?: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          plan?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      timelines: {
        Row: {
          description: string | null
          id: string
          images: Json | null
          year: number
        }
        Insert: {
          description?: string | null
          id?: string
          images?: Json | null
          year: number
        }
        Update: {
          description?: string | null
          id?: string
          images?: Json | null
          year?: number
        }
        Relationships: []
      }
      tournaments: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      tournaments_modalities: {
        Row: {
          bronze: number | null
          gold: number | null
          id: string
          modality_id: string
          silver: number | null
          tournament_id: string
        }
        Insert: {
          bronze?: number | null
          gold?: number | null
          id?: string
          modality_id?: string
          silver?: number | null
          tournament_id?: string
        }
        Update: {
          bronze?: number | null
          gold?: number | null
          id?: string
          modality_id?: string
          silver?: number | null
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_modalities_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournaments_modalities_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      training_schedule: {
        Row: {
          fri: string | null
          id: string
          modality_id: string | null
          mon: string | null
          sat: string | null
          sun: string | null
          thu: string | null
          tue: string | null
          wed: string | null
        }
        Insert: {
          fri?: string | null
          id?: string
          modality_id?: string | null
          mon?: string | null
          sat?: string | null
          sun?: string | null
          thu?: string | null
          tue?: string | null
          wed?: string | null
        }
        Update: {
          fri?: string | null
          id?: string
          modality_id?: string | null
          mon?: string | null
          sat?: string | null
          sun?: string | null
          thu?: string | null
          tue?: string | null
          wed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_schedule_modality_id_fkey1"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          course: string | null
          created_at: string
          customer_id: string | null
          email: string
          enrollment_code: string | null
          id: string
          name: string | null
          photo_url: string | null
          plan: string
          subscription: string | null
          updated_at: string | null
        }
        Insert: {
          course?: string | null
          created_at?: string
          customer_id?: string | null
          email: string
          enrollment_code?: string | null
          id?: string
          name?: string | null
          photo_url?: string | null
          plan?: string
          subscription?: string | null
          updated_at?: string | null
        }
        Update: {
          course?: string | null
          created_at?: string
          customer_id?: string | null
          email?: string
          enrollment_code?: string | null
          id?: string
          name?: string | null
          photo_url?: string | null
          plan?: string
          subscription?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_roles: {
        Row: {
          id: string | null
          role: string | null
        }
        Insert: {
          id?: string | null
          role?: string | null
        }
        Update: {
          id?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
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
