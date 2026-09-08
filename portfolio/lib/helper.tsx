import type { ComponentType } from "react";
import type { MonthAndYear } from "@/lib/types";

export type ValuesOf<T extends readonly unknown[]> = T[number];

export function withDefaults<P extends object>(Component: ComponentType<P>) {
	return function preset<D extends Partial<P>>(defaultProps: D) {
		return function Styled(props: Omit<P, keyof D> & Partial<D>) {
			return <Component {...defaultProps} {...(props as P)} />;
		};
	};
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

export function dottedConcatString(inputs: string[]) {
	return inputs.join(" · ");
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
