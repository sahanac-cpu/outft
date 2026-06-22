"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/* Clip-path mask reveal — text slides up from behind a bottom mask.
   Matches the Alt–Border / Laura Monin editorial reveal pattern. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotionSafe();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Comp>
  );
}

/* Inline mask reveal for individual lines — used by hero and large display type */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduce ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Rule draw — scaleX 0→1 from left */
export function RuleDraw({
  delay = 0,
  className = "",
  color = "#333333",
}: {
  delay?: number;
  className?: string;
  color?: string;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      className={className}
      style={{ height: 1, background: color, transformOrigin: "left" }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
