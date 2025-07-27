import { Section } from "@/components/Section";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import supabase from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link, createFileRoute } from "@tanstack/react-router";

import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBoards } from "@/hooks/useBoards";
import { useCreateBoard } from "@/hooks/useCreateBoard";
import { Plus, Trello } from "lucide-react";

export const Route = createFileRoute("/boards/")({
	component: RouteComponent,
});

function RouteComponent() {
	const session = useSupabaseSession();
	const { mutate: createBoard } = useCreateBoard();

	const { data: boards } = useBoards();

	if (!session) {
		return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
	}

	if (!session.user) {
		return <div className="text-center">No user session found.</div>;
	}

	const { user } = session;

	const handleCreateBoard = (): void => {
		createBoard({ title: "New Board", user_id: user.id });
	};

	return (
		<Section>
			<div className="max-w-6xl mx-auto">
				<div className="mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
						Welcome back, {user?.email}! 👋
					</h1>
					<p className="text-gray-600">
						Here's what's happening with your boards today.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="flex items-center justify-between">
								<CardHeader>
									<CardTitle className="text-lg font-semibold">
										My Boards
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										{boards?.length || 0} boards
									</CardDescription>
									<IconBadge icon={Trello} />
								</CardHeader>
								{/* 								<CardAction>
									<a
										href="/boards/create"
										className="text-blue-600 hover:underline"
									>
										Create Board
									</a>
								</CardAction> */}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="flex items-center justify-between">
								<CardHeader>
									<CardTitle className="text-lg font-semibold">
										Active Projects
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										{boards?.length || 0} boards
									</CardDescription>
									<IconBadge icon={Trello} />
								</CardHeader>
								{/* 								<CardAction>
									<a
										href="/boards/create"
										className="text-blue-600 hover:underline"
									>
										Create Board
									</a>
								</CardAction> */}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="flex items-center justify-between">
								<CardHeader>
									<CardTitle className="text-lg font-semibold">
										Recent Activity
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										{boards?.length || 0} boards
									</CardDescription>
									<IconBadge icon={Trello} />
								</CardHeader>
								{/* 								<CardAction>
									<a
										href="/boards/create"
										className="text-blue-600 hover:underline"
									>
										Create Board
									</a>
								</CardAction> */}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="flex items-center justify-between">
								<CardHeader>
									<CardTitle className="text-lg font-semibold">
										Total Boards
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										{boards?.length || 0} boards
									</CardDescription>
									<IconBadge icon={Trello} />
								</CardHeader>
								{/* 								<CardAction>
									<a
										href="/boards/create"
										className="text-blue-600 hover:underline"
									>
										Create Board
									</a>
								</CardAction> */}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="mb-6 sm:mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center mb-6">
						<Button onClick={handleCreateBoard}>
							<Plus />
							Create Board
						</Button>
					</div>

					{(boards?.length ?? 0) === 0 ? (
						<h2>No boards yet</h2>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
							{boards?.map((board) => (
								<Card
									key={board.id}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader className="pb-3 flex items-center justify-between">
										<CardTitle className="text-lg font-semibold">
											{board.title || "Untitled Board"}
										</CardTitle>
										<div className={`w-4 h-4 ${board.color} rounded`} />
									</CardHeader>
									<CardContent>
										<p className="text-sm text-gray-600">
											{board.description || "No description available."}
										</p>
									</CardContent>
									<CardFooter>
										<Button asChild>
											<Link
												to="/boards/$boardId"
												params={{
													boardId: String(board.id),
												}}
											>
												View Board
											</Link>
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>
		</Section>
	);
}
