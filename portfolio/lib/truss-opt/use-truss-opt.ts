"use client";

import { useObservable, useSelector } from "@legendapp/state/react";
import { useCallback, useMemo } from "react";
import {
	type TrussOptimizeInput,
	type TrussOptResult,
	useTrussOptMutation,
} from "@/lib/data/truss_opt";
import {
	createTrussMesh,
	isReadyToOptimize,
	type TrussMesh,
	type TrussMeshConfig,
	toggleFixedNode,
	toggleForceNode,
} from "@/lib/truss-opt/engine/mesh";

export type MouseMode = "none" | "fixed" | "force";

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

interface TrussOptState {
	meshConfig: TrussMeshConfig;
	mesh: TrussMesh;
	mouseMode: MouseMode;
	optimizeConfig: TrussOptimizeInput;
	result: TrussOptResult | null;
}

/** Node geometry (mesh shape, supports, loads) stays client-side — it's cheap and needs to
 * redraw on every pointer move. The FEA solve and OC optimization loop are the actual compute,
 * so those go through this site's own API route via useTrussOptMutation, same as the GitHub and
 * Scholar widgets fetch their data through /api/github and /api/scholar. */
export function useTrussOpt() {
	const state$ = useObservable<TrussOptState>(() => ({
		meshConfig: INITIAL_MESH_CONFIG,
		mesh: createTrussMesh(INITIAL_MESH_CONFIG),
		mouseMode: "none",
		optimizeConfig: INITIAL_OPTIMIZE_CONFIG,
		result: null,
	}));

	const meshConfig = useSelector(() => state$.meshConfig.get());
	const mesh = useSelector(() => state$.mesh.get());
	const mouseMode = useSelector(() => state$.mouseMode.get());
	const optimizeConfig = useSelector(() => state$.optimizeConfig.get());
	const result = useSelector(() => state$.result.get());

	const mutation = useTrussOptMutation();

	const canRunFea = isReadyToOptimize(mesh);

	const invalidateResult = useCallback(() => {
		state$.result.set(null);
		mutation.reset();
	}, [mutation, state$]);

	const setMeshConfig = useCallback(
		(config: TrussMeshConfig) => {
			state$.meshConfig.set(config);
			state$.mesh.set(createTrussMesh(config));
			invalidateResult();
		},
		[invalidateResult, state$],
	);

	const setMouseMode = useCallback(
		(mode: MouseMode) => {
			state$.mouseMode.set(mode);
		},
		[state$],
	);

	const setOptimizeConfig = useCallback(
		(config: TrussOptimizeInput) => {
			state$.optimizeConfig.set(config);
		},
		[state$],
	);

	const placeNode = useCallback(
		(x: number, y: number) => {
			const mode = state$.mouseMode.peek();
			if (mode === "none") return;
			state$.mesh.set((current) =>
				mode === "fixed"
					? toggleFixedNode(current, x, y)
					: toggleForceNode(current, x, y),
			);
			invalidateResult();
		},
		[invalidateResult, state$],
	);

	const run = useCallback(
		(optimize?: TrussOptimizeInput) => {
			const currentMesh = state$.mesh.peek();
			const meshInput = {
				...state$.meshConfig.peek(),
				fixedPoints: [...currentMesh.fixedPoints],
				forcePointsX: [...currentMesh.forcePointsX],
				forcePointsY: [...currentMesh.forcePointsY],
			};
			mutation.mutate(
				optimize ? { mesh: meshInput, optimize } : { mesh: meshInput },
				{
					onSuccess: (data) => {
						state$.result.set(data);
					},
				},
			);
		},
		[mutation, state$],
	);

	const simulate = useCallback(() => run(), [run]);
	const optimize = useCallback(
		() => run(state$.optimizeConfig.peek()),
		[run, state$],
	);

	const displayedMesh: TrussMesh = useMemo(
		() => (result ? { ...mesh, normThickness: result.normThickness } : mesh),
		[mesh, result],
	);

	return {
		meshConfig,
		mesh: displayedMesh,
		mouseMode,
		optimizeConfig,
		canRunFea,
		result,
		isPending: mutation.isPending,
		error: mutation.isError ? mutation.error.message : null,
		setMeshConfig,
		setMouseMode,
		setOptimizeConfig,
		placeNode,
		simulate,
		optimize,
		clear: invalidateResult,
	};
}
