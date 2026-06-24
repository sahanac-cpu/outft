"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CrumpledBg } from "./crumpled-bg";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export function ShortWhy() {
  const reduce = useReducedMotionSafe();
  const up = (delay = 0) => ({
    initial: reduce ? false : { y: 22, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="why" className="relative overflow-hidden border-t border-line2 text-ink">
      <CrumpledBg overlay={0.6} />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-28 text-center md:px-10 md:py-40">
        <motion.span {...up(0)} className="lbl block">
          Why OUTFT
        </motion.span>
        <motion.h2
          {...up(0.06)}
          className="mx-auto mt-7 max-w-[18ch] font-display text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.0] tracking-[-0.02em]"
        >
          Everyone tracks their workouts. Nobody tracks their taste.
        </motion.h2>
        <motion.p
          {...up(0.12)}
          className="mx-auto mt-7 max-w-[52ch] font-serif text-[clamp(1.15rem,2vw,1.55rem)] font-light italic leading-snug text-ink2"
        >
          We trace the fits you actually wore and read your wardrobe back as a
          number — fashion, then you.
        </motion.p>
        <motion.div {...up(0.18)} className="mt-10">
          <Link
            href="/why"
            className="lbl lbl-ink inline-block border-b border-ink pb-1 hover:opacity-60"
          >
            Learn more →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
