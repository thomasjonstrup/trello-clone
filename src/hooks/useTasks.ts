import supabase from "@/lib/supabase";
import type { Task } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

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
		queryFn: () => fetchTasks(id),
	});
}
