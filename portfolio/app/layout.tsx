import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	preload: true,
});

/** Each page names its own scheme; globals.css lifts it to <html>. */
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
			<body className={inter.className}>
				<ReactQueryProvider>
					<NavBar />
					{children}
					<Footer />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
