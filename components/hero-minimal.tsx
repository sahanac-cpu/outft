"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Minimal editorial hero — white, airy, type-led, one clean image. The aura
 * drifts behind. Replaces the sliced-strip hero.
 */
export function HeroMinimal() {
  const reduce = useReducedMotionSafe();
  const up = (delay = 0) => ({
    initial: reduce ? false : { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative min-h-[100svh] pt-[64px]">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-6 pb-16 pt-[8vh] md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-24">
        {/* type column */}
        <div>
          <motion.span {...up(0)} className="lbl block">
            OUTFT — Style Journal · Nº01
          </motion.span>

          <motion.h1
            {...up(0.08)}
            className="mt-7 font-display text-[clamp(3rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
          >
            Your style,
            <br />
            <span className="italic">in numbers.</span>
          </motion.h1>

          <motion.p
            {...up(0.18)}
            className="mt-8 max-w-[44ch] font-serif text-[clamp(1.15rem,2vw,1.6rem)] font-light leading-snug text-ink2"
          >
            Log the fits you actually wore. OUTFT reads them back as a
            breakdown — old money, streetwear, minimalist — and prints the card
            that says who you are.
          </motion.p>

          <motion.div {...up(0.28)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="/#join" className="lbl lbl-ink border-b border-ink pb-1 hover:opacity-60">
              Request access
            </a>
            {["Log", "Read", "Share"].map((s, i) => (
              <span key={s} className="lbl">
                {String(i + 1).padStart(2, "0")} {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* image column — one clean editorial plate */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/IMG_2115.jpeg"
              alt="A logged outfit"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between">
            <span className="lbl">Fit Nº0091 · Oat linen</span>
            <span className="lbl">Solo date</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
