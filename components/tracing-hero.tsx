"use client";

import { motion } from "motion/react";
import { GlitchCanvas } from "./glitch-canvas";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { WaitlistInline } from "./waitlist-inline";

export function TracingHero() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-white pt-[68px]">
      <FrostedAura reduce={reduce} />

      <div className="relative mx-auto grid min-h-[calc(100dvh-68px)] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        {/* copy — left */}
        <div className="order-2 lg:order-1">
          <motion.h1
            className="font-display text-[clamp(3.6rem,12vw,9rem)] font-black leading-[0.88] tracking-[-0.015em] text-ink"
            initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            OUTFT.
          </motion.h1>

          <motion.span
            className="mt-3 block text-[11px] lowercase tracking-[0.46em] text-grey md:text-[12px]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            tracing fashion
          </motion.span>

          <motion.p
            className="mt-7 max-w-[34ch] text-[15px] leading-relaxed text-ink2 md:text-[16px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            One fit a day, traced back from pixels into a record of your taste and
            the people who share it.
          </motion.p>

          <motion.div
            className="mt-8 max-w-[440px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <WaitlistInline />
          </motion.div>
        </div>

        {/* animation — right */}
        <motion.div
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative overflow-hidden bg-white"
            style={{
              height: "clamp(420px, 74vh, 660px)",
              aspectRatio: "240 / 330",
              borderRadius: 22,
              boxShadow:
                "0 1px 0 1px rgba(255,255,255,.6) inset, 0 44px 90px -34px rgba(40,36,30,.5), 0 12px 30px -16px rgba(40,36,30,.28)",
            }}
          >
            <GlitchCanvas />
            <span
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 0 1px rgba(40,36,30,0.06)", borderRadius: 22 }}
            />
          </div>
        </motion.div>
      </div>

      {/* baseline meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 pb-6 text-[10px] uppercase tracking-[0.24em] text-grey md:px-10">
        <span>The fits you choose</span>
        <span className="hidden sm:block">Curate · Keep · Revisit</span>
        <span>Traced from pixels</span>
      </div>
    </section>
  );
}

function FrostedAura({ reduce }: { reduce: boolean }) {
  const blobs = [
    { c: "var(--color-mauve)", s: 420, top: "-8%", left: "-6%", d: 0 },
    { c: "var(--color-sage)", s: 360, top: "34%", left: "-10%", d: 6 },
    { c: "var(--color-sky)", s: 340, bottom: "-4%", left: "20%", d: 11 },
    { c: "var(--color-butter)", s: 320, top: "2%", left: "48%", d: 3 },
    { c: "var(--color-blush)", s: 300, bottom: "6%", right: "-4%", d: 8 },
    { c: "var(--color-lilac)", s: 280, top: "40%", right: "12%", d: 14 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* drifting colour */}
      <div className="absolute inset-0" style={{ filter: "blur(50px)" }}>
        {blobs.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.s,
              height: b.s,
              background: b.c,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
              mixBlendMode: "multiply",
              opacity: 0.7,
            }}
            animate={reduce ? undefined : { x: [0, 26, -14, 0], y: [0, -20, 14, 0], scale: [1, 1.08, 0.95, 1] }}
            transition={{ duration: 26, delay: -b.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* heavy frosted glass over the colour */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(60px) saturate(135%)",
          WebkitBackdropFilter: "blur(60px) saturate(135%)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.66))",
        }}
      />
      {/* frosted grain */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
