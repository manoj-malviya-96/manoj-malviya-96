import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export type Theme = 'light' | 'dark';

export function inverse(theme: Theme): Theme {
    return theme === 'light' ? 'dark' : 'light';
}