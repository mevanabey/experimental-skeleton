import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { MainNavigation } from "@/components/molecules/main-navigation";
import { Header } from "@/components/molecules/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRUSTNet Mobile Form Test",
  description: "TRUSTNet Mobile Form Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`min-h-screen w-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200 dark:bg-zinc-900 text-foreground`}
      >
        <Header />
          <main className="grow pb-24">
            {children}
          </main>
        <MainNavigation />
      </body>
    </html>
  );
}
