import { BoardColumn } from "@/components/BoardColumn";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { boardQueryOptions, useBoard } from "@/hooks/useBoard";
import { useColumns } from "@/hooks/useColumns";
import { useCreateColumn } from "@/hooks/useCreateColumn";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

import { z } from "zod";

import { useUpdateTask } from "@/hooks/useTasks";
import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	rectIntersection,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/boards/$boardId")({
	component: RouteComponent,
	beforeLoad: async ({ params }) => {
		const schema = z.object({
			boardId: z.coerce.number().int().positive(),
		});

		const result = schema.safeParse(params);
		if (!result.success) {
			throw new Error("Invalid board ID");
		}

		return { boardId: result.data.boardId };
	},
	loader: ({ context: { queryClient }, params: { boardId } }) =>
		queryClient.ensureQueryData(boardQueryOptions(Number(boardId))),
});

function RouteComponent() {
	const { boardId } = useParams({ from: "/boards/$boardId" });
	const { data: board, isLoading } = useBoard(Number(boardId));
	const { data: columns } = useColumns(Number(boardId));
	const { mutate: createColumn } = useCreateColumn();
	const [addingColumn, setAddingColumn] = useState<boolean>(false);
	const [newColumnTitle, setNewColumnTitle] = useState<string>("");

	const { mutate: mutateTask } = useUpdateTask();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const addColumn = () => {
		if (newColumnTitle.trim()) {
			// Logic to add column to the board
			setNewColumnTitle("");
			createColumn({
				title: newColumnTitle,
				board_id: board?.id || 0, // Ensure board_id is set correctly
				user_id: board?.user_id || "", // Use the current user's ID
				sort_order: 0, // Default sort order, adjust as needed
			});
			setAddingColumn((prev) => !prev);
		}
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		console.log("Drag started:", active.id);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		console.log("Drag over: active id ", active.id, "over: ", over?.id);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		console.log("Drag ended:", active.id, "over:", over?.id);

		mutateTask({
			id: Number(active.id),
			sort_order: over?.id ? Number(over.id) : 0, // Adjust sort_order based on the new position
		});
	};

	if (isLoading || !board) {
		return <div className="text-center">Loading board...</div>;
	}

	return (
		<Section>
			<div className="max-w-6xl mx-auto">
				<div className="mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
						Board Details: {board?.title}
					</h1>

					<DndContext
						sensors={sensors}
						collisionDetection={rectIntersection}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDragEnd={handleDragEnd}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{columns?.map((column) => (
								<BoardColumn key={`column-${column.id}`} column={column} />
							))}
							<div className="w-80 flex-shrink-0">
								{addingColumn ? (
									<Card className="p-4 bg-white shadow-md">
										<CardContent className="p-3">
											<Input
												placeholder="Enter column title..."
												value={newColumnTitle}
												onChange={(e) => setNewColumnTitle(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter" && newColumnTitle.trim()) {
														addColumn();
													}
												}}
												className="mb-2"
												autoFocus
											/>
											<div className="flex gap-2">
												<Button size="sm" onClick={() => addColumn()}>
													<Plus className="mr-2" />
													Add Column
												</Button>
												<Button
													size="sm"
													variant="outline"
													onClick={() => {
														setAddingColumn(false);
														setNewColumnTitle("");
													}}
												>
													Cancel
												</Button>
											</div>
										</CardContent>
									</Card>
								) : (
									<Button size="sm" onClick={() => setAddingColumn(true)}>
										<Plus />
									</Button>
								)}
							</div>
						</div>
					</DndContext>
				</div>
			</div>
		</Section>
	);
}
