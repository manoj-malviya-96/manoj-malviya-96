import { assertNever } from "@manoj-malviya-96/atom";
import type { StaticImageData as LocalImage } from "next/image";
import {
	FlowkeyLogo,
	FormlabsLogo,
	IITJLogo,
	NoahLabsLogo,
	PennStateLogo,
} from "@/lib/assets";
import type { ExternalURL } from "@/lib/types";

/** Everywhere I've worked or studied — Penn State is deliberately both. */
export const ORGANIZATION_IDS = [
	"noah-labs",
	"flowkey",
	"formlabs",
	"penn-state",
	"iitj",
] as const;

export type OrganizationId = (typeof ORGANIZATION_IDS)[number];

export type Organization = {
	name: string;
	url: ExternalURL;
	logo: LocalImage;
};

export function getOrganization(organization: OrganizationId): Organization {
	switch (organization) {
		case "noah-labs":
			return {
				name: "Noah Labs",
				url: "https://www.noah-labs.com/",
				logo: NoahLabsLogo,
			};
		case "flowkey":
			return {
				name: "Flowkey",
				url: "https://www.flowkey.com/en",
				logo: FlowkeyLogo,
			};
		case "formlabs":
			return {
				name: "Formlabs",
				url: "https://formlabs.com/",
				logo: FormlabsLogo,
			};
		case "penn-state":
			return {
				name: "Penn State University",
				url: "https://www.psu.edu/",
				logo: PennStateLogo,
			};
		case "iitj":
			return {
				name: "Indian Institute of Technology Jodhpur",
				url: "https://www.iitj.ac.in/",
				logo: IITJLogo,
			};
		default:
			return assertNever(organization);
	}
}
