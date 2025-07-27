export type Board = {
  id: number;
  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
  title: string;
  description: string | null;
  color: string | null;
  user_id: string;
};