import { Screen } from "@manoj-malviya-96/atom/system";
import type { Metadata } from "next";
import type React from "react";
import AppControlCenter from "@/lib/control_center";
import { RoleTagline } from "@/lib/data";
import Footer from "@/lib/footer";
import { ReactQueryProvider } from "@/lib/react_query";
import "@manoj-malviya-96/atom/styles.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "Manoj Malviya",
	description: `Manoj Malviya, ${RoleTagline}, end to end.`,
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
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body>
				<ReactQueryProvider>
					<Screen as="main" hAlign="center" vAlign="center">
						<AppControlCenter />
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
