import {
	Button,
	Field,
	Flex,
	Select,
	Slider,
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
		<Flex direction="col" gap="lg" width="sm">
			<Flex direction="col" gap="md" bg="surface" radius="lg" padding="lg">
				<Text variant="label">Design the cantilever</Text>

				<Field label="Width" description={`${meshWidth_mm}mm`}>
					{(control) => (
						<Slider
							{...control}
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
						<Slider
							{...control}
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
				<Field label="Cell size" description={`${cellSize_mm}mm`}>
					{(control) => (
						<Slider
							{...control}
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

			<Flex direction="col" gap="md" bg="surface" radius="lg" padding="lg">
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
				</Flex>
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

			<Flex direction="col" gap="md" bg="surface" radius="lg" padding="lg">
				<Text variant="label">Optimize</Text>
				<Field label="Iterations" description={`${numIterations}`}>
					{(control) => (
						<Slider
							{...control}
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
					label="Target material fraction"
					description={`${Math.round(targetFraction * 100)}%`}
				>
					{(control) => (
						<Slider
							{...control}
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
				<Button
					label={isPending ? "Optimizing…" : "Optimize"}
					onClick={onOptimize}
					disabled={editing || isPending || !canRunFea}
				/>
			</Flex>
		</Flex>
	);
}
