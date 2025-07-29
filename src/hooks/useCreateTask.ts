import supabase from "@/lib/supabase";
import type { Task } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTask = async (columnInfo: Partial<Task>) => {
	const { error, data } = await supabase.from("tasks").insert(columnInfo);
	if (error) throw error;
	return data;
};

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
}
