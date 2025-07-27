import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const fetchSession = async (): Promise<Session | null> => {
	const { data, error } = await supabase.auth.getSession();
	if (error) throw error;
	return data.session;
};

export function useSupabaseSession() {
	// Use TanStack Query for initial fetch
	const { data: session } = useQuery({
		queryKey: ["supabase-session"],
		queryFn: fetchSession,
		staleTime: Number.POSITIVE_INFINITY,
	});

	/* 	// Listen for auth state changes and update the cache
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			queryClient.setQueryData(["supabase-session"], session);
		});
		return () => subscription.unsubscribe();
	}, [queryClient]); */

	return session;
}
