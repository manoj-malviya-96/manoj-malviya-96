import {
	assertNever,
	Badge,
	type ColorToken,
	Flex,
	List,
	Text,
} from "@manoj-malviya-96/atom";
import { IconCircleInfo } from "@manoj-malviya-96/atom/icons";
import type { ReactNode } from "react";
import type { ProjectId } from "@/lib/data";
import { IconBadge, Link } from "@/lib/shared";

export function getProjectContent(project: ProjectId): ReactNode {
	switch (project) {
		case "portfolio":
			return <PortfolioContent />;
		case "atom":
			return <AtomContent />;
		case "muviz":
			return <MuvizContent />;
		case "honeycomb":
			return (
				<Text variant="body">
					Give it a shape, get back a honeycomb lattice — skeletonized in C++
					and exported straight to a VTK mesh, ready for your CAD tool. No
					manual triangulation, no format conversion.
				</Text>
			);
		case "topopt_py":
			return (
				<Text variant="body">
					Same 40-year-old topology-optimization algorithm, rewritten to
					actually be fast: the solver's inner loop runs as array operations in
					NumPy instead of nested Python loops —{" "}
					<Badge color="green">2× faster</Badge>, same accuracy, bigger
					problems, still just NumPy.
				</Text>
			);
		case "blackhole":
			return (
				<Text variant="body">
					Simulates real black-hole gravity — a raymarching shader that
					numerically integrates light-ray geodesics per pixel, fast enough to
					rotate live instead of watching a pre-rendered clip.
				</Text>
			);
		case "ev_sim":
			return (
				<Text variant="body">
					Answers one question: how many chargers do you actually need? Change
					the inputs — charger count, power draw — and watch demand, cost, and
					concurrency update immediately.
				</Text>
			);
		case "mesha":
			return (
				<List as="ol" direction="col" gap="xs">
					{statusItem(
						"green",
						"Done",
						"CLI — mesh repair as a standalone command-line tool.",
					)}
					{statusItem(
						"green",
						"Done",
						"Server — same C++/Qt backend, exposed over WebSocket.",
					)}
					{statusItem(
						"green",
						"Done",
						"Editor — Tauri + Next.js shell, wired end to end.",
					)}
					{statusItem(
						"orange",
						"Next",
						"Repair algorithm — the actual mesh-repair logic.",
					)}
				</List>
			);
		case "simphy":
			return (
				<Flex direction="row" gap="xs" vAlign="start">
					<Badge color="orange">In progress</Badge>
					<Text variant="body">
						C++ core scaffolded, no rendering layer committed yet.
					</Text>
				</Flex>
			);
		case "truss_opt":
			return (
				<Text variant="body">
					Place supports and loads on a cantilever lattice and this site's own
					API route solves the FEA and runs an optimality-criteria search to
					redistribute material — the browser only ever draws the answer.
				</Text>
			);
		default:
			return assertNever(project);
	}
}

function AtomContent() {
	return (
		<Text variant="body" muted>
			I've always been picky about how a UI library feels to build with —{" "}
			<Link url="https://atomicdesign.bradfrost.com/chapter-2/">
				atomic design's
			</Link>{" "}
			idea of composing everything from one small primitive stuck with me, and
			so did Apple's discipline: constrained, simple, obviously right.
			<TwoLineBreak />
			Every real-world design system I reached for was one extreme or the other
			- a bloated component set, or untyped CSS that fights you the moment the
			app grows.
			<TwoLineBreak />
			<strong>Atom</strong> is my attempt at both at once. Core idea is to use
			CSS as much as possible, enforce type safety. Currently its under{" "}
			<Badge color="green">20KB</Badge> - at least 1/5th of industry standard
			with type safety and performance built in at cost of constrained design
			system.
			<TwoLineBreak />
			<IconBadge colsor="blue">
				<IconCircleInfo />
				This website is built using atom@latest
			</IconBadge>
		</Text>
	);
}

function MuvizContent() {
	return (
		<Text variant="body" muted>
			I've been obsessed with music visualizers since the Winamp days — there's
			something satisfying about watching visuals snap to the beat. That's why
			I'm building Muviz: a web visualizer that stays fast without skimping on
			features.
			<TwoLineBreak />A C++ pipeline (FFT, onset detection, rhythm/brightness
			features) compiles to WebAssembly and runs once per track, off the main
			thread in a Web Worker.
			<TwoLineBreak />
			Results cache in IndexedDB by content hash, so re-adding a track skips
			analysis entirely.
			<TwoLineBreak />
			The three.js scene is a pure function of (features, playback time) —
			scrubbing or replaying a track just resamples it, no re-analysis.
		</Text>
	);
}

function PortfolioContent() {
	return (
		<Flex direction="col" gap="sm">
			<Text variant="body">
				Every project I've built, in one catalog — searchable by title, tags, or
				description as you type. Fuse.js runs client-side, so there's no server
				round trip.
			</Text>
		</Flex>
	);
}

function statusItem(
	color: ColorToken,
	status: string,
	body: ReactNode,
): ReactNode {
	return (
		<Flex as="li" direction="row" gap="xs" vAlign="start">
			<Badge color={color}>{status}</Badge>
			<Text variant="body">{body}</Text>
		</Flex>
	);
}

function TwoLineBreak() {
	return (
		<>
			<br /> <br />
		</>
	);
}
