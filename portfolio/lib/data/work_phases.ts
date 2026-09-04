import type {ColorToken} from "@manoj-malviya-96/atom";
import {assertNever} from "@manoj-malviya-96/atom";
import type {ValuesOf} from "@/lib/helper";

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
                copy: "Before I write a line of code, I find out what's actually broken for the user — not just what's sitting in the backlog.",
            };
        case "design":
            return {
                label: "Design",
                color: "indigo",
                copy: "A user flow and a data model are the same decision, drawn two different ways. I sketch both before committing to either.",
            };
        case "build":
            return {
                label: "Build",
                color: "green",
                copy: "Correct first, fast second, maintainable always — validated at the edges, profiled before anything gets optimized.",
            };
        case "measure":
            return {
                label: "Measure",
                color: "orange",
                copy: "Ship it, then look. The data decides if it worked — not the sprint review.",
            };
        default:
            return assertNever(phase);
    }
}
