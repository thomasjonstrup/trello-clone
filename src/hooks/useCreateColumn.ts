import supabase from "@/lib/supabase";
import type { Column } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createColumn = async (columnInfo: Partial<Column>) => {
	const { error, data } = await supabase.from("columns").insert(columnInfo);
	if (error) throw error;
	return data;
};

export function useCreateColumn() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createColumn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["columns"] });
		},
	});
}
