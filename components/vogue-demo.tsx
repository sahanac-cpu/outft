"use client";

import { motion } from "motion/react";
import { AESTHETIC_INDEX } from "@/lib/aesthetics";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/** The demo. One Vogue editorial spread: a fit, read back as a card. */
export function VogueDemo() {
  const reduce = useReducedMotionSafe();
  const lead = AESTHETIC_INDEX[0];
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="demo" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-36">
        <motion.span {...reveal()} className="lbl block">
          The app · A demonstration
        </motion.span>

        <motion.h2
          {...reveal(0.06)}
          className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink"
        >
          One fit, read back in numbers.
        </motion.h2>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          {/* the fit */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-full overflow-hidden sw6" style={{ aspectRatio: "4 / 5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/IMG_2115.jpeg" alt="A logged outfit" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-line pt-2.5">
              <span className="lbl">Fit Nº0091 · Oat linen</span>
              <span className="font-serif text-[15px] italic text-ink">Solo date</span>
            </figcaption>
          </motion.figure>

          {/* the read */}
          <div className="self-center">
            <motion.div {...reveal(0.1)}>
              <span className="lbl">You read as</span>
              <div className="mt-2 font-display text-[clamp(3.6rem,9vw,7rem)] font-normal leading-[0.88] tracking-[-0.02em] text-ink">
                {lead.pct}<span className="align-top text-[0.38em]">%</span>
              </div>
              <div className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] italic text-ink">
                {lead.label}.
              </div>
            </motion.div>

            <div className="mt-10">
              {AESTHETIC_INDEX.map((e, i) => (
                <motion.div
                  key={e.label}
                  className="border-t border-line py-4 last:border-b"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[clamp(1.2rem,2vw,1.7rem)] text-ink">{e.label}</span>
                    <span className="font-display text-[clamp(1.2rem,2vw,1.7rem)] text-ink">{e.pct}%</span>
                  </div>
                  <div className="mt-3 h-px w-full bg-line">
                    <motion.div
                      className="h-px bg-ink"
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: `${e.pct}%`, transformOrigin: "left" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
