import type { Project } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";

const PROJECT_ID = "topopt_py" as const;

const metadata = {
	title: "topopt-py",
	description: "Fastest 2D Topology Optimization Solver in Python",
	tags: ["simulation", "optimization", "high-performance", "python"] as const,
	effort: "high",
	eyebrow: "Optimization · Python · HPC",
	hook: "A 40-year-old optimization algorithm, dragged into this decade.",
	media: {
		kind: "video",
		src: "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/optimization.webm",
		alt: "A topology optimization converging on a solution.",
	},
	steps: {
		problem:
			"Classic topology-optimization research code was too slow to be useful beyond a demo.",
		approach:
			"Vectorized the core solver in NumPy instead of rewriting the whole thing in C++.",
		outcome: "2× faster, scales to more elements, without leaving Python.",
	},
} as const;

export const GITHUB_URL =
	"https://github.com/manoj-malviya-96/topopt-py/tree/master" as const;
export const MEDIUM_URL =
	"https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2" as const;

function TopOptCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "github",
					href: GITHUB_URL,
				},
				{
					kind: "medium",
					href: MEDIUM_URL,
				},
			]}
		/>
	);
}

export const project: Project = {
	id: PROJECT_ID,
	metadata,
	Card: TopOptCard,
} as const;
