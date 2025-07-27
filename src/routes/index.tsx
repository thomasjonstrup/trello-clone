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
			</div>
		</Section>
	);
}
