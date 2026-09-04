import { assertNever } from "@manoj-malviya-96/atom";
import {
	getOrganization,
	type Organization,
	type OrganizationId,
} from "@/lib/data/organizations";
import type { ProjectTag } from "@/lib/data/projects";
import type { MonthAndYear } from "@/lib/types";
import type { ValuesOf } from "@/lib/utils";
import { yearsSince } from "@/lib/utils";

const EXPERIENCE_IDS = [
	"noah-labs-lead",
	"form-labs-rd",
	"form-labs-se",
	"flow-key-se",
	"penn-state-gra",
] as const;

export type ExperienceId = ValuesOf<typeof EXPERIENCE_IDS>;

type EmploymentType = "Full-time" | "Part-time" | "Internship" | "Contract";

export type Experience = {
	organization: OrganizationId;
	position: string;
	start: MonthAndYear;
	/** `null` means ongoing — a stated fact rather than a forgotten field. */
	end: MonthAndYear | null;
	location: string;
	type: EmploymentType;
	skills: readonly ProjectTag[];
	summary: string;
};

export function getExperience(experience: ExperienceId): Experience {
	switch (experience) {
		case "noah-labs-lead":
			return {
				organization: "noah-labs",
				position: "Lead Senior Software Engineer",
				start: "2025-10",
				end: null,
				location: "Berlin, Germany",
				type: "Full-time",
				skills: ["mobile", "web", "ai", "project-management"],
				summary:
					"Heart-failure patients need monitoring that doesn't feel like a hospital follow-up. I lead product for both sides of that: a patient app with remote monitoring, connected devices, and on-device audio ML, and a clinician platform built around patented voice-based heart-failure detection and real-time alerts — plus the APIs, data pipelines, and release process that keep it all shipping safely",
			};
		case "form-labs-rd":
			return {
				organization: "form-labs",
				position: "R&D Software Engineer",
				start: "2021-01",
				end: "2023-10",
				location: "Somerville, MA",
				type: "Full-time",
				skills: ["optimization", "cad", "high-performance"],
				summary:
					"Formlabs' support-structure algorithm was costing users material and failed prints. I redesigned it into a patent-pending topology-optimization method — ~20% cheaper prints, ~17% more reliable, ~50% more feature adoption — and rebuilt the print-time estimator to be ~20% more accurate on half the compute",
			};
		case "form-labs-se":
			return {
				organization: "form-labs",
				position: "Senior Software Engineer",
				start: "2023-10",
				end: "2025-03",
				location: "Budapest, Hungary",
				type: "Full-time",
				skills: ["ui/ux", "cad", "qt/qml", "project-management"],
				summary:
					"As UI/UX tech lead for PreForm, I owned CAD features engineers actually rely on — model labeling, grouping, part cages — shipped to a ~95% CSAT. Rebuilt the Qt/QML component framework underneath for ~30–50% faster load times, and pushed large-scene performance up 60%",
			};
		case "flow-key-se":
			return {
				organization: "flow-key",
				position: "Senior Software Engineer",
				start: "2025-04",
				end: "2025-09",
				location: "Berlin, Germany",
				type: "Contract",
				skills: ["c++", "micro-services", "ai", "rendering"],
				summary:
					"Complex music scores took ~30 seconds to render — too slow for interactive notation. I built a C++/Qt microservice that cut that to ~200ms, and refactored the audio-to-MIDI model for ~50ms inference at ~98% accuracy",
			};
		case "penn-state-gra":
			return {
				organization: "penn-state",
				position: "Graduate Research Assistant",
				start: "2018-08",
				end: "2020-12",
				location: "University Park, PA",
				type: "Full-time",
				skills: ["ai", "optimization"],
				summary:
					"Automated embedding design for 3D-printed parts so it no longer needed an expert in the loop, built eye-tracking and ML tooling to study how engineers actually design, and pioneered a deep-learning generative model for topology optimization — ~3× faster design iterations. Coauthored 8 peer-reviewed publications",
			};
		default:
			return assertNever(experience);
	}
}

export function getEmployer(experience: ExperienceId): Organization {
	return getOrganization(getExperience(experience).organization);
}

/** Ongoing roles first, then most recently ended. */
export const EXPERIENCE_BY_RECENCY: readonly ExperienceId[] = [
	...EXPERIENCE_IDS,
].sort((a, b) => {
	const left = getExperience(a);
	const right = getExperience(b);
	if (!left.end && !right.end) return left.start < right.start ? 1 : -1;
	if (!left.end) return -1;
	if (!right.end) return 1;
	return left.end < right.end ? 1 : -1;
});

const EXPERIENCE_START = EXPERIENCE_IDS.reduce<MonthAndYear>(
	(earliest, experience) => {
		const { start } = getExperience(experience);
		return start < earliest ? start : earliest;
	},
	getExperience(EXPERIENCE_IDS[0]).start,
);
export const YEARS_EXPERIENCE = yearsSince(EXPERIENCE_START);
