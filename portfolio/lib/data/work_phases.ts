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
                copy: "Before I open Figma or an editor, I want to know what's actually broken — for the user, not just the backlog.",
            };
        case "design":
            return {
                label: "Design",
                color: "indigo",
                copy: "A user flow and a database schema are just two ways of drawing the same decision. I try to get both right the first time. I don't always.",
            };
        case "build":
            return {
                label: "Build",
                color: "green",
                copy: "Correct, fast, maintainable — validated at the edges, profiled before optimized, built so future-me doesn't curse present-me.",
            };
        case "measure":
            return {
                label: "Measure",
                color: "orange",
                copy: "Ship it, then actually look. About half of what I've built worked as planned. The other half taught me something more useful.",
            };
        default:
            return assertNever(phase);
    }
}
