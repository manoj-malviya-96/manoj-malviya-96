import { useMutation } from "@tanstack/react-query";
import type { LatticeType } from "@/lib/truss-opt/engine/mesh";

interface TrussOptMeshInput {
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

type TrussOptApiResponse =
	| ({ success: true } & TrussOptResult)
	| { success: false; error: string };

function isTrussOptApiResponse(data: unknown): data is TrussOptApiResponse {
	return typeof data === "object" && data !== null && "success" in data;
}

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
	const data: unknown = await response.json();
	if (!isTrussOptApiResponse(data) || !response.ok || !data.success) {
		throw new Error(
			isTrussOptApiResponse(data) && !data.success
				? data.error
				: "Truss optimization failed",
		);
	}
	return data;
}
