"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface UnderlineProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* underline grows from the centre on hover */
export function CenterUnderline({ label, className = "", onClick }: UnderlineProps) {
  return (
    <motion.span
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {label}
      <motion.span
        aria-hidden
        className="absolute -bottom-[2px] left-0 right-0 block h-[2px] bg-current"
        style={{ transformOrigin: "center" }}
        variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </motion.span>
  );
}

/* underline comes in from `direction`, goes out the opposite side on leave */
export function ComesInGoesOutUnderline({
  label,
  direction = "left",
  className = "",
  onClick,
}: UnderlineProps & { direction?: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);
  const origin = hovered
    ? direction === "left"
      ? "left"
      : "right"
    : direction === "left"
      ? "right"
      : "left";
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {label}
      <motion.span
        aria-hidden
        className="absolute -bottom-[2px] left-0 right-0 block h-[2px] bg-current"
        style={{ transformOrigin: origin }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}

/* underline goes out from `direction`, comes back in from the opposite side */
export function GoesOutComesInUnderline({
  label,
  direction = "left",
  className = "",
  onClick,
}: UnderlineProps & { direction?: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);
  const origin = hovered
    ? direction === "left"
      ? "right"
      : "left"
    : direction === "left"
      ? "left"
      : "right";
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {label}
      <motion.span
        aria-hidden
        className="absolute -bottom-[2px] left-0 right-0 block h-[2px] bg-current"
        style={{ transformOrigin: origin }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}
