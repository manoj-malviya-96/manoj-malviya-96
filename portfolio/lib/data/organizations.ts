import type { StaticImageData as LocalImage } from "next/image";
import type { ValuesOf } from "@/lib/helper";
import type { ExternalURL } from "@/lib/types";
import flowkeyLogo from "./flowkey-dark.png";
import formlabsLogo from "./formlabs-black.png";
import iitjLogo from "./iitj.png";
import noahLabsLogo from "./noahlabs-logo.png";
import pennStateLogo from "./pennstate-blue.png";

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

export const Organizations = {
	"noah-labs": {
		name: "Noah Labs",
		url: "https://www.noah-labs.com/",
		logo: noahLabsLogo,
	},
	"flow-key": {
		name: "Flowkey",
		url: "https://www.flowkey.com/en",
		logo: flowkeyLogo,
	},
	"form-labs": {
		name: "Formlabs",
		url: "https://formlabs.com/",
		logo: formlabsLogo,
	},
	"penn-state": {
		name: "Penn State",
		url: "https://www.psu.edu/",
		logo: pennStateLogo,
	},
	"iit-j": {
		name: "IITJ",
		url: "https://www.iitj.ac.in/",
		logo: iitjLogo,
	},
} satisfies Record<OrganizationId, Organization>;
