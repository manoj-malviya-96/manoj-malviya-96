/**
 * Keeps every TS/JS file in one shape, in two passes:
 *
 * 1. Comments: every comment is a doc comment. A `//` run becomes one
 *    `/** *\/` block, a lone `//` or trailing `//` becomes an inline
 *    `/** … *\/`, and `/* *\/` gains its second star. Tool pragmas
 *    (`biome-ignore`, `@ts-…`, `/// <reference>`, `#__PURE__`) are left alone.
 * 2. Order: after the imports, exported before internal, and within each
 *    level functions > types > variables. `const f = () => …` is a function.
 *    Top-level statements go after declarations and `export {…}` lists last.
 *
 * Reordering never breaks load order: a declaration whose initializer reads a
 * `const`/`let`/`class`/`enum` at module-evaluation time (directly, or through a
 * function it calls) stays below it, so a rank is broken before a TDZ is hit.
 *
 * `--write` rewrites files; without it the script lists offenders and exits 1.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { parseSync } from "oxc-parser";

function main(): void {
	const write = process.argv.includes("--write");
	const dirty: string[] = [];
	const files = sourceFiles();
	for (const path of files) {
		const source = readFileSync(path, "utf8");
		const next = orderDeclarations(path, fixComments(path, source));
		if (next === source) continue;
		dirty.push(path);
		if (write) writeFileSync(path, next);
	}
	if (dirty.length === 0) {
		console.log(`file-sanitizer: ${files.length} files in shape`);
		return;
	}
	if (write) {
		console.log(`file-sanitizer: rewrote ${dirty.length} file(s)`);
		return;
	}
	console.error(
		`file-sanitizer: ${dirty.length} file(s) out of shape (run pnpm lint:fix):`,
	);
	for (const path of dirty) console.error(`  ${path}`);
	process.exitCode = 1;
}

function sourceFiles(): string[] {
	const listed = execFileSync(
		"git",
		["ls-files", "--cached", "--others", "--exclude-standard", ...ROOTS],
		{ encoding: "utf8" },
	);
	return listed
		.split("\n")
		.filter((path) => EXTENSION.test(path))
		.filter((path) => !IGNORED.some((pattern) => pattern.test(path)));
}

function parse(path: string, source: string): ParseResult {
	const result = parseSync(path, source);
	const [error] = result.errors;
	if (error) throw new Error(`${path}: ${error.message}`);
	return result as unknown as ParseResult;
}

function fixComments(path: string, source: string): string {
	const edits: TextEdit[] = [];
	const runs: Comment[][] = [];
	let previous: Comment | undefined;
	for (const comment of parse(path, source).comments) {
		const pragma = isPragma(comment.value) || comment.value.includes("*/");
		if (comment.type === "Block") {
			if (!pragma && !comment.value.startsWith("*") && comment.value !== "") {
				edits.push({
					start: comment.start + 1,
					end: comment.start + 1,
					text: "*",
				});
			}
			previous = undefined;
			continue;
		}
		if (pragma) {
			previous = undefined;
			continue;
		}
		if (!isOwnLine(source, comment)) {
			edits.push({ ...comment, text: `/** ${comment.value.trim()} */` });
			previous = undefined;
			continue;
		}
		const run = runs.at(-1);
		if (previous && run && follows(source, previous, comment))
			run.push(comment);
		else runs.push([comment]);
		previous = comment;
	}
	for (const run of runs) edits.push(docBlock(source, run));
	return applyEdits(source, edits);
}

function isPragma(value: string): boolean {
	return PRAGMA.test(value.trimStart());
}

function isOwnLine(source: string, comment: Comment): boolean {
	return (
		source.slice(lineStart(source, comment.start), comment.start).trim() === ""
	);
}

function lineStart(source: string, offset: number): number {
	return source.lastIndexOf("\n", offset - 1) + 1;
}

/** `next` sits on the line right below `previous`, at the same indent. */
function follows(source: string, previous: Comment, next: Comment): boolean {
	const gap = source.slice(previous.end, next.start);
	const indent = source.slice(
		lineStart(source, previous.start),
		previous.start,
	);
	return gap.replace(/^\r?\n/, "") === indent;
}

function docBlock(source: string, run: Comment[]): TextEdit {
	const first = run[0] as Comment;
	const last = run.at(-1) as Comment;
	const indent = source.slice(lineStart(source, first.start), first.start);
	const lines = run.map((comment) => comment.value.replace(/^ /, "").trimEnd());
	while (lines[0] === "") lines.shift();
	while (lines.at(-1) === "") lines.pop();
	const edit = { start: first.start, end: last.end };
	if (lines.length === 0) return { ...edit, text: "/** */" };
	if (lines.length === 1)
		return { ...edit, text: `/** ${lines[0]?.trim()} */` };
	const body = lines.map(
		(line) => `${indent} *${line === "" ? "" : ` ${line}`}`,
	);
	return { ...edit, text: ["/**", ...body, `${indent} */`].join("\n") };
}

