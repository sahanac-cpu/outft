"use client";

import { motion } from "motion/react";
import { LOG_FITS } from "@/lib/aesthetics";
import { FitPlate } from "./fit-plate";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/** Feature 01 — Log. A clean editorial fit grid, Zara-minimal. */
export function WindowStack() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="log" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="lbl">The app · 01</span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
              Log what you wore.
            </h2>
          </div>
          <p className="max-w-[40ch] font-serif text-[clamp(1.05rem,1.8vw,1.35rem)] font-light leading-snug text-ink2">
            Snap the fit you actually had on. No styling, no closet to maintain —
            just a quiet diary of your real wardrobe in use.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {LOG_FITS.map((f, i) => (
            <motion.figure
              key={i}
              initial={reduce ? false : { y: 26, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <FitPlate swatch={f.swatch} src={f.src} aspect="4 / 5" rounded="0px" shadow={false} />
              <figcaption className="mt-3 flex items-baseline justify-between border-t border-line pt-2.5">
                <span className="lbl">{f.occasion}</span>
                <span className="font-serif text-[15px] italic text-ink">{f.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
