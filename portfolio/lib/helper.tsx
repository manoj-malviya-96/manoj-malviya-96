import type { ComponentType } from "react";
import type { MonthAndYear } from "@/lib/types";

export function withDefaults<P extends object>(Component: ComponentType<P>) {
	return function preset<D extends Partial<P>>(defaultProps: D) {
		return function Styled(props: Omit<P, keyof D> & Partial<D>) {
			return <Component {...defaultProps} {...(props as P)} />;
		};
	};
}

export function formatDate(date: MonthAndYear): string {
	const [year, month] = date.split("-");
	return `${MONTH_ABBREVIATIONS[Number.parseInt(month, 10) - 1]} ${year}`;
}

export function getBlob(filename: string) {
	return `https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/${filename}`;
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