function applyEdits(source: string, edits: TextEdit[]): string {
	let out = source;
	for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
		out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
	}
	return out;
}

function orderDeclarations(path: string, source: string): string {
	const { program, comments } = parse(path, source);
	const body = program.body;
	const preludeEnd = body.filter(isPrelude).length;
	if (body.slice(0, preludeEnd).some((node) => !isPrelude(node))) return source;
	const statements = body.slice(preludeEnd);
	if (statements.length < 2) return source;

	const boundary = (node: Node): number =>
		extendThroughComments(source, comments, node.end);
	const prelude = body[preludeEnd - 1];
	const head = source.slice(0, prelude ? boundary(prelude) : 0);
	const chunks: string[] = [];
	let cursor = head.length;
	for (const node of statements) {
		chunks.push(source.slice(cursor, boundary(node)));
		cursor = boundary(node);
	}

	const entries = statements.map(classify);
	const listed = new Set(entries.flatMap((entry) => entry.listed));
	for (const entry of entries) {
		if (entry.names.some((name) => listed.has(name))) entry.rank %= 3;
	}
	const order = sortEntries(entries);
	if (!order) {
		console.warn(`file-sanitizer: ${path}: load-order cycle, left unordered`);
		return source;
	}
	if (order.every((entry, index) => entry.index === index)) return source;

	const parts = order.map((entry, position) => {
		const chunk = chunks[entry.index] as string;
		const content = chunk.trimStart();
		const lead = chunk.slice(0, chunk.length - content.length);
		if (position === 0 && head === "") return content;
		return (lead.includes("\n") ? lead : "\n\n") + content;
	});
	return head + parts.join("") + source.slice(cursor);
}

function isPrelude(node: Node): boolean {
	if (
		node.type === "ImportDeclaration" ||
		node.type === "TSImportEqualsDeclaration"
	) {
		return true;
	}
	if (node.type === "ExportAllDeclaration") return true;
	if (node.type === "ExportNamedDeclaration") return node.source != null;
	return (
		node.type === "ExpressionStatement" && typeof node.directive === "string"
	);
}

/** Pulls a statement's end past comments trailing it on the same line. */
function extendThroughComments(
	source: string,
	comments: Comment[],
	end: number,
): number {
	let out = end;
	for (const comment of comments) {
		if (comment.start < out) continue;
		if (!/^[ \t]*$/.test(source.slice(out, comment.start))) break;
		out = comment.end;
	}
	return out;
}

function classify(node: Node, index: number): Entry {
	const exported =
		node.type === "ExportDefaultDeclaration" ||
		(node.type === "ExportNamedDeclaration" && node.declaration != null);
	const declaration = exported ? (node.declaration as Node) : node;
	const kind = kindOf(declaration);
	const refs: Refs = {
		eager: new Set(),
		calls: new Set(),
		all: new Set(),
		allCalls: new Set(),
		types: new Set(),
	};
	visit(declaration, true, refs);
	const listed =
		node.type === "ExportNamedDeclaration" && !node.declaration
			? (node.specifiers as Node[]).map(
					(specifier) => (specifier.local as Node).name as string,
				)
			: [];
	return {
		index,
		rank:
			kind === "statement"
				? 6
				: kind === "list"
					? 7
					: (exported ? 0 : 3) + KIND_RANK[kind],
		isDefault: node.type === "ExportDefaultDeclaration",
		names: boundNames(declaration),
		listed,
		refs,
		ambient:
			declaration.type === "VariableDeclaration" &&
			declaration.declare === true,
		tdz: kind !== "type" && declaration.type !== "FunctionDeclaration",
		effectful:
			kind === "statement" ||
			(kind === "variable" && declaration.type !== "TSEnumDeclaration") ||
			declaration.type === "ClassDeclaration",
	};
}

function kindOf(node: Node): Kind {
	switch (node.type) {
		case "FunctionDeclaration":
		case "TSDeclareFunction":
		case "ClassDeclaration":
		case "FunctionExpression":
		case "ArrowFunctionExpression":
			return "function";
		case "TSTypeAliasDeclaration":
		case "TSInterfaceDeclaration":
		case "TSModuleDeclaration":
			return "type";
		case "TSEnumDeclaration":
			return node.declare ? "type" : "variable";
		case "VariableDeclaration": {
			if (node.declare) return "type";
			const declarators = node.declarations as Node[];
			return declarators.every((item) =>
				FUNCTIONS.has((item.init as Node | null)?.type ?? ""),
			)
				? "function"
				: "variable";
		}
		case "ExportNamedDeclaration":
			return "list";
		default:
			return node.type.endsWith("Expression") || node.type === "Identifier"
				? "variable"
				: "statement";
	}
}

