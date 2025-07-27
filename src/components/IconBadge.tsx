import { cn } from "@/lib/utils";
// biome-ignore lint/style/useImportType: <explanation>
import { type LucideIcon } from "lucide-react";

export type IconBadgeProps = {
	icon?: LucideIcon;
	bgClassName?: string;
	iconClassName?: string;
};

export const IconBadge = ({
	icon: Icon,
	bgClassName,
	iconClassName,
}: IconBadgeProps) => {
	return (
		<div
			className={cn(
				"h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center",
				bgClassName,
			)}
		>
			{Icon ? (
				<Icon
					className={cn("h-5 w-5 sm:h-6 sm:w-6 text-blue-600", iconClassName)}
				/>
			) : null}
		</div>
	);
};
