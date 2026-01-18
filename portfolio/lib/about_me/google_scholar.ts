import { useQuery } from "@tanstack/react-query";

interface GoogleScholarResponse {
  total_citations: number;
  citations_per_year: {
    [year: string]: number;
  };
  publications: Array<{
    title: string;
    authors: string;
    venue: string;
    citations: number;
    year: number;
  }>;
}

export interface ScholarMetrics {
  citations: number;
  hIndex: number;
  publications: number;
  recentYearCitations: number;
  citationsPerYear: { [year: string]: number };
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
  const data = (await response.json()) as GoogleScholarResponse;

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
  };
}

export function useGoogleScholarQuery() {
  return useQuery({
    queryKey: ["google-scholar"],
    queryFn: fetchScholarMetrics,
  });
}
