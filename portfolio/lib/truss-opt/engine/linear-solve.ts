const SINGULAR_THRESHOLD = 1e-12;

export function solveLinear(
	matrix: readonly number[][],
	rhs: readonly number[],
): number[] {
	const n = rhs.length;
	const a = matrix.map((row) => row.slice());
	const b = rhs.slice();

	for (let col = 0; col < n; col++) {
		let pivotRow = col;
		let pivotMagnitude = Math.abs(a[col][col]);
		for (let row = col + 1; row < n; row++) {
			const magnitude = Math.abs(a[row][col]);
			if (magnitude > pivotMagnitude) {
				pivotRow = row;
				pivotMagnitude = magnitude;
			}
		}
		if (pivotMagnitude < SINGULAR_THRESHOLD) {
			throw new Error(`solveLinear: matrix is singular at column ${col}`);
		}
		if (pivotRow !== col) {
			[a[col], a[pivotRow]] = [a[pivotRow], a[col]];
			[b[col], b[pivotRow]] = [b[pivotRow], b[col]];
		}

		for (let row = col + 1; row < n; row++) {
			const factor = a[row][col] / a[col][col];
			if (factor === 0) continue;
			for (let k = col; k < n; k++) {
				a[row][k] -= factor * a[col][k];
			}
			b[row] -= factor * b[col];
		}
	}

	const x = new Array(n).fill(0);
	for (let row = n - 1; row >= 0; row--) {
		let sum = b[row];
		for (let col = row + 1; col < n; col++) {
			sum -= a[row][col] * x[col];
		}
		x[row] = sum / a[row][row];
	}
	return x;
}
