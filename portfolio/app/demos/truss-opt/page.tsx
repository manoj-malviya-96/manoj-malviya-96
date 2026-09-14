"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { SectionHeader } from "@/lib/shared";
import { useTrussOpt } from "@/lib/truss-opt/use-truss-opt";
import { LatticeControls } from "@/lib/truss-opt/view/LatticeControls";
import { LatticeOutput } from "@/lib/truss-opt/view/LatticeOutput";

export default function TrussOptDemoPage() {
	const {
		meshConfig,
		mouseMode,
		optimizeConfig,
		canRunFea,
		result,
		isPending,
		error,
		setMeshConfig,
		setMouseMode,
		setOptimizeConfig,
		simulate,
		optimize,
		clear,
	} = useTrussOpt();

	return (
		<Page>
			<SectionHeader
				eyebrow="Demo"
				title="Truss optimizer."
				caption="Place supports and loads on a cantilever lattice, then let an optimality-criteria solver redistribute material toward the members carrying the load. The FEA solve and optimization loop both run through this site's own API. The browser only draws the result."
			/>

			<Flex
				direction="row"
				gap="lg"
				grow
				wrap
				style={{ minHeight: "32rem", maxHeight: "calc(100dvh - 16rem)" }}
			>
				<LatticeControls
					meshConfig={meshConfig}
					mouseMode={mouseMode}
					optimizeConfig={optimizeConfig}
					canRunFea={canRunFea}
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
					result={result}
					mouseMode={mouseMode}
					isPending={isPending}
				/>
			</Flex>
		</Page>
	);
}
