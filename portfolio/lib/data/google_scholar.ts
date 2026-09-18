import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useGoogleScholarQuery() {
	return useQuery({
		queryKey: ["google-scholar"],
		queryFn: fetchScholarMetrics,
	});
}

const googleScholarResponseSchema = z.object({
	total_citations: z.number(),
	citations_per_year: z.record(z.string(), z.number()),
	publications: z.array(
		z.object({
			title: z.string(),
			authors: z.string(),
			venue: z.string(),
			citations: z.number(),
			year: z.number(),
		}),
	),
});

export type ScholarPublication = {
	title: string;
	authors: string;
	venue: string;
	citations: number;
	year: number;
};

interface ScholarMetrics {
	citations: number;
	hIndex: number;
	publications: number;
	recentYearCitations: number;
	citationsPerYear: { [year: string]: number };
	papers: readonly ScholarPublication[];
}

function computeHIndex(sortedCitations: number[]): number {
	let hIndex = 0;
	for (let i = 0; i < sortedCitations.length; i++) {
		if (sortedCitations[i] >= i + 1) {
			hIndex = i + 1;
		} else {
			break;
		}
	}
	return hIndex;
}

async function fetchScholarMetrics(): Promise<ScholarMetrics> {
	const response = await fetch("/api/scholar", {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});
	if (!response.ok) throw new Error("Failed to fetch Google Scholar data");
	const data = googleScholarResponseSchema.parse(await response.json());

	// Calculate h-index (number of papers with at least h citations)
	const sortedCitations = data.publications
		.map((p) => p.citations)
		.sort((a, b) => b - a);

	const hIndex = computeHIndex(sortedCitations);
	const years = Object.keys(data.citations_per_year)
		.map(Number)
		.sort((a, b) => b - a);
	const recentYear = years[0] || new Date().getFullYear();
	const recentYearCitations =
		data.citations_per_year[recentYear.toString()] || 0;

	return {
		citations: data.total_citations,
		hIndex,
		publications: data.publications.length,
		recentYearCitations,
		citationsPerYear: data.citations_per_year,
		papers: data.publications,
	};
}
