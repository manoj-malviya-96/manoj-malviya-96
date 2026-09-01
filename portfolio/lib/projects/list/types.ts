import type { StaticImageData as LocalImage } from "next/image";
import type { ComponentType } from "react";
import type {
	ProgrammingFrameworks,
	ProgrammingLanguage,
	SoftSkills,
	SoftwareConcepts,
} from "@/lib/about_me/types";

export type ProjectTag =
	| ProgrammingFrameworks
	| ProgrammingLanguage
	| SoftwareConcepts
	| SoftSkills;

export type ProjectEffort = "low" | "medium" | "high";

export type ProjectSteps = {
	problem: string;
	approach: string;
	outcome: string;
};

export type ProjectMedia =
	| { kind: "image"; src: LocalImage | string; alt: string }
	| { kind: "video"; src: string; alt: string };

export type ProjectMeta = {
	title: string;
	description: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	/** Category · language chips shown above the title on the case card, e.g. "Optimization · Python · HPC". */
	eyebrow?: string;
	/** One-line hook shown under the title on the case card. */
	hook?: string;
	/** Problem/approach/outcome breakdown — only case-study projects carry this. */
	steps?: ProjectSteps;
	/** Screenshot, cover art, or a silent looping clip for the case card. Falls back to a generated placeholder when omitted. */
	media?: ProjectMedia;
};

export interface Project {
	id: string;
	metadata: ProjectMeta;
	Card: ComponentType;
}
