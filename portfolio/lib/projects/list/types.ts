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

export type ProjectMeta = {
	title: string;
	description: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
};

export interface Project {
	id: string;
	metadata: ProjectMeta;
	Card: ComponentType;
}
