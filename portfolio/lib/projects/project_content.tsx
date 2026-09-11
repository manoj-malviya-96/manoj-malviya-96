import {
	assertNever,
	Badge,
	type ColorToken,
	Flex,
	List,
	Text,
} from "@manoj-malviya-96/atom";
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
			return (
				<Flex direction="col" gap="sm">
					<Text variant="body">
						Every project I've built, in one catalog — searchable by title,
						tags, or description as you type. Fuse.js runs client-side, so
						there's no server round trip.
					</Text>
				</Flex>
			);
		case "atom":
			return (
				<Flex direction="col" gap="sm">
					<Text variant="body">
						I wanted Apple-grade design discipline: one visual language,
						everywhere. Every option out there made me choose, a JS-in-JS
						styling library dragging its own runtime, or CSS that throws out
						type safety. I got tired of choosing, so I built Atom: one
						primitive, one stylesheet, and a type system that actually checks
						it.
					</Text>
					<List direction="col" gap="md">
						<li>
							<Text variant="body">
								Styling and motion live in CSS, never JS-in-JS, so nothing pays
								a runtime cost.
							</Text>
						</li>
						<li>
							<Text variant="body">
								Types generate straight from that CSS, so an illegal token can't
								compile. Scripts catch what the type system can't.
							</Text>
						</li>
						<li>
							<Text variant="body">
								20 KB gzipped for the core. Charts and system components ship
								separately, each under its own budget.
							</Text>
						</li>
					</List>
				</Flex>
			);
		case "muviz":
			return (
				<Flex direction="col" gap="sm">
					<Text variant="body" muted>
						I grew up watching Winamp react to whatever was playing, and I never
						stopped wanting that feeling back. So I’m building the real thing
						myself: no AI, no faking it, just DSP that actually understands the
						music.
					</Text>
					<List direction="col" gap="xs">
						<li>
							<Text variant="body" muted>
								A C++ pipeline (FFT, onset detection, key and rhythm extraction)
								compiles to WebAssembly and analyzes a track once, in a Web
								Worker, off the main thread.
							</Text>
						</li>
						<li>
							<Text variant="body" muted>
								Every analyzed track is cached in IndexedDB by content hash, so
								replaying it or re-adding the file skips analysis entirely.
							</Text>
						</li>
						<li>
							<Text variant="body" muted>
								The Three.js scene never touches audio directly. It’s just a
								pure function of the extracted features and playback time, so
								scrubbing and switching tracks come for free.
							</Text>
						</li>
					</List>
				</Flex>
			);
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
