"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export function RequestAccess() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="access" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-28 text-center md:px-10 md:py-44">
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lbl block"
        >
          Early access
        </motion.span>

        <motion.h2
          initial={reduce ? false : { y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,8vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
        >
          Come and see it for yourself.
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
        >
          <Link
            href="/request-demo"
            className="lbl lbl-ink border-b border-ink pb-1.5 text-[12px] hover:opacity-60"
          >
            Request a demo →
          </Link>
          <Link
            href="/founders"
            className="lbl lbl-ink border-b border-ink pb-1.5 text-[12px] hover:opacity-60"
          >
            Talk to the founders →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
