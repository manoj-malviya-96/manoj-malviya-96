import type { MonthAndYear } from "@/lib/types";

export function formatDate(date: MonthAndYear): string {
	const [year, month] = date.split("-");
	return `${MONTH_ABBREVIATIONS[Number.parseInt(month, 10) - 1]} ${year}`;
}

export function getBlob(filename: string) {
	return `https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/${filename}`;
}

export function memoizedOnce<T>(fn: () => T): () => T {
	let cached: T | undefined;
	let hasRun = false;
	return () => {
		if (!hasRun) {
			cached = fn();
			hasRun = true;
		}
		return cached as T;
	};
}

export type ValuesOf<T extends readonly unknown[]> = T[number];

const MONTH_ABBREVIATIONS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
] as const;
