"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type Line = { text: string; italic?: boolean };

/**
 * Cinematic headline. Each character rises from behind a mask, blur clearing,
 * staggered into a cascade. Editorial, expensive, one gesture.
 */
export function AnimatedHeadline({
  lines,
  className = "",
  start = 0.25,
  per = 0.028,
}: {
  lines: Line[];
  className?: string;
  start?: number;
  per?: number;
}) {
  const reduce = useReducedMotionSafe();
  let k = 0;

  return (
    <h1 className={className} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em]" aria-hidden>
          <span className={`block ${line.italic ? "italic" : ""}`}>
            {Array.from(line.text).map((ch, ci) => {
              const delay = start + k * per;
              k += 1;
              return (
                <motion.span
                  key={ci}
                  className="inline-block will-change-transform"
                  initial={
                    reduce
                      ? false
                      : { y: "115%", opacity: 0, filter: "blur(14px)", rotateX: 40 }
                  }
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotateX: 0 }}
                  transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "bottom" }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
