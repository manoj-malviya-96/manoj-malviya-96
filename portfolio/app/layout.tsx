import { Flex, Screen } from "@manoj-malviya-96/atom";
import type { Metadata } from "next";
import type React from "react";
import Footer from "@/lib/core/footer";
import NavBar from "@/lib/core/nav_bar";
import { ReactQueryProvider } from "@/lib/core/react_query";

import "@manoj-malviya-96/atom/styles.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Manoj Malviya",
	description:
		"Manoj Malviya — senior product engineer building health-tech, CAD, and real-time systems end to end.",
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Manoj Malviya</title>
			</head>
			<body>
				<ReactQueryProvider>
					<Screen as="main" variant="page">
						<NavBar />
						{children}
						<Footer />
					</Screen>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
