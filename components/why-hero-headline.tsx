"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const LINES = [
  { text: "Getting dressed is", delay: 0.1 },
  { text: "the creative act", delay: 0.22 },
  { text: "you repeat every day.", delay: 0.34 },
];

export function WhyHeroHeadline() {
  const reduce = useReducedMotionSafe();

  return (
    <>
      <h1 className="mt-7 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.022em] text-[#000000]">
        {LINES.map(({ text, delay }) => (
          <span key={text} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className="mt-8 w-full"
        style={{ height: 1, background: "#333333", transformOrigin: "left" }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
