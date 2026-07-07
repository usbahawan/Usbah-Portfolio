import type { Metadata } from "next";
import { Hanken_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usbah-portfolio.vercel.app"),
  title: "Usbah Saleem — Mobile App Developer (Flutter) & AI Integration Engineer",
  description:
    "Mobile App Developer (Flutter) and Cross-Platform Engineer building production-grade Android and iOS applications with client-side AI integration.",
  keywords: [
    "Usbah Saleem",
    "Flutter Developer",
    "Software Engineer",
    "Cross-Platform Developer",
    "On-device AI",
    "Mobile App Developer",
    "Islamabad",
    "COMSATS University",
    "Supabase",
    "PostGIS",
    "Agora",
    "Computer Vision",
  ],
  authors: [{ name: "Usbah Saleem" }],
  creator: "Usbah Saleem",
  robots: "index, follow",
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
      className={`${hanken.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-emerald selection:text-paper font-sans">
        {children}
        <ScrollToTop />
        <PortfolioChatbot />
      </body>
    </html>
  );
}
