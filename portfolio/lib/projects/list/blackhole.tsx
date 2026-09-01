import type { Project } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";

const metadata = {
	title: "Blackhole",
	description:
		"A simulation that simulates and visualizers gravitational effects around black holes.",
	tags: ["rendering", "gpu", "optimization", "c++", "opengl"] as const,
	effort: "high",
	eyebrow: "Graphics · C++ · OpenGL",
	hook: "Gravity, rendered in real time, because I couldn't wait for the movie.",
	steps: {
		problem:
			"Gravitational lensing is usually only shown offline, in pre-rendered clips.",
		approach:
			"Hand-rolled the ray-bending shader in raw OpenGL, tuned for real-time frame budgets.",
		outcome: "Interactive simulation you can orbit and pull apart yourself.",
	},
} as const;

function BlackholeProjectCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
				},
			]}
		/>
	);
}

export const project: Project = {
	id: "blackhole",
	metadata,
	Card: BlackholeProjectCard,
} as const;
