"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { SectionHeader } from "@/lib/shared";
import { useTrussOpt } from "@/lib/truss-opt/use-truss-opt";
import { LatticeControls } from "@/lib/truss-opt/view/LatticeControls";
import { LatticeOutput } from "@/lib/truss-opt/view/LatticeOutput";

export default function TrussOptDemoPage() {
	const {
		meshConfig,
		mesh,
		mouseMode,
		optimizeConfig,
		canRunFea,
		isOptimized,
		result,
		isPending,
		error,
		setMeshConfig,
		setMouseMode,
		setOptimizeConfig,
		placeNode,
		simulate,
		optimize,
		clear,
	} = useTrussOpt();

	return (
		<Flex direction="col" gap="lg" grow>
			<SectionHeader
				eyebrow="Demo"
				title="Truss optimizer."
				caption="Place supports and loads on a cantilever lattice, then let an optimality-criteria solver redistribute material toward the members carrying the load. The FEA solve and optimization loop both run through this site's own API — the browser only draws the result."
			/>

			<Flex direction="row" gap="lg" grow style={{ minHeight: "32rem" }}>
				<LatticeControls
					meshConfig={meshConfig}
					mouseMode={mouseMode}
					optimizeConfig={optimizeConfig}
					canRunFea={canRunFea}
					isOptimized={isOptimized}
					hasResult={result !== null}
					isPending={isPending}
					error={error}
					onMeshConfigChange={setMeshConfig}
					onMouseModeChange={setMouseMode}
					onOptimizeConfigChange={setOptimizeConfig}
					onSimulate={simulate}
					onOptimize={optimize}
					onClear={clear}
				/>
				<LatticeOutput
					mesh={mesh}
					result={result}
					mouseMode={mouseMode}
					isPending={isPending}
					onPlaceNode={placeNode}
				/>
			</Flex>
		</Flex>
	);
}
