import supabase from "@/lib/supabase";
import type { Task } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchTasks = async (id: number) => {
	const { data, error } = await supabase
		.from("tasks")
		.select("*")
		.eq("column_id", id);
	if (error) throw error;
	return data;
};

export function useTasks(id: number) {
	return useQuery<Task[]>({
		queryKey: ["tasks", id],
		queryFn: async () => {
			const tasks = await fetchTasks(id);
			return tasks?.slice().sort((a, b) => a.sort_order - b.sort_order) ?? [];
		},
	});
}

export function useUpdateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (task: Partial<Task>) => {
			const { error, data } = await supabase
				.from("tasks")
				.update(task)
				.eq("id", task.id);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
}
export function useDeleteTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (taskId: number) => {
			const { error } = await supabase.from("tasks").delete().eq("id", taskId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
}
