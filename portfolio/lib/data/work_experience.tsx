import { List, Text } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";
import {
	type Organization,
	type OrganizationId,
	Organizations,
} from "@/lib/data/organizations";
import type { ProjectTag } from "@/lib/data/projects";
import type { ValuesOf } from "@/lib/helper";
import type { MediaSource, MonthAndYear } from "@/lib/types";

function Highlight({ children }: { children: ReactNode }) {
	return (
		<Text as="span" variant="body" bold>
			{children}
		</Text>
	);
}

function Bullets({ points }: { points: readonly ReactNode[] }) {
	return (
		<List direction="col" gap="xs">
			{points.map((point, i) => (
				<li key={i}>
					<Text variant="body">{point}</Text>
				</li>
			))}
		</List>
	);
}

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
	end: MonthAndYear | null;
	location: string;
	type: EmploymentType;
	skills: readonly ProjectTag[];
	summary: ReactNode;
	media?: MediaSource;
};

export const Experiences: Record<ExperienceId, Experience> = {
	"noah-labs-lead": {
		organization: "noah-labs",
		position: "Lead Senior Software Engineer",
		start: "2025-10",
		end: null,
		location: "Berlin, Germany",
		type: "Full-time",
		skills: ["mobile", "web", "ai", "project-management"],
		summary: (
			<Bullets
				points={[
					<>
						Own a <Highlight>patient app</Highlight> with on-device ML for live,
						real-time feedback from connected devices.
					</>,
					<>
						Built a <Highlight>clinician platform</Highlight> around patented
						voice-based heart-failure detection and real-time alerts.
					</>,
					"Run production myself, end to end — architecture, observability, deployment.",
				]}
			/>
		),
	},
	"form-labs-rd": {
		organization: "form-labs",
		position: "R&D Software Engineer",
		start: "2021-01",
		end: "2023-10",
		location: "Somerville, MA",
		type: "Full-time",
		skills: ["optimization", "cad", "high-performance"],
		media: {
			kind: "video",
			src: "https://formlabs-media.formlabs.com/filer_public/e3/51/e35140a1-b576-4dba-a335-f4c0a45d4ca3/supportsv2_clip_improvedaccuracy01_4x3.mp4#t=0.1",
			alt: "Formlabs' redesigned support-structure algorithm generating supports on a 3D-printed part.",
		},
		summary: (
			<Bullets
				points={[
					<>
						Redesigned Formlabs' support-structure algorithm into a{" "}
						<Highlight>patent-pending topology-optimization method</Highlight> —
						~20% cheaper prints, ~17% more reliable, ~50% more feature adoption.
					</>,
					"Rebuilt the print-time estimator — ~20% more accurate on half the compute.",
					"Modeled physics on next-gen printers and materials — reliability up ~40%, speed up ~35%.",
					"Recognized twice with Formlabs' Top Performance Award.",
				]}
			/>
		),
	},
	"form-labs-se": {
		organization: "form-labs",
		position: "Senior Software Engineer",
		start: "2023-10",
		end: "2025-03",
		location: "Budapest, Hungary",
		type: "Full-time",
		skills: ["ui/ux", "cad", "qt/qml", "project-management"],
		summary: (
			<Bullets
				points={[
					<>
						UI/UX tech lead for PreForm — owned{" "}
						<Highlight>CAD features engineers actually rely on</Highlight>{" "}
						(model labeling, grouping, part cages), shipped at ~95% CSAT.
					</>,
					"Rebuilt the component framework underneath — ~30–50% faster load times, 60% faster large-scene rendering.",
					"Wired hardware integrations, including secure camera streaming.",
					"Built the firmware updater and maintenance tooling behind every printer in the field.",
					"Simplified core workflows like print upload — NPS up ~15%.",
				]}
			/>
		),
	},
	"flow-key-se": {
		organization: "flow-key",
		position: "Senior Software Engineer",
		start: "2025-04",
		end: "2025-09",
		location: "Berlin, Germany",
		type: "Contract",
		skills: ["c++", "micro-services", "ai", "rendering"],
		summary: (
			<Bullets
				points={[
					<>
						Cut <Highlight>music-score rendering</Highlight> from ~30 seconds to
						~200ms.
					</>,
					"Rebuilt the audio-to-MIDI ML pipeline — ~50ms inference at ~98% accuracy.",
				]}
			/>
		),
	},
	"penn-state-gra": {
		organization: "penn-state",
		position: "Graduate Research Assistant",
		start: "2018-08",
		end: "2020-12",
		location: "University Park, PA",
		type: "Full-time",
		skills: ["ai", "optimization"],
		summary: (
			<Bullets
				points={[
					"Automated embedding design for 3D-printed parts — no expert in the loop needed.",
					"Built eye-tracking and ML tooling to study how engineers actually design.",
					<>
						Pioneered a{" "}
						<Highlight>
							deep-learning generative model for topology optimization
						</Highlight>{" "}
						— ~3× faster design iterations.
					</>,
					"Coauthored 8 peer-reviewed papers and presented the work at conferences.",
				]}
			/>
		),
	},
};

export function getEmployer(experience: ExperienceId): Organization {
	return Organizations[Experiences[experience].organization];
}

/** Ongoing roles first, then most recently ended. */
export const EXPERIENCE_BY_RECENCY: readonly ExperienceId[] = [
	...EXPERIENCE_IDS,
].sort((a, b) => {
	const left = Experiences[a];
	const right = Experiences[b];
	if (!left.end && !right.end) return left.start < right.start ? 1 : -1;
	if (!left.end) return -1;
	if (!right.end) return 1;
	return left.end < right.end ? 1 : -1;
});
