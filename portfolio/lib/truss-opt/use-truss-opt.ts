"use client";

import { useCallback } from "react";
import {
	type TrussOptimizeInput,
	useTrussOptMutation,
} from "@/lib/data/truss_opt";
import { runFailed, runStarted, runSucceeded, trussOptState$ } from "./state";

export function useTrussOptRun() {
	const mutation = useTrussOptMutation();

	const run = useCallback(
		(optimize?: TrussOptimizeInput) => {
			const mesh = trussOptState$.mesh.peek();
			const meshInput = {
				...trussOptState$.meshConfig.peek(),
				fixedPoints: [...mesh.fixedPoints],
				forcePointsX: [...mesh.forcePointsX],
				forcePointsY: [...mesh.forcePointsY],
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

	return {
		simulate: useCallback(() => run(), [run]),
		optimize: useCallback(
			() => run(trussOptState$.optimizeConfig.peek()),
			[run],
		),
	};
}
