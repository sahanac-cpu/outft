import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { AuraBg } from "@/components/aura-bg";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
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
  title: "OUTFT. — your style, in numbers",
  description:
    "An editorial style journal. Log the fits you wore, read your aesthetic in percentages, share the card and follow friends' style stats.",
  openGraph: {
    title: "OUTFT. — your style, in numbers",
    description:
      "Log what you wore. Read your aesthetic in percentages. Share the card. Follow friends.",
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
        <AuraBg />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
