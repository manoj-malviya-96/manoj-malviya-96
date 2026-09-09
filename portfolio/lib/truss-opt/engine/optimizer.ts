import { computeFea, type TrussFeaResult } from "./fea";
import type { TrussMesh } from "./mesh";

const MIN_THICKNESS = 0.1;
const BISECTION_TOLERANCE = 1e-4;
const LAMBDA_LOWER_BOUND = 1e-24;
const LAMBDA_UPPER_BOUND = 1e24;

export type OptimizeResult =
	| { success: true; mesh: TrussMesh; lastFeaResult: TrussFeaResult }
	| {
			success: false;
			error: string;
			mesh: TrussMesh;
			lastFeaResult: TrussFeaResult;
	  };

/**
 * Optimality-criteria (OC) compliance minimization: each iteration re-solves the FEA, then
 * redistributes member thickness toward the derivative of strain energy, using bisection on
 * the Lagrange multiplier to hold total volume at `targetFraction` of the starting volume.
 */
export function optimizeTruss(
	initialMesh: TrussMesh,
	numIterations = 200,
	targetFraction = 0.4,
): OptimizeResult {
	const startFea = computeFea(initialMesh);
	const startObjective = startFea.strainEnergy;
	const startVolume = startFea.totalVolume;

	let mesh = initialMesh;
	let lastFeaResult = startFea;

	for (let i = 0; i < numIterations; i++) {
		const step = iterate(mesh, startObjective, startVolume, targetFraction);
		mesh = step.mesh;
		lastFeaResult = step.feaResult;
		if (!step.success) {
			return { success: false, error: step.error, mesh, lastFeaResult };
		}
	}

	return { success: true, mesh, lastFeaResult };
}

function iterate(
	mesh: TrussMesh,
	startObjective: number,
	startVolume: number,
	targetFraction: number,
):
	| { success: true; mesh: TrussMesh; feaResult: TrussFeaResult }
	| {
			success: false;
			error: string;
			mesh: TrussMesh;
			feaResult: TrussFeaResult;
	  } {
	const feaResult = computeFea(mesh);

	const objective = feaResult.strainEnergy / startObjective;
	if (Number.isNaN(objective)) {
		return {
			success: false,
			error: "FEA computation failed: strain energy is NaN",
			mesh,
			feaResult,
		};
	}

	const penalty = objective ** 2;
	const objectiveDerivative = feaResult.derivativeStrainEnergy.map(
		(d) => penalty * d,
	);
	const newThickness = computeOptimalityCriteriaUpdate(
		mesh.normThickness,
		objectiveDerivative,
		mesh.lengths,
		startVolume,
		targetFraction,
	);

	if (newThickness.every((value) => value <= MIN_THICKNESS)) {
		return {
			success: false,
			error: "Cannot optimize further: every member is at minimum thickness",
			mesh,
			feaResult,
		};
	}

	return {
		success: true,
		mesh: { ...mesh, normThickness: newThickness },
		feaResult,
	};
}

function computeOptimalityCriteriaUpdate(
	thickness: readonly number[],
	objectiveDerivative: readonly number[],
	lengths: readonly number[],
	startVolume: number,
	targetFraction: number,
): number[] {
	let lower = LAMBDA_LOWER_BOUND;
	let upper = LAMBDA_UPPER_BOUND;
	const targetVolume = startVolume * targetFraction;
	let candidate = thickness.slice();

	while (upper - lower > BISECTION_TOLERANCE) {
		const mid = 0.5 * (upper + lower);
		candidate = thickness.map((value, index) => {
			const scale = Math.sqrt(-objectiveDerivative[index] / mid);
			return Math.max(Math.min(1, value * scale), Number.EPSILON);
		});

		const candidateVolume = candidate.reduce(
			(sum, value, index) => sum + value * lengths[index],
			0,
		);
		if (candidateVolume >= targetVolume) {
			lower = mid;
		} else {
			upper = mid;
		}
	}

	return candidate;
}
