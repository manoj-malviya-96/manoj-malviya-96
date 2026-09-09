import { solveLinear } from "./linear-solve";
import type { TrussStructure } from "./mesh";

const DOF_PER_NODE = 2;

export interface TrussFeaResult {
	readonly displacements: readonly number[];
	readonly stresses: readonly number[];
	readonly strainEnergy: number;
	readonly derivativeStrainEnergy: readonly number[];
	readonly totalVolume: number;
	readonly maxStress: number;
	readonly minStress: number;
}

export function computeFea(
	mesh: TrussStructure,
	youngsModulus_Mpa = 1,
): TrussFeaResult {
	const dofCount = mesh.points.length * DOF_PER_NODE;
	const stiffness = assembleGlobalStiffness(mesh, dofCount, youngsModulus_Mpa);
	applyBoundaryConditions(stiffness, mesh.fixedPoints);
	const forces = assembleForces(mesh, dofCount);
	const displacements = solveLinear(stiffness, forces);

	const stresses = computeStresses(mesh, displacements, youngsModulus_Mpa);
	const strainEnergy = computeStrainEnergy(stiffness, displacements);
	const derivativeStrainEnergy = computeDerivativeStrainEnergy(
		mesh,
		stresses,
		youngsModulus_Mpa,
	);
	const totalVolume = computeTotalVolume(mesh);

	return {
		displacements,
		stresses,
		strainEnergy,
		derivativeStrainEnergy,
		totalVolume,
		maxStress: Math.max(...stresses),
		minStress: Math.min(...stresses),
	};
}

function assembleGlobalStiffness(
	mesh: TrussStructure,
	dofCount: number,
	youngsModulus_Mpa: number,
): number[][] {
	const stiffness = Array.from({ length: dofCount }, () =>
		new Array(dofCount).fill(0),
	);

	for (const [index, [start, end]] of mesh.connections.entries()) {
		const length = mesh.lengths[index];
		const area = mesh.normThickness[index];
		const k = (youngsModulus_Mpa * area) / length;
		const [c, s] = mesh.directionCosines[index];

		const local = [
			[c * c * k, c * s * k, -c * c * k, -c * s * k],
			[c * s * k, s * s * k, -c * s * k, -s * s * k],
			[-c * c * k, -c * s * k, c * c * k, c * s * k],
			[-c * s * k, -s * s * k, c * s * k, s * s * k],
		];

		const startDof = start * DOF_PER_NODE;
		const endDof = end * DOF_PER_NODE;
		for (let i = 0; i < DOF_PER_NODE; i++) {
			for (let j = 0; j < DOF_PER_NODE; j++) {
				stiffness[startDof + i][startDof + j] += local[i][j];
				stiffness[startDof + i][endDof + j] += local[i][j + 2];
				stiffness[endDof + i][startDof + j] += local[i + 2][j];
				stiffness[endDof + i][endDof + j] += local[i + 2][j + 2];
			}
		}
	}

	return stiffness;
}

function applyBoundaryConditions(
	stiffness: number[][],
	fixedPoints: ReadonlySet<number>,
): void {
	for (const node of fixedPoints) {
		const startDof = node * DOF_PER_NODE;
		for (let i = 0; i < DOF_PER_NODE; i++) {
			stiffness[startDof + i].fill(0);
			stiffness[startDof + i][startDof + i] = 1;
		}
	}
}

function assembleForces(mesh: TrussStructure, dofCount: number): number[] {
	const forces = new Array(dofCount).fill(0);
	for (const node of mesh.forcePointsX) {
		forces[node * DOF_PER_NODE] = 1;
	}
	for (const node of mesh.forcePointsY) {
		forces[node * DOF_PER_NODE + 1] = 1;
	}
	return forces;
}

function computeStresses(
	mesh: TrussStructure,
	displacements: readonly number[],
	youngsModulus_Mpa: number,
): number[] {
	const area = mesh.normThickness;
	return mesh.connections.map(([start, end], index) => {
		const length = mesh.lengths[index];
		const [c, s] = mesh.directionCosines[index];
		const startDof = start * DOF_PER_NODE;
		const endDof = end * DOF_PER_NODE;
		const deltaUx = displacements[endDof] - displacements[startDof];
		const deltaUy = displacements[endDof + 1] - displacements[startDof + 1];
		const axialStretch = deltaUx * c + deltaUy * s;
		// normThickness is a 0-1 relative area (not a physical cross-section), and this divides
		// by it twice (once via k in the stiffness assembly, once here) — a deliberate SIMP-style
		// relative stress used for coloring/optimization, ported as-is from the reference tool.
		return (youngsModulus_Mpa * axialStretch) / (area[index] * length);
	});
}

function computeStrainEnergy(
	stiffness: readonly number[][],
	displacements: readonly number[],
): number {
	const stiffnessTimesDisplacement = multiplyMatrixVector(
		stiffness,
		displacements,
	);
	return dotProduct(displacements, stiffnessTimesDisplacement) / 2;
}

function computeDerivativeStrainEnergy(
	mesh: TrussStructure,
	stresses: readonly number[],
	youngsModulus_Mpa: number,
): number[] {
	const area = mesh.normThickness;
	return mesh.connections.map((_, index) => {
		const memberForce = stresses[index] * area[index] * mesh.lengths[index];
		return -(memberForce ** 2) / (2 * youngsModulus_Mpa * mesh.lengths[index]);
	});
}

function computeTotalVolume(mesh: TrussStructure): number {
	return mesh.normThickness.reduce(
		(sum, a, index) => sum + a * mesh.lengths[index],
		0,
	);
}

function multiplyMatrixVector(
	matrix: readonly number[][],
	vector: readonly number[],
): number[] {
	return matrix.map((row) => dotProduct(row, vector));
}

function dotProduct(a: readonly number[], b: readonly number[]): number {
	return a.reduce((sum, value, index) => sum + value * b[index], 0);
}
