import type { StaticImageData as LocalImage } from "next/image";
import type { ExternalURL } from "@/lib/types";
import userAvatar from "./manoj-1.png";

export const SocialUsersID = {
	Github: "manoj-malviya-96",
	Linkedin: "manoj-malviya-",
	Medium: "@manoj-malviya",
	Instagram: "manoj_malviya_",
	Scholar: "0oMXOy0AAAAJ",
} as const;

export type SocialMedia = keyof typeof SocialUsersID;

export function getSocialLinks(): Record<SocialMedia, ExternalURL> {
	const { Github, Linkedin, Medium, Instagram, Scholar } = SocialUsersID;
	return {
		Github: `https://github.com/${Github}`,
		Linkedin: `https://www.linkedin.com/in/${Linkedin}`,
		Medium: `https://medium.com/${Medium}`,
		Instagram: `https://www.instagram.com/${Instagram}`,
		Scholar: `https://scholar.google.com/citations?user=${Scholar}&hl=en`,
	};
}

export const ResumePDF: ExternalURL =
	"https://docs.google.com/document/d/1h56spN-URNEDdwn1ofiqUaxJpm83aLz89QrNjPl4BgQ/export?format=pdf";

export const EmailAddress = "mailto:malviyamanoj1896@gmail.com";

export const UserAvatar: LocalImage = userAvatar;
