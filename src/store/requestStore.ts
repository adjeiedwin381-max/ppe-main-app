import { create } from 'zustand';
import { supabase, type PPERequest } from '../lib/supabase';

type RequestStore = {
  requests: PPERequest[];
  loading: boolean;
  loadRequests: () => Promise<void>;
  addRequest: (request: Omit<PPERequest, 'id' | 'created_at'>) => Promise<void>;
  updateStatus: (id: string) => Promise<void>;
};

export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: [],
  loading: false,

  loadRequests: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('ppe_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading requests:', error);
    } else {
      set({ requests: data || [] });
    }
    set({ loading: false });
  },

  addRequest: async (request) => {
    const { data, error } = await supabase
      .from('ppe_requests')
      .insert([request])
      .select()
      .single();

    if (error) {
      console.error('Error adding request:', error);
    } else if (data) {
      set({ requests: [data, ...get().requests] });
    }
  },

  updateStatus: async (id) => {
    const request = get().requests.find((r) => r.id === id);
    if (!request) return;

    const statusCycle: Record<string, 'Pending' | 'Approved' | 'Delivered'> = {
      Pending: 'Approved',
      Approved: 'Delivered',
      Delivered: 'Pending',
    };
    const newStatus = statusCycle[request.status];

    const { error } = await supabase
      .from('ppe_requests')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      set({
        requests: get().requests.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        ),
      });
    }
  },
}));
