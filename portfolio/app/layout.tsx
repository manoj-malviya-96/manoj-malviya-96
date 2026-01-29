import type { Metadata } from "next";
import { ReactQueryProvider } from "@/lib/core/react_query";
import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import Footer from "@/lib/core/footer";
import NavBar from "@/lib/core/nav_bar";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light" className={inter.className}>
			<body>
				<ReactQueryProvider>
					<NavBar />
					{children}
					<Footer />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
