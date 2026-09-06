"use client";

import { Flex, InputField, List, Text } from "@manoj-malviya-96/atom";
import { iconMagnifyingGlassUrl } from "@manoj-malviya-96/atom/icons";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
	AllProjectIds,
	getMeta,
	type ProjectEffort,
	type ProjectId,
	type ProjectMeta,
} from "@/lib/data";
import ProjectCard from "@/lib/projects/project_card";
import { Link } from "@/lib/ui";

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
		const query = params.toString();
		window.history.replaceState(
			null,
			"",
			query ? `?${query}` : location.pathname,
		);
	};

	return (
		<Flex
			direction="row"
			gap="xl"
			vAlign="start"
			className="direction-responsive-row"
		>
			<ProjectsToc />
			<Flex direction="col" gap="lg" grow>
				<InputField
					type="search"
					icon={iconMagnifyingGlassUrl}
					value={query}
					onChange={(e) => search(e.target.value)}
					placeholder="Search projects (title, tags, description)"
					aria-label="Search projects"
				/>
				{matches.length === 0 && (
					<Text variant="caption">No projects match that search.</Text>
				)}
				{matches.length !== 0 && (
					<List direction="col" gap="xl">
						{matches.map(({ id }) => (
							<li key={id}>
								<ProjectCard project={id} />
							</li>
						))}
					</List>
				)}
			</Flex>
		</Flex>
	);
}

// The table of contents always lists every project, regardless of the active
// search filter, so it stays a stable index rather than shifting under the user.
function ProjectsToc() {
	return (
		<Flex
			as="nav"
			aria-label="Project sections"
			direction="col"
			gap="sm"
			width="sm"
			className="project-toc"
		>
			{BY_EFFORT.map(({ id, title }) => (
				<Link key={id} url={`#${id}`}>
					{title}
				</Link>
			))}
		</Flex>
	);
}

type SearchableProject = ProjectMeta & { id: ProjectId };

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const BY_EFFORT: SearchableProject[] = AllProjectIds.map((id) => ({
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
