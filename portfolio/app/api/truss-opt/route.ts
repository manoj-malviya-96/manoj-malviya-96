import { NextResponse } from "next/server";
import { computeFea } from "@/lib/truss-opt/engine/fea";
import {
	createTrussMesh,
	type LatticeType,
	type TrussMesh,
} from "@/lib/truss-opt/engine/mesh";
import { optimizeTruss } from "@/lib/truss-opt/engine/optimizer";

// Mirrors the sliders in LatticeControls — the UI never lets a user past these, so a direct
// API call is clamped to the same bounds rather than trusted.
const MESH_BOUNDS = {
	cellSize_mm: { min: 5, max: 20 },
	meshWidth_mm: { min: 5, max: 100 },
	meshHeight_mm: { min: 5, max: 100 },
} as const;
const OPTIMIZE_BOUNDS = {
	numIterations: { min: 5, max: 500 },
	targetFraction: { min: 0.1, max: 0.9 },
} as const;
const LATTICE_TYPES: readonly LatticeType[] = ["cross", "checkerboard"];

interface TrussOptRequestBody {
	mesh: {
		cellSize_mm: number;
		meshWidth_mm: number;
		meshHeight_mm: number;
		latticeType: LatticeType;
		fixedPoints: number[];
		forcePointsX: number[];
		forcePointsY: number[];
	};
	optimize?: {
		numIterations: number;
		targetFraction: number;
	};
}

function clamp(value: number, bounds: { min: number; max: number }): number {
	return Math.min(bounds.max, Math.max(bounds.min, value));
}

function parseNodeIndices(value: unknown, nodeCount: number): number[] {
	if (!Array.isArray(value)) return [];
	return value.filter(
		(item): item is number =>
			typeof item === "number" &&
			Number.isInteger(item) &&
			item >= 0 &&
			item < nodeCount,
	);
}

export async function POST(request: Request) {
	let body: TrussOptRequestBody;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ success: false, error: "Request body must be JSON." },
			{ status: 400 },
		);
	}

	if (!body?.mesh || !LATTICE_TYPES.includes(body.mesh.latticeType)) {
		return NextResponse.json(
			{ success: false, error: "Invalid mesh configuration." },
			{ status: 400 },
		);
	}

	const cellSize_mm = clamp(body.mesh.cellSize_mm, MESH_BOUNDS.cellSize_mm);
	const meshWidth_mm = clamp(body.mesh.meshWidth_mm, MESH_BOUNDS.meshWidth_mm);
	const meshHeight_mm = clamp(
		body.mesh.meshHeight_mm,
		MESH_BOUNDS.meshHeight_mm,
	);

	const baseMesh = createTrussMesh({
		cellSize_mm,
		meshWidth_mm,
		meshHeight_mm,
		latticeType: body.mesh.latticeType,
	});
	const nodeCount = baseMesh.points.length;
	const mesh: TrussMesh = {
		...baseMesh,
		fixedPoints: new Set(parseNodeIndices(body.mesh.fixedPoints, nodeCount)),
		forcePointsX: new Set(parseNodeIndices(body.mesh.forcePointsX, nodeCount)),
		forcePointsY: new Set(parseNodeIndices(body.mesh.forcePointsY, nodeCount)),
	};

	try {
		if (body.optimize) {
			const numIterations = Math.round(
				clamp(body.optimize.numIterations, OPTIMIZE_BOUNDS.numIterations),
			);
			const targetFraction = clamp(
				body.optimize.targetFraction,
				OPTIMIZE_BOUNDS.targetFraction,
			);
			const result = optimizeTruss(mesh, numIterations, targetFraction);
			if (!result.success) {
				return NextResponse.json(
					{ success: false, error: result.error },
					{ status: 422 },
				);
			}
			return NextResponse.json({
				success: true,
				normThickness: result.mesh.normThickness,
				displacements: result.lastFeaResult.displacements,
				stresses: result.lastFeaResult.stresses,
				strainEnergy: result.lastFeaResult.strainEnergy,
				totalVolume: result.lastFeaResult.totalVolume,
				maxStress: result.lastFeaResult.maxStress,
				minStress: result.lastFeaResult.minStress,
			});
		}

		const fea = computeFea(mesh);
		return NextResponse.json({
			success: true,
			normThickness: mesh.normThickness,
			displacements: fea.displacements,
			stresses: fea.stresses,
			strainEnergy: fea.strainEnergy,
			totalVolume: fea.totalVolume,
			maxStress: fea.maxStress,
			minStress: fea.minStress,
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Truss computation failed.";
		return NextResponse.json(
			{ success: false, error: message },
			{ status: 422 },
		);
	}
}
