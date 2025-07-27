import { Section } from "@/components/Section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<Section title="Welcome to the Trello Clone" className="text-center">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					Organize work and life with{" "}
					<span className="text-blue-600">Trello Clone.</span>
				</h1>
				<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
					TrelloClone helps teams move work forward. Collaborate, manage
					projects, and reach new productivity peaks. From high rises to the
					home office, the way your team works is unique—accomplish it all with
					TrelloClone.
				</p>
			</div>
		</Section>
	);
}
