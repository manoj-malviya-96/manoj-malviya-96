import type { StaticImageData as LocalImage } from "next/image";
import {
	EXPERIENCE_BY_RECENCY,
	Experiences,
	getEmployer,
} from "@/lib/data/work_experience";
import type { ExternalURL } from "@/lib/types";
import userAvatar from "./manoj-1.png";

export const SocialUsersID = {
	Github: "manoj-malviya-96",
	Linkedin: "manoj-malviya-",
	Medium: "@manoj-malviya",
	Instagram: "manoj_malviya_",
	Scholar: "0oMXOy0AAAAJ",
	Linktree: "manoj_malviya",
} as const;

export type SocialMedia = keyof typeof SocialUsersID;

export const SocialLinks: Record<SocialMedia, ExternalURL> = {
	Github: `https://github.com/${SocialUsersID.Github}`,
	Linkedin: `https://www.linkedin.com/in/${SocialUsersID.Linkedin}`,
	Medium: `https://medium.com/${SocialUsersID.Medium}`,
	Instagram: `https://www.instagram.com/${SocialUsersID.Instagram}`,
	Scholar: `https://scholar.google.com/citations?user=${SocialUsersID.Scholar}&hl=en`,
	Linktree: `https://linktr.ee/${SocialUsersID.Linktree}`,
} as const;

const Email = "malviyamanoj1896@gmail.com";
export const EmailAddress = `mailto:${Email}`;

export const UserAvatar: LocalImage = userAvatar;

// Ongoing roles sort first (see EXPERIENCE_BY_RECENCY), so index 0 is current.
const currentExperienceId = EXPERIENCE_BY_RECENCY[0];
const currentExperience = Experiences[currentExperienceId];

export const CurrentStatus = `${currentExperience.position} at ${getEmployer(currentExperienceId).name}`;

export const Interests: readonly string[] = [
	"Generative design",
	"Real-time rendering",
	"Robotics",
];

export const Hobbies: readonly string[] = [
	"Part-time DJ",
	"3D Printing",
	"Photography",
];
