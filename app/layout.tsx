import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Creator Ops — Your AI Platform, Built and Operated",
  description:
    "Creator Ops builds branded AI platforms for coaches and course creators — trained on your content, your voice, and your frameworks. Deployed everywhere your students are.",
  metadataBase: new URL("https://creator-ops.site"),
  openGraph: {
    title: "Creator Ops — Your AI Platform, Built and Operated",
    description:
      "A 24/7 AI version of you. Trained on your content. Deployed in Discord, WhatsApp, and your site.",
    url: "https://creator-ops.site",
    siteName: "Creator Ops",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Ops — Your AI Platform, Built and Operated",
    description:
      "A 24/7 AI version of you. Trained on your content. Deployed in Discord, WhatsApp, and your site.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable}`}
    >
      <body className="grain bg-bg text-ink antialiased overflow-x-hidden">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
