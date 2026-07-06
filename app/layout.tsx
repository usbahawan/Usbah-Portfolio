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
  title: "Usbah Saleem — Cross-Platform Mobile & AI Engineer",
  description:
    "Portfolio of Usbah Saleem, a Cross-Platform & AI Engineer specializing in production-quality mobile apps and client-side AI architectures. BS CS student at COMSATS University Islamabad.",
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
