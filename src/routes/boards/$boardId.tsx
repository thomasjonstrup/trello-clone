import { Section } from "@/components/Section";
import { useBoard } from "@/hooks/useBoard";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { boardId } = useParams({ from: "/boards/$boardId" });
	const { data: board, isLoading } = useBoard(Number(boardId));

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
				</div>
			</div>
		</Section>
	);
}
