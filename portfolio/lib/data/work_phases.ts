import type { ColorToken } from "@manoj-malviya-96/atom";
import { assertNever } from "@manoj-malviya-96/atom";
import type { ValuesOf } from "@/lib/helper";

/** The "how I work" loop, in the order it's presented. */
export const PHASE_IDS = ["discover", "design", "build", "measure"] as const;

export type PhaseId = ValuesOf<typeof PHASE_IDS>;

export type Phase = {
	label: string;
	color: ColorToken;
	copy: string;
};

export function getPhase(phase: PhaseId): Phase {
	switch (phase) {
		case "discover":
			return {
				label: "Discover",
				color: "blue",
				copy: "Understand the problem, not just the requirement..",
			};
		case "design":
			return {
				label: "Design",
				color: "indigo",
				copy: "Model the problem before modeling the system",
			};
		case "build":
			return {
				label: "Build",
				color: "green",
				copy: "Correct first. Fast second. Maintainable always.",
			};
		case "measure":
			return {
				label: "Measure",
				color: "orange",
				copy: "Ship it. Measure it. Learn from it.",
			};
		default:
			return assertNever(phase);
	}
}
