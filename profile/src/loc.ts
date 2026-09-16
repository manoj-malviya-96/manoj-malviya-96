import { PRIV_TOKEN, USER } from "./config";
import { gh } from "./github-client";

const LOC_QUERY = `
query($owner: String!, $name: String!, $id: ID!, $cursor: String) {
  repository(owner: $owner, name: $name) {
    defaultBranchRef { target { ... on Commit {
      history(first: 100, author: { id: $id }, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes { additions deletions }
      }
    } } }
  }
}`;

interface LocPage {
	repository: {
		defaultBranchRef: {
			target: {
				history: {
					pageInfo: { hasNextPage: boolean; endCursor: string | null };
					nodes: { additions: number; deletions: number }[];
				};
			};
		} | null;
	};
}

// REST's stats/contributors endpoint answers 202 (still computing) forever for
// the Actions token, so walk each repo's own commit history via GraphQL instead.
async function fetchRepoLoc(
	name: string,
	userId: string,
): Promise<{ add: number; del: number }> {
	let add = 0;
	let del = 0;
	let cursor: string | null = null;
	for (;;) {
		const data: LocPage = await gh<LocPage>(
			LOC_QUERY,
			{ owner: USER, name, id: userId, cursor },
			PRIV_TOKEN,
		);
		const ref = data.repository.defaultBranchRef;
		if (!ref) break; // empty repo
		const h = ref.target.history;
		for (const commit of h.nodes) {
			add += commit.additions;
			del += commit.deletions;
		}
		if (!h.pageInfo.hasNextPage) break;
		cursor = h.pageInfo.endCursor;
	}
	return { add, del };
}

export async function fetchLoc(
	repoNames: string[],
	userId: string,
): Promise<{ add: number; del: number }> {
	const results = await Promise.all(
		repoNames.map((name) =>
			fetchRepoLoc(name, userId).catch((err) => {
				console.error(`loc ${name}:`, err);
				return { add: 0, del: 0 };
			}),
		),
	);
	return results.reduce(
		(sum, r) => ({ add: sum.add + r.add, del: sum.del + r.del }),
		{ add: 0, del: 0 },
	);
}
