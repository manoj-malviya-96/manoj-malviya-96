import { Flex, Text } from "@manoj-malviya-96/atom";
import type { ComponentProps, ReactNode } from "react";

type SectionId = "home-loop" | "home-feature" | "home-hero";

type SectionProps = {
	id: SectionId;
} & Omit<ComponentProps<typeof Flex>, "id">;

export function Section({ id, gap = "lg", className, children, ...rest }: SectionProps) {
	return (
		<Flex as="section" id={id} direction="col" gap={gap} className={className} height='xl' padding={{y: 'lg'}} {...rest}>
			{children}
		</Flex>
	);
}

type SectionHeaderProps = {
	eyebrow: ReactNode;
	title: ReactNode;
	caption?: ReactNode;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
	return (
		<Flex direction="col" gap="sm">
			<Eyebrow>{eyebrow}</Eyebrow>
			<Text variant="heading">{title}</Text>
			{caption && (
				<Text variant="body" muted>
					{caption}
				</Text>
			)}
		</Flex>
	);
}

export function Eyebrow({ children }: { children: ReactNode }) {
	return (
		<Text variant="overline" className="font-mono">
			{children}
		</Text>
	);
}
