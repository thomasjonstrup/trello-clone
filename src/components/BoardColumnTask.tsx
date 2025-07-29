import type { Task } from "@/lib/types";
import { format } from "date-fns";

export const BoardColumnTask = ({ task }: { task: Task }) => {
	return (
		<div className="rounded-lg border shadow-2xs hover:shadow-md transition-shadow bg-white">
			<div className="flex flex-col space-y-1.5 p-6 pb-2">
				<h3 className="tracking-tight text-sm font-medium leading-tight">
					{task.title || "Untitled task"}
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
						{format(new Date(task.created_at), "MMM dd, yyyy")}
					</span>
				</div>
			</div>
		</div>
	);
};
