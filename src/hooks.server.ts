import { createClient } from '@supabase/supabase-js';
import { redirect, type Handle } from '@sveltejs/kit';
import type { Database } from '$lib/database.types';
import { authenticate } from '$lib/auth';
// Get environment variables from Vite's import.meta.env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Log environment variables for debugging (these won't be exposed to the client)
console.log('Supabase URL:', supabaseUrl ? '***' : 'MISSING');
console.log('Supabase Anon Key:', supabaseAnonKey ? '***' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'Missing required Supabase environment variables. Please check your .env file.';
  console.error(errorMessage);
  throw new Error(errorMessage);
}

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize Supabase client
  event.locals.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
  
  event.locals.getSession = async () => {
    return null; // We're using JWT instead of Supabase auth
  };

  // Only authenticate if Supabase is properly configured
  if (supabaseUrl && supabaseAnonKey) {
    const { user, company } = await authenticate(event);

    if (user && company) {
      event.locals.user = user;
      event.locals.company = company;
    } else {
      // If authentication fails, delete the cookie to break redirect loops
      event.cookies.delete('auth_token', { path: '/' });
      event.locals.user = undefined;
      event.locals.company = undefined;
    }
  } else {
    event.locals.user = undefined;
    event.locals.company = undefined;
  }

  // Protect dashboard routes
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user) {
      throw redirect(303, '/auth/login');
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });
};