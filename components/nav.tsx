"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

const LINKS = [
  { label: "The demo", href: "/#demo" },
  { label: "Request a demo", href: "/request-demo" },
  { label: "Founders", href: "/founders" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0)",
        borderColor: solid ? "rgba(221,217,210,1)" : "rgba(221,217,210,0)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backdropFilter: solid ? "blur(14px)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px)" : "none",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <nav className="mx-auto flex h-[64px] max-w-[1500px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label="OUTFT home"
          className="font-display text-[19px] font-semibold tracking-[-0.01em] text-ink"
        >
          OUTFT.
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="lbl hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href="/request-demo"
            className="lbl lbl-ink border-b border-ink pb-1 hover:opacity-60"
          >
            Request access
          </Link>
        </div>

        <button
          className="md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="lbl lbl-ink">{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white/95 px-6 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 font-display text-[22px] text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/request-demo" onClick={() => setOpen(false)} className="mt-4 block lbl lbl-ink">
            Request access
          </Link>
        </div>
      )}
    </motion.header>
  );
}
