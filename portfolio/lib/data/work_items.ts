import { assertNever } from "@manoj-malviya-96/atom";
import { type Blog, type BlogId, Blogs } from "@/lib/data/blogs";
import { type ProjectSummary, RankedProjects } from "@/lib/data/projects";

export type ExperimentItem =
	| ({ kind: "project" } & ProjectSummary)
	| ({ kind: "blog"; id: BlogId } & Blog);

export type ExperimentAttribute = "new" | "in_progress";

const BLOG_ITEMS: readonly ExperimentItem[] = (
	Object.keys(Blogs) as BlogId[]
).map((id) => ({ kind: "blog" as const, id, ...Blogs[id] }));

const PROJECT_ITEMS: readonly ExperimentItem[] = RankedProjects.map(
	(project) => ({
		kind: "project" as const,
		...project,
	}),
);

export const ExperimentItems: readonly ExperimentItem[] = [
	...PROJECT_ITEMS,
	...BLOG_ITEMS,
];

function startedAt(item: ExperimentItem): Date {
	switch (item.kind) {
		case "project":
			return item.startsAt;
		case "blog":
			return item.publishedAt;
		default:
			return assertNever(item);
	}
}

function isInProgress(item: ExperimentItem): boolean {
	switch (item.kind) {
		case "project":
			return item.endsAt === undefined;
		case "blog":
			return false;
		default:
			return assertNever(item);
	}
}

const LATEST_STARTED_AT = Math.max(
	...ExperimentItems.map((item) => startedAt(item).getTime()),
);

/** "new" goes to whatever started most recently; "in_progress" to projects without an end date. */
export function getAttributes(
	item: ExperimentItem,
): readonly ExperimentAttribute[] {
	const attributes: ExperimentAttribute[] = [];
	if (startedAt(item).getTime() === LATEST_STARTED_AT) attributes.push("new");
	if (isInProgress(item)) attributes.push("in_progress");
	return attributes;
}

/** Blogs show their publish year; projects show "2025" or "2025-2026", with ongoing work running through today. */
export function formatDates(item: ExperimentItem): string {
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
