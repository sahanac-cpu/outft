"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CrumpledBg } from "@/components/crumpled-bg";
import {
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
} from "@/components/ui/underline-animation";

export function Footer() {
  const pathname = usePathname();
  // /why is a single, self-contained screen — no footer below it.
  if (pathname === "/why") return null;

  return (
    <footer className="relative overflow-hidden border-t border-line2 text-ink">
      <CrumpledBg overlay={0.64} />
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <span className="font-display text-[24px] font-semibold tracking-[-0.01em] text-ink">
              OUTFT.
            </span>
            <p className="mt-4 max-w-[34ch] font-serif text-[20px] font-light italic leading-snug text-ink2">
              Log what you wore. Read your aesthetic in numbers. The fits you
              chose, kept like records.
            </p>
          </div>

          {/* contact — same edits as the founders page */}
          <div className="flex flex-row items-start gap-8 font-sans text-[clamp(0.95rem,1.6vw,1.25rem)] uppercase tracking-tight text-ink md:justify-end">
            <div className="text-[#808080]">Contact</div>
            <ul className="flex flex-col space-y-1.5">
              <li>
                <Link href="https://instagram.com/outft.co" target="_blank" rel="noopener noreferrer">
                  <ComesInGoesOutUnderline label="Instagram — outft.co" direction="right" />
                </Link>
              </li>
              <li className="pt-8">
                <Link href="mailto:sahana@outft.app">
                  <GoesOutComesInUnderline label="sahana@outft.app" direction="left" />
                </Link>
              </li>
              <li>
                <Link href="mailto:victoria@outft.app">
                  <GoesOutComesInUnderline label="victoria@outft.app" direction="right" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[#bdb8af] pt-6 md:flex-row md:items-center md:justify-between">
          <span className="lbl">OUTFT © 2026 · Style Journal Nº01</span>
          <span className="lbl">Log · Read · Share</span>
          <span className="lbl">The fits you chose</span>
        </div>
      </div>
    </footer>
  );
}
