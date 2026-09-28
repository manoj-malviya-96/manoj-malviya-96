export type MonthAndYear = `${Year}-${Month}`; /** "MM/YYYY" */
export type ExternalURL = `https://${string}`;

/**
 * width/height are the file's intrinsic pixels: remote files carry no
 * build-time size, and knowing the ratio up front reserves the box before load.
 */
export type MediaSource = {
	kind: "image" | "video";
	src: string;
	alt: string;
	width: number;
	height: number;
	mockup?: MediaMockup;
};

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
type Year = `${number}${number}${number}${number}`; /** "2023" */

type MediaMockup = "macbook";
