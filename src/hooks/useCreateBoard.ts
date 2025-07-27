import supabase from "@/lib/supabase";
import type { Board } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createBoard = async (boardInfo: Partial<Board>) => {
	const { error, data } = await supabase.from("boards").insert(boardInfo);
	if (error) throw error;
	return data;
};

export function useCreateBoard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBoard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["boards"] });
			//queryClient.invalidateQueries({ queryKey: ["boardId", data[0].id]
		},
	});
}
