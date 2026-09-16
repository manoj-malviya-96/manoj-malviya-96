import { PRIV_TOKEN, USER } from "./config";
import { gh } from "./github-client";

const LARGEST_PR_QUERY = `
query($q: String!, $cursor: String) {
  search(query: $q, type: ISSUE, first: 100, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest { additions deletions }
    }
  }
}`;

interface LargestPrPage {
	search: {
		pageInfo: { hasNextPage: boolean; endCursor: string | null };
		nodes: { additions?: number; deletions?: number }[];
	};
}

export async function fetchLargestPr(): Promise<{
	additions: number;
	deletions: number;
}> {
	let cursor: string | null = null;
	let best = { additions: 0, deletions: 0 };
	let bestTotal = -1;
	for (;;) {
		const data: LargestPrPage = await gh<LargestPrPage>(
			LARGEST_PR_QUERY,
			{ q: `is:pr author:${USER}`, cursor },
			PRIV_TOKEN,
		);
		for (const node of data.search.nodes) {
			const additions = node.additions ?? 0;
			const deletions = node.deletions ?? 0;
			const total = additions + deletions;
			if (total > bestTotal) {
				bestTotal = total;
				best = { additions, deletions };
			}
		}
		if (!data.search.pageInfo.hasNextPage) break;
		cursor = data.search.pageInfo.endCursor;
	}
	return best;
}
