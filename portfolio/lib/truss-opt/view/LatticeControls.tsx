"use client";

import { useSelector } from "@legendapp/state/react";
import {
	Button,
	Field,
	Flex,
	Form,
	Grid,
	Knob,
	Radio,
	Text,
} from "@manoj-malviya-96/atom";
import type { LatticeType } from "@/lib/truss-opt/engine/mesh";
import { isReadyToOptimize, MESH_BOUNDS } from "@/lib/truss-opt/engine/mesh";
import {
	clearResult,
	isEditingRun,
	isPendingRun,
	setEditMode,
	setMeshConfig,
	setOptimizeConfig,
	trussOptState$,
} from "@/lib/truss-opt/state";
import { useTrussOptRun } from "@/lib/truss-opt/use-truss-opt";

const LATTICE_OPTIONS = [
	{ value: "cross", label: "Cross" },
	{ value: "checkerboard", label: "Checkerboard" },
] as const;

/** Steps run top to bottom: shape the mesh, place the FEA inputs (supports/loads), then
 * optimize. Optimize is the primary action — it's the reason the demo exists — so it's the
 * only filled button and the form's submit action; Simulate is the plain, secondary
 * "preview the FEA solve" step. Reads/writes trussOptState$ directly instead of taking
 * mesh/run/etc as props — nothing between here and the store needs to re-render on
 * every keystroke. */
export function LatticeControls() {
	const meshConfig = useSelector(() => trussOptState$.meshConfig.get());
	const optimizeConfig = useSelector(() => trussOptState$.optimizeConfig.get());
	const canRunFea = useSelector(() =>
		isReadyToOptimize(trussOptState$.mesh.get()),
	);
	const run = useSelector(() => trussOptState$.run.get());
	const hasResult = run.type === "simulated" || run.type === "optimized";
	const isSimulating = run.type === "simulating";
	const isOptimizing = run.type === "optimizing";
	const isPending = isPendingRun(run);
	const error = run.type === "error" ? run.message : null;
	const editing = isEditingRun(run);
	const { simulate, optimize } = useTrussOptRun();

	const { meshWidth_mm, meshHeight_mm, cellSize_mm, latticeType } = meshConfig;
	const { numIterations, targetFraction } = optimizeConfig;

	return (
		<Form onSubmit={optimize} gap="sm" width="sm">
			<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
				<Text.Overline ink="muted">1 · Mesh</Text.Overline>

				<Grid columns={3} gap="xs">
					<Field label="Width" description={`${meshWidth_mm}mm`}>
						{(control) => (
							<Knob
								{...control}
								aria-label="Width"
								min={cellSize_mm}
								max={MESH_BOUNDS.meshWidth_mm.max}
								step={cellSize_mm}
								value={meshWidth_mm}
								onChange={(value) =>
									setMeshConfig({ ...meshConfig, meshWidth_mm: value })
								}
								disabled={editing}
							/>
						)}
					</Field>
					<Field label="Height" description={`${meshHeight_mm}mm`}>
						{(control) => (
							<Knob
								{...control}
								aria-label="Height"
								min={cellSize_mm}
								max={MESH_BOUNDS.meshHeight_mm.max}
								step={cellSize_mm}
								value={meshHeight_mm}
								onChange={(value) =>
									setMeshConfig({ ...meshConfig, meshHeight_mm: value })
								}
								disabled={editing}
							/>
						)}
					</Field>
					<Field label="Cell" description={`${cellSize_mm}mm`}>
						{(control) => (
							<Knob
								{...control}
								aria-label="Cell size"
								min={MESH_BOUNDS.cellSize_mm.min}
								max={MESH_BOUNDS.cellSize_mm.max}
								step={5}
								value={cellSize_mm}
								onChange={(value) =>
									setMeshConfig({ ...meshConfig, cellSize_mm: value })
								}
								disabled={editing}
							/>
						)}
					</Field>
				</Grid>

				<Flex direction="col" gap="xs">
					<Text.Label>Lattice pattern</Text.Label>
					<Flex direction="row" gap="md" wrap>
						{LATTICE_OPTIONS.map((option) => (
							<Flex
								as="label"
								key={option.value}
								direction="row"
								gap="xs"
								vAlign="center"
							>
								<Radio
									name="latticeType"
									value={option.value}
									checked={latticeType === option.value}
									disabled={editing}
									onChange={() =>
										setMeshConfig({
											...meshConfig,
											latticeType: option.value as LatticeType,
										})
									}
								/>
								<Text.Body>{option.label}</Text.Body>
							</Flex>
						))}
					</Flex>
				</Flex>
			</Flex>

			<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
				<Text.Overline ink="muted">2 · Supports & loads</Text.Overline>
				<Flex direction="row" gap="sm" wrap>
					{run.type === "choosing_fix" ? (
						<Button.Text
							type="button"
							color="secondary"
							label="Place support"
							onClick={() => setEditMode("idle")}
						/>
					) : (
						<Button.Text
							type="button"
							color="transparent"
							label="Place support"
							onClick={() => setEditMode("choosing_fix")}
							disabled={isPending || run.type === "choosing_force"}
						/>
					)}
					{run.type === "choosing_force" ? (
						<Button.Text
							type="button"
							color="secondary"
							label="Place load"
							onClick={() => setEditMode("idle")}
						/>
					) : (
						<Button.Text
							type="button"
							color="transparent"
							label="Place load"
							onClick={() => setEditMode("choosing_force")}
							disabled={isPending || run.type === "choosing_fix"}
						/>
					)}
				</Flex>
				{hasResult ? (
					<Button.Text
						type="button"
						color="transparent"
						label="Clear simulation"
						onClick={clearResult}
						disabled={editing}
					/>
				) : (
					<Button.Text
						type="button"
						color="transparent"
						label={isSimulating ? "Simulating…" : "Simulate"}
						onClick={simulate}
						disabled={editing || !canRunFea || isPending}
					/>
				)}
				{/* Reserved one-line slot, always mounted — swapping its text in and out of the
				DOM (rather than just its content) shifted every panel below it. */}
				{error ? (
					<Text.Caption bg="red" radius="md" padding="xs">
						{error}
					</Text.Caption>
				) : (
					<Text.Caption ink="muted">
						{canRunFea
							? " "
							: "Add at least one support and one load to simulate."}
					</Text.Caption>
				)}
			</Flex>

			<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
				<Text.Overline ink="muted">3 · Optimize</Text.Overline>
				<Grid columns={2} gap="xs">
					<Field label="Iterations" description={`${numIterations}`}>
						{(control) => (
							<Knob
								{...control}
								aria-label="Iterations"
								min={5}
								max={500}
								step={5}
								value={numIterations}
								onChange={(value) =>
									setOptimizeConfig({ ...optimizeConfig, numIterations: value })
								}
								disabled={editing}
							/>
						)}
					</Field>
					<Field
						label="Material"
						description={`${Math.round(targetFraction * 100)}%`}
					>
						{(control) => (
							<Knob
								{...control}
								aria-label="Target material fraction"
								min={0.1}
								max={0.9}
								step={0.05}
								value={targetFraction}
								onChange={(value) =>
									setOptimizeConfig({
										...optimizeConfig,
										targetFraction: value,
									})
								}
								disabled={editing}
							/>
						)}
					</Field>
				</Grid>
				<Button.Text
					type="submit"
					color="primary"
					label={isOptimizing ? "Optimizing…" : "Optimize"}
					disabled={editing || isPending || !canRunFea}
				/>
			</Flex>
		</Form>
	);
}