function boundNames(node: Node): string[] {
	if (node.type === "VariableDeclaration") {
		return (node.declarations as Node[]).flatMap((item) =>
			patternNames(item.id as Node),
		);
	}
	const id = node.id as Node | null | undefined;
	return id?.type === "Identifier" ? [id.name as string] : [];
}

function patternNames(node: Node | null): string[] {
	if (!node) return [];
	switch (node.type) {
		case "Identifier":
			return [node.name as string];
		case "ObjectPattern":
			return (node.properties as Node[]).flatMap((item) =>
				patternNames(
					(item.type === "RestElement" ? item.argument : item.value) as Node,
				),
			);
		case "ArrayPattern":
			return (node.elements as (Node | null)[]).flatMap(patternNames);
		case "RestElement":
			return patternNames(node.argument as Node);
		case "AssignmentPattern":
			return patternNames(node.left as Node);
		default:
			return [];
	}
}

/**
 * Collects identifiers a node reads, split by whether they are read while the
 * module evaluates (`eager`) or only later from inside a function body.
 */
function visit(value: unknown, eager: boolean, refs: Refs): void {
	if (Array.isArray(value)) {
		for (const item of value) visit(item, eager, refs);
		return;
	}
	if (!value || typeof value !== "object") return;
	const node = value as Node;
	if (typeof node.type !== "string") return;
	const type = node.type;
	if (type === "Identifier" || type === "JSXIdentifier") {
		refs.all.add(node.name as string);
		if (eager) refs.eager.add(node.name as string);
		return;
	}
	if (type.startsWith("TS") && !RUNTIME_TS.has(type)) {
		collectNames(node, refs.types);
		return;
	}
	if (FUNCTIONS.has(type)) {
		visitChildren(node, false, refs);
		return;
	}
	if (
		type === "CallExpression" ||
		type === "NewExpression" ||
		type === "TaggedTemplateExpression"
	) {
		const callee = (node.callee ?? node.tag) as Node;
		if (callee.type === "Identifier") {
			refs.allCalls.add(callee.name as string);
			if (eager) refs.calls.add(callee.name as string);
		}
		if (FUNCTIONS.has(callee.type)) visitChildren(callee, eager, refs);
		else visit(callee, eager, refs);
		visit(node.arguments ?? node.quasi, eager, refs);
		return;
	}
	if (type === "MemberExpression" || type === "JSXMemberExpression") {
		visit(node.object, eager, refs);
		if (node.computed) visit(node.property, eager, refs);
		return;
	}
	if (type === "JSXAttribute") {
		visit(node.value, eager, refs);
		return;
	}
	if (type === "ClassBody") {
		for (const member of node.body as Node[]) {
			const runsNow =
				member.type === "StaticBlock" ||
				(member.static === true && member.type === "PropertyDefinition");
			if (member.computed) visit(member.key, eager, refs);
			visit(member.decorators, eager, refs);
			visit(
				member.type === "StaticBlock" ? member.body : member.value,
				eager && runsNow,
				refs,
			);
		}
		return;
	}
	if (MEMBER_KEYED.has(type) && !node.computed) {
		visit(node.value, eager, refs);
		return;
	}
	visitChildren(node, eager, refs);
}

function visitChildren(node: Node, eager: boolean, refs: Refs): void {
	for (const [key, child] of Object.entries(node)) {
		if (TYPE_KEYS.has(key)) collectNames(child, refs.types);
		else if (!SKIPPED_KEYS.has(key)) visit(child, eager, refs);
	}
}

/** Every identifier under a type position, e.g. `unique symbol` brands in computed keys. */
function collectNames(value: unknown, out: Set<string>): void {
	if (Array.isArray(value)) {
		for (const item of value) collectNames(item, out);
		return;
	}
	if (!value || typeof value !== "object") return;
	const node = value as Node;
	if (node.type === "Identifier") out.add(node.name as string);
	for (const child of Object.values(node)) {
		if (typeof child === "object") collectNames(child, out);
	}
}

/**
 * Stable topological sort: always emits the lowest-ranked entry whose load-order
 * dependencies are already out. Returns `undefined` on a cycle.
 */
