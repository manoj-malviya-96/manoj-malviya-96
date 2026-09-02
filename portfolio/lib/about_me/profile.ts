import type { ExternalURL } from "@/lib/types";

export const SocialUsersID = {
	Github: "manoj-malviya-96",
	Linkedin: "manoj-malviya-",
	Medium: "@manoj-malviya",
	Instagram: "manoj_malviya_",
	Scholar: "0oMXOy0AAAAJ",
} as const;

export type SocialMedia = keyof typeof SocialUsersID;

export function getSocialLinks() {
	const { Github, Linkedin, Medium, Instagram, Scholar } = SocialUsersID;
	return {
		Github: `https://github.com/${Github}`,
		Linkedin: `https://www.linkedin.com/in/${Linkedin}`,
		Medium: `https://medium.com/${Medium}`,
		Instagram: `https://www.instagram.com/${Instagram}`,
		Scholar: `https://scholar.google.com/citations?user=${Scholar}&hl=en`,
	} satisfies Record<SocialMedia, ExternalURL>;
}

export const ResumePDF: ExternalURL =
	"https://docs.google.com/document/d/1h56spN-URNEDdwn1ofiqUaxJpm83aLz89QrNjPl4BgQ" as const;

export const EmailAddress = "mailto:malviyamanoj1896@gmail.com";
