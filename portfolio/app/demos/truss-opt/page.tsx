"use client";

import { Flex } from "@manoj-malviya-96/atom";

import { useEffect } from "react";
import { SectionHeader } from "@/lib/shared";
import { resetTrussOptState } from "@/lib/truss-opt/state";
import { LatticeControls } from "@/lib/truss-opt/view/LatticeControls";
import { LatticeOutput } from "@/lib/truss-opt/view/LatticeOutput";

export default function TrussOptDemoPage() {
	// trussOptState$ is a module singleton (see state.ts) so it survives client-side
	// navigation away from this page — reset it fresh on every mount.
	useEffect(() => {
		resetTrussOptState();
	}, []);

	return (
		<Flex direction="col" gap="lg" width="content">
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
				<LatticeControls />
				<LatticeOutput />
			</Flex>
		</Flex>
	);
}
