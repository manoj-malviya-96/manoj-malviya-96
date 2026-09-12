import type { OrganizationId } from "@/lib/data/organizations";
import type { ValuesOf } from "@/lib/helper";
import type { MonthAndYear } from "@/lib/types";

export const DEGREE_IDS = ["penn-state-ms", "iitj-btech"] as const;
export type DegreeId = ValuesOf<typeof DEGREE_IDS>;

export type Degree = {
	organization: OrganizationId;
	degree: string;
	field: string;
	focus: string;
	graduation: MonthAndYear;
};

export const Degrees = {
	"penn-state-ms": {
		organization: "penn-state",
		degree: "Master of Science",
		field: "Mechanical Engineering",
		focus: "Computational Design, Machine Learning, Data Science",
		graduation: "2020-08",
	},
	"iitj-btech": {
		organization: "iit-j",
		degree: "Bachelor of Technology",
		field: "Mechanical Engineering",
		focus: "Design and Manufacturing",
		graduation: "2018-07",
	},
} satisfies Record<DegreeId, Degree>;
