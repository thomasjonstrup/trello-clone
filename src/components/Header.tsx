import { Link } from "@tanstack/react-router";
import { LucideTrello } from "lucide-react";

export default function Header() {
	return (
		<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<a href="/" className="flex items-center space-x-2">
						<LucideTrello />
						<span className="text-xl sm:text-2xl font-bold text-gray-900">
							Trello Clone
						</span>
					</a>
				</div>

				<nav className="flex flex-row">
					<div className="px-2 font-bold">
						<Link to="/">Home</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/store">Store</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/tanstack-query">TanStack Query</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/form/simple">Simple Form</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/form/address">Address Form</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/dashboard">Dashboard</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
