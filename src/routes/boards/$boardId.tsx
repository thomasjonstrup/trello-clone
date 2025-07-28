import { IconBadge } from "@/components/IconBadge";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBoard } from "@/hooks/useBoard";
import { useColumns } from "@/hooks/useColumns";
import { useCreateColumn } from "@/hooks/useCreateColumn";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Plus, Trello } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/boards/$boardId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { boardId } = useParams({ from: "/boards/$boardId" });
	const { data: board, isLoading } = useBoard(Number(boardId));
	const { data: columns } = useColumns(Number(boardId));
	const { mutate: createColumn } = useCreateColumn();

	console.log("columns", columns);

	const [addingTaskToColumn, setAddingTaskToColumn] = useState<string | null>(
		null,
	);
	const [addingColumn, setAddingColumn] = useState<boolean>(false);
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");
	const [newColumnTitle, setNewColumnTitle] = useState<string>("");

	const addTask = () => {
		if (newTaskTitle.trim()) {
			// Logic to add task to the board
			setNewTaskTitle("");
			setAddingTaskToColumn(null);
		}
	};

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

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{columns?.map((column) => (
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
											onClick={() => setAddingColumn(true)}
										>
											<Plus className="mr-2" />
											Add Card
										</Button>
									</div>
								</div>
								<div className="space-y-3">
									{columns?.map((column) => (
										<div
											key={column.id}
											className="rounded-lg border shadow-2xs hover:shadow-md transition-shadow bg-white"
										>
											<div className="flex flex-col space-y-1.5 p-6 pb-2">
												<h3 className="tracking-tight text-sm font-medium leading-tight">
													{column.title || "Untitled Column"}
												</h3>
											</div>
											<div className="p-6 pt-0">
												<p className="text-xs text-gray-600 mb-3 line-clamp-2">
													Create wireframes and mockups for the new landing page
												</p>
												<div className="flex flex-wrap gap-1 mb-3">
													<div
														className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-purple-100 text-purple-800"
														data-v0-t="badge"
													>
														Design
													</div>
													<div
														className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-red-100 text-red-800"
														data-v0-t="badge"
													>
														High Priority
													</div>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<span className="text-xs text-gray-600 hidden sm:inline">
															John Doe
														</span>
													</div>
													<span className="text-xs text-gray-500">
														15.1.2024
													</span>
												</div>
											</div>
										</div>
									))}

									{addingTaskToColumn ? (
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
						))}
						<div className="w-80 flex-shrink-0">
							{addingColumn ? (
								<Card className="p-4 bg-white shadow-md">
									<CardContent className="p-3">
										<Input
											placeholder="Enter task title..."
											value={newColumnTitle}
											onChange={(e) => setNewColumnTitle(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter" && newTaskTitle.trim()) {
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
				</div>
			</div>
		</Section>
	);
}
