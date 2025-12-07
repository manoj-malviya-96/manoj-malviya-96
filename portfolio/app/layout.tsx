import type { Metadata } from "next";
import { ReactQueryProvider } from "@/hooks/react-query-provider";
import "./globals.css";
import React from "react";
import Footer from "@/screens/footer";
import NavBar from "@/screens/nav_bar";

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
          <>
            <NavBar />
            {/*<TransitionLayout> {children}</TransitionLayout>*/}
            {children}
            <Footer />
          </>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
