import { BoardColumnTask } from "@/components/BoardColumnTask";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useTasks } from "@/hooks/useTasks";
import type { Column } from "@/lib/types";
import { Plus, Trello } from "lucide-react";
import { useState } from "react";

export const BoardColumn = ({ column }: { column: Column }) => {
	const { data: tasks } = useTasks(Number(column.id));
	const [addingTaskToColumn, setAddingTaskToColumn] = useState<number | null>(
		null,
	);
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");
	const { mutate: createTask } = useCreateTask();

	const addTask = () => {
		if (newTaskTitle.trim()) {
			// Logic to add task to the board
			setNewTaskTitle("");
			setAddingTaskToColumn(null);

			createTask({
				title: newTaskTitle,
				column_id: addingTaskToColumn || 0, // Ensure column_id is set correctly
				sort_order: 0, // Default sort order, adjust as needed
			});
		}
	};

	return (
		<div
			key={`column-${column.id}`}
			className="bg-gray-100 rounded-lg p-4 min-h-[600px]"
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold">Board Overview</h2>
				<div className="flex items-center space-x-2">
					<IconBadge icon={Trello} />
					<Button
						variant="default"
						size="sm"
						onClick={() => setAddingTaskToColumn(column.id)}
					>
						<Plus className="mr-2" />
						Add Card
					</Button>
				</div>
			</div>
			<div className="space-y-3">
				{tasks?.map((task) => (
					<BoardColumnTask task={task} key={`task-${task.id}`} />
				))}

				{addingTaskToColumn && addingTaskToColumn === column.id ? (
					<Card className="p-4 bg-white shadow-md">
						<CardContent className="p-3">
							<Input
								placeholder="Enter task title..."
								value={newTaskTitle}
								onChange={(e) => setNewTaskTitle(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && newTaskTitle.trim()) {
									}
								}}
								className="mb-2"
								autoFocus
							/>
							<div className="flex gap-2">
								<Button size="sm" onClick={() => addTask()}>
									<Plus className="mr-2" />
									Add Task
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setAddingTaskToColumn(null);
										setNewTaskTitle("");
									}}
								>
									Cancel
								</Button>
							</div>
						</CardContent>
					</Card>
				) : null}
			</div>
		</div>
	);
};
