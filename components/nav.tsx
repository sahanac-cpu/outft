"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

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
      className="fixed inset-x-0 top-0 z-50 bg-white/75 backdrop-blur-md"
      animate={{ borderColor: solid ? "#333333" : "transparent" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
    >
      <nav className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* wordmark */}
        <Link
          href="/"
          aria-label="OUTFT home"
          className="font-display text-[15px] font-bold tracking-[-0.01em] text-[#000000]"
        >
          OUTFT.
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-sans text-[12px] font-light tracking-[0.06em] text-[#555555] transition-colors duration-150 hover:text-[#000000]"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/join" className="btn-ghost text-[10px]">
            Request access
          </Link>
        </div>

        {/* mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className="h-px w-5 bg-[#000000] transition-transform"
              style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-px w-5 bg-[#000000] transition-opacity"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="h-px w-5 bg-[#000000] transition-transform"
              style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
            />
          </div>
        </button>
      </nav>

      {/* mobile sheet */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-t border-[#333333] bg-white md:hidden"
      >
        <div className="flex flex-col px-6 py-5">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[#333333] py-4 font-serif text-[22px] font-light text-[#000000]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="btn-ghost mt-5 justify-center"
          >
            Request access
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
