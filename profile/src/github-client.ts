import { PRIV_TOKEN, TOKEN } from "./config";

export async function gh<T>(
	query: string,
	variables: Record<string, unknown> = {},
	token = TOKEN,
): Promise<T> {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
		},
		body: JSON.stringify({ query, variables }),
	});
	const body = await res.json();
	if (body.errors) throw new Error(JSON.stringify(body.errors));
	return body.data as T;
}

export async function searchCount(query: string): Promise<number> {
	const data = await gh<{ search: { issueCount: number } }>(
		"query($q: String!) { search(query: $q, type: ISSUE, first: 0) { issueCount } }",
		{ q: query },
		PRIV_TOKEN,
	);
	return data.search.issueCount;
}
