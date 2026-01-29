type Month =
	| "01"
	| "02"
	| "03"
	| "04"
	| "05"
	| "06"
	| "07"
	| "08"
	| "09"
	| "10"
	| "11"
	| "12";
type Year = `${number}${number}${number}${number}`; // "2023"
export type MonthAndYear = `${Year}-${Month}`; // "MM/YYYY"
export type ExternalURL = `https://${string}`;
export type Theme = "light" | "dark";
