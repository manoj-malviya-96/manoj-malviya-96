import { Screen } from "@manoj-malviya-96/atom/system";
import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import type React from "react";
import Footer from "@/lib/footer";
import HeaderBar from "@/lib/header_bar";
import { ReactQueryProvider } from "@/lib/react_query";
import "@manoj-malviya-96/atom/styles.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontBody = Inter({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

// RISK: Instrument Serif is not variable — 400 is its only weight, so anything asking
// --font-display for bold silently renders regular (font-synthesis is off).
const fontDisplay = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-display",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Manoj Malviya",
	description:
		"Manoj Malviya, senior product engineer building health-tech, CAD, and real-time systems end to end.",
	robots: {
		index: true, // Make sure this is true
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${fontBody.variable} ${fontDisplay.variable}`}
		>
			<head>
				<title>Manoj Malviya</title>
			</head>
			<body>
				<ReactQueryProvider>
					<Screen as="main" hAlign="center" vAlign="center">
						<HeaderBar />
						{children}
						<Footer />
					</Screen>
				</ReactQueryProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
