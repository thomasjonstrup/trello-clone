import supabase from "@/lib/supabase";
import type { Board } from "@/lib/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchBoard = async (id: number) => {
	const { data, error } = await supabase
		.from("boards")
		.select("*")
		.eq("id", id)
		.single();
	if (error) throw error;
	return data;
};

export const boardQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ["boardId", { id }],
		queryFn: () => fetchBoard(id),
		enabled: !!id, // Only run the query if id is defined
	});

export function useBoard(id: number) {
	return useQuery<Board>({
		queryKey: ["boardId", id],
		queryFn: () => fetchBoard(id),
		enabled: !!id, // Only run the query if id is defined
	});
}
