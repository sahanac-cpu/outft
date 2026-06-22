"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CircularRevealHeadingProps {
  text: string;
  className?: string;
}

export function CircularRevealHeading({ text, className = "" }: CircularRevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ghost text underneath */}
      <p
        aria-hidden
        className="select-none font-display font-bold leading-[0.9] tracking-[-0.022em] text-[#e8e6e0]"
      >
        {text}
      </p>

      {/* revealed text on top */}
      <motion.p
        style={{ clipPath }}
        className="absolute inset-0 font-display font-bold leading-[0.9] tracking-[-0.022em] text-[#000000]"
      >
        {text}
      </motion.p>
    </div>
  );
}
