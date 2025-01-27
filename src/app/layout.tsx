  import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/layouts/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BASSEVENTS - Experimental Bass Music Events",
  description: "Your premier destination for experimental bass music events.",
  keywords: "bass music, electronic music, events, concerts, experimental music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-black text-white`}
      >
        <Header />
        {/* Content wrapper */}
        <div className="flex-grow bg-black pt-4">
          {/* Content layer with proper isolation and event handling */}
          <main className="relative isolate z-0">
            {/* Background layer to prevent click-through */}
            <div className="absolute inset-0 bg-black pointer-events-none" />
            {/* Content with proper event handling */}
            <div className="relative pointer-events-auto">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
