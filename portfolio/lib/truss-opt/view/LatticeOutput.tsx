import { Flex, Layer, Stat, Text } from "@manoj-malviya-96/atom";
import type { TrussOptResult } from "@/lib/data/truss_opt";
import type { TrussMesh } from "@/lib/truss-opt/engine/mesh";
import type { MouseMode } from "@/lib/truss-opt/use-truss-opt";
import { LatticeCanvas } from "./LatticeCanvas";

interface LatticeOutputProps {
	mesh: TrussMesh;
	result: TrussOptResult | null;
	mouseMode: MouseMode;
	isPending: boolean;
	onPlaceNode: (meshX: number, meshY: number) => void;
}

export function LatticeOutput({
	mesh,
	result,
	mouseMode,
	isPending,
	onPlaceNode,
}: LatticeOutputProps) {
	return (
		<Layer bg="surface" radius="lg" width="full" height="full" grow>
			<LatticeCanvas
				mesh={mesh}
				result={result}
				mouseMode={mouseMode}
				onPlaceNode={onPlaceNode}
			/>

			<Layer
				type="absolute"
				right="md"
				bottom="md"
				className="lattice-overlay"
				data-hidden={result ? undefined : true}
			>
				<Flex direction="row" gap="md">
					<Stat label="Volume" value={result?.totalVolume.toFixed(1) ?? ""} />
					<Stat
						label="Strain energy"
						value={result?.strainEnergy.toFixed(2) ?? ""}
					/>
				</Flex>
			</Layer>

			<Layer
				type="absolute"
				right="md"
				top="md"
				className="lattice-overlay"
				data-hidden={isPending ? undefined : true}
			>
				<Text variant="caption" muted>
					Solving…
				</Text>
			</Layer>

			<Layer
				type="absolute"
				top="md"
				left="md"
				className="lattice-overlay"
				data-hidden={mouseMode !== "none" ? undefined : true}
			>
				<Text variant="caption" muted>
					Click a node to {mouseModeHint(mouseMode)}.
				</Text>
			</Layer>
		</Layer>
	);
}

function mouseModeHint(mouseMode: MouseMode): string {
	return mouseMode === "fixed" ? "toggle a support" : "cycle its load";
}
