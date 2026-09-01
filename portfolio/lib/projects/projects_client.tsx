"use client";

import { InputField, List, Typography } from "@manoj-malviya-96/atom";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useSearchParams } from "next/navigation";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { ALL_PROJECTS } from "@/lib/projects/list";
import type { ProjectEffort, ProjectTag } from "@/lib/projects/list/types";

const QUERY_PARAM = "q";

const SEARCH_ICON = `data:image/svg+xml,${encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#3a3a3f" fill-opacity="0.6"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',
)}`;

export default function ProjectsClient() {
	const searchParams = useSearchParams();
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
		window.history.replaceState(null, "", `?${params.toString()}`);
	};

	return (
		<List direction="col" gap="xl">
			<li>
				<InputField
					type="search"
					variant="filled"
					icon={SEARCH_ICON}
					value={query}
					onChange={(e) => search(e.target.value)}
					placeholder="Search projects (title, tags, description)"
					aria-label="Search projects"
				/>
			</li>
			{matches.length === 0 ? (
				<li>
					<Typography variant="caption">
						No projects match that search.
					</Typography>
				</li>
			) : (
				matches.map(({ id, Card }) => (
					<li key={id} id={id}>
						<Card />
					</li>
				))
			)}
		</List>
	);
}

type SearchableProject = {
	id: string;
	Card: ComponentType;
	title: string;
	description: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
};

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const BY_EFFORT: SearchableProject[] = ALL_PROJECTS.map(
	({ id, Card, metadata }) => ({ id, Card, ...metadata }),
).sort((a, b) => EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort]);

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
