import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import type { ReactNode } from "react";

/** Plugs into Atom's <Code highlight>: Prism tokens as spans, styled by the `.token` rules in globals.css. */
export function highlightCode(code: string, language: string): ReactNode {
	return tokenize(code, language).map(({ offset, text, type }) =>
		type ? (
			<span key={offset} className={`token ${type}`}>
				{text}
			</span>
		) : (
			text
		),
	);
}

/**
 * The same tokens drawn as a static SVG, for slots where a readable code block
 * can't live (e.g. a card thumbnail): it scales to fit, like an image.
 */
export function CodeSvg({
	code,
	language,
	alt,
}: {
	code: string;
	language: string;
	alt: string;
}) {
	const lines = toLines(tokenize(code, language));
	const longest = Math.max(...lines.map((line) => line.length));
	const width = PADDING * 2 + longest * CHARACTER_WIDTH;
	const height = PADDING * 2 + lines.length * LINE_HEIGHT;
	return (
		<svg
			className="code-svg"
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-label={alt}
		>
			<rect width={width} height={height} fill="#0d1117" />
			{lines
				.filter((line) => line.length > 0)
				.map((line) => (
					<text
						key={line.y}
						x={PADDING}
						y={line.y}
						fontSize={FONT_SIZE}
						textLength={line.length * CHARACTER_WIDTH}
						lengthAdjust="spacing"
						style={{ whiteSpace: "pre" }}
					>
						{line.segments.map(({ column, text, type }) => (
							<tspan
								key={column}
								className={type ? `token ${type}` : undefined}
							>
								{text}
							</tspan>
						))}
					</text>
				))}
		</svg>
	);
}

type Segment = { offset: number; text: string; type?: string };

type Line = {
	y: number;
	length: number;
	segments: { column: number; text: string; type?: string }[];
};

const FONT_SIZE = 14;

const CHARACTER_WIDTH = FONT_SIZE * 0.6;

const LINE_HEIGHT = 22;

const PADDING = 28;

/** Flattens Prism's nested tokens; a nested token's own type wins over its parent's. */
function tokenize(code: string, language: string): readonly Segment[] {
	const grammar = Prism.languages[language];
	if (!grammar) return [{ offset: 0, text: code }];
	const flat: { text: string; type?: string }[] = [];
	flatten(Prism.tokenize(code, grammar), undefined, flat);
	let offset = 0;
	return flat.map((part) => {
		const segment = { ...part, offset };
		offset += part.text.length;
		return segment;
	});
}

function flatten(
	stream: Prism.TokenStream,
	type: string | undefined,
	out: { text: string; type?: string }[],
) {
	if (typeof stream === "string") {
		out.push(type ? { text: stream, type } : { text: stream });
	} else if (Array.isArray(stream)) {
		for (const part of stream) flatten(part, type, out);
	} else {
		flatten(stream.content, stream.type, out);
	}
}

function toLines(segments: readonly Segment[]): Line[] {
	const lines: Line[] = [];
	let line = newLine(lines.length);
	lines.push(line);
	for (const { text, type } of segments) {
		text.split("\n").forEach((piece, index) => {
			if (index > 0) {
				line = newLine(lines.length);
				lines.push(line);
			}
			if (piece === "") return;
			line.segments.push(
				type
					? { column: line.length, text: piece, type }
					: { column: line.length, text: piece },
			);
			line.length += piece.length;
		});
	}
	return lines;
}

function newLine(index: number): Line {
	return {
		y: PADDING + index * LINE_HEIGHT + FONT_SIZE,
		length: 0,
		segments: [],
	};
}
