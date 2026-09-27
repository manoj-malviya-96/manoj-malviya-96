import { type Blog, type BlogId, Blogs } from "@/lib/data/blogs";
import { type ProjectSummary, RankedProjects } from "@/lib/data/projects";

export type WorkItem =
	| ({ kind: "project" } & ProjectSummary)
	| ({ kind: "blog"; id: BlogId } & Blog);

const BLOG_ITEMS: readonly WorkItem[] = (Object.keys(Blogs) as BlogId[]).map(
	(id) => ({ kind: "blog" as const, id, ...Blogs[id] }),
);

const PROJECT_ITEMS: readonly WorkItem[] = RankedProjects.map((project) => ({
	kind: "project" as const,
	...project,
}));

export const WorkItems: readonly WorkItem[] = [...PROJECT_ITEMS, ...BLOG_ITEMS];
