import { Text } from "@manoj-malviya-96/atom";
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
			<>
				Heart-failure patients need monitoring that doesn't feel like a hospital
				follow-up. I lead product for both sides of that: a{" "}
				<Highlight>patient app</Highlight> in React Native/Expo with on-device
				ML for live feedback and connected devices, and a{" "}
				<Highlight>clinician platform</Highlight> built around patented
				voice-based heart-failure detection and real-time alerts. Backend is
				Python/FastAPI over SQLAlchemy, Postgres, and Kafka; I watch it in
				production through Grafana, Amplitude, and feature flags, and ship it
				myself — Docker on a self-managed server, reached over Tailscale.
			</>
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
		summary: (
			<>
				Formlabs' support-structure algorithm was costing users material and
				failed prints. I redesigned it into a{" "}
				<Highlight>patent-pending topology-optimization method</Highlight> —
				~20% cheaper prints, ~17% more reliable, ~50% more feature adoption —
				and rebuilt the print-time estimator to be ~20% more accurate on half
				the compute. Physics modeling on next-gen printers and materials pushed
				reliability up ~40% and speed up to ~35%, backed by an internal
				Python/JS/AWS tool I built to run and store the experiments. Recognized
				twice with Formlabs' Top Performance Award.
			</>
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
			<>
				As UI/UX tech lead for PreForm, I owned{" "}
				<Highlight>CAD features engineers actually rely on</Highlight> — model
				labeling, grouping, part cages — shipped at ~95% CSAT. I rebuilt the
				Qt/QML component framework underneath for ~30–50% faster load times and
				60% faster large-scene rendering, wired hardware integrations like
				camera streaming over a secured local network, and wrote the embedded
				tooling (C++/Qt, Go, Python, protobuf/libusb) behind an ESP32 firmware
				updater and a maintenance suite. Simplifying core workflows like print
				upload lifted NPS ~15%, and I kept the BigQuery dashboards the team used
				for product decisions.
			</>
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
			<>
				Complex music scores took ~30 seconds to render — too slow for
				interactive notation. I built a{" "}
				<Highlight>C++/Qt microservice</Highlight> that cut that to ~200ms, and
				rebuilt the Swift audio-to-MIDI ML pipeline for ~50ms inference at ~98%
				accuracy.
			</>
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
			<>
				Embedding design for 3D-printed parts needed an expert in the loop — I
				automated it away, built eye-tracking and ML tooling to study how
				engineers actually design, and pioneered a{" "}
				<Highlight>
					deep-learning generative model for topology optimization
				</Highlight>
				: ~3× faster design iterations. Coauthored 8 peer-reviewed papers and
				presented the work at conferences.
			</>
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
