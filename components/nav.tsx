"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "./logo";

const LINKS = [
  { label: "Tracing", href: "/" },
  { label: "The app", href: "/#demo" },
  { label: "Why", href: "/why" },
  { label: "FAQ", href: "/faq" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 24);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
        borderColor: solid ? "rgba(236,234,229,1)" : "rgba(236,234,229,0)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backdropFilter: solid ? "blur(16px) saturate(120%)" : "none",
        WebkitBackdropFilter: solid ? "blur(16px) saturate(120%)" : "none",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Logo size="1.4rem" />

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[12.5px] tracking-[0.04em] text-ink2 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.97]"
          >
            Request access
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className="h-px w-5 bg-ink transition-transform"
              style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-px w-5 bg-ink transition-opacity"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="h-px w-5 bg-ink transition-transform"
              style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
            />
          </div>
        </button>
      </nav>

      {/* mobile sheet */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 font-serif text-[22px] text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-ink px-5 py-3 text-center text-[11px] uppercase tracking-[0.18em] text-white"
          >
            Request access
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
