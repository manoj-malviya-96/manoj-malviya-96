import { assertNever } from "@manoj-malviya-96/atom";
import type { StaticImageData as LocalImage } from "next/image";
import type { ExternalURL } from "@/lib/types";
import type { ValuesOf } from "@/lib/utils";
import noahLabsLogo from "./noahlabs-logo.png";
import flowkeyLogo from "./flowkey-dark.png";
import formlabsLogo from "./formlabs-black.png";
import pennStateLogo from "./pennstate-blue.png";
import iitjLogo from "./iitj.png";

const ORGANIZATION_IDS = [
	"noah-labs",
	"flow-key",
	"form-labs",
	"penn-state",
	"iit-j",
] as const;

export type OrganizationId = ValuesOf<typeof ORGANIZATION_IDS>;

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
				logo: noahLabsLogo,
			};
		case "flow-key":
			return {
				name: "Flowkey",
				url: "https://www.flowkey.com/en",
				logo: flowkeyLogo,
			};
		case "form-labs":
			return {
				name: "Formlabs",
				url: "https://formlabs.com/",
				logo: formlabsLogo,
			};
		case "penn-state":
			return {
				name: "Penn State",
				url: "https://www.psu.edu/",
				logo: pennStateLogo,
			};
		case "iit-j":
			return {
				name: "IITJ",
				url: "https://www.iitj.ac.in/",
				logo: iitjLogo,
			};
		default:
			return assertNever(organization);
	}
}
