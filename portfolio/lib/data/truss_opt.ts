import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
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

const trussOptResultSchema = z.object({
	normThickness: z.array(z.number()),
	displacements: z.array(z.number()),
	stresses: z.array(z.number()),
	strainEnergy: z.number(),
	totalVolume: z.number(),
	maxStress: z.number(),
	minStress: z.number(),
});

export type TrussOptResult = z.infer<typeof trussOptResultSchema>;

interface TrussOptRequest {
	mesh: TrussOptMeshInput;
	optimize?: TrussOptimizeInput;
}

const trussOptApiResponseSchema = z.discriminatedUnion("success", [
	trussOptResultSchema.extend({ success: z.literal(true) }),
	z.object({ success: z.literal(false), error: z.string() }),
]);

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
	const data = trussOptApiResponseSchema.parse(await response.json());
	if (!response.ok || !data.success) {
		throw new Error(!data.success ? data.error : "Truss optimization failed");
	}
	return data;
}
