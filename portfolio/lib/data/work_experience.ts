import {assertNever} from "@manoj-malviya-96/atom";
import {getOrganization, type Organization, type OrganizationId,} from "@/lib/data/organizations";
import type {ProjectTag} from "@/lib/data/projects";
import type {ValuesOf} from "@/lib/helper";
import type {MonthAndYear} from "@/lib/types";
import {yearsSince} from "@/lib/utils";

export const EXPERIENCE_IDS = [
    "noah-labs-lead",
    "form-labs-rd",
    "form-labs-se",
    "flow-key-se",
    "penn-state-gra",
] as const;

export type ExperienceId = ValuesOf<typeof EXPERIENCE_IDS>;

export type EmploymentType =
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Contract";

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
                    "Leading product across mobile and web for cardiac telemonitoring — a patient-facing app spanning remote monitoring, connected devices, and on-device audio ML, plus a clinician platform with real-time alerts and patented voice-based heart-failure detection, and the APIs, data pipelines, and release automation underneath",
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
                    "Redesigned the core 3D-printing support-structure algorithm into a patent-pending topology optimization method — ~20% lower end-user cost, ~17% better reliability, ~50% more feature usage — and cut print-time-estimate error ~20% while halving its compute",
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
                    "UI/UX tech lead for PreForm: shipped CAD features (model labeling, grouping, part cages) to a ~95% CSAT, lifted large-scene performance up to 60%, and rebuilt the Qt/QML component framework for ~30–50% faster load times",
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
                    "Built a C++/Qt microservice for music-score rendering that took complex scores from ~30s to ~200ms, unlocking real-time interactive notation, and refactored the audio-to-MIDI model to ~50ms inference at ~98% accuracy",
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
                    "Automated embedding design for 3D-printed parts, built eye-tracking and ML tooling for design-process research, and pioneered a deep-learning generative model for topology optimization with ~3× faster design iterations. Coauthored 8 peer-reviewed publications",
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
        const {start} = getExperience(experience);
        return start < earliest ? start : earliest;
    },
    getExperience(EXPERIENCE_IDS[0]).start,
);
export const YEARS_EXPERIENCE = yearsSince(EXPERIENCE_START);
