import { Flex, Grid, Typography } from "@manoj-malviya-96/atom";
import type React from "react";
import { memo } from "react";

type Stat = {
	label: string;
	value?: string | number;
};

export interface CardProps {
	title: string;
	description?: string;
	stats: Stat[];
	className?: string;
	cta?: React.ReactNode;
}

const StatCard = memo(
	({ title, description, stats, className, cta }: CardProps) => {
		return (
			<Flex
				direction="col"
				gap="md"
				padding="lg"
				radius="md"
				backgroundColor="surface"
				className={className}
			>
				<Flex direction="col" gap="xs">
					<Flex direction="row" hAlign="between" vAlign="center" gap="sm">
						<Typography variant="title">{title}</Typography>
						{cta}
					</Flex>
					<Typography variant="caption">{description}</Typography>
				</Flex>

				<Grid columns={2} gap="xs">
					{stats.slice(0, 4).map((stat, i) => (
						<Flex
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							direction="col"
							hAlign="center"
							vAlign="start"
							padding="md"
						>
							<Typography variant="heading" as="p">
								{stat.value ?? "-"}
							</Typography>
							<Typography variant="caption">{stat.label}</Typography>
						</Flex>
					))}
				</Grid>
			</Flex>
		);
	},
);

StatCard.displayName = "StatCard";
export default StatCard;
