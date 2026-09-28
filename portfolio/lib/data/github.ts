import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useGithubContributionsQuery() {
	return useQuery({
		queryKey: ["github-contributions"],
		queryFn: fetchGithubContributions,
	});
}

async function fetchGithubContributions(): Promise<number> {
	const response = await fetch("/api/github", {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});
	if (!response.ok) throw new Error("Failed to fetch GitHub contributions");
	const data = githubContributionsResponseSchema.parse(await response.json());
	const lastYear = data.total.lastYear;
	if (lastYear === undefined) throw new Error("No lastYear total in response");
	return lastYear;
}

const githubContributionsResponseSchema = z.object({
	total: z.record(z.string(), z.number()),
});
