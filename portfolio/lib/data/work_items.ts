import { type Blog, type BlogId, Blogs } from "@/lib/data/blogs";
import {
	type Project,
	type ProjectId,
	type ProjectTag,
	RankedProjects,
} from "@/lib/data/projects";

export type WorkItem =
	| ({ kind: "project"; id: ProjectId } & Project)
	| ({ kind: "blog"; id: BlogId } & Blog);

function latestYear(dates: string): number {
	const years = dates.match(/\d{4}/g);
	if (!years) {
		throw new Error(
			`Work item dates must contain a 4-digit year, got "${dates}".`,
		);
	}
	return Math.max(...years.map(Number));
}

export function workYear(item: WorkItem): string {
	return String(latestYear(item.dates));
}

const BLOG_ITEMS: readonly WorkItem[] = (Object.keys(Blogs) as BlogId[]).map(
	(id) => ({ kind: "blog" as const, id, ...Blogs[id] }),
);

const PROJECT_ITEMS: readonly WorkItem[] = RankedProjects.map(
	({ id, ...project }) => ({ kind: "project" as const, id, ...project }),
);

// RISK: relies on stable sort to keep RankedProjects' effort order within a year.
export const WorkItems: readonly WorkItem[] = [
	...PROJECT_ITEMS,
	...BLOG_ITEMS,
].sort((a, b) => latestYear(b.dates) - latestYear(a.dates));

export const FeaturedWorkItems: readonly WorkItem[] = WorkItems.slice(0, 3);

export const WorkTags: readonly ProjectTag[] = [
	...new Set(WorkItems.flatMap((item) => item.tags)),
].sort();
