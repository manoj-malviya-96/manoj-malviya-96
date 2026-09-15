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
  role: "Lead Product Engineer",
  company: "Noah Labs GmbH",
  location: "Berlin, Germany",
  experience: "8 years",
  frameworks: "Qt/QML, React, FastAPI, PyTorch",
  speaks: "English, Hindi",
  email: "malviyamanoj1896@gmail.com",
  linkedin: "in/manoj-malviya-",
  portfolio: "manoj-malviya.vercel.app",
};

type Color = "h" | "k" | "v" | "d" | "g" | "r" | "art";
type Segment = [text: string, color: Color];

const PALETTES: Record<"dark" | "light", Record<Color | "bg" | "border", string>> = {
  dark: {
    bg: "#0d1117", border: "#30363d", h: "#58a6ff", k: "#ffa657",
    v: "#c9d1d9", d: "#484f58", g: "#3fb950", r: "#f85149", art: "#8b949e",
  },
  light: {
    bg: "#ffffff", border: "#d0d7de", h: "#0969da", k: "#953800",
    v: "#24292f", d: "#afb8c1", g: "#1a7f37", r: "#cf222e", art: "#57606a",
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
  languages: string;
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

interface RepoNode {
  name: string;
  isFork: boolean;
  languages: { edges: { size: number; node: { name: string } }[] };
}

function topLanguages(repos: RepoNode[], count = 4): string {
  const totals = new Map<string, number>();
  for (const repo of repos) {
    if (repo.isFork) continue;
    for (const edge of repo.languages.edges) {
      totals.set(edge.node.name, (totals.get(edge.node.name) ?? 0) + edge.size);
    }
  }
  const total = [...totals.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return "—";
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, size]) => `${name} ${Math.round((size / total) * 100)}%`)
    .join(", ");
}

async function fetchStats(): Promise<Stats> {
  const u = await gh<{
    user: {
      id: string;
      createdAt: string;
      repositories: { totalCount: number; nodes: RepoNode[] };
      repositoriesContributedTo: { totalCount: number };
    };
  }>(
    `query {
      user(login: "${USER}") {
        id
        createdAt
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            name
            isFork
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name } }
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
    languages: topLanguages(u.user.repositories.nodes),
  };
}

interface DecodedImage {
  width: number;
  height: number;
  luminanceAt(x: number, y: number): number; // 0 (black)..1 (white)
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

  function luminanceAt(x: number, y: number): number {
    const i = y * stride + x * channels;
    if (colorType === 3) {
      if (!palette) throw new Error("palette PNG missing PLTE chunk");
      const p = pixels[i] * 3;
      return (0.299 * palette[p] + 0.587 * palette[p + 1] + 0.114 * palette[p + 2]) / 255;
    }
    if (colorType === 0 || colorType === 4) return pixels[i] / 255;
    return (0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]) / 255;
  }

  return { width, height, luminanceAt };
}

async function fetchAvatar(): Promise<DecodedImage> {
  const res = await fetch(`https://github.com/${USER}.png?size=240`);
  return decodePng(Buffer.from(await res.arrayBuffer()));
}

const ASCII_RAMP = " .:-=+*#%@";
const ASCII_CHAR_WIDTH = 7.8; // px, Consolas/Menlo at font-size 13
const ASCII_LINE_HEIGHT = 15; // px

// Density represents luminance, but "dense" only reads as bright against a dark
// background and as dark ink against a light one — so the two modes invert the ramp.
function renderAscii(img: DecodedImage, mode: "dark" | "light"): string[] {
  const rows = Math.round(
    ASCII_COLS * (ASCII_CHAR_WIDTH / ASCII_LINE_HEIGHT) * (img.height / img.width),
  );
  const cellW = img.width / ASCII_COLS;
  const cellH = img.height / rows;
  const lines: string[] = [];
  for (let row = 0; row < rows; row++) {
    let line = "";
    const y0 = Math.floor(row * cellH);
    const y1 = Math.max(y0 + 1, Math.floor((row + 1) * cellH));
    for (let col = 0; col < ASCII_COLS; col++) {
      const x0 = Math.floor(col * cellW);
      const x1 = Math.max(x0 + 1, Math.floor((col + 1) * cellW));
      let sum = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          sum += img.luminanceAt(x, y);
          count++;
        }
      }
      const luminance = sum / count;
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
    kv("Languages", s.languages),
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

function render(mode: "dark" | "light", stats: Stats, ascii: string[]): string {
  const p = PALETTES[mode];
  const width = 840;
  const height = 480;
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" ` +
      'font-family="Consolas, Menlo, monospace" font-size="13px">',
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="${p.bg}" stroke="${p.border}"/>`,
  ];
  ascii.forEach((line, i) => {
    out.push(`<text x="25" y="${40 + i * ASCII_LINE_HEIGHT}" fill="${p.art}" xml:space="preserve">${escapeXml(line)}</text>`);
  });
  infoLines(stats).forEach((segs, i) => {
    if (!segs.length) return;
    const spans = segs.map(([text, color]) => `<tspan fill="${p[color]}">${escapeXml(text)}</tspan>`).join("");
    out.push(`<text x="390" y="${45 + i * 21}" xml:space="preserve">${spans}</text>`);
  });
  out.push("</svg>");
  return out.join("\n");
}

async function main() {
  const [stats, avatar] = await Promise.all([fetchStats(), fetchAvatar()]);
  console.log("stats:", stats);
  const dir = dirname(fileURLToPath(import.meta.url));
  for (const mode of ["dark", "light"] as const) {
    await writeFile(join(dir, `${mode}_mode.svg`), render(mode, stats, renderAscii(avatar, mode)));
  }
  console.log("wrote dark_mode.svg, light_mode.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
