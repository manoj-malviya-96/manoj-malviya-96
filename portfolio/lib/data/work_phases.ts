import type { ValuesOf } from "@/lib/helper";

/** The "how I work" loop, in the order it's presented. */
export const PHASE_IDS = ["discover", "design", "build", "measure"] as const;

export type PhaseId = ValuesOf<typeof PHASE_IDS>;

export type Phase = {
	label: string;
	copy: string;
};

export const Phases = {
	discover: {
		label: "Discover",
		copy: "Understand the problem, not just the requirement..",
	},
	design: {
		label: "Design",
		copy: "Model the problem before modeling the system",
	},
	build: {
		label: "Build",
		copy: "Correct first. Fast second. Maintainable always.",
	},
	measure: {
		label: "Measure",
		copy: "Ship it. Measure it. Learn from it.",
	},
} satisfies Record<PhaseId, Phase>;
