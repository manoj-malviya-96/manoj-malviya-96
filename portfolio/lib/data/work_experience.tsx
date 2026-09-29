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

export function getEmployer(experience: ExperienceId): Organization {
	return Organizations[Experiences[experience].organization];
}

export type ExperienceId = ValuesOf<typeof EXPERIENCE_IDS>;

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
						I own the <Highlight>patient app</Highlight>, where on-device ML
						gives people live feedback from their connected devices as it
						happens.
					</>,
					<>
						I also built the <Highlight>clinician platform</Highlight>, wrapped
						around our patented voice-based heart-failure detection and
						real-time alerts.
					</>,
					"There's no ops team here, so it's just me running production: architecture, observability, deploys, all of it.",
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
			width: 1440,
			height: 1080,
		},
		summary: (
			<Bullets
				points={[
					<>
						I redesigned Formlabs' support-structure algorithm into a{" "}
						<Highlight>patent-pending topology-optimization method</Highlight>,
						cutting print cost ~20%, making it ~17% more reliable, and pushing
						adoption up roughly 50%.
					</>,
					"I also rebuilt the print-time estimator so it's ~20% more accurate while using half the compute.",
					"I modeled the physics for next-gen printers and materials, which pushed reliability up ~40% and speed ~35%.",
					"I won Formlabs' Top Performance Award twice for this work.",
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
						I was UI/UX tech lead for PreForm, owning{" "}
						<Highlight>CAD features engineers actually rely on</Highlight>{" "}
						(model labeling, grouping, part cages). I shipped it at ~95% CSAT,
						which I'm still proud of.
					</>,
					"I rebuilt the component framework underneath everything, cutting load times ~30-50% and speeding up large-scene rendering 60%.",
					"I wired up hardware integrations, including secure camera streaming.",
					"I built the firmware updater and the maintenance tooling every printer in the field depends on.",
					"I simplified print upload and a few other core workflows, and NPS went up ~15%.",
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
						I got <Highlight>music-score rendering</Highlight> down from ~30
						seconds to ~200ms.
					</>,
					"I rebuilt the audio-to-MIDI pipeline so inference runs in ~50ms at ~98% accuracy.",
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
					"I automated embedding design for 3D-printed parts, so it no longer needed an expert babysitting it.",
					"I built eye-tracking and ML tooling to actually study how engineers design, instead of guessing.",
					<>
						I pioneered a{" "}
						<Highlight>
							deep-learning generative model for topology optimization
						</Highlight>{" "}
						that cut design iterations roughly 3x.
					</>,
					"I coauthored 8 peer-reviewed papers and presented the work at a bunch of conferences.",
				]}
			/>
		),
	},
};

type EmploymentType = "Full-time" | "Part-time" | "Internship" | "Contract";

const EXPERIENCE_IDS = [
	"noah-labs-lead",
	"form-labs-rd",
	"form-labs-se",
	"flow-key-se",
	"penn-state-gra",
] as const;

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

const earliestStartYear = Math.min(
	...Object.values(Experiences).map((experience) =>
		Number(experience.start.slice(0, 4)),
	),
);

export const YearsOfExperience: number =
	new Date().getFullYear() - earliestStartYear;

function Highlight({ children }: { children: ReactNode }) {
	return <Text.Body as="span">{children}</Text.Body>;
}

function Bullets({ points }: { points: readonly ReactNode[] }) {
	return (
		<List direction="col" gap="xs">
			{points.map((point, i) => (
				<li key={i}>
					<Text.Body>{point}</Text.Body>
				</li>
			))}
		</List>
	);
}
