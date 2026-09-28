import { assertNever } from "@manoj-malviya-96/atom";
import { type Blog, type BlogId, Blogs } from "@/lib/data/blogs";
import { type ProjectSummary, RankedProjects } from "@/lib/data/projects";

/** "new" goes to whatever started most recently; "in_progress" to projects without an end date. */
export function getAttributes(item: WorkItem): readonly WorkAttribute[] {
	const attributes: WorkAttribute[] = [];
	if (startedAt(item).getTime() === LATEST_STARTED_AT) attributes.push("new");
	if (isInProgress(item)) attributes.push("in_progress");
	return attributes;
}

/** Blogs show their publish year; projects show "2025" or "2025-2026", with ongoing work running through today. */
export function formatDates(item: WorkItem): string {
	switch (item.kind) {
		case "blog":
			return `${item.publishedAt.getFullYear()}`;
		case "project": {
			const startYear = item.startsAt.getFullYear();
			const endYear = (item.endsAt ?? new Date()).getFullYear();
			return startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`;
		}
		default:
			return assertNever(item);
	}
}

export type WorkItem =
	| ({ kind: "project" } & ProjectSummary)
	| ({ kind: "blog"; id: BlogId } & Blog);

export type WorkAttribute = "new" | "in_progress";

const BLOG_ITEMS: readonly WorkItem[] = (Object.keys(Blogs) as BlogId[]).map(
	(id) => ({ kind: "blog" as const, id, ...Blogs[id] }),
);

const PROJECT_ITEMS: readonly WorkItem[] = RankedProjects.map((project) => ({
	kind: "project" as const,
	...project,
}));

export const WorkItems: readonly WorkItem[] = [...PROJECT_ITEMS, ...BLOG_ITEMS];

const LATEST_STARTED_AT = Math.max(
	...WorkItems.map((item) => startedAt(item).getTime()),
);

function startedAt(item: WorkItem): Date {
	switch (item.kind) {
		case "project":
			return item.startsAt;
		case "blog":
			return item.publishedAt;
		default:
			return assertNever(item);
	}
}

function isInProgress(item: WorkItem): boolean {
	switch (item.kind) {
		case "project":
			return item.endsAt === undefined;
		case "blog":
			return false;
		default:
			return assertNever(item);
	}
}
