import { batch, observable } from "@legendapp/state";
import type { TrussOptimizeInput, TrussOptResult } from "@/lib/data/truss_opt";
import {
	createTrussMesh,
	type TrussMesh,
	type TrussMeshConfig,
	toggleFixedNode,
	toggleForceNode,
} from "@/lib/truss-opt/engine/mesh";

export type MouseMode = "none" | "fixed" | "force";

/** idle/pending/error are mutually exclusive by construction — "pending with a stale error
 * still attached" was a real bug (runStarted used to only flip isPending, leaving the last
 * error's message on screen for the whole new run). */
export type RunStatus =
	| { type: "idle" }
	| { type: "pending" }
	| { type: "error"; message: string };

const IDLE: RunStatus = { type: "idle" };
const PENDING: RunStatus = { type: "pending" };

const INITIAL_MESH_CONFIG: TrussMeshConfig = {
	cellSize_mm: 10,
	meshWidth_mm: 60,
	meshHeight_mm: 20,
	latticeType: "cross",
};

const INITIAL_OPTIMIZE_CONFIG: TrussOptimizeInput = {
	numIterations: 100,
	targetFraction: 0.3,
};

export interface TrussOptState {
	meshConfig: TrussMeshConfig;
	mesh: TrussMesh;
	mouseMode: MouseMode;
	optimizeConfig: TrussOptimizeInput;
	result: TrussOptResult | null;
	run: RunStatus;
}

function initialState(): TrussOptState {
	return {
		meshConfig: INITIAL_MESH_CONFIG,
		mesh: createTrussMesh(INITIAL_MESH_CONFIG),
		mouseMode: "none",
		optimizeConfig: INITIAL_OPTIMIZE_CONFIG,
		result: null,
		run: IDLE,
	};
}

/** Feature-scoped store: the demo page mounts exactly one instance of this view tree, so a
 * module singleton — read directly by each view via useSelector — replaces the prop chain a
 * React-owned observable would otherwise force through every component in between. Reset on
 * page mount (see page.tsx) since the module itself outlives client-side navigation. */
export const trussOptState$ = observable<TrussOptState>(initialState());

export function resetTrussOptState(): void {
	trussOptState$.set(initialState());
}

export function setMeshConfig(config: TrussMeshConfig): void {
	batch(() => {
		trussOptState$.result.set(null);
		trussOptState$.run.set(IDLE);
		trussOptState$.meshConfig.set(config);
		trussOptState$.mesh.set(createTrussMesh(config));
	});
}

export function setMouseMode(mode: MouseMode): void {
	trussOptState$.mouseMode.set(mode);
}

export function setOptimizeConfig(config: TrussOptimizeInput): void {
	trussOptState$.optimizeConfig.set(config);
}

export function placeNode(x: number, y: number): void {
	const mode = trussOptState$.mouseMode.peek();
	if (mode === "none") return;
	batch(() => {
		trussOptState$.result.set(null);
		trussOptState$.run.set(IDLE);
		trussOptState$.mesh.set((current) =>
			mode === "fixed"
				? toggleFixedNode(current, x, y)
				: toggleForceNode(current, x, y),
		);
	});
}

export function clearResult(): void {
	trussOptState$.result.set(null);
	trussOptState$.run.set(IDLE);
}

export function runStarted(): void {
	trussOptState$.run.set(PENDING);
}

export function runSucceeded(result: TrussOptResult): void {
	batch(() => {
		trussOptState$.result.set(result);
		trussOptState$.run.set(IDLE);
	});
}

export function runFailed(message: string): void {
	trussOptState$.run.set({ type: "error", message });
}
