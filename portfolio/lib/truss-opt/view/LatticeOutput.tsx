"use client";

import { useSelector } from "@legendapp/state/react";
import { Flex, Layer, Stat, Text } from "@manoj-malviya-96/atom";
import { type MouseMode, trussOptState$ } from "@/lib/truss-opt/state";
import { LatticeCanvas } from "./LatticeCanvas";

export function LatticeOutput() {
	const result = useSelector(() => trussOptState$.result.get());
	const isPending = useSelector(
		() => trussOptState$.run.get().type === "pending",
	);
	const mouseMode = useSelector(() => trussOptState$.mouseMode.get());

	return (
		<Layer bg="surface" radius="lg" width="full" height="full" grow>
			<LatticeCanvas />

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
