import { cn } from "@/lib/utils";

interface SectionProps extends React.PropsWithChildren {
	title?: string;
	className?: string;
}

export const Section = ({ className, children }: SectionProps) => {
	return (
		<section className={cn("container mx-auto px-4 py-20", className)}>
			{children}
		</section>
	);
};
