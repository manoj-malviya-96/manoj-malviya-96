/**
 * Offline generator: photo in, triangulated wireframe mesh out.
 *
 * Runs once at authoring time (not per page load): decode the source photo with sharp,
 * detect its strongest edges, triangulate them, and write the result as JSON. The app
 * only ever loads that JSON — no image decoding or triangulation happens in the browser.
 *
 * Usage: pnpm mesh:generate <input-photo> [output-json]
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { buildFaceMesh } from "../lib/face-shader/mesh/build-face-mesh";
import { serializeFaceMesh } from "../lib/face-shader/mesh/serialize";

const DEFAULT_INPUT = "lib/face-shader/assets/face-source.jpg";
const DEFAULT_OUTPUT = "lib/face-shader/assets/face-mesh.json";

async function main(): Promise<void> {
	const inputPath = resolve(process.argv[2] ?? DEFAULT_INPUT);
	const outputPath = resolve(process.argv[3] ?? DEFAULT_OUTPUT);

	const { data, info } = await sharp(inputPath)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const mesh = buildFaceMesh({ data, width: info.width, height: info.height });
	const serialized = serializeFaceMesh(mesh);

	writeFileSync(outputPath, JSON.stringify(serialized));
	console.log(
		`${outputPath}: ${serialized.vertexCount} vertices, ${serialized.edgeCount} edges`,
	);
}

main().catch((error: unknown) => {
	console.error(error);
	process.exit(1);
});
