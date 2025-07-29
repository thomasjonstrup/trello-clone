import type { LinkProps } from "@tanstack/react-router";

export type Board = {
	id: number;
	created_at: string; // ISO timestamp
	updated_at: string; // ISO timestamp
	title: string;
	description: string | null;
	color: string | null;
	user_id: string;
};

export type Site = {
	title: string;
	description: string;
	href: string;
	author: string;
	locale: string;
};

// You can use Pick to select only the props you need for your nav links:
export type NavLink = Pick<LinkProps, "to"> & {
	label: string;
};

export type SocialLink = {
	href: string;
	label: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface Column {
	id: number;
	created_at: string; // ISO timestamp string
	board_id: number;
	title: string;
	sort_order: number;
	user_id: string;
}
export interface Task {
	id: number;
	created_at: string; // ISO timestamp string
	title: string;
	description?: string | null;
	assignee?: string | null;
	due_date?: string | null; // date as string (e.g. "2024-08-01")
	priority?: string | null;
	sort_order: number;
	column_id: number;
}
