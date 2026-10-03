export type MonthAndYear = `${Year}-${Month}`; /** "MM/YYYY" */
export type ExternalURL = `https://${string}`;

/**
 * width/height are the file's intrinsic pixels: remote files carry no
 * build-time size, and knowing the ratio up front reserves the box before load.
 */
export type VisualMedia = {
	kind: "image" | "video";
	src: string;
	alt: string;
	width: number;
	height: number;
	mockup?: MediaMockup;
};

/** A source snippet shown as text, e.g. what a UI language looks like to write. */
export type CodeMedia = {
	kind: "code";
	code: string;
	language: string;
	alt: string;
	filename?: string;
};

export type MediaSource = VisualMedia | CodeMedia;

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

type MediaMockup = "macbook" | "iphone";
