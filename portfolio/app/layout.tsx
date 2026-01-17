import type { Metadata } from "next";
import { ReactQueryProvider } from "@/lib/query/react_query";
import "./globals.css";
import React from "react";
import Footer from "@/lib/core/footer";
import NavBar from "@/lib/core/nav_bar";

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
          <NavBar />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
