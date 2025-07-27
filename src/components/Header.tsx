import { NAV_LINKS, SITE } from "@/lib/constants";
import { Link } from "@tanstack/react-router";
import { LucideTrello } from "lucide-react";

export default function Header() {
	return (
		<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<a href="/" className="flex items-center space-x-2">
						<LucideTrello className="text-blue-500" />
						<span className="text-xl sm:text-2xl font-bold text-gray-900">
							{SITE.title}
						</span>
					</a>
				</div>

				<nav className="flex flex-row">
					<ul className="flex space-x-4 items-center flew-row">
						<li>
							{NAV_LINKS.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									activeProps={{ className: "text-blue-600" }}
									className="px-2 font-bold hover:text-blue-600"
								>
									{link.label}
								</Link>
							))}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
