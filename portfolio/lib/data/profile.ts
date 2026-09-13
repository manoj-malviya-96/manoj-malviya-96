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

export const SocialLinks: Record<SocialMedia, ExternalURL> = {
	Github: `https://github.com/${SocialUsersID.Github}`,
	Linkedin: `https://www.linkedin.com/in/${SocialUsersID.Linkedin}`,
	Medium: `https://medium.com/${SocialUsersID.Medium}`,
	Instagram: `https://www.instagram.com/${SocialUsersID.Instagram}`,
	Scholar: `https://scholar.google.com/citations?user=${SocialUsersID.Scholar}&hl=en`,
};

export const ResumePDF: ExternalURL =
	"https://docs.google.com/document/d/e/2PACX-1vQ33K1IO2nPl8Y1fq0s6IpUJg1P0n_OWFC0q6HoKOOckiagDOVYy6XmAPZcm6yi4Q/pub?output=pdf";

export const EmailAddress = "mailto:malviyamanoj1896@gmail.com";

export const UserAvatar: LocalImage = userAvatar;
