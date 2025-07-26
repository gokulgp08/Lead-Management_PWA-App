import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from './lib/database.types';

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
      user?: {
        id: string;
        email: string;
        name: string;
        companyId: string;
        role: 'admin' | 'user';
        theme: 'light' | 'dark' | 'system';
      };
      company?: {
        id: string;
        name: string;
        subdomain: string;
        primaryColor: string;
      };
    }
    // interface PageData {}
    // interface Platform {}
  }

  // Add type declarations for environment variables
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_SUPABASE_URL: string;
      PUBLIC_SUPABASE_ANON_KEY: string;
      SERVICE_ROLE_KEY: string;
    }
  }
}

export {};