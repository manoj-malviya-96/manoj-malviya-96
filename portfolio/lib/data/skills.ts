import { Projects, type ProjectTag, TAG_GROUPS } from "@/lib/data/projects";
import { Experiences } from "@/lib/data/work_experience";

export const SKILL_GROUPS: readonly SkillGroup[] = buildSkillGroups();

type SkillGroup = {
	label: string;
	skills: readonly ProjectTag[];
};

function buildSkillGroups(): readonly SkillGroup[] {
	/** NOTE: derived from Project.tags + Experience.skills — no second list to drift. */
	const claimedTags: ReadonlySet<ProjectTag> = new Set([
		...Object.values(Projects).flatMap((project) => project.tags),
		...Object.values(Experiences).flatMap((experience) => experience.skills),
	]);
	return TAG_GROUPS.map(({ label, tags }) => ({
		label,
		skills: tags.filter((tag) => claimedTags.has(tag)),
	})).filter((group) => group.skills.length > 0);
}
