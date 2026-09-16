import { ASCII_CHAR_WIDTH, ASCII_LINE_HEIGHT } from "./ascii-art";
import { PROFILE, USER, W } from "./config";
import type { LangShare, Stats } from "./stats";

type Color = "h" | "k" | "v" | "d" | "g" | "r" | "art";
type Segment = [text: string, color: Color];
type Line =
	| { kind: "text"; segs: Segment[] }
	| { kind: "space" }
	| { kind: "langbar"; languages: LangShare[] };

const PALETTES: Record<
	"dark" | "light",
	Record<Color | "bg" | "border", string>
> = {
	dark: {
		bg: "#0d1117",
		border: "#30363d",
		h: "#818cf8",
		k: "#58a6ff",
		v: "#c9d1d9",
		d: "#484f58",
		g: "#3fb950",
		r: "#f85149",
		art: "#8b949e",
	},
	light: {
		bg: "#ffffff",
		border: "#d0d7de",
		h: "#4f46e5",
		k: "#0969da",
		v: "#24292f",
		d: "#afb8c1",
		g: "#1a7f37",
		r: "#cf222e",
		art: "#57606a",
	},
};

function kv(key: string, val: string, width = W): Segment[] {
	const dots = ".".repeat(Math.max(width - key.length - val.length - 3, 1));
	return [
		[`${key}: `, "k"],
		[`${dots} `, "d"],
		[val, "v"],
	];
}

function kv2(k1: string, v1: string, k2: string, v2: string): Segment[] {
	return [...kv(k1, v1, 29), [" | ", "d"], ...kv(k2, v2, 22)];
}

function rule(title = ""): Segment[] {
	const label = title ? `─ ${title} ` : "";
	return [
		[label, "h"],
		["─".repeat(Math.max(W - label.length, 1)), "d"],
	];
}

function formatNumber(x: number): string {
	return x.toLocaleString("en-US");
}

function infoLines(s: Stats): Line[] {
	const text = (segs: Segment[]): Line => ({ kind: "text", segs });
	const space: Line = { kind: "space" };
	return [
		text([
			[`${USER}@github `, "h"],
			["─".repeat(Math.max(W - USER.length - 8, 1)), "d"],
		]),
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
		text(
			kv2("Repos", `${s.repos} {Contrib: ${s.contributed}}`, "PRs", formatNumber(s.prs)),
		),
		text(kv2("Commits", formatNumber(s.commits), "Reviews", formatNumber(s.reviews))),
		text(kv2("Streak", `${s.streak}d`, "Longest", `${s.longestStreak}d`)),
		text(kv("Comments", formatNumber(s.comments))),
		text([
			["Lines of Code: ", "k"],
			[formatNumber(s.loc), "v"],
			[" ( ", "d"],
			[`${formatNumber(s.locAdd)}++`, "g"],
			[", ", "d"],
			[`${formatNumber(s.locDel)}--`, "r"],
			[" )", "d"],
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
function renderLangBar(
	languages: LangShare[],
	y: number,
	bg: string,
): string[] {
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

// Wraps the legend onto as many rows as needed to fit LANGBAR_WIDTH — the language
// count varies with the account's repos, so a fixed row count would either clip
// entries (too few) or leave a stray empty row (too many).
function packLegendRows(languages: LangShare[]): LangShare[][] {
	const maxChars = Math.floor(LANGBAR_WIDTH / ASCII_CHAR_WIDTH);
	const rows: LangShare[][] = [[]];
	let charsUsed = 0;
	for (const lang of languages) {
		const chars = `● ${lang.name} ${lang.pct}%   `.length;
		const row = rows[rows.length - 1];
		if (charsUsed + chars > maxChars && row.length > 0) {
			rows.push([]);
			charsUsed = 0;
		}
		rows[rows.length - 1].push(lang);
		charsUsed += chars;
	}
	return rows;
}

export function render(mode: "dark" | "light", stats: Stats, ascii: string[]): string {
	const p = PALETTES[mode];
	const width = 840;

	const body: string[] = [];
	let y = 45;
	for (const line of infoLines(stats)) {
		if (line.kind === "space") {
			y += 21;
		} else if (line.kind === "text") {
			if (line.segs.length) {
				const spans = line.segs
					.map(
						([text, color]) =>
							`<tspan fill="${p[color]}">${escapeXml(text)}</tspan>`,
					)
					.join("");
				body.push(
					`<text x="${INFO_X}" y="${y}" xml:space="preserve">${spans}</text>`,
				);
			}
			y += 21;
		} else {
			body.push(...renderLangBar(line.languages, y - 8, p.bg));
			y += 14;
			for (const row of packLegendRows(line.languages)) {
				const legend = row
					.map(
						(l) =>
							`<tspan fill="${l.color}">● ${escapeXml(l.name)} ${l.pct}%   </tspan>`,
					)
					.join("");
				body.push(
					`<text x="${INFO_X}" y="${y}" xml:space="preserve">${legend}</text>`,
				);
				y += 21;
			}
		}
	}

	const asciiHeight = 40 + ascii.length * ASCII_LINE_HEIGHT;
	const height = Math.max(asciiHeight, y) + 15;

	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" ` +
			'font-family="Consolas, Menlo, monospace" font-size="13px">',
		`<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="${p.bg}" stroke="${p.border}"/>`,
		...ascii.map(
			(line, i) =>
				`<text x="25" y="${40 + i * ASCII_LINE_HEIGHT}" fill="${p.art}" xml:space="preserve">${escapeXml(line)}</text>`,
		),
		...body,
		"</svg>",
	].join("\n");
}
