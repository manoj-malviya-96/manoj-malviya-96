import type { Metadata } from "next";
import { ReactQueryProvider } from "@/lib/react_query";
import "./globals.css";
import React from "react";
import Footer from "@/components/home/footer";
import NavBar from "@/components/nav_bar";
import TransitionLayout from "@/components/ui/transition_layout";
import { Provider as JotaiProvider } from "jotai";

export const metadata: Metadata = {
  title: "Manoj Malviya",
  description: "Portfolio of Manoj Malviya - Product Builder & Tinkerer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ReactQueryProvider>
          <JotaiProvider>
            <NavBar />
            <TransitionLayout> {children}</TransitionLayout>
            <Footer />
          </JotaiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
