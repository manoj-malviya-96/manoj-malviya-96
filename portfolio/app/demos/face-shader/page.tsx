"use client";

import { Flex } from "@manoj-malviya-96/atom";
import faceSource from "@/lib/face-shader/assets/face-source.jpg";
import FaceCanvas from "@/lib/face-shader/face_canvas";
import { SectionHeader } from "@/lib/shared";

export default function FaceShaderDemoPage() {
	return (
		<Flex direction="col" gap="lg" grow>
			<SectionHeader
				eyebrow="Demo"
				title="Triangulated portrait."
				caption="A custom WebGL shader triangulates a photo on load, then reacts to the cursor with the same ambient-pulse and glow language as the homepage mesh."
			/>
			<Flex
				direction="col"
				grow
				bg="surface"
				radius="lg"
				style={{ minHeight: "32rem", overflow: "hidden" }}
			>
				<FaceCanvas
					src={faceSource.src}
					alt="Triangulated portrait, cursor-reactive"
				/>
			</Flex>
		</Flex>
	);
}
