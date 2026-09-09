export type LatticeType = "cross" | "checkerboard";

type Point = readonly [x: number, y: number];
type Connection = readonly [start: number, end: number];
type DirectionCosine = readonly [c: number, s: number];

/** The data shape TrussFea/TrussOptimizer actually depend on — decoupled from mesh generation so a test can supply it directly. */
export interface TrussStructure {
	readonly points: readonly Point[];
	readonly connections: readonly Connection[];
	readonly lengths: readonly number[];
	readonly directionCosines: readonly DirectionCosine[];
	readonly normThickness: readonly number[];
	readonly fixedPoints: ReadonlySet<number>;
	readonly forcePointsX: ReadonlySet<number>;
	readonly forcePointsY: ReadonlySet<number>;
}

export interface TrussMesh extends TrussStructure {
	readonly cellSize_mm: number;
	readonly meshWidth_mm: number;
	readonly meshHeight_mm: number;
	readonly latticeType: LatticeType;
}

export interface TrussMeshConfig {
	cellSize_mm: number;
	meshWidth_mm: number;
	meshHeight_mm: number;
	latticeType: LatticeType;
}

/** Generates a rectangular lattice seeded as a cantilever: left edge fixed, bottom-right corner loaded. */
export function createTrussMesh(config: TrussMeshConfig): TrussMesh {
	const { cellSize_mm, meshWidth_mm, meshHeight_mm, latticeType } = config;
	const nx = Math.floor(meshWidth_mm / cellSize_mm);
	const nz = Math.floor(meshHeight_mm / cellSize_mm);

	const points = generatePoints(nx, nz, cellSize_mm);
	const connections = generateConnections(nx, nz, latticeType);
	const { lengths, directionCosines } = computeGeometry(points, connections);
	const normThickness = connections.map(() => 1);

	const fixedPoints = new Set<number>();
	for (let i = 0; i <= nz; i++) fixedPoints.add(i * (nx + 1));

	return {
		cellSize_mm,
		meshWidth_mm,
		meshHeight_mm,
		latticeType,
		points,
		connections,
		lengths,
		directionCosines,
		normThickness,
		fixedPoints,
		forcePointsX: new Set(),
		forcePointsY: new Set([nx]),
	};
}

export function isReadyToOptimize(mesh: TrussStructure): boolean {
	return (
		mesh.fixedPoints.size > 0 &&
		(mesh.forcePointsX.size > 0 || mesh.forcePointsY.size > 0) &&
		mesh.points.length > 0 &&
		mesh.connections.length > 0
	);
}

function findClosestNode(
	points: readonly Point[],
	x: number,
	y: number,
): number {
	if (points.length === 0) {
		throw new Error("findClosestNode: mesh has no points");
	}
	let closestIndex = 0;
	let closestDistance = Number.POSITIVE_INFINITY;
	for (const [index, point] of points.entries()) {
		const distance = Math.hypot(point[0] - x, point[1] - y);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	}
	return closestIndex;
}

export function toggleFixedNode(
	mesh: TrussMesh,
	x: number,
	y: number,
): TrussMesh {
	const node = findClosestNode(mesh.points, x, y);
	const fixedPoints = new Set(mesh.fixedPoints);
	if (fixedPoints.has(node)) fixedPoints.delete(node);
	else fixedPoints.add(node);
	return { ...mesh, fixedPoints };
}

/** Cycle order per node: none -> X-force -> Y-force -> X & Y -> none. */
export function toggleForceNode(
	mesh: TrussMesh,
	x: number,
	y: number,
): TrussMesh {
	const node = findClosestNode(mesh.points, x, y);
	const forcePointsX = new Set(mesh.forcePointsX);
	const forcePointsY = new Set(mesh.forcePointsY);

	if (forcePointsX.has(node)) {
		if (forcePointsY.has(node)) forcePointsY.delete(node);
		else forcePointsY.add(node);
		forcePointsX.delete(node);
	} else {
		forcePointsX.add(node);
	}

	return { ...mesh, forcePointsX, forcePointsY };
}

function generatePoints(nx: number, nz: number, cellSize: number): Point[] {
	const points: Point[] = [];
	for (let z = 0; z <= nz; z++) {
		for (let x = 0; x <= nx; x++) {
			points.push([x * cellSize, z * cellSize]);
		}
	}
	return points;
}

function generateConnections(
	nx: number,
	nz: number,
	latticeType: LatticeType,
): Connection[] {
	const connections: Connection[] = [];
	for (let i = 0; i < nz; i++) {
		for (let j = 0; j < nx; j++) {
			const n1 = i * (nx + 1) + j;
			const n2 = n1 + 1;
			const n3 = n1 + (nx + 1);
			const n4 = n3 + 1;

			if (latticeType === "cross") {
				connections.push([n1, n4], [n2, n3]);
			} else if ((i + j) % 2 === 0) {
				connections.push([n1, n4]);
			} else {
				connections.push([n2, n3]);
			}

			connections.push([n1, n3], [n1, n2], [n3, n4]);

			if (j === nx - 1) {
				connections.push([n2, n4]);
			}
		}
	}
	return connections;
}

function computeGeometry(
	points: readonly Point[],
	connections: readonly Connection[],
) {
	const lengths: number[] = [];
	const directionCosines: DirectionCosine[] = [];
	for (const [start, end] of connections) {
		const [x1, y1] = points[start];
		const [x2, y2] = points[end];
		const length = Math.hypot(x2 - x1, y2 - y1);
		lengths.push(length);
		directionCosines.push([(x2 - x1) / length, (y2 - y1) / length]);
	}
	return { lengths, directionCosines };
}
