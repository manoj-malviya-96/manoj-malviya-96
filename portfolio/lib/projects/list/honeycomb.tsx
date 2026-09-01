import type { ProjectMeta } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";

export const metadata: ProjectMeta = {
	title: "HoneyMesh",
	description:
		"Generate and visualize honeycomb lattice structures for scientific and educational use.",
	tags: [
		"rendering",
		"high-performance",
		"open-source",
		"c++",
		"vtk",
		"cad",
	] as const,
	effort: "medium",
	eyebrow: "CAD · C++ · VTK",
	hook: "Because hexagons are just better, structurally speaking.",
	steps: {
		problem:
			"Honeycomb lattices are a go-to structure in engineering, but tooling to generate them is scarce.",
		approach:
			"A fast, memory-friendly skeleton algorithm, exported to a VTK mesh for downstream geometry work.",
		outcome: "Open-source constructor and visualizer, ready for CAD workflows.",
	},
} as const;

export default function HoneycombProjectCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
				},
			]}
		/>
	);
}

export const project = {
	id: "honeycomb",
	metadata,
	Card: HoneycombProjectCard,
} as const;
