import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PPERequest = {
  id: string;
  item: string;
  quantity: number;
  requested_by: string;
  status: 'Pending' | 'Approved' | 'Delivered';
  created_at?: string;
};
