import type { StaticImageData as LocalImage } from "next/image";
import {
	FlowkeyLogo,
	FormlabsLogo,
	NoahLabsLogo,
	PennStateLogo,
} from "@/lib/assets";
import type { ExternalURL, MonthAndYear } from "@/lib/types";
import { yearsSince } from "@/lib/utils";

export type WorkExperience = {
	company: string;
	logo: LocalImage;
	companyURL: ExternalURL;
	position: string;
	startDate: MonthAndYear;
	endDate?: MonthAndYear;
	location: string;
	type: "Full-time" | "Part-time" | "Internship" | "Contract";
	role: string;
};

const FormlabsRD: WorkExperience = {
	company: "Formlabs",
	companyURL: "https://formlabs.com/",
	position: "R&D Software Engineer",
	startDate: "2021-01",
	endDate: "2023-10",
	location: "Somerville, MA",
	type: "Full-time",
	logo: FormlabsLogo,
	role: "Redesigned the core 3D-printing support-structure algorithm into a patent-pending topology optimization method — ~20% lower end-user cost, ~17% better reliability, ~50% more feature usage — and cut print-time-estimate error ~20% while halving its compute",
} as const;

const FormlabsSE: WorkExperience = {
	company: "Formlabs",
	companyURL: "https://formlabs.com/",
	position: "Senior Software Engineer",
	startDate: "2023-10",
	endDate: "2025-03",
	location: "Budapest, Hungary",
	logo: FormlabsLogo,
	type: "Full-time",
	role: "UI/UX tech lead for PreForm: shipped CAD features (model labeling, grouping, part cages) to a ~95% CSAT, lifted large-scene performance up to 60%, and rebuilt the Qt/QML component framework for ~30–50% faster load times",
} as const;

const FlowkeySE: WorkExperience = {
	company: "Flowkey",
	companyURL: "https://www.flowkey.com/en",
	position: "Senior Software Engineer",
	startDate: "2025-04",
	endDate: "2025-09",
	location: "Berlin, Germany",
	logo: FlowkeyLogo,
	type: "Contract",
	role: "Built a C++/Qt microservice for music-score rendering that took complex scores from ~30s to ~200ms, unlocking real-time interactive notation, and refactored the audio-to-MIDI model to ~50ms inference at ~98% accuracy",
} as const;

const PennStateGRA: WorkExperience = {
	company: "Penn State University",
	companyURL: "https://www.psu.edu/",
	position: "Graduate Research Assistant",
	startDate: "2018-08",
	endDate: "2020-12",
	location: "University Park, PA",
	logo: PennStateLogo,
	type: "Full-time",
	role: "Automated embedding design for 3D-printed parts, built eye-tracking and ML tooling for design-process research, and pioneered a deep-learning generative model for topology optimization with ~3× faster design iterations. Coauthored 8 peer-reviewed publications",
} as const;

const NoahLabsLead: WorkExperience = {
	company: "Noah Labs",
	companyURL: "https://www.noah-labs.com/",
	position: "Lead Senior Software Engineer",
	startDate: "2025-10",
	location: "Berlin, Germany",
	type: "Full-time",
	logo: NoahLabsLogo,
	role: "Leading product across mobile and web for cardiac telemonitoring — a patient-facing app spanning remote monitoring, connected devices, and on-device audio ML, plus a clinician platform with real-time alerts and patented voice-based heart-failure detection, and the APIs, data pipelines, and release automation underneath",
} as const;

export const WORK_EXPERIENCE: WorkExperience[] = [
	NoahLabsLead,
	FormlabsRD,
	FormlabsSE,
	FlowkeySE,
	PennStateGRA,
] as const;

/** Ongoing roles first, then most recently ended. */
export const WORK_EXPERIENCE_BY_RECENCY: WorkExperience[] = [
	...WORK_EXPERIENCE,
].sort((a, b) => {
	if (!a.endDate && !b.endDate) return a.startDate < b.startDate ? 1 : -1;
	if (!a.endDate) return -1;
	if (!b.endDate) return 1;
	return a.endDate < b.endDate ? 1 : -1;
});

const EXPERIENCE_START = WORK_EXPERIENCE_BY_RECENCY.reduce(
	(earliest, entry) =>
		entry.startDate < earliest ? entry.startDate : earliest,
	WORK_EXPERIENCE_BY_RECENCY[0].startDate,
);

/** Derived, not hardcoded — prose that states a year count must read from here. */
export const YEARS_EXPERIENCE = yearsSince(EXPERIENCE_START);
