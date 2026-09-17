"use client";

import { useSelector } from "@legendapp/state/react";
import { Flex, Layer, Stat, Text } from "@manoj-malviya-96/atom";
import {
	isEditingRun,
	isPendingRun,
	resultOf,
	trussOptState$,
} from "@/lib/truss-opt/state";
import { LatticeCanvas } from "./LatticeCanvas";

export function LatticeOutput() {
	const run = useSelector(() => trussOptState$.run.get());
	const result = resultOf(run);
	const isPending = isPendingRun(run);
	const editing = isEditingRun(run);

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
				data-hidden={editing ? undefined : true}
			>
				<Text variant="caption" muted>
					Click a node to{" "}
					{run.type === "choosing_fix" ? "toggle a support" : "cycle its load"}.
				</Text>
			</Layer>
		</Layer>
	);
}
