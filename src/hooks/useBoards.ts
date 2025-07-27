import { useQuery } from '@tanstack/react-query';
import supabase from '@/lib/supabase';
import type { Board } from '@/lib/types';

const fetchBoards = async () => {
  const { data, error } = await supabase.from('boards').select('*');
  if (error) throw error;
  return data;
};

export function useBoards() {
  return useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });
}