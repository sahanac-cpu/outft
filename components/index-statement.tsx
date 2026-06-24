"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const GROTESK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* static inline image chip in the broadsheet headline */
function Chip({ src, sw }: { src?: string; sw?: string }) {
  return (
    <span
      className={`mx-[0.1em] inline-block h-[0.64em] w-[0.96em] translate-y-[0.03em] overflow-hidden rounded-[3px] border border-black/40 align-middle ${sw ?? ""}`}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      )}
    </span>
  );
}

/**
 * The index statement from the Why page — just the broadsheet headline, no feed
 * cards. Sits on the landing page directly after the hero.
 */
export function IndexStatement() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="border-t border-line2 bg-white px-4 py-20 text-black md:px-6 md:py-28">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: GROTESK }}
        className="mx-auto max-w-[1280px] text-[clamp(1.7rem,5.2vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.03em]"
      >
        OUTFT <Chip src="/IMG_2115.jpeg" /> is a style self-knowledge product{" "}
        <Chip sw="sw4" /> tracing the fits <Chip src="/IMG_2141.png" /> you
        actually wore <Chip sw="sw3" /> back into fashion, beauty,{" "}
        <Chip sw="sw5" /> and you — in numbers.
      </motion.h2>
    </section>
  );
}
