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
	steps: {
		problem:
			"Classic topology-optimization research code was too slow to be useful beyond a demo.",
		approach:
			"Vectorized the core solver in NumPy instead of rewriting the whole thing in C++.",
		outcome: "2× faster, scales to more elements, without leaving Python.",
	},
} as const;

export const caseStudy = {
	problem:
		"The classic 99-line topology optimization code is a beautiful piece of engineering — it finds the optimal material distribution in a structure given its loads and constraints. But it's from an era that didn't care about wall-clock time: nested Python loops over every element, every iteration. Slow af, and it falls over well before you reach the element counts a real design needs.",
	approach:
		"I rewrote the solver's inner loop as vectorized NumPy: the per-element stiffness assembly, the sensitivity filter, and the optimality-criteria update all became array operations instead of Python-level loops. No rewrite in C++, no new dependencies — the win came entirely from stopping the interpreter from re-doing the same scalar math one element at a time.",
	result:
		"At least 2x faster than the original on the same problem sizes, and the gap widens as the mesh gets finer — the original slows down roughly with element count, the vectorized version scales far better. Same optimizer, same physics, same 99 lines of intent — just done the way NumPy actually wants it done.",
} as const;

function TopOptCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "case-study",
					href: `/projects/${PROJECT_ID}`,
				},
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/topopt-py/tree/master",
				},
				{
					kind: "medium",
					href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
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
