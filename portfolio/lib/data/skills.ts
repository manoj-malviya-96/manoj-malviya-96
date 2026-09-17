import { Projects, type ProjectTag, TAG_GROUPS } from "@/lib/data/projects";
import { Experiences } from "@/lib/data/work_experience";

// NOTE: derived from Project.tags + Experience.skills — no second list to drift.
const CLAIMED_TAGS: ReadonlySet<ProjectTag> = new Set([
	...Object.values(Projects).flatMap((project) => project.tags),
	...Object.values(Experiences).flatMap((experience) => experience.skills),
]);

export type SkillGroup = {
	label: string;
	skills: readonly ProjectTag[];
};

export const SKILL_GROUPS: readonly SkillGroup[] = TAG_GROUPS.map(
	({ label, tags }) => ({
		label,
		skills: tags.filter((tag) => CLAIMED_TAGS.has(tag)),
	}),
).filter((group) => group.skills.length > 0);
