import { PRIV_TOKEN, USER } from "./config";
import { computeStreaks, fetchYearlyContributions } from "./contributions";
import { gh, searchCount } from "./github-client";
import { fetchLoc } from "./loc";

export interface LangShare {
	name: string;
	pct: number;
	color: string;
}

export interface Stats {
	role: string;
	repos: number;
	contributed: number;
	commits: number;
	prs: number;
	reviews: number;
	comments: number;
	streak: number;
	longestStreak: number;
	locAdd: number;
	locDel: number;
	loc: number;
	languageShares: LangShare[];
}

interface RepoNode {
	name: string;
	isFork: boolean;
	languages: {
		edges: { size: number; node: { name: string; color: string | null } }[];
	};
}

// GitHub's own linguist colors put TypeScript and Python both in near-identical
// blues, and C++'s pink is jarring next to the card's palette — override those few.
const LANGUAGE_COLOR_OVERRIDES: Record<string, string> = {
	Python: "#e3b341",
	"C++": "#6e7681",
};

// Capped at 8 so the legend still fits the card width; languages that round to
// 0% are dropped rather than counted against that cap, since they'd be invisible
// slivers on the bar anyway.
function topLanguageShares(repos: RepoNode[], maxShown = 8): LangShare[] {
	const totals = new Map<string, { size: number; color: string }>();
	for (const repo of repos) {
		if (repo.isFork) continue;
		for (const edge of repo.languages.edges) {
			const existing = totals.get(edge.node.name);
			if (existing) existing.size += edge.size;
			else {
				const color =
					LANGUAGE_COLOR_OVERRIDES[edge.node.name] ??
					edge.node.color ??
					"#8b949e";
				totals.set(edge.node.name, { size: edge.size, color });
			}
		}
	}
	const total = [...totals.values()].reduce((sum, v) => sum + v.size, 0);
	if (total === 0) return [];
	return [...totals.entries()]
		.sort((a, b) => b[1].size - a[1].size)
		.map(([name, v]) => ({
			name,
			pct: Math.round((v.size / total) * 100),
			color: v.color,
		}))
		.filter((l) => l.pct > 0)
		.slice(0, maxShown);
}

function truncate(s: string, max: number): string {
	return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

export async function fetchStats(): Promise<Stats> {
	const u = await gh<{
		user: {
			id: string;
			createdAt: string;
			bio: string | null;
			issueComments: { totalCount: number };
			repositories: { totalCount: number; nodes: RepoNode[] };
			repositoriesContributedTo: { totalCount: number };
		};
	}>(
		`query {
      user(login: "${USER}") {
        id
        createdAt
        bio
        issueComments(first: 0) { totalCount }
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            name
            isFork
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name color } }
            }
          }
        }
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
      }
    }`,
		{},
		PRIV_TOKEN,
	);

	const joinYear = new Date(u.user.createdAt).getUTCFullYear();
	const ownedRepoNames = u.user.repositories.nodes
		.filter((n) => !n.isFork)
		.map((n) => n.name);

	console.log(
		`fetchStats: user joined ${joinYear}, ${ownedRepoNames.length} owned repos`,
	);

	const [years, prs, reviews, locTotals] = await Promise.all([
		fetchYearlyContributions(joinYear),
		searchCount(`is:pr author:${USER}`),
		searchCount(`is:pr reviewed-by:${USER} -author:${USER}`),
		fetchLoc(ownedRepoNames, u.user.id),
	]);

	const commits = years.reduce(
		(sum, y) =>
			sum + y.totalCommitContributions + y.restrictedContributionsCount,
		0,
	);
	const { current, longest } = computeStreaks(years);

	return {
		role: truncate((u.user.bio ?? "").replace(/\s+/g, " ").trim() || "—", 48),
		repos: u.user.repositories.totalCount,
		contributed: u.user.repositoriesContributedTo.totalCount,
		commits,
		prs,
		reviews,
		comments: u.user.issueComments.totalCount,
		streak: current,
		longestStreak: longest,
		locAdd: locTotals.add,
		locDel: locTotals.del,
		loc: locTotals.add - locTotals.del,
		languageShares: topLanguageShares(u.user.repositories.nodes),
	};
}
