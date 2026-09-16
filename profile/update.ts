import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { fetchAvatar, renderAscii, sampleCells } from "./src/ascii-art";
import { fetchStats } from "./src/stats";
import { render } from "./src/svg-card";

async function main() {
	console.time("update");
	const [stats, avatar] = await Promise.all([fetchStats(), fetchAvatar()]);
	console.log("stats:", stats);

	const cells = sampleCells(avatar);
	const dir = dirname(fileURLToPath(import.meta.url));
	for (const mode of ["dark", "light"] as const) {
		await writeFile(
			join(dir, `${mode}_mode.svg`),
			render(mode, stats, renderAscii(cells, mode)),
		);
	}
	console.log("wrote dark_mode.svg, light_mode.svg");
	console.timeEnd("update");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
