import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Fallback values for development when Supabase is not configured
const supabaseUrl = PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});