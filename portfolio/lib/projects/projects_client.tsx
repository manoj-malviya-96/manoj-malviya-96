"use client";

import {
	InputField,
	List,
	Text,
	useResolvedTheme,
} from "@manoj-malviya-96/atom";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProjectCard from "@/lib/projects/project_card";
import { getMeta } from "@/lib/projects/registry";
import {
	PROJECT_IDS,
	type ProjectEffort,
	type ProjectId,
	type ProjectMeta,
} from "@/lib/projects/types";

const QUERY_PARAM = "q";

/**
 * InputField's `icon` takes a URL, not a node, so lucide's component can't be
 * passed through — this inlines lucide's own search glyph and re-colours it per
 * theme, since a data-URI SVG can't inherit currentColor.
 */
function searchIcon(stroke: string): string {
	return `data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
	)}`;
}

export default function ProjectsClient() {
	const searchParams = useSearchParams();
	const theme = useResolvedTheme();
	const icon = useMemo(
		() => searchIcon(theme === "dark" ? "#f5f5f7" : "#3a3a3f"),
		[theme],
	);
	const [query, setQuery] = useState(searchParams.get(QUERY_PARAM) ?? "");
	const matches = useSearch(query);

	const search = (value: string) => {
		setQuery(value);
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(QUERY_PARAM, value);
		} else {
			params.delete(QUERY_PARAM);
		}
		const query = params.toString();
		window.history.replaceState(
			null,
			"",
			query ? `?${query}` : location.pathname,
		);
	};

	return (
		<List direction="col" gap="xl">
			<li>
				<InputField
					type="search"
					variant="filled"
					icon={icon}
					value={query}
					onChange={(e) => search(e.target.value)}
					placeholder="Search projects (title, tags, description)"
					aria-label="Search projects"
				/>
			</li>
			{matches.length === 0 ? (
				<li>
					<Text variant="caption">No projects match that search.</Text>
				</li>
			) : (
				matches.map(({ id }) => (
					<li key={id} id={id}>
						<ProjectCard project={id} />
					</li>
				))
			)}
		</List>
	);
}

type SearchableProject = ProjectMeta & { id: ProjectId };

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const BY_EFFORT: SearchableProject[] = PROJECT_IDS.map((id) => ({
	id,
	...getMeta(id),
})).sort((a, b) => EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort]);

const FUSE_OPTIONS: IFuseOptions<SearchableProject> = {
	threshold: 0.35,
	keys: [
		{ name: "title", weight: 0.35 },
		{ name: "description", weight: 0.25 },
		{ name: "tags", weight: 0.2 },
	],
};

const fuse = new Fuse(BY_EFFORT, FUSE_OPTIONS);

function useSearch(query: string): SearchableProject[] {
	return useMemo(() => {
		const trimmed = query.trim();
		if (!trimmed) return BY_EFFORT;
		return fuse.search(trimmed).map((result) => result.item);
	}, [query]);
}
