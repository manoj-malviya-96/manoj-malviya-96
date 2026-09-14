"use client";

import { useSelector } from "@legendapp/state/react";
import { useCallback, useMemo } from "react";
import {
	type TrussOptimizeInput,
	useTrussOptMutation,
} from "@/lib/data/truss_opt";
import { isReadyToOptimize, type TrussMesh } from "@/lib/truss-opt/engine/mesh";
import {
	clearResult,
	type MouseMode,
	placeNode,
	runFailed,
	runStarted,
	runSucceeded,
	setMeshConfig,
	setMouseMode,
	setOptimizeConfig,
	trussOptState$,
} from "@/lib/truss-opt/state";

export type { MouseMode };

export function useTrussOpt() {
	const meshConfig = useSelector(() => trussOptState$.meshConfig.get());
	const mesh = useSelector(() => trussOptState$.mesh.get());
	const mouseMode = useSelector(() => trussOptState$.mouseMode.get());
	const optimizeConfig = useSelector(() =>
		trussOptState$.optimizeConfig.get(),
	);
	const result = useSelector(() => trussOptState$.result.get());
	const run = useSelector(() => trussOptState$.run.get());

	const mutation = useTrussOptMutation();
	const canRunFea = isReadyToOptimize(mesh);

	const runOpt = useCallback(
		(optimize?: TrussOptimizeInput) => {
			const currentMesh = trussOptState$.mesh.peek();
			const meshInput = {
				...trussOptState$.meshConfig.peek(),
				fixedPoints: [...currentMesh.fixedPoints],
				forcePointsX: [...currentMesh.forcePointsX],
				forcePointsY: [...currentMesh.forcePointsY],
			};
			runStarted();
			mutation.mutate(
				optimize ? { mesh: meshInput, optimize } : { mesh: meshInput },
				{
					onSuccess: runSucceeded,
					onError: (error) => runFailed(error.message),
				},
			);
		},
		[mutation],
	);

	const simulate = useCallback(() => runOpt(), [runOpt]);
	const optimize = useCallback(
		() => runOpt(trussOptState$.optimizeConfig.peek()),
		[runOpt],
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
		isPending: run.type === "pending",
		error: run.type === "error" ? run.message : null,
		setMeshConfig,
		setMouseMode,
		setOptimizeConfig,
		placeNode,
		simulate,
		optimize,
		clear: clearResult,
	};
}
