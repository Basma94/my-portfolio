import type { Metadata, Viewport } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

/* Poppins throughout, Light 300 / Regular 400 / Medium 500 / SemiBold 600 /
   Bold 700. Caveat is the secondary script face the design system reserves for
   the handwritten accent. Both are named on the Mingloo brand sheet. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basmamahmoud.com"),
  title: {
    default: "Basma Mahmoud — Senior AI Product Manager",
    template: "%s — Basma Mahmoud",
  },
  description:
    "Basma Mahmoud, Senior AI Product Manager. AI product management, AI product strategy, telecom AI and measurable business value — explored as an interactive product experience.",
  keywords: [
    "Senior AI Product Manager",
    "AI Product Manager",
    "Product Manager AI",
    "AI Product Strategy",
    "AI Product Management",
    "Telecom AI",
  ],
  authors: [{ name: "Basma Mahmoud" }],
  openGraph: {
    type: "website",
    siteName: "Basma Mahmoud — Senior AI Product Manager",
    title: "Basma Mahmoud — Senior AI Product Manager",
    description:
      "I turn complex problems into products, strategies and measurable value. Explore the products, the judgement behind them and a working AI business value agent.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
