import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { StaticImageData as LocalImage } from "next/image";
import { IITJLogo, PennStateLogo } from "@/lib/assets";
import type { ExternalURL, MonthAndYear } from "@/lib/types";

export interface SocialLink {
	icon: IconDefinition;
	href: string;
	label: string;
}

export const SocialUsersID = {
	Github: "manoj-malviya-96",
	Linkedin: "manoj-malviya-",
	Medium: "@manoj-malviya",
	Instagram: "manoj_malviya_",
	Scholar: "0oMXOy0AAAAJ",
} as const;

export type SocialMedia = keyof typeof SocialUsersID;

// Todo clear this
let _linksCached: Record<SocialMedia, ExternalURL> | null = null;
export function getSocialLinks() {
	if (_linksCached) return _linksCached;
	const { Github, Linkedin, Medium, Instagram, Scholar } = SocialUsersID;
	_linksCached = {
		Github: `https://github.com/${Github}`,
		Linkedin: `https://www.linkedin.com/in/${Linkedin}`,
		Medium: `https://medium.com/${Medium}`,
		Instagram: `https://www.instagram.com/${Instagram}`,
		Scholar: `https://scholar.google.com/citations?user=${Scholar}&hl=en`,
	} as const;
	return _linksCached as Record<SocialMedia, ExternalURL>;
}

// Todo better way to do this?
export const ResumePDF: ExternalURL =
	"https://docs.google.com/document/d/1h56spN-URNEDdwn1ofiqUaxJpm83aLz89QrNjPl4BgQ" as const;

export const EmailAddress = "mailto:malviyamanoj1896@gmail.com";

type Education = {
	school: string;
	schoolURL: string;
	degree: string;
	field: string;
	focus: string;
	graduation: MonthAndYear;
	logo: LocalImage;
};
export const EDUCATION = [
	{
		school: "Penn State University",
		schoolURL: "https://www.psu.edu/",
		logo: PennStateLogo,
		degree: "Master of Science",
		field: "Mechanical Engineering",
		focus: "Computational Design, Machine Learning, Data Science",
		graduation: "2020-08",
	},
	{
		school: "Indian Institute of Technology",
		schoolURL: "https://www.iitj.ac.in/",
		logo: IITJLogo,
		degree: "Bachelor of Technology",
		field: "Mechanical Engineering",
		focus: "Design and Manufacturing",
		graduation: "2018-07",
	},
] as Education[];
