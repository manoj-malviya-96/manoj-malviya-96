/**
 * Regenerate profile/dark_mode.svg and profile/light_mode.svg with live GitHub stats.
 *
 * Runs daily via GitHub Actions (see .github/workflows/profile-card.yml).
 * Node stdlib + global fetch only, no npm dependencies.
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "manoj-malviya-96";
const W = 50; // info column width in characters

// Two tokens by design: the Actions GITHUB_TOKEN sees only public data, while a
// PAT (ACCESS_TOKEN secret) also sees private repos/PRs/reviews. Either falls back to the other.
const TOKEN = process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN || "";
const PRIV_TOKEN = process.env.ACCESS_TOKEN || TOKEN;

const PROFILE = {
  role: "Lead Product Engineer",
  company: "Noah Labs GmbH",
  location: "Berlin, Germany",
  experience: "8 years",
  languages: "C/C++, Python, TS, Swift, Go, Rust",
  frameworks: "Qt/QML, React, FastAPI, PyTorch",
  speaks: "English, Hindi",
  email: "malviyamanoj1896@gmail.com",
  linkedin: "in/manoj-malviya-",
  portfolio: "manoj-malviya.vercel.app",
};

type Color = "h" | "k" | "v" | "d" | "g" | "r";
type Segment = [text: string, color: Color];

const PALETTES: Record<"dark" | "light", Record<Color | "bg" | "border", string>> = {
  dark: {
    bg: "#0d1117", border: "#30363d", h: "#58a6ff", k: "#ffa657",
    v: "#c9d1d9", d: "#484f58", g: "#3fb950", r: "#f85149",
  },
  light: {
    bg: "#ffffff", border: "#d0d7de", h: "#0969da", k: "#953800",
    v: "#24292f", d: "#afb8c1", g: "#1a7f37", r: "#cf222e",
  },
};

interface Stats {
  repos: number;
  contributed: number;
  commits: number;
  prs: number;
  reviews: number;
  locAdd: number;
  locDel: number;
  loc: number;
}

async function gh<T>(query: string, variables: Record<string, unknown> = {}, token = TOKEN): Promise<T> {
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

async function searchCount(query: string): Promise<number> {
  const data = await gh<{ search: { issueCount: number } }>(
    "query($q: String!) { search(query: $q, type: ISSUE, first: 0) { issueCount } }",
    { q: query },
    PRIV_TOKEN,
  );
  return data.search.issueCount;
}

async function fetchCommits(joinYear: number): Promise<number> {
  const currentYear = new Date().getUTCFullYear();
  const aliases: string[] = [];
  for (let y = joinYear; y <= currentYear; y++) {
    aliases.push(
      `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y + 1}-01-01T00:00:00Z") ` +
        "{ totalCommitContributions restrictedContributionsCount }",
    );
  }
  const data = await gh<{
    user: Record<string, { totalCommitContributions: number; restrictedContributionsCount: number }>;
  }>(`query { user(login: "${USER}") { ${aliases.join("\n")} } }`, {}, PRIV_TOKEN);
  return Object.values(data.user).reduce(
    (sum, v) => sum + v.totalCommitContributions + v.restrictedContributionsCount,
    0,
  );
}

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

// ponytail: REST stats/contributors answers 202 forever to the Actions token,
// so walk own commits on the default branch via GraphQL instead
async function fetchLoc(repoNames: string[], userId: string): Promise<{ add: number; del: number }> {
  let add = 0;
  let del = 0;
  for (const name of repoNames) {
    let cursor: string | null = null;
    try {
      for (;;) {
        const data = await gh<LocPage>(LOC_QUERY, { owner: USER, name, id: userId, cursor }, PRIV_TOKEN);
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
    } catch (err) {
      console.error(`loc ${name}:`, err);
    }
  }
  return { add, del };
}

async function fetchStats(): Promise<Stats> {
  const u = await gh<{
    user: {
      id: string;
      createdAt: string;
      repositories: { totalCount: number; nodes: { name: string; isFork: boolean }[] };
      repositoriesContributedTo: { totalCount: number };
    };
  }>(
    `query {
      user(login: "${USER}") {
        id
        createdAt
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes { name isFork }
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
  const ownedRepoNames = u.user.repositories.nodes.filter((n) => !n.isFork).map((n) => n.name);

  const [commits, prs, reviews, locTotals] = await Promise.all([
    fetchCommits(joinYear),
    searchCount(`is:pr author:${USER}`),
    searchCount(`is:pr reviewed-by:${USER} -author:${USER}`),
    fetchLoc(ownedRepoNames, u.user.id),
  ]);

  return {
    repos: u.user.repositories.totalCount,
    contributed: u.user.repositoriesContributedTo.totalCount,
    commits,
    prs,
    reviews,
    locAdd: locTotals.add,
    locDel: locTotals.del,
    loc: locTotals.add - locTotals.del,
  };
}

function kv(key: string, val: string, width = W): Segment[] {
  const dots = ".".repeat(Math.max(width - key.length - val.length - 3, 1));
  return [[`${key}: `, "k"], [`${dots} `, "d"], [val, "v"]];
}

function kv2(k1: string, v1: string, k2: string, v2: string): Segment[] {
  return [...kv(k1, v1, 27), [" | ", "d"], ...kv(k2, v2, 20)];
}

function rule(title = ""): Segment[] {
  const label = title ? `─ ${title} ` : "";
  return [[label, "h"], ["─".repeat(Math.max(W - label.length, 1)), "d"]];
}

function n(x: number): string {
  return x.toLocaleString("en-US");
}

function infoLines(s: Stats): Segment[][] {
  return [
    [[`${USER}@github `, "h"], ["─".repeat(Math.max(W - USER.length - 8, 1)), "d"]],
    [],
    kv("Role", `${PROFILE.role} @ ${PROFILE.company}`),
    kv("Location", PROFILE.location),
    kv("Experience", PROFILE.experience),
    [],
    kv("Languages", PROFILE.languages),
    kv("Frameworks", PROFILE.frameworks),
    kv("Speaks", PROFILE.speaks),
    [],
    rule("Contact"),
    kv("Email", PROFILE.email),
    kv("LinkedIn", PROFILE.linkedin),
    kv("Portfolio", PROFILE.portfolio),
    [],
    rule("GitHub Stats"),
    kv2("Repos", `${s.repos} {Contrib: ${s.contributed}}`, "PRs", n(s.prs)),
    kv2("Commits", n(s.commits), "Reviews", n(s.reviews)),
    [
      ["Lines of Code: ", "k"], [n(s.loc), "v"], [" ( ", "d"],
      [`${n(s.locAdd)}++`, "g"], [", ", "d"], [`${n(s.locDel)}--`, "r"], [" )", "d"],
    ],
  ];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(mode: "dark" | "light", stats: Stats): string {
  const p = PALETTES[mode];
  const width = 820;
  const height = 460;
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" ` +
      'font-family="Consolas, Menlo, monospace" font-size="13px">',
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="${p.bg}" stroke="${p.border}"/>`,
    `<clipPath id="avatarClip-${mode}"><circle cx="150" cy="200" r="100"/></clipPath>`,
    `<circle cx="150" cy="200" r="103" fill="none" stroke="${p.border}" stroke-width="2"/>`,
    `<image href="https://github.com/${USER}.png?size=240" x="50" y="100" width="200" height="200" ` +
      `clip-path="url(#avatarClip-${mode})" preserveAspectRatio="xMidYMid slice"/>`,
    `<text x="150" y="330" text-anchor="middle" fill="${p.h}">@${USER}</text>`,
  ];
  infoLines(stats).forEach((segs, i) => {
    if (!segs.length) return;
    const spans = segs.map(([text, color]) => `<tspan fill="${p[color]}">${escapeXml(text)}</tspan>`).join("");
    out.push(`<text x="310" y="${45 + i * 21}" xml:space="preserve">${spans}</text>`);
  });
  out.push("</svg>");
  return out.join("\n");
}

async function main() {
  const stats = await fetchStats();
  console.log("stats:", stats);
  const dir = dirname(fileURLToPath(import.meta.url));
  for (const mode of ["dark", "light"] as const) {
    await writeFile(join(dir, `${mode}_mode.svg`), render(mode, stats));
  }
  console.log("wrote dark_mode.svg, light_mode.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
