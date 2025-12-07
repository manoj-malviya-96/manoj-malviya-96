type Month = `${number}${number}`; // "01" to "12"
type Year = `${number}${number}${number}${number}`; // "2023"
export type MonthAndYear = `${Year}-${Month}`; // "MM/YYYY"
export type ExternalURL = `https://${string}`;
