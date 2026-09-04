import type { MonthAndYear } from "@/lib/types";

export function conditionalProps(
	isTrue: boolean,
	propsWhenTrue: Record<string, unknown>,
) {
	if (!isTrue) {
		return {};
	}
	return propsWhenTrue;
}

export type ValuesOf<T extends readonly unknown[]> = T[number];

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

export function formatDate(date: MonthAndYear): string {
	const [year, month] = date.split("-");
	return `${MONTH_ABBREVIATIONS[Number.parseInt(month, 10) - 1]} ${year}`;
}

function monthsBetween(start: MonthAndYear, end?: MonthAndYear): number {
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

	return months;
}

export function yearsSince(start: MonthAndYear): number {
	return Math.floor(monthsBetween(start) / 12);
}
