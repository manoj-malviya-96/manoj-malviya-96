import { Screen } from "@manoj-malviya-96/atom";
import type { Metadata } from "next";
import {
	IBM_Plex_Mono,
	IBM_Plex_Sans,
	Plus_Jakarta_Sans,
} from "next/font/google";
import Script from "next/script";
import type React from "react";
import Footer from "@/lib/core/footer";
import NavBar from "@/lib/core/nav_bar";
import { ReactQueryProvider } from "@/lib/core/react_query";

import "@manoj-malviya-96/atom/styles.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Manoj Malviya",
	description: "Portfolio of Manoj Malviya - Product Builder & Tinkerer",
	robots: {
		index: true, // Make sure this is true
		follow: true,
	},
};

const bodyFont = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500"],
	display: "swap",
	variable: "--font-body",
});
const monoFont = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	display: "swap",
	variable: "--font-mono",
});
const displayFont = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["500", "600", "700", "800"],
	display: "swap",
	variable: "--font-display",
});

/**
 * atom's setTheme only ever touches data-theme; it persists nothing, so a
 * stored preference has to be applied before first paint here or the page
 * flashes the system theme before hydration swaps it.
 */
const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		/*
		 * suppressHydrationWarning covers this element's own attributes only:
		 * theme extensions (Dark Reader and friends) stamp data-* onto <html>
		 * before React loads, and the mismatch is theirs, not the tree's.
		 */
		<html lang="en" suppressHydrationWarning>
			<head>
				<Script id="theme-init" strategy="beforeInteractive">
					{THEME_INIT_SCRIPT}
				</Script>
			</head>
			<body
				className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable} ${bodyFont.className}`}
			>
				<ReactQueryProvider>
					<Screen>
						<NavBar />
						{children}
						<Footer />
					</Screen>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
