import { Typography } from "@manoj-malviya-96/atom";
import type { Project } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";

const metadata = {
	title: "topopt-py",
	description: "Fastest 2D Topology Optimization Solver in Python",
	tags: ["simulation", "optimization", "high-performance", "python"] as const,
	effort: "high",
} as const;

function TopOptCard() {
	return (
		<ProjectCard
			{...metadata}
			images={[
				"https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/optimization.webm",
			]}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/topopt-py/tree/master",
				},
				{
					kind: "medium",
					href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
				},
			]}
		>
			<Typography variant="body">
				I stumbled upon the classic 99-line topology optimization code during
				grad school - a beautiful piece of engineering that finds the optimal
				material distribution in structures. But the code is slow af, and doesnt
				scale well with more elements. <br /> <br />I decided to take a stab at
				vectorizing it and see if I could get it to run faster in python -
				without moving to better languages like C++. Now its at least 2X faster
				than the original code, and scales well with more elements.
			</Typography>
		</ProjectCard>
	);
}

export const project: Project = {
	id: "topopt_py",
	metadata,
	Card: TopOptCard,
} as const;
