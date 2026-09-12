import type { ColorToken } from "@manoj-malviya-96/atom";
import type { ValuesOf } from "@/lib/helper";

/** The "how I work" loop, in the order it's presented. */
export const PHASE_IDS = ["discover", "design", "build", "measure"] as const;

export type PhaseId = ValuesOf<typeof PHASE_IDS>;

export type Phase = {
	label: string;
	color: ColorToken;
	copy: string;
};

export const Phases = {
	discover: {
		label: "Discover",
		color: "blue",
		copy: "Understand the problem, not just the requirement..",
	},
	design: {
		label: "Design",
		color: "indigo",
		copy: "Model the problem before modeling the system",
	},
	build: {
		label: "Build",
		color: "green",
		copy: "Correct first. Fast second. Maintainable always.",
	},
	measure: {
		label: "Measure",
		color: "orange",
		copy: "Ship it. Measure it. Learn from it.",
	},
} satisfies Record<PhaseId, Phase>;