function sortEntries(entries: Entry[]): Entry[] | undefined {
	const owners = new Map<string, Entry>();
	for (const entry of entries)
		for (const name of entry.names) owners.set(name, entry);
	const before = new Map<Entry, Set<Entry>>(
		entries.map((entry) => [entry, new Set()]),
	);
	for (const entry of entries) {
		for (const name of loadTimeReads(entry, owners)) {
			const owner = owners.get(name);
			if (owner && owner !== entry && owner.tdz) before.get(entry)?.add(owner);
		}
		for (const name of entry.refs.types) {
			const owner = owners.get(name);
			if (owner && owner !== entry && owner.ambient)
				before.get(entry)?.add(owner);
		}
		if (entry.rank !== 6) continue;
		for (const other of entries) {
			if (other === entry || !other.effectful) continue;
			if (other.index < entry.index) before.get(entry)?.add(other);
			else before.get(other)?.add(entry);
		}
	}
	const out: Entry[] = [];
	const pending = new Set(entries);
	while (pending.size > 0) {
		const ready = [...pending].filter((entry) =>
			[...(before.get(entry) ?? [])].every(
				(dependency) => !pending.has(dependency),
			),
		);
		const next = ready.sort(compareEntries)[0];
		if (!next) return undefined;
		out.push(next);
		pending.delete(next);
	}
	return out;
}

/** Eager reads plus everything reachable through functions called eagerly. */
function loadTimeReads(entry: Entry, owners: Map<string, Entry>): Set<string> {
	const reads = new Set(entry.refs.eager);
	const queue = [...entry.refs.calls];
	const seen = new Set<string>();
	for (let name = queue.pop(); name !== undefined; name = queue.pop()) {
		if (seen.has(name)) continue;
		seen.add(name);
		const callee = owners.get(name);
		if (!callee || callee === entry) continue;
		for (const read of callee.refs.all) reads.add(read);
		queue.push(...callee.refs.allCalls);
	}
	return reads;
}

function compareEntries(a: Entry, b: Entry): number {
	return (
		a.rank - b.rank ||
		Number(b.isDefault) - Number(a.isDefault) ||
		a.index - b.index
	);
}

type Node = {
	type: string;
	start: number;
	end: number;
	[key: string]: unknown;
};

type Comment = {
	type: "Line" | "Block";
	value: string;
	start: number;
	end: number;
};

type ParseResult = { program: { body: Node[] }; comments: Comment[] };

type TextEdit = { start: number; end: number; text: string };

type Kind = "function" | "type" | "variable" | "statement" | "list";

type Refs = {
	eager: Set<string>;
	calls: Set<string>;
	all: Set<string>;
	allCalls: Set<string>;
	/** Names read from type positions; only ambient `declare const`s care. */
	types: Set<string>;
};

type Entry = {
	index: number;
	rank: number;
	isDefault: boolean;
	names: string[];
	listed: string[];
	refs: Refs;
	/** `declare const`: no runtime cost, but Biome wants it above its type-level readers. */
	ambient: boolean;
	/** Reading it before its declaration runs throws or yields `undefined`. */
	tdz: boolean;
	/** Evaluating it can have side effects, so statements keep their order around it. */
	effectful: boolean;
};

const ROOTS = ["src", "scripts", "site"];

const EXTENSION = /\.(ts|tsx|mts|js|jsx|mjs)$/;

const IGNORED = [/\.module\.css\.d\.ts$/, /^src\/icons\.tsx$/];

const PRAGMA =
	/^(biome-ignore|@|#|\/|eslint|prettier-ignore|c8 |istanbul |webpackChunkName)/;

const KIND_RANK = { function: 0, type: 1, variable: 2 } as const;

const FUNCTIONS = new Set([
	"FunctionDeclaration",
	"FunctionExpression",
	"ArrowFunctionExpression",
]);

const RUNTIME_TS = new Set([
	"TSAsExpression",
	"TSSatisfiesExpression",
	"TSNonNullExpression",
	"TSInstantiationExpression",
	"TSTypeAssertion",
	"TSEnumDeclaration",
	"TSEnumBody",
	"TSEnumMember",
	"TSExportAssignment",
	"TSParameterProperty",
]);

const MEMBER_KEYED = new Set([
	"Property",
	"MethodDefinition",
	"PropertyDefinition",
	"AccessorProperty",
]);

const TYPE_KEYS = new Set([
	"typeAnnotation",
	"returnType",
	"typeParameters",
	"typeArguments",
	"superTypeArguments",
	"superTypeParameters",
	"implements",
]);

const SKIPPED_KEYS = new Set(["type", "start", "end", "range", "loc"]);

main();
