import { batch, observable } from "@legendapp/state";
import type { TrussOptimizeInput, TrussOptResult } from "@/lib/data/truss_opt";
import {
	createTrussMesh,
	type TrussMesh,
	type TrussMeshConfig,
	toggleFixedNode,
	toggleForceNode,
} from "@/lib/truss-opt/engine/mesh";

export type RunState =
	| { type: "idle" }
	| { type: "choosing_fix" }
	| { type: "choosing_force" }
	| { type: "optimizing" }
	| { type: "simulating" }
	| { type: "simulated"; result: TrussOptResult }
	| { type: "optimized"; result: TrussOptResult }
	| { type: "error"; message: string };

const IDLE: RunState = { type: "idle" };

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
	optimizeConfig: TrussOptimizeInput;
	run: RunState;
}

function initialState(): TrussOptState {
	return {
		meshConfig: INITIAL_MESH_CONFIG,
		mesh: createTrussMesh(INITIAL_MESH_CONFIG),
		optimizeConfig: INITIAL_OPTIMIZE_CONFIG,
		run: IDLE,
	};
}

/** The result carried by the current run, if any — "simulated" and "optimized" are the only
 * variants that hold one, so callers read through this instead of branching on run.type. */
export function resultOf(run: RunState): TrussOptResult | null {
	return run.type === "simulated" || run.type === "optimized"
		? run.result
		: null;
}

export const trussOptState$ = observable<TrussOptState>(initialState());

export function resetTrussOptState(): void {
	trussOptState$.set(initialState());
}

export function setMeshConfig(config: TrussMeshConfig): void {
	batch(() => {
		trussOptState$.run.set(IDLE);
		trussOptState$.meshConfig.set(config);
		trussOptState$.mesh.set(createTrussMesh(config));
	});
}

export type EditMode = "idle" | "choosing_fix" | "choosing_force";

export function setEditMode(mode: EditMode): void {
	trussOptState$.run.set({ type: mode });
}

export function setOptimizeConfig(config: TrussOptimizeInput): void {
	trussOptState$.optimizeConfig.set(config);
}

export function placeNode(x: number, y: number): void {
	const run = trussOptState$.run.peek();
	if (run.type !== "choosing_fix" && run.type !== "choosing_force") return;
	trussOptState$.mesh.set((current) =>
		run.type === "choosing_fix"
			? toggleFixedNode(current, x, y)
			: toggleForceNode(current, x, y),
	);
}

export function clearResult(): void {
	trussOptState$.run.set(IDLE);
}

export function runStarted(kind: "simulate" | "optimize"): void {
	trussOptState$.run.set({
		type: kind === "simulate" ? "simulating" : "optimizing",
	});
}

export function isPendingRun(run: RunState): boolean {
	return run.type === "optimizing" || run.type === "simulating";
}

export function isEditingRun(run: RunState): boolean {
	return run.type === "choosing_fix" || run.type === "choosing_force";
}

export function runSucceeded(
	kind: "simulate" | "optimize",
	result: TrussOptResult,
): void {
	trussOptState$.run.set({
		type: kind === "simulate" ? "simulated" : "optimized",
		result,
	});
}

export function runFailed(message: string): void {
	trussOptState$.run.set({ type: "error", message });
}
