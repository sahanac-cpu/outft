"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const N = 18;
const SRC = "/IMG_2115.jpeg";

/**
 * Image 1 — a portrait sliced into vertical strips, each nudged out of
 * register, settling into alignment on load. Thin parchment seams show the
 * cut. A hand-drawn brush line crosses it. Magazine metadata frames it.
 */
export function SlicedHero() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative px-3 pt-[112px] md:px-6 md:pt-[128px]">
      {/* top metadata strip */}
      <div className="mx-auto mb-3 flex max-w-[1400px] items-end justify-between px-1">
        <span className="meta meta-grey">OUTFT — STYLE JOURNAL</span>
        <span className="meta meta-grey hidden sm:block">FW26 / THE AESTHETIC ISSUE</span>
        <span className="meta meta-grey">FIG. 01</span>
      </div>

      {/* sliced image */}
      <div className="relative mx-auto flex max-w-[1400px] gap-px overflow-hidden" style={{ height: "min(74vh, 760px)" }}>
        {Array.from({ length: N }).map((_, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          const mag = 40 + (i % 5) * 22;
          return (
            <div key={i} className="relative h-full flex-1 overflow-hidden">
              <motion.div
                className="absolute inset-y-0"
                style={{ width: `${N * 100}%`, left: `${-i * 100}%` }}
                initial={reduce ? false : { y: dir * mag, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SRC}
                  alt="A logged outfit, sliced"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          );
        })}

        {/* brush-line overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M-20 250 C 180 150, 360 360, 560 230 S 900 120, 1040 280"
            fill="none"
            stroke="#16140f"
            strokeWidth="9"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M-20 470 C 200 420, 320 520, 520 470 S 860 400, 1040 500"
            fill="none"
            stroke="#16140f"
            strokeWidth="6"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      {/* headline block under the image */}
      <div className="mx-auto mt-6 max-w-[1400px] px-1">
        <div className="grid gap-4 border-t border-ink pt-5 md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="font-display text-[clamp(2.6rem,8vw,7rem)] font-black leading-[0.86] tracking-[-0.02em] text-ink">
            Your style,<br />in numbers.
          </h1>
          <p className="max-w-[40ch] font-serif text-[clamp(1.1rem,2vw,1.5rem)] italic leading-snug text-ink2 md:text-right">
            Log the fits you actually wore. OUTFT reads them back as a
            breakdown — and prints the card that says who you are.
          </p>
        </div>
      </div>
    </section>
  );
}
