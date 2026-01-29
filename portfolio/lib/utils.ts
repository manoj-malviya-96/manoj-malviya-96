import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MonthAndYear } from "@/lib/types";

export function mergeCls(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function uniqueBy<T, K>(array: T[], keyFn: (item: T) => K): T[] {
	const seen = new Set<K>();
	return array.filter((item) => {
		const key = keyFn(item);
		if (seen.has(key)) {
			return false;
		} else {
			seen.add(key);
			return true;
		}
	});
}

const months = [
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
export function formatDate(date: MonthAndYear): string {
	const [year, month] = date.split("-");
	return `${months[parseInt(month) - 1]} ${year}`;
}

export function calculateDuration(start: MonthAndYear, end?: MonthAndYear) {
	const [startYear, startMonth] = start.split("-").map(Number);

	let endMonth: number, endYear: number;
	if (end) {
		[endYear, endMonth] = end.split("-").map(Number);
	} else {
		const now = new Date();
		endMonth = now.getMonth() + 1;
		endYear = now.getFullYear();
	}

	const months = (endYear - startYear) * 12 + (endMonth - startMonth);

	if (months < 0) {
		throw new Error(
			`Invalid date range: end date '${end || "now"}' is before start date '${start}'`,
		);
	}

	const years = Math.floor(months / 12);
	const remainingMonths = months % 12;

	if (years === 0) return `${remainingMonths} mo`;
	if (remainingMonths === 0) return `${years} yr`;
	return `${years} yr ${remainingMonths} mo`;
}
