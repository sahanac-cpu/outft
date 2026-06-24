"use client";

import { motion } from "motion/react";
import { AESTHETIC_INDEX } from "@/lib/aesthetics";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/** Feature 02 — Read. The aesthetic breakdown, minimal: a lead number and a
 *  clean list of thin bars. Hierarchy by size, lots of white. */
export function IndexSpread() {
  const reduce = useReducedMotionSafe();
  const lead = AESTHETIC_INDEX[0];

  return (
    <section id="read" className="relative border-t border-line">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-10 md:py-28">
        {/* lead */}
        <div>
          <span className="lbl">The app · 02</span>
          <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
            Read it in numbers.
          </h2>
          <p className="mt-6 max-w-[36ch] font-serif text-[clamp(1.05rem,1.8vw,1.3rem)] font-light leading-snug text-ink2">
            OUTFT reads palette, cut and register across your logged fits and
            hands you the breakdown. Your style, quantified.
          </p>
          <div className="mt-10">
            <span className="lbl">You read as</span>
            <div className="font-display text-[clamp(3.4rem,8vw,6rem)] font-normal leading-[0.9] tracking-[-0.02em] text-ink">
              {lead.pct}<span className="align-top text-[0.4em]">%</span>
            </div>
            <div className="font-serif text-[clamp(1.4rem,3vw,2rem)] italic text-ink">
              {lead.label}.
            </div>
          </div>
        </div>

        {/* breakdown list */}
        <div className="self-center">
          {AESTHETIC_INDEX.map((e, i) => (
            <motion.div
              key={e.label}
              className="border-t border-line py-5 last:border-b"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-normal text-ink">
                  {e.label}
                </span>
                <span className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-normal text-ink">
                  {e.pct}%
                </span>
              </div>
              <div className="mt-3 h-px w-full bg-line">
                <motion.div
                  className="h-px bg-ink"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: `${e.pct}%`, transformOrigin: "left" }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="lbl">{e.note}</span>
                <span className="lbl">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
