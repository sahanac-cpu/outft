"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * The aura background from git main, promoted to a fixed full-page layer.
 * Drifting muted colour blobs under heavy frosted-white glass — reads as
 * white-dominant with a faint shifting tint. Sits behind all content.
 */
const BLOBS = [
  { c: "var(--color-mauve)", s: 520, top: "-10%", left: "-8%", d: 0 },
  { c: "var(--color-sage)", s: 460, top: "28%", left: "-12%", d: 6 },
  { c: "var(--color-sky)", s: 440, bottom: "-6%", left: "18%", d: 11 },
  { c: "var(--color-butter)", s: 420, top: "6%", left: "46%", d: 3 },
  { c: "var(--color-blush)", s: 400, bottom: "8%", right: "-6%", d: 8 },
  { c: "var(--color-lilac)", s: 360, top: "44%", right: "10%", d: 14 },
] as const;

export function AuraBg() {
  const reduce = useReducedMotionSafe();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* drifting colour */}
      <div className="absolute inset-0" style={{ filter: "blur(60px)" }}>
        {BLOBS.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.s,
              height: b.s,
              background: b.c,
              top: "top" in b ? b.top : undefined,
              bottom: "bottom" in b ? b.bottom : undefined,
              left: "left" in b ? b.left : undefined,
              right: "right" in b ? b.right : undefined,
              mixBlendMode: "multiply",
              opacity: 0.55,
            }}
            animate={reduce ? undefined : { x: [0, 30, -16, 0], y: [0, -22, 16, 0], scale: [1, 1.08, 0.95, 1] }}
            transition={{ duration: 30, delay: -b.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* heavy frosted glass — keeps it mostly white */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(70px) saturate(125%)",
          WebkitBackdropFilter: "blur(70px) saturate(125%)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.76))",
        }}
      />
      {/* faint grain */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
