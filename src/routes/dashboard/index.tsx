import supabase from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import type { Session } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Boards } from "@/components/Boards";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);
	if (!session) {
		return (
			<Auth
				supabaseClient={supabase} appearance={{ theme: ThemeSupa }}
			/>
		);
	}

	if (!session.user) {
		return <div className="text-center">No user session found.</div>;
	}

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			<p>User ID: {session.user.id}</p>
			<p>Email: {session.user.email}</p>
			{/* You can add more components here, like Boards */}
			<Boards />
		</div>
	);
}
