import { assertNever } from "@manoj-malviya-96/atom";
import type { OrganizationId } from "@/lib/data/organizations";
import type { MonthAndYear } from "@/lib/types";
import type { ValuesOf } from "@/lib/utils";

export const DEGREE_IDS = ["penn-state-ms", "iitj-btech"] as const;
export type DegreeId = ValuesOf<typeof DEGREE_IDS>;

export type Degree = {
	organization: OrganizationId;
	degree: string;
	field: string;
	focus: string;
	graduation: MonthAndYear;
};

export function getDegree(degree: DegreeId): Degree {
	switch (degree) {
		case "penn-state-ms":
			return {
				organization: "penn-state",
				degree: "Master of Science",
				field: "Mechanical Engineering",
				focus: "Computational Design, Machine Learning, Data Science",
				graduation: "2020-08",
			};
		case "iitj-btech":
			return {
				organization: "iit-j",
				degree: "Bachelor of Technology",
				field: "Mechanical Engineering",
				focus: "Design and Manufacturing",
				graduation: "2018-07",
			};
		default:
			return assertNever(degree);
	}
}
