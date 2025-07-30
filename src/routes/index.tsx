import { Section } from "@/components/Section";
import { SITE } from "@/lib/constants";
import { m } from "@/paraglide/messages.js";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<Section title="Welcome to the Trello Clone" className="text-center">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					{m.organize_life()}
					<span className="text-blue-600">{SITE.title}.</span>
				</h1>
				<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
					{m.frontpage_subtitle({ app: SITE.title })}
				</p>
			</div>
		</Section>
	);
}
