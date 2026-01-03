import { useQuery } from "@tanstack/react-query";

export interface ScholarMetrics {
  citations: number;
  hIndex: number;
  i10Index: number;
  publications: number;
  recentYearCitations: number;
  citationsPerYear: { [year: string]: number };
}

const USER = process.env.NEXT_PUBLIC_SCHOLAR_USER!;
const TARGET_URL = process.env.NEXT_PUBLIC_SCHOLAR_API!;

if (!USER || !TARGET_URL) {
  throw new Error(
    "Missing environment variables: ensure NEXT_PUBLIC_SCHOLAR_USER and NEXT_PUBLIC_SCHOLAR_API are set",
  );
}

const targetUrl = new URL(TARGET_URL);
targetUrl.searchParams.set("user", USER);
const PROXY_API_URL = `https://corsproxy.io/?url=${encodeURIComponent(
  targetUrl.toString(),
)}`;

type GoogleScholarResponse = {
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
};

async function fetchGoogleScholar(): Promise<GoogleScholarResponse> {
  const response = await fetch(PROXY_API_URL);
  if (!response.ok) throw new Error("Failed to fetch Google Scholar data");
  if (response.status !== 200)
    throw new Error(`Google Scholar API error: ${response.statusText}`);
  const isJson = response.headers
    .get("Content-Type")
    ?.includes("application/json");
  if (!isJson) throw new Error("No Json response");
  return response.json();
}

async function fetchScholarMetrics(): Promise<ScholarMetrics> {
  const data = await fetchGoogleScholar();
  console.log("Raw Google Scholar API Data:", data);

  // Calculate h-index (number of papers with at least h citations)
  const sortedCitations = data.publications
    .map((p) => p.citations)
    .sort((a, b) => b - a);

  let hIndex = 0;
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }
  const i10Index = data.publications.filter((p) => p.citations >= 10).length;
  const years = Object.keys(data.citations_per_year)
    .map(Number)
    .sort((a, b) => b - a);
  const recentYear = years[0] || new Date().getFullYear();
  const recentYearCitations =
    data.citations_per_year[recentYear.toString()] || 0;

  return {
    citations: data.total_citations,
    hIndex,
    i10Index,
    publications: data.publications.length,
    recentYearCitations,
    citationsPerYear: data.citations_per_year,
  };
}

export function google_scholar() {
  return useQuery({
    queryKey: ["google-scholar", USER],
    queryFn: fetchScholarMetrics,
  });
}
