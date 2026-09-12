"use client";

import { Flex } from "@manoj-malviya-96/atom";
import faceMesh from "@/lib/face-shader/assets/face-mesh.json";
import FaceCanvas from "@/lib/face-shader/face_canvas";
import { SectionHeader } from "@/lib/shared";

export default function FaceShaderDemoPage() {
	return (
		<Flex direction="col" gap="lg" grow>
			<SectionHeader
				eyebrow="Demo"
				title="Triangulated portrait."
				caption="A photo, triangulated offline into a wireframe (pnpm mesh:generate), then rendered as a custom WebGL shader that reacts to the cursor."
			/>
			<Flex
				direction="col"
				grow
				bg="surface"
				radius="lg"
				style={{ minHeight: "32rem", overflow: "hidden" }}
			>
				<FaceCanvas
					mesh={faceMesh}
					alt="Triangulated portrait, cursor-reactive"
				/>
			</Flex>
		</Flex>
	);
}
