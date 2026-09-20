import type { ValuesOf } from "@/lib/helper";

/** The "how I work" loop, in the order it's presented. */
export const PHASE_IDS = ["discover", "design", "build", "measure"] as const;

export type PhaseId = ValuesOf<typeof PHASE_IDS>;

export type Phase = {
	label: string;
	copy: string;
};

export const HowIWorkPhase = {
	discover: {
		label: "Discover",
		copy: "Problem understanding over requirement-taking. I ask what outcome actually matters and why this problem exists at all.",
	},
	design: {
		label: "Design",
		copy: "Model the problem before the system. Draw boundaries, identify invariants, challenge assumptions before opening an editor.",
	},
	build: {
		label: "Build",
		copy: "Correct first. Fast second. Premature optimization is the second-oldest engineering mistake.",
	},
	measure: {
		label: "Measure",
		copy: "Metrics are a contract with reality. Instrument before shipping, measure what changed, let data argue with assumptions.",
	},
} satisfies Record<PhaseId, Phase>;
