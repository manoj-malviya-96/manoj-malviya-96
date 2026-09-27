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
		copy: "Problem understanding over requirement-taking. The EV Charging Simulator started as 'how many chargers does this lot need,' not 'build a simulator.'",
	},
	design: {
		label: "Design",
		copy: "Model the problem before the system. Blackhole started as a light-ray geodesic equation, not a shader.",
	},
	build: {
		label: "Build",
		copy: "Correct first. Fast second. topopt-py got the SIMP algorithm right in plain Python before vectorizing it into NumPy.",
	},
	measure: {
		label: "Measure",
		copy: "Metrics are a contract with reality. Muviz's audio pipeline only moved to a Web Worker after profiling showed it blocking the main thread.",
	},
} satisfies Record<PhaseId, Phase>;
