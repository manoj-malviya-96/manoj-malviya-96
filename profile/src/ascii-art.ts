import { inflateSync } from "node:zlib";
import { USER } from "./config";

export const ASCII_COLS = 42; // portrait width in characters
export const ASCII_RAMP = " .:-=+*#%@";
export const ASCII_CHAR_WIDTH = 7.8; // px, Consolas/Menlo at font-size 13
export const ASCII_LINE_HEIGHT = 15; // px

interface DecodedImage {
	width: number;
	height: number;
	luminance: Float32Array; // row-major, one entry per pixel, 0 (black)..1 (white)
}

// PNG "Paeth" filter predictor (spec section 9.2): picks whichever neighbor
// best predicts the current byte from the left/above/above-left reconstructed values.
function paeth(a: number, b: number, c: number): number {
	const p = a + b - c;
	const pa = Math.abs(p - a);
	const pb = Math.abs(p - b);
	const pc = Math.abs(p - c);
	if (pa <= pb && pa <= pc) return a;
	if (pb <= pc) return b;
	return c;
}

// GitHub always re-encodes avatars as 8-bit, non-interlaced PNG, so that's all this supports.
function decodePng(buf: Buffer): DecodedImage {
	const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
	if (!buf.subarray(0, 8).equals(SIGNATURE)) throw new Error("not a PNG");

	let offset = 8;
	let width = 0;
	let height = 0;
	let bitDepth = 0;
	let colorType = 0;
	let interlace = 0;
	const idatChunks: Buffer[] = [];
	let palette: Buffer | null = null;

	while (offset < buf.length) {
		const length = buf.readUInt32BE(offset);
		const type = buf.toString("ascii", offset + 4, offset + 8);
		const data = buf.subarray(offset + 8, offset + 8 + length);
		if (type === "IHDR") {
			width = data.readUInt32BE(0);
			height = data.readUInt32BE(4);
			bitDepth = data.readUInt8(8);
			colorType = data.readUInt8(9);
			interlace = data.readUInt8(12);
		} else if (type === "PLTE") {
			palette = Buffer.from(data);
		} else if (type === "IDAT") {
			idatChunks.push(Buffer.from(data));
		} else if (type === "IEND") {
			break;
		}
		offset += 8 + length + 4; // length + type + data + crc
	}

	if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth: ${bitDepth}`);
	if (interlace !== 0) throw new Error("interlaced PNG not supported");

	const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
	if (!channels) throw new Error(`unsupported PNG color type: ${colorType}`);

	const raw = inflateSync(Buffer.concat(idatChunks));
	const stride = width * channels;
	const pixels = Buffer.alloc(height * stride);

	for (let y = 0; y < height; y++) {
		const filterType = raw[y * (stride + 1)];
		const rowStart = y * (stride + 1) + 1;
		for (let i = 0; i < stride; i++) {
			const x = raw[rowStart + i];
			const a = i >= channels ? pixels[y * stride + i - channels] : 0;
			const b = y > 0 ? pixels[(y - 1) * stride + i] : 0;
			const c =
				y > 0 && i >= channels ? pixels[(y - 1) * stride + i - channels] : 0;
			let value: number;
			switch (filterType) {
				case 0:
					value = x;
					break;
				case 1:
					value = x + a;
					break;
				case 2:
					value = x + b;
					break;
				case 3:
					value = x + Math.floor((a + b) / 2);
					break;
				case 4:
					value = x + paeth(a, b, c);
					break;
				default:
					throw new Error(`unsupported PNG filter type: ${filterType}`);
			}
			pixels[y * stride + i] = value & 0xff;
		}
	}

	if (colorType === 3 && !palette)
		throw new Error("palette PNG missing PLTE chunk");

	const luminance = new Float32Array(width * height);
	for (let py = 0; py < height; py++) {
		for (let px = 0; px < width; px++) {
			const i = py * stride + px * channels;
			let value: number;
			if (colorType === 3) {
				const p = pixels[i] * 3;
				value =
					0.299 * palette![p] +
					0.587 * palette![p + 1] +
					0.114 * palette![p + 2];
			} else if (colorType === 0 || colorType === 4) {
				value = pixels[i];
			} else {
				value =
					0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
			}
			luminance[py * width + px] = value / 255;
		}
	}

	return { width, height, luminance };
}

export async function fetchAvatar(): Promise<DecodedImage> {
	const res = await fetch(`https://github.com/${USER}.png?size=240`);
	return decodePng(Buffer.from(await res.arrayBuffer()));
}

// One cell's average luminance per character in the portrait grid — sampled once
// and reused for both color modes, since only the character mapping differs below.
export function sampleCells(img: DecodedImage): Float32Array {
	const rows = Math.round(
		ASCII_COLS *
			(ASCII_CHAR_WIDTH / ASCII_LINE_HEIGHT) *
			(img.height / img.width),
	);
	const cellW = img.width / ASCII_COLS;
	const cellH = img.height / rows;
	const cells = new Float32Array(rows * ASCII_COLS);
	for (let row = 0; row < rows; row++) {
		const y0 = Math.floor(row * cellH);
		const y1 = Math.max(y0 + 1, Math.floor((row + 1) * cellH));
		for (let col = 0; col < ASCII_COLS; col++) {
			const x0 = Math.floor(col * cellW);
			const x1 = Math.max(x0 + 1, Math.floor((col + 1) * cellW));
			let sum = 0;
			let count = 0;
			for (let y = y0; y < y1; y++) {
				for (let x = x0; x < x1; x++) {
					sum += img.luminance[y * img.width + x];
					count++;
				}
			}
			cells[row * ASCII_COLS + col] = sum / count;
		}
	}
	return cells;
}

// Density represents luminance, but "dense" only reads as bright against a dark
// background and as dark ink against a light one — so the two modes invert the ramp.
export function renderAscii(cells: Float32Array, mode: "dark" | "light"): string[] {
	const rows = cells.length / ASCII_COLS;
	const lines: string[] = [];
	for (let row = 0; row < rows; row++) {
		let line = "";
		for (let col = 0; col < ASCII_COLS; col++) {
			const luminance = cells[row * ASCII_COLS + col];
			const t = mode === "dark" ? luminance : 1 - luminance;
			const idx = Math.min(
				ASCII_RAMP.length - 1,
				Math.floor(t * ASCII_RAMP.length),
			);
			line += ASCII_RAMP[idx];
		}
		lines.push(line);
	}
	return lines;
}
