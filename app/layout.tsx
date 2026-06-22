import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OUTFT. the fits you choose",
  description:
    "A daily ritual for getting dressed. Post your fit to see your friends'. Trace your style, read your fashion DNA, find the people you dress like.",
  openGraph: {
    title: "OUTFT. the fits you choose",
    description:
      "A daily ritual for getting dressed. Post to see. Trace your style. Read your fashion DNA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${jost.variable} antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
