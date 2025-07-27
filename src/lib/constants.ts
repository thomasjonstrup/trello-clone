import type { NavLink, Site } from "./types";

export const SITE: Site = {
	title: "Trello Clone",
	description: "A simple Trello clone built with React and Supabase.",
	href: "https://trello-clone-tj.netlify.app/",
	author: "Thomas Jonstrup",
	locale: "en-US",
};

export const NAV_LINKS: NavLink[] = [
	{
		to: "/",
		label: "Home",
	},
	{
		to: "/dashboard",
		label: "Dashboard",
	},
];
