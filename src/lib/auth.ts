import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { RequestEvent } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const JWT_SECRET = process.env.AUTH_SECRET!;
const JWT_EXPIRES_IN = '7d';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  companyId: string;
  role: 'admin' | 'user';
  theme: 'light' | 'dark' | 'system';
}

export interface CompanyPayload {
  id: string;
  name: string;
  subdomain: string;
  primaryColor: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(cookies: any, token: string) {
  cookies.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });
}

export function clearAuthCookie(cookies: any) {
  cookies.delete('auth_token', { path: '/' });
}

export async function authenticate(event: RequestEvent): Promise<{
  user: UserPayload | null;
  company: CompanyPayload | null;
}> {
  const token = event.cookies.get('auth_token');
  
  if (!token) {
    return { user: null, company: null };
  }

  const user = verifyToken(token);
  if (!user) {
    return { user: null, company: null };
  }

  // Get company data from Supabase using a service client to bypass RLS
  const supabaseService = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: company, error } = await supabaseService
    .from('companies')
    .select('id, name, subdomain, primary_color')
    .eq('id', user.companyId) // Ensure companyId from token is used here
    .eq('is_active', true)
    .single();

  if (!company) {
    return { user: null, company: null };
  }

  return {
    user,
    company: {
      id: company.id,
      name: company.name,
      subdomain: company.subdomain,
      primaryColor: company.primary_color
    }
  };
}