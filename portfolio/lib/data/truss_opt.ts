import { useMutation } from "@tanstack/react-query";
import type { LatticeType } from "@/lib/truss-opt/engine/mesh";

export interface TrussOptMeshInput {
	cellSize_mm: number;
	meshWidth_mm: number;
	meshHeight_mm: number;
	latticeType: LatticeType;
	fixedPoints: number[];
	forcePointsX: number[];
	forcePointsY: number[];
}

export interface TrussOptimizeInput {
	numIterations: number;
	targetFraction: number;
}

export interface TrussOptResult {
	normThickness: number[];
	displacements: number[];
	stresses: number[];
	strainEnergy: number;
	totalVolume: number;
	maxStress: number;
	minStress: number;
}

interface TrussOptRequest {
	mesh: TrussOptMeshInput;
	optimize?: TrussOptimizeInput;
}

/** Unlike the GitHub/Scholar queries, the payload varies per call (the mesh the user just
 * edited), so this is a mutation rather than a cached query keyed on fixed inputs. */
export function useTrussOptMutation() {
	return useMutation({
		mutationKey: ["truss-opt"],
		mutationFn: requestTrussOpt,
	});
}

async function requestTrussOpt(
	request: TrussOptRequest,
): Promise<TrussOptResult> {
	const response = await fetch("/api/truss-opt", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});
	const data = await response.json();
	if (!response.ok || !data.success) {
		throw new Error(data.error ?? "Truss optimization failed");
	}
	return data as TrussOptResult;
}
