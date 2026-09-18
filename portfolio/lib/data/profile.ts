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
} as const;

export type SocialMedia = keyof typeof SocialUsersID;

export const SocialLinks: Record<SocialMedia, ExternalURL> = {
	Github: `https://github.com/${SocialUsersID.Github}`,
	Linkedin: `https://www.linkedin.com/in/${SocialUsersID.Linkedin}`,
	Medium: `https://medium.com/${SocialUsersID.Medium}`,
	Instagram: `https://www.instagram.com/${SocialUsersID.Instagram}`,
	Scholar: `https://scholar.google.com/citations?user=${SocialUsersID.Scholar}&hl=en`,
};

// Todo a simple solution ??? This looks horrible
export const ResumePDF: ExternalURL =
	"https://docs.google.com/document/d/e/2PACX-1vTx4Epi4BS_agxkxAMfB1cEYQLL6T8x3UBvB3lVzIaZY4qMtN2M_RjZgqJ4O0XeBYuJxXHkRHA4OJF4/pub";

export const EmailAddress = "mailto:malviyamanoj1896@gmail.com";

export const UserAvatar: LocalImage = userAvatar;

// Ongoing roles sort first (see EXPERIENCE_BY_RECENCY), so index 0 is current.
const currentExperienceId = EXPERIENCE_BY_RECENCY[0];
const currentExperience = Experiences[currentExperienceId];

export const CurrentLocation: string = currentExperience.location;
export const CurrentStatus = `${currentExperience.position} at ${getEmployer(currentExperienceId).name}`;

// TODO: swap in whatever's actually pulling your attention lately.
export const Interests: readonly string[] = [
	"Generative design",
	"Real-time rendering",
	"Robotics",
];
