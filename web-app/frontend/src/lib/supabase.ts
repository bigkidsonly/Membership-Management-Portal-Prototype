// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      // Define your table types here
      affiliates: {
        Row: {
          id: string
          name: string
          tier: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tier: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tier?: string
          status?: string
          updated_at?: string
        }
      }
      marketplace_tools: {
        Row: {
          id: string
          name: string
          vendor: string
          category: string
          description: string
          regular_price: number
          member_price: number
          discount: number
          tier: string
          rating: number
          review_count: number
          logo_url: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          vendor: string
          category: string
          description: string
          regular_price: number
          member_price: number
          discount: number
          tier: string
          rating?: number
          review_count?: number
          logo_url: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          vendor?: string
          category?: string
          description?: string
          regular_price?: number
          member_price?: number
          discount?: number
          tier?: string
          rating?: number
          review_count?: number
          logo_url?: string
          featured?: boolean
          updated_at?: string
        }
      }
      // Add more tables as needed
    }
  }
}