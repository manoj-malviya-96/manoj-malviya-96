import {
	Button,
	Field,
	Flex,
	Grid,
	Knob,
	Select,
	Text,
} from "@manoj-malviya-96/atom";
import type { TrussOptimizeInput } from "@/lib/data/truss_opt";
import type { LatticeType, TrussMeshConfig } from "@/lib/truss-opt/engine/mesh";
import type { MouseMode } from "@/lib/truss-opt/use-truss-opt";

const LATTICE_OPTIONS = [
	{ value: "cross", label: "Cross" },
	{ value: "checkerboard", label: "Checkerboard" },
] as const;

interface LatticeControlsProps {
	meshConfig: TrussMeshConfig;
	mouseMode: MouseMode;
	optimizeConfig: TrussOptimizeInput;
	canRunFea: boolean;
	hasResult: boolean;
	isPending: boolean;
	error: string | null;
	onMeshConfigChange: (config: TrussMeshConfig) => void;
	onMouseModeChange: (mode: MouseMode) => void;
	onOptimizeConfigChange: (config: TrussOptimizeInput) => void;
	onSimulate: () => void;
	onOptimize: () => void;
	onClear: () => void;
}

export function LatticeControls({
	meshConfig,
	mouseMode,
	optimizeConfig,
	canRunFea,
	hasResult,
	isPending,
	error,
	onMeshConfigChange,
	onMouseModeChange,
	onOptimizeConfigChange,
	onSimulate,
	onOptimize,
	onClear,
}: LatticeControlsProps) {
	const { meshWidth_mm, meshHeight_mm, cellSize_mm, latticeType } = meshConfig;
	const { numIterations, targetFraction } = optimizeConfig;
	const editing = mouseMode !== "none";

	return (
		<Flex direction="col" gap="sm" width="md">
			<Grid columns={2} gap="sm">
				<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
					<Text variant="label">Design the cantilever</Text>

					<Grid columns={3} gap="xs">
						<Field label="Width" description={`${meshWidth_mm}mm`}>
							{(control) => (
								<Knob
									{...control}
									aria-label="Width"
									min={cellSize_mm}
									max={100}
									step={cellSize_mm}
									value={meshWidth_mm}
									onChange={(value) =>
										onMeshConfigChange({ ...meshConfig, meshWidth_mm: value })
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
									max={100}
									step={cellSize_mm}
									value={meshHeight_mm}
									onChange={(value) =>
										onMeshConfigChange({ ...meshConfig, meshHeight_mm: value })
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
									min={5}
									max={20}
									step={5}
									value={cellSize_mm}
									onChange={(value) =>
										onMeshConfigChange({ ...meshConfig, cellSize_mm: value })
									}
									disabled={editing}
								/>
							)}
						</Field>
					</Grid>

					<Field label="Lattice pattern">
						{(control) => (
							<Select
								{...control}
								options={LATTICE_OPTIONS}
								value={latticeType}
								disabled={editing}
								onChange={(event) =>
									onMeshConfigChange({
										...meshConfig,
										latticeType: event.currentTarget.value as LatticeType,
									})
								}
							/>
						)}
					</Field>
				</Flex>

				<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
					<Text variant="label">Optimize</Text>
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
										onOptimizeConfigChange({
											...optimizeConfig,
											numIterations: value,
										})
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
										onOptimizeConfigChange({
											...optimizeConfig,
											targetFraction: value,
										})
									}
									disabled={editing}
								/>
							)}
						</Field>
					</Grid>
					<Button
						label={isPending ? "Optimizing…" : "Optimize"}
						onClick={onOptimize}
						disabled={editing || isPending || !canRunFea}
					/>
				</Flex>
			</Grid>

			<Flex direction="col" gap="sm" bg="surface" radius="lg" padding="md">
				<Text variant="label">Supports & loads</Text>
				<Flex direction="row" gap="sm">
					{mouseMode === "fixed" ? (
						<Button
							variant="filled"
							label="Place support"
							onClick={() => onMouseModeChange("none")}
						/>
					) : (
						<Button
							variant="plain"
							label="Place support"
							onClick={() => onMouseModeChange("fixed")}
							disabled={mouseMode === "force"}
						/>
					)}
					{mouseMode === "force" ? (
						<Button
							variant="filled"
							label="Place load"
							onClick={() => onMouseModeChange("none")}
						/>
					) : (
						<Button
							variant="plain"
							label="Place load"
							onClick={() => onMouseModeChange("force")}
							disabled={mouseMode === "fixed"}
						/>
					)}
					{hasResult ? (
						<Button
							variant="plain"
							label="Clear simulation"
							onClick={onClear}
							disabled={editing}
						/>
					) : (
						<Button
							variant="filled"
							label={isPending ? "Simulating…" : "Simulate"}
							onClick={onSimulate}
							disabled={editing || !canRunFea || isPending}
						/>
					)}
				</Flex>
				{!canRunFea && (
					<Text variant="caption" muted>
						Add at least one support and one load to simulate.
					</Text>
				)}
				{error && (
					<Text variant="caption" muted>
						{error}
					</Text>
				)}
			</Flex>
		</Flex>
	);
}
