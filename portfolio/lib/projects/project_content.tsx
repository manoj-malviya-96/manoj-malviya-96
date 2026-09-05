import {
	assertNever,
	Flex,
	Stat,
	Text,
	Timeline,
} from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";
import type { ProjectId } from "@/lib/data";

export function getProjectContent(project: ProjectId): ReactNode {
	switch (project) {
		case "portfolio":
			return (
				<Timeline
					events={[
						{
							key: "why",
							label: "Why",
							color: "blue",
							children:
								"A resume and a pile of scattered repos don't show how something actually works, or feels to use.",
						},
						{
							key: "how",
							label: "How",
							color: "indigo",
							children:
								"Next.js App Router with server components, Fuse.js-powered fuzzy search over the project catalog, and atom — a CSS-first design system I built from scratch — for every pixel.",
						},
						{
							key: "what",
							label: "What",
							color: "green",
							children:
								"A living catalog of my projects — fast, searchable, and self-describing.",
						},
					]}
				/>
			);
		case "atom":
			return (
				<Flex direction="col" gap="md">
					<Timeline
						events={[
							{
								key: "why",
								label: "Why",
								color: "blue",
								children:
									"Every side project needed its own UI kit — mismatched buttons and spacing, or a generic component library fighting the app instead of fitting it.",
							},
							{
								key: "how",
								label: "How",
								color: "indigo",
								children:
									"Styling and motion live in CSS, not JavaScript, so screens stay instant. A small, fixed set of parts — a component ships only when more than one real app needs it.",
							},
							{
								key: "what",
								label: "What",
								color: "green",
								children:
									"The design system running this site, its project catalog, and everything else I ship — published on GitHub Packages.",
							},
						]}
					/>
					<Stat
						label="Enforced in CI"
						value="Real-browser tests + size budget"
						footer="Every PR, on every component"
					/>
				</Flex>
			);
		case "muviz":
			return (
				<Timeline
					events={[
						{
							key: "why",
							label: "Why",
							color: "blue",
							children:
								"Winamp-era visualizers were mesmerizing, but nothing on the web today renders anything close to it without dropping frames.",
						},
						{
							key: "how",
							label: "How",
							color: "indigo",
							children:
								"A C++ feature extractor compiled to WebAssembly runs a full spectral-analysis pass over the track once and caches the result, so the Three.js frontend never does audio math — it only renders.",
						},
						{
							key: "what",
							label: "What",
							color: "green",
							children:
								"A fast, reactive 3D visualizer that handles complex effects without breaking a sweat.",
						},
					]}
				/>
			);
		case "honeycomb":
			return (
				<Timeline
					events={[
						{
							key: "why",
							label: "Why",
							color: "blue",
							children:
								"Honeycomb lattices are a go-to structure in engineering, but tooling to generate them is scarce.",
						},
						{
							key: "how",
							label: "How",
							color: "indigo",
							children:
								"A memory-efficient skeletonization algorithm builds the lattice topology in C++, then exports directly to a VTK mesh — no manual triangulation, no format-conversion step.",
						},
						{
							key: "what",
							label: "What",
							color: "green",
							children:
								"Open-source constructor and visualizer, ready for CAD workflows.",
						},
					]}
				/>
			);
		case "topopt_py":
			return (
				<Flex direction="col" gap="md">
					<Text variant="body">
						Classic topology-optimization research code was too slow to be
						useful beyond a demo. Vectorized the solver's inner loop — sparse
						assembly and filtering as array operations in NumPy instead of
						nested Python loops — without dropping to C++.
					</Text>
					<Stat
						label="Runtime"
						value="2×"
						trend="faster"
						footer="Scales to more elements, without leaving Python"
					/>
				</Flex>
			);
		case "blackhole":
			return (
				<Timeline
					events={[
						{
							key: "why",
							label: "Why",
							color: "blue",
							children:
								"Gravitational lensing is usually only shown offline, in pre-rendered clips.",
						},
						{
							key: "how",
							label: "How",
							color: "indigo",
							children:
								"Hand-rolled a raymarching shader in raw OpenGL that numerically integrates light-ray geodesics per pixel, tuned to hold frame budget at interactive rates.",
						},
						{
							key: "what",
							label: "What",
							color: "green",
							children:
								"Interactive simulation you can orbit and pull apart yourself.",
						},
					]}
				/>
			);
		case "ev_sim":
			return (
				<Flex direction="col" gap="md">
					<Text variant="body">
						Sizing an EV charging lot is a probability problem, not a guess —
						too few chargers and drivers queue, too many and the capex is
						wasted.
					</Text>
					<Stat
						label="Model"
						value="Poisson-process arrivals"
						footer="Energy consumed, peak power, and concurrency factor tracked per interval"
					/>
				</Flex>
			);
		case "mesha":
			return (
				<Timeline
					events={[
						{
							key: "cli",
							label: "CLI",
							color: "green",
							children:
								"Mesh repair exposed as a standalone command-line tool.",
						},
						{
							key: "server",
							label: "Server",
							color: "green",
							children:
								"Same C++/Qt backend, exposed over WebSocket for the editor to call.",
						},
						{
							key: "editor",
							label: "Editor",
							color: "green",
							children:
								"Tauri + Next.js shell, wired end to end to the server.",
						},
						{
							key: "repair",
							label: "Repair algorithm",
							color: "orange",
							children: "Next milestone: the actual mesh-repair logic.",
						},
					]}
				/>
			);
		case "simphy":
			return (
				<Stat
					label="Status"
					value="Early days"
					footer="C++ core scaffolded — n-body gravity and particle systems, no rendering layer committed yet"
				/>
			);
		default:
			return assertNever(project);
	}
}
