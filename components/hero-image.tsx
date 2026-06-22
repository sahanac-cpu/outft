"use client";

import { motion } from "motion/react";
import { AnimatedHeadline } from "./animated-headline";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Full-bleed hero. The blurred figure is the background; the headline performs
 * the cascade over it. Slow ken-burns drift, faint grain, editorial.
 */
export function HeroImage() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* background image */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 16, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/IMG_2141.png"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* legibility wash + vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 40%, rgba(255,255,255,0.10), rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.78))",
          }}
        />
      </motion.div>

      {/* content */}
      <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center px-6 md:px-10">
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lbl block"
        >
          OUTFT — Style Journal · Nº01
        </motion.span>

        <AnimatedHeadline
          className="mt-6 font-display text-[clamp(3.4rem,12vw,11rem)] font-normal leading-[0.92] tracking-[-0.03em] text-ink"
          lines={[{ text: "Your style," }, { text: "in numbers.", italic: true }]}
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[42ch] font-serif text-[clamp(1.15rem,2vw,1.6rem)] font-light leading-snug text-ink2"
        >
          Log the fits you actually wore. OUTFT reads them back as a breakdown,
          and prints the card that says who you are.
        </motion.p>

        <motion.a
          href="#demo"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="lbl lbl-ink mt-10 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 hover:opacity-60"
        >
          See the demo
          <span aria-hidden>↓</span>
        </motion.a>
      </div>

      {/* corner meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto flex max-w-[1500px] items-center justify-between px-6 pb-6 md:px-10">
        <span className="lbl">Log · Read · Share</span>
        <span className="lbl">Est. 2026 · iOS first</span>
      </div>
    </section>
  );
}
