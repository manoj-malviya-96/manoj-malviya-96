"use client";

import { List, Typography } from "@manoj-malviya-96/atom";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useSearchParams } from "next/navigation";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { ALL_PROJECTS } from "@/lib/projects/list";
import type { ProjectEffort, ProjectTag } from "@/lib/projects/list/types";
import { Search } from "@/lib/ui";

const QUERY_PARAM = "q";

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
				<Search
					value={query}
					onChange={search}
					placeholder="Search projects (title, tags, description)"
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
