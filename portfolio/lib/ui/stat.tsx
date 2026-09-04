import { Flex, Grid, Stat, Text } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";

export type StatItem = {
	label: string;
	value: ReactNode;
};

type StatCardProps = {
	title: string;
	description: string;
	stats: readonly StatItem[];
	error?: string | undefined;
	cta?: ReactNode;
};

const MISSING_VALUE = "—";

export default function StatCard({
	title,
	description,
	stats,
	error,
	cta,
}: StatCardProps) {
	return (
		<Flex direction="col" gap="md" padding="lg" radius="md">
			<Flex direction="col" gap="xs">
				<Flex direction="row" hAlign="between" vAlign="center" gap="sm">
					<Text variant="title">{title}</Text>
					{cta}
				</Flex>
				<Text variant="caption">{error ?? description}</Text>
			</Flex>
			<Grid columns={2} gap="xs">
				{stats.map((stat) => (
					<Stat
						key={stat.label}
						label={stat.label}
						value={stat.value ?? MISSING_VALUE}
					/>
				))}
			</Grid>
		</Flex>
	);
}
