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
	result: TrussOptResult | null;
	run: RunState;
}

function initialState(): TrussOptState {
	return {
		meshConfig: INITIAL_MESH_CONFIG,
		mesh: createTrussMesh(INITIAL_MESH_CONFIG),
		optimizeConfig: INITIAL_OPTIMIZE_CONFIG,
		result: null,
		run: IDLE,
	};
}

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
	batch(() => {
		trussOptState$.result.set(null);
		trussOptState$.mesh.set((current) =>
			run.type === "choosing_fix"
				? toggleFixedNode(current, x, y)
				: toggleForceNode(current, x, y),
		);
	});
}

export function clearResult(): void {
	trussOptState$.result.set(null);
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

export function runSucceeded(result: TrussOptResult): void {
	batch(() => {
		trussOptState$.result.set(result);
		trussOptState$.run.set(IDLE);
	});
}

export function runFailed(message: string): void {
	trussOptState$.run.set({ type: "error", message });
}
