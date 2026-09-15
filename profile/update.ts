/**
 * Regenerate profile/dark_mode.svg and profile/light_mode.svg with live GitHub stats.
 *
 * Runs daily via GitHub Actions (see .github/workflows/profile-card.yml).
 * Node stdlib + global fetch only, no npm dependencies.
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const USER = "manoj-malviya-96";
const W = 54; // info column width in characters
const ASCII_COLS = 42; // portrait width in characters

// Two tokens by design: the Actions GITHUB_TOKEN sees only public data, while a
// PAT (ACCESS_TOKEN secret) also sees private repos/PRs/reviews. Either falls back to the other.
const TOKEN = process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN || "";
const PRIV_TOKEN = process.env.ACCESS_TOKEN || TOKEN;

const PROFILE = {
  location: "Berlin, Germany",
  experience: "8 years",
  frameworks: "Qt/QML, React, FastAPI, PyTorch",
  speaks: "English, Hindi",
};

type Color = "h" | "k" | "v" | "d" | "g" | "r" | "art";
type Segment = [text: string, color: Color];
type Line =
  | { kind: "text"; segs: Segment[] }
  | { kind: "space" }
  | { kind: "langbar"; languages: LangShare[] };

const PALETTES: Record<"dark" | "light", Record<Color | "bg" | "border", string>> = {
  dark: {
    bg: "#0d1117", border: "#30363d", h: "#818cf8", k: "#58a6ff",
    v: "#c9d1d9", d: "#484f58", g: "#3fb950", r: "#f85149", art: "#8b949e",
  },
  light: {
    bg: "#ffffff", border: "#d0d7de", h: "#4f46e5", k: "#0969da",
    v: "#24292f", d: "#afb8c1", g: "#1a7f37", r: "#cf222e", art: "#57606a",
  },
};

interface LangShare {
  name: string;
  pct: number;
  color: string;
}

interface Stats {
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

interface ContribDay {
  date: string;
  contributionCount: number;
}

interface YearContrib {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: { weeks: { contributionDays: ContribDay[] }[] };
}

// One query for every year since the account was created: commit totals (for the
// total commit count) and the daily calendar (for streaks) come from the same field.
async function fetchYearlyContributions(joinYear: number): Promise<YearContrib[]> {
  const currentYear = new Date().getUTCFullYear();
  const years: number[] = [];
  for (let y = joinYear; y <= currentYear; y++) years.push(y);
  const aliases = years
    .map(
      (y) =>
        `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y + 1}-01-01T00:00:00Z") ` +
        "{ totalCommitContributions restrictedContributionsCount " +
        "contributionCalendar { weeks { contributionDays { date contributionCount } } } }",
    )
    .join("\n");
  const data = await gh<{ user: Record<string, YearContrib> }>(
    `query { user(login: "${USER}") { ${aliases} } }`,
    {},
    PRIV_TOKEN,
  );
  return years.map((y) => data.user[`y${y}`]);
}

function computeStreaks(years: YearContrib[]): { current: number; longest: number } {
  const today = new Date().toISOString().slice(0, 10);
  const days = years
    .flatMap((y) => y.contributionCalendar.weeks.flatMap((w) => w.contributionDays))
    .filter((d) => d.date <= today) // GitHub pads the current year's calendar to Jan 1 next year
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.contributionCount > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) current++;
    else if (i === days.length - 1) continue; // today isn't over yet, don't break the streak on it
    else break;
  }
  return { current, longest };
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

// REST's stats/contributors endpoint answers 202 (still computing) forever for
// the Actions token, so walk each repo's own commit history via GraphQL instead.
async function fetchRepoLoc(name: string, userId: string): Promise<{ add: number; del: number }> {
  let add = 0;
  let del = 0;
  let cursor: string | null = null;
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
  return { add, del };
}

async function fetchLoc(repoNames: string[], userId: string): Promise<{ add: number; del: number }> {
  const results = await Promise.all(
    repoNames.map((name) =>
      fetchRepoLoc(name, userId).catch((err) => {
        console.error(`loc ${name}:`, err);
        return { add: 0, del: 0 };
      }),
    ),
  );
  return results.reduce((sum, r) => ({ add: sum.add + r.add, del: sum.del + r.del }), { add: 0, del: 0 });
}

interface RepoNode {
  name: string;
  isFork: boolean;
  languages: { edges: { size: number; node: { name: string; color: string | null } }[] };
}

// GitHub's own linguist colors put TypeScript and Python both in near-identical
// blues, and C++'s pink is jarring next to the card's palette — override those few.
const LANGUAGE_COLOR_OVERRIDES: Record<string, string> = {
  Python: "#e3b341",
  "C++": "#6e7681",
};

function topLanguageShares(repos: RepoNode[], count = 4): LangShare[] {
  const totals = new Map<string, { size: number; color: string }>();
  for (const repo of repos) {
    if (repo.isFork) continue;
    for (const edge of repo.languages.edges) {
      const existing = totals.get(edge.node.name);
      if (existing) existing.size += edge.size;
      else {
        const color = LANGUAGE_COLOR_OVERRIDES[edge.node.name] ?? edge.node.color ?? "#8b949e";
        totals.set(edge.node.name, { size: edge.size, color });
      }
    }
  }
  const total = [...totals.values()].reduce((sum, v) => sum + v.size, 0);
  if (total === 0) return [];
  return [...totals.entries()]
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, count)
    .map(([name, v]) => ({ name, pct: Math.round((v.size / total) * 100), color: v.color }));
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

async function fetchStats(): Promise<Stats> {
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
  const ownedRepoNames = u.user.repositories.nodes.filter((n) => !n.isFork).map((n) => n.name);

  const [years, prs, reviews, locTotals] = await Promise.all([
    fetchYearlyContributions(joinYear),
    searchCount(`is:pr author:${USER}`),
    searchCount(`is:pr reviewed-by:${USER} -author:${USER}`),
    fetchLoc(ownedRepoNames, u.user.id),
  ]);

  const commits = years.reduce(
    (sum, y) => sum + y.totalCommitContributions + y.restrictedContributionsCount,
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

interface DecodedImage {
  width: number;
  height: number;
  luminance: Float32Array; // row-major, one entry per pixel, 0 (black)..1 (white)
}

// PNG "Paeth" filter predictor (spec section 9.2): picks whichever neighbor
// best predicts the current byte from the left/above/above-left reconstructed values.
function paeth(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

// GitHub always re-encodes avatars as 8-bit, non-interlaced PNG, so that's all this supports.
function decodePng(buf: Buffer): DecodedImage {
  const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!buf.subarray(0, 8).equals(SIGNATURE)) throw new Error("not a PNG");

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idatChunks: Buffer[] = [];
  let palette: Buffer | null = null;

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
      interlace = data.readUInt8(12);
    } else if (type === "PLTE") {
      palette = Buffer.from(data);
    } else if (type === "IDAT") {
      idatChunks.push(Buffer.from(data));
    } else if (type === "IEND") {
      break;
    }
    offset += 8 + length + 4; // length + type + data + crc
  }

  if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth: ${bitDepth}`);
  if (interlace !== 0) throw new Error("interlaced PNG not supported");

  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`unsupported PNG color type: ${colorType}`);

  const raw = inflateSync(Buffer.concat(idatChunks));
  const stride = width * channels;
  const pixels = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    const filterType = raw[y * (stride + 1)];
    const rowStart = y * (stride + 1) + 1;
    for (let i = 0; i < stride; i++) {
      const x = raw[rowStart + i];
      const a = i >= channels ? pixels[y * stride + i - channels] : 0;
      const b = y > 0 ? pixels[(y - 1) * stride + i] : 0;
      const c = y > 0 && i >= channels ? pixels[(y - 1) * stride + i - channels] : 0;
      let value: number;
      switch (filterType) {
        case 0: value = x; break;
        case 1: value = x + a; break;
        case 2: value = x + b; break;
        case 3: value = x + Math.floor((a + b) / 2); break;
        case 4: value = x + paeth(a, b, c); break;
        default: throw new Error(`unsupported PNG filter type: ${filterType}`);
      }
      pixels[y * stride + i] = value & 0xff;
    }
  }

  if (colorType === 3 && !palette) throw new Error("palette PNG missing PLTE chunk");

  const luminance = new Float32Array(width * height);
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const i = py * stride + px * channels;
      let value: number;
      if (colorType === 3) {
        const p = pixels[i] * 3;
        value = 0.299 * palette![p] + 0.587 * palette![p + 1] + 0.114 * palette![p + 2];
      } else if (colorType === 0 || colorType === 4) {
        value = pixels[i];
      } else {
        value = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
      }
      luminance[py * width + px] = value / 255;
    }
  }

  return { width, height, luminance };
}

async function fetchAvatar(): Promise<DecodedImage> {
  const res = await fetch(`https://github.com/${USER}.png?size=240`);
  return decodePng(Buffer.from(await res.arrayBuffer()));
}

const ASCII_RAMP = " .:-=+*#%@";
const ASCII_CHAR_WIDTH = 7.8; // px, Consolas/Menlo at font-size 13
const ASCII_LINE_HEIGHT = 15; // px

// One cell's average luminance per character in the portrait grid — sampled once
// and reused for both color modes, since only the character mapping differs below.
function sampleCells(img: DecodedImage): Float32Array {
  const rows = Math.round(
    ASCII_COLS * (ASCII_CHAR_WIDTH / ASCII_LINE_HEIGHT) * (img.height / img.width),
  );
  const cellW = img.width / ASCII_COLS;
  const cellH = img.height / rows;
  const cells = new Float32Array(rows * ASCII_COLS);
  for (let row = 0; row < rows; row++) {
    const y0 = Math.floor(row * cellH);
    const y1 = Math.max(y0 + 1, Math.floor((row + 1) * cellH));
    for (let col = 0; col < ASCII_COLS; col++) {
      const x0 = Math.floor(col * cellW);
      const x1 = Math.max(x0 + 1, Math.floor((col + 1) * cellW));
      let sum = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          sum += img.luminance[y * img.width + x];
          count++;
        }
      }
      cells[row * ASCII_COLS + col] = sum / count;
    }
  }
  return cells;
}

// Density represents luminance, but "dense" only reads as bright against a dark
// background and as dark ink against a light one — so the two modes invert the ramp.
function renderAscii(cells: Float32Array, mode: "dark" | "light"): string[] {
  const rows = cells.length / ASCII_COLS;
  const lines: string[] = [];
  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < ASCII_COLS; col++) {
      const luminance = cells[row * ASCII_COLS + col];
      const t = mode === "dark" ? luminance : 1 - luminance;
      const idx = Math.min(ASCII_RAMP.length - 1, Math.floor(t * ASCII_RAMP.length));
      line += ASCII_RAMP[idx];
    }
    lines.push(line);
  }
  return lines;
}

function kv(key: string, val: string, width = W): Segment[] {
  const dots = ".".repeat(Math.max(width - key.length - val.length - 3, 1));
  return [[`${key}: `, "k"], [`${dots} `, "d"], [val, "v"]];
}

function kv2(k1: string, v1: string, k2: string, v2: string): Segment[] {
  return [...kv(k1, v1, 29), [" | ", "d"], ...kv(k2, v2, 22)];
}

function rule(title = ""): Segment[] {
  const label = title ? `─ ${title} ` : "";
  return [[label, "h"], ["─".repeat(Math.max(W - label.length, 1)), "d"]];
}

function n(x: number): string {
  return x.toLocaleString("en-US");
}

function infoLines(s: Stats): Line[] {
  const text = (segs: Segment[]): Line => ({ kind: "text", segs });
  const space: Line = { kind: "space" };
  return [
    text([[`${USER}@github `, "h"], ["─".repeat(Math.max(W - USER.length - 8, 1)), "d"]]),
    space,
    text(kv("Role", s.role)),
    text(kv("Location", PROFILE.location)),
    text(kv("Experience", PROFILE.experience)),
    space,
    text(kv("Frameworks", PROFILE.frameworks)),
    text(kv("Speaks", PROFILE.speaks)),
    space,
    text(rule("GitHub Stats")),
    { kind: "langbar", languages: s.languageShares },
    text(kv2("Repos", `${s.repos} {Contrib: ${s.contributed}}`, "PRs", n(s.prs))),
    text(kv2("Commits", n(s.commits), "Reviews", n(s.reviews))),
    text(kv2("Streak", `${s.streak}d`, "Longest", `${s.longestStreak}d`)),
    text(kv("Comments", n(s.comments))),
    text([
      ["Lines of Code: ", "k"], [n(s.loc), "v"], [" ( ", "d"],
      [`${n(s.locAdd)}++`, "g"], [", ", "d"], [`${n(s.locDel)}--`, "r"], [" )", "d"],
    ]),
  ];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const INFO_X = 390;
const LANGBAR_WIDTH = 440;
const LANGBAR_HEIGHT = 10;

// Each language keeps its real GitHub linguist color in both card themes, like the
// language bar on a repo page. A thin bg-colored stroke separates adjacent segments
// so similar hues (e.g. two blues) don't blur into one another.
function renderLangBar(languages: LangShare[], y: number, bg: string): string[] {
  if (languages.length === 0) return [];
  const clipId = `langbar-${Math.round(y)}`;
  const out = [
    `<clipPath id="${clipId}"><rect x="${INFO_X}" y="${y}" width="${LANGBAR_WIDTH}" height="${LANGBAR_HEIGHT}" rx="5"/></clipPath>`,
    `<g clip-path="url(#${clipId})">`,
  ];
  let x = INFO_X;
  for (const lang of languages) {
    const w = (lang.pct / 100) * LANGBAR_WIDTH;
    out.push(
      `<rect x="${x.toFixed(2)}" y="${y}" width="${w.toFixed(2)}" height="${LANGBAR_HEIGHT}" ` +
        `fill="${lang.color}" stroke="${bg}" stroke-width="1"/>`,
    );
    x += w;
  }
  out.push("</g>");
  return out;
}

function render(mode: "dark" | "light", stats: Stats, ascii: string[]): string {
  const p = PALETTES[mode];
  const width = 840;
  const height = 410;
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" ` +
      'font-family="Consolas, Menlo, monospace" font-size="13px">',
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="${p.bg}" stroke="${p.border}"/>`,
  ];
  ascii.forEach((line, i) => {
    out.push(`<text x="25" y="${40 + i * ASCII_LINE_HEIGHT}" fill="${p.art}" xml:space="preserve">${escapeXml(line)}</text>`);
  });

  let y = 45;
  for (const line of infoLines(stats)) {
    if (line.kind === "space") {
      y += 21;
    } else if (line.kind === "text") {
      if (line.segs.length) {
        const spans = line.segs.map(([text, color]) => `<tspan fill="${p[color]}">${escapeXml(text)}</tspan>`).join("");
        out.push(`<text x="${INFO_X}" y="${y}" xml:space="preserve">${spans}</text>`);
      }
      y += 21;
    } else {
      out.push(...renderLangBar(line.languages, y - 8, p.bg));
      y += 14;
      const legend = line.languages
        .map((l) => `<tspan fill="${l.color}">● ${escapeXml(l.name)} ${l.pct}%   </tspan>`)
        .join("");
      out.push(`<text x="${INFO_X}" y="${y}" xml:space="preserve">${legend}</text>`);
      y += 21;
    }
  }
  out.push("</svg>");
  return out.join("\n");
}

async function main() {
  const [stats, avatar] = await Promise.all([fetchStats(), fetchAvatar()]);
  console.log("stats:", stats);
  const cells = sampleCells(avatar);
  const dir = dirname(fileURLToPath(import.meta.url));
  for (const mode of ["dark", "light"] as const) {
    await writeFile(join(dir, `${mode}_mode.svg`), render(mode, stats, renderAscii(cells, mode)));
  }
  console.log("wrote dark_mode.svg, light_mode.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
