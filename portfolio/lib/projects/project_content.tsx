import {
	assertNever,
	Badge,
	Code,
	type ColorToken,
	Flex,
	List,
	Text,
} from "@manoj-malviya-96/atom";
import { BarChart } from "@manoj-malviya-96/atom/charts";
import type { ReactNode } from "react";
import type { ProjectId } from "@/lib/data";

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
		<Flex direction="col" gap="sm">
			<Text variant="body">I made a ver</Text>
			<List as="ul" direction="col" gap="xs">
				{statusItem(
					"blue",
					"210",
					"browser tests, run in real Chromium — not jsdom.",
				)}
				{statusItem(
					"blue",
					"111",
					"components, all composed from that one primitive.",
				)}
			</List>
			<Text variant="caption" muted>
				Size budget, enforced by CI on every build:
			</Text>
			<BarChart
				categories={["Core", "Charts", "CSS"]}
				series={[{ label: "Budget (KB)", data: [20, 10.5, 10] }]}
			/>
		</Flex>
	);
}

function MuvizContent() {
	return (
		<Flex direction="col" gap="sm">
			<Text variant="body" muted>
				I’ve been obsessed with music visualizers since the Winamp days—there’s
				just something ridiculously satisfying about watching visuals snap to
				the beat. That itch is exactly why I’m building Muviz: a web visualizer
				that stays fast without skimping on features.
			</Text>
			<List direction="col" gap="xs">
				<li>
					<Text variant="body" muted>
						A C++ feature extractor, compiled to WebAssembly, runs the spectral
						analysis once and caches it.
					</Text>
				</li>
				<li>
					<Text variant="body" muted>
						Three.js renders every frame off that cache — no audio math on the
						main thread.
					</Text>
				</li>
			</List>
		</Flex>
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
