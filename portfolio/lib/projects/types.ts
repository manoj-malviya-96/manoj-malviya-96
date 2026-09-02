import type { StaticImageData as LocalImage } from "next/image";
import type { ReactNode } from "react";
import type {
	ProgrammingFrameworks,
	ProgrammingLanguage,
	SoftSkills,
	SoftwareConcepts,
} from "@/lib/about_me/types";
import type { ExternalURL } from "@/lib/types";

/**
 * Every project, in authoring order. Adding one here is the only edit that is not
 * compiler-guided — the getters in `registry.ts` then fail until each is answered.
 */
export const PROJECT_IDS = [
	"portfolio",
	"muviz",
	"honeycomb",
	"topopt_py",
	"blackhole",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export type ProjectTag =
	| ProgrammingFrameworks
	| ProgrammingLanguage
	| SoftwareConcepts
	| SoftSkills;

export type ProjectEffort = "low" | "medium" | "high";

export type ProjectMeta = {
	title: string;
	/** Long form, for search and page metadata — the card shows `hook` instead. */
	description: string;
	hook: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
};

export type ProjectMedia =
	| { kind: "image"; src: LocalImage | string; alt: string }
	| { kind: "video"; src: string; alt: string };

/** A card explains itself one way or the other, never both and never neither. */
export type ProjectBody =
	| { kind: "steps"; problem: string; approach: string; outcome: string }
	| { kind: "narrative"; content: ReactNode };

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;

export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL };
