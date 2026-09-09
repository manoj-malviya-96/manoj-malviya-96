"use client";

import { useCallback, useMemo, useState } from "react";
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

/** Node geometry (mesh shape, supports, loads) stays client-side — it's cheap and needs to
 * redraw on every pointer move. The FEA solve and OC optimization loop are the actual compute,
 * so those go through this site's own API route via useTrussOptMutation, same as the GitHub and
 * Scholar widgets fetch their data through /api/github and /api/scholar. */
export function useTrussOpt() {
	const [meshConfig, setMeshConfigState] = useState(INITIAL_MESH_CONFIG);
	const [mesh, setMesh] = useState<TrussMesh>(() =>
		createTrussMesh(INITIAL_MESH_CONFIG),
	);
	const [mouseMode, setMouseMode] = useState<MouseMode>("none");
	const [optimizeConfig, setOptimizeConfig] = useState(INITIAL_OPTIMIZE_CONFIG);
	const [result, setResult] = useState<TrussOptResult | null>(null);
	const [isOptimized, setIsOptimized] = useState(false);

	const mutation = useTrussOptMutation();

	const canRunFea = isReadyToOptimize(mesh);

	const invalidateResult = useCallback(() => {
		setResult(null);
		setIsOptimized(false);
		mutation.reset();
	}, [mutation]);

	const setMeshConfig = useCallback(
		(config: TrussMeshConfig) => {
			setMeshConfigState(config);
			setMesh(createTrussMesh(config));
			invalidateResult();
		},
		[invalidateResult],
	);

	const placeNode = useCallback(
		(x: number, y: number) => {
			if (mouseMode === "none") return;
			setMesh((current) =>
				mouseMode === "fixed"
					? toggleFixedNode(current, x, y)
					: toggleForceNode(current, x, y),
			);
			invalidateResult();
		},
		[mouseMode, invalidateResult],
	);

	const run = useCallback(
		(optimize?: TrussOptimizeInput) => {
			const meshInput = {
				...meshConfig,
				fixedPoints: [...mesh.fixedPoints],
				forcePointsX: [...mesh.forcePointsX],
				forcePointsY: [...mesh.forcePointsY],
			};
			mutation.mutate(
				optimize ? { mesh: meshInput, optimize } : { mesh: meshInput },
				{
					onSuccess: (data) => {
						setResult(data);
						setIsOptimized(optimize !== undefined);
					},
				},
			);
		},
		[mesh, meshConfig, mutation],
	);

	const simulate = useCallback(() => run(), [run]);
	const optimize = useCallback(
		() => run(optimizeConfig),
		[run, optimizeConfig],
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
		isOptimized,
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
