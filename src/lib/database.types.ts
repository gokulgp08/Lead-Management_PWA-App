export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          subdomain: string
          primary_color: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          subdomain: string
          primary_color?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          subdomain?: string
          primary_color?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      users: {
        Row: {
          id: string
          email: string
          password: string
          name: string
          company_id: string
          role: 'admin' | 'user'
          theme: 'light' | 'dark' | 'system'
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          password: string
          name: string
          company_id: string
          role?: 'admin' | 'user'
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          password?: string
          name?: string
          company_id?: string
          role?: 'admin' | 'user'
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      leads: {
        Row: {
          id: string
          company_id: string
          lead_name: string
          mobile_numbers: Json
          company_name: string
          current_software: string
          remarks: string
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          created_by: string
          created_at: string
          updated_at: string
          is_deleted: boolean
          sharing_history: Json
        }
        Insert: {
          id?: string
          company_id: string
          lead_name: string
          mobile_numbers: Json
          company_name: string
          current_software: string
          remarks?: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          created_by: string
          created_at?: string
          updated_at?: string
          is_deleted?: boolean
          sharing_history?: Json
        }
        Update: {
          id?: string
          company_id?: string
          lead_name?: string
          mobile_numbers?: Json
          company_name?: string
          current_software?: string
          remarks?: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          created_by?: string
          created_at?: string
          updated_at?: string
          is_deleted?: boolean
          sharing_history?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}