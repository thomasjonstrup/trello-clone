import supabase from "@/lib/supabase";
import type { Column } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const fetchColumns = async (id: number) => {
	const { data, error } = await supabase
		.from("columns")
		.select("*")
		.eq("board_id", id);
	if (error) throw error;
	return data;
};

export function useColumns(id: number) {
	return useQuery<Column[]>({
		queryKey: ["columns", id],
		queryFn: () => fetchColumns(id),
	});
}
