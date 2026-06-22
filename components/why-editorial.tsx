"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const PRINCIPLES = [
  {
    n: "01",
    t: "Log the real thing",
    b: "Not a wishlist, not a styling fantasy — the fit you actually wore. A visual diary of your wardrobe in use is the only honest input.",
  },
  {
    n: "02",
    t: "Taste is measurable",
    b: "Read enough of your fits and a shape appears: old money, streetwear, minimalist, the wildcard slice. OUTFT hands it back in numbers.",
  },
  {
    n: "03",
    t: "The card is the point",
    b: "Your aesthetic card is a self-portrait worth posting. Share it, and follow the friends whose stats you want beside yours.",
  },
];

/** Why — the manifesto. Minimal, airy, one reveal, hierarchy by size. */
export function WhyEditorial() {
  const reduce = useReducedMotionSafe();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="why" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-36">
        <motion.span {...reveal()} className="lbl block">
          Why OUTFT
        </motion.span>

        <motion.h2
          {...reveal(0.06)}
          className="mt-7 max-w-[16ch] font-display text-[clamp(2.4rem,6.5vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
        >
          Everyone tracks their workouts. Nobody tracks their taste.
        </motion.h2>

        <motion.p
          {...reveal(0.12)}
          className="mt-9 max-w-[58ch] font-serif text-[clamp(1.15rem,2vw,1.6rem)] font-light italic leading-snug text-ink2"
        >
          You repeat the creative act of getting dressed every single day, and
          none of it gets measured. OUTFT logs the fits you actually wore and
          reads them back — so the thing you spend the most attention on finally
          has a number on it.
        </motion.p>

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={p.n} {...reveal(0.12 + i * 0.08)} className="border-t border-line pt-5">
              <span className="lbl">{p.n}</span>
              <h3 className="mt-4 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-normal leading-tight text-ink">
                {p.t}
              </h3>
              <p className="mt-3 max-w-[40ch] font-serif text-[16px] font-light leading-relaxed text-ink2">
                {p.b}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
