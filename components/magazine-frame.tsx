"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Read", href: "/#read" },
  { label: "Log", href: "/#log" },
  { label: "Friends", href: "/#friends" },
  { label: "Journal", href: "/why" },
  { label: "FAQ", href: "/faq" },
];

export function MagazineFrame() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* fixed corner metadata — frames the viewport like a printed sheet (img 5) */}
      <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
        <span className="meta meta-grey absolute left-4 top-3">
          OUTFT©2026
        </span>
        <span className="meta meta-grey absolute right-4 top-3 text-right">
          STYLE JOURNAL / Nº01
        </span>
        <span className="meta meta-grey absolute bottom-3 left-4">
          THE FITS YOU CHOSE
        </span>
        <span className="meta meta-grey absolute bottom-3 right-4 text-right">
          US · iOS FIRST
        </span>
      </div>

      {/* centered serif masthead + dividered nav (img 3 — Antihero) */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line2 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto max-w-[1100px] px-6 pb-3 pt-4 md:px-10">
          <div className="flex items-center justify-between md:block md:text-center">
            <Link
              href="/"
              aria-label="OUTFT home"
              className="font-display text-[20px] font-extrabold tracking-[-0.01em] text-ink md:text-[26px]"
            >
              OUTFT.
            </Link>

            {/* mobile toggle */}
            <button
              className="md:hidden"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="meta">{open ? "CLOSE" : "INDEX"}</span>
            </button>
          </div>

          {/* desktop nav row with vertical rules */}
          <nav className="mt-2.5 hidden items-center justify-center md:flex">
            {NAV.map((l, i) => (
              <span key={l.label} className="flex items-center">
                {i > 0 && (
                  <span className="mx-5 h-3 w-px bg-line2" aria-hidden />
                )}
                <Link
                  href={l.href}
                  className="meta meta-grey transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </span>
            ))}
            <span className="mx-5 h-3 w-px bg-line2" aria-hidden />
            <Link href="/join" className="meta text-accent hover:opacity-70">
              Request access ↗
            </Link>
          </nav>
        </div>

        {/* mobile sheet */}
        {open && (
          <div className="border-t border-line2 bg-bg px-6 py-4 md:hidden">
            {NAV.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 font-display text-[22px] font-bold text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-4 block text-center meta text-accent"
            >
              Request access ↗
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
