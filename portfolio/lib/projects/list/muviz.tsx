import { Typography } from "@manoj-malviya-96/atom";
import type { Project, ProjectMeta } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";

const metadata: ProjectMeta = {
	title: "Muviz",
	description:
		"A fast, feature-rich music visualizer for reactive, beautiful 3D visualizations",
	tags: [
		"web",
		"wasm",
		"c++",
		"typescript",
		"react",
		"ui/ux",
		"threejs",
	] as const,
	effort: "high",
	eyebrow: "Web · Three.js · WASM",
	hook: "Winamp nostalgia, rebuilt for the GPU.",
} as const;

function MuvizProjectCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/muviz/tree/master",
				},
				{
					kind: "demo",
					label: "Demo",
					href: "https://muviz.vercel.app/",
				},
			]}
		>
			<Typography variant="body">
				I’ve been obsessed with music visualizers since the Winamp days—there’s
				just something ridiculously satisfying about watching visuals snap to
				the beat. That itch is exactly why I’m building Muviz: a web visualizer
				that stays fast without skimping on features. <br /> <br />
				Under the hood, it uses a <strong>Cpp feature extractor </strong> that
				analyzes the full audio track in one pass and keeps the results in
				memory, so the frontend can focus on what it does best: rendering
				smooth, reactive visuals. Using ThreeJS for rendering means it can
				handle complex effects without breaking a sweat.
			</Typography>
		</ProjectCard>
	);
}

export const project: Project = {
	id: "muviz",
	metadata,
	Card: MuvizProjectCard,
} as const;
