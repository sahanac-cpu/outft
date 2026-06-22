"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { WaitlistInline } from "./waitlist-inline";

export function TracingHero() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#f3f1ec] pt-[60px]">

      {/* full-bleed background figure */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/IMG_2141.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-60px)] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_0.88fr] lg:gap-20">

        {/* left — copy */}
        <div className="order-2 lg:order-1">
          {/* eyebrow */}
          <motion.span
            className="lbl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Tracing fashion
          </motion.span>

          {/* headline — mask reveal per line (animate, not whileInView — above fold) */}
          <h1 className="mt-5 overflow-hidden font-display text-[clamp(5rem,13vw,10rem)] font-bold leading-[0.88] tracking-[-0.022em] text-[#000000]">
            <motion.span
              className="block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              OUTFT.
            </motion.span>
          </h1>

          {/* rule draws in after headline */}
          <motion.div
            className="mt-6 w-full max-w-[420px]"
            style={{ height: 1, background: "#333333", transformOrigin: "left" }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="mt-6 max-w-[36ch] font-sans text-[15px] font-light leading-relaxed text-[#555555]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            One fit a day, traced back from pixels into a record of your taste
            and the people who share it.
          </motion.p>

          <motion.div
            className="mt-8 max-w-[420px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <WaitlistInline />
          </motion.div>
        </div>

        {/* right — editorial index card */}
        <motion.div
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
        >
          <HeroCard />
        </motion.div>
      </div>

      {/* bottom meta strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1400px] items-center justify-between border-t border-[#333333] px-6 py-4 md:px-10">
        <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-[#808080]">
          The fits you choose
        </span>
        <span className="hidden font-sans text-[10px] font-light uppercase tracking-[0.28em] text-[#808080] sm:block">
          Curate · Keep · Revisit
        </span>
        <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-[#808080]">
          Traced from pixels
        </span>
      </div>
    </section>
  );
}

/* The hero visual — a stark editorial "fit ticket" card */
function HeroCard() {
  const rows = [
    ["Date", "04 · 06 · 2026"],
    ["Window", "Afternoon"],
    ["Occasion", "Solo date"],
    ["Look no.", "0097"],
    ["Match", "92% — @lenav"],
  ];

  const BARS = Array.from({ length: 48 }, (_, i) => ({
    w: ((i * 73) % 5) * 0.4 + 0.7,
    h: (((i * 37) % 10) / 10) * 0.5 + 0.5,
    faint: (i * 17) % 9 === 0,
  }));

  return (
    <div
      className="w-full max-w-[320px] border border-[#000000] bg-[#f3f1ec]"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-[#333333] px-5 py-4">
        <span className="font-display text-[13px] font-bold tracking-[-0.01em] text-[#000000]">
          OUTFT.
        </span>
        <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-[#808080]">
          fit of record
        </span>
      </div>

      {/* image placeholder — ruled rectangle */}
      <div
        className="relative mx-5 mt-4"
        style={{ aspectRatio: "4/3", background: "#ede9e2", border: "1px solid #333333" }}
      >
        {/* grid lines as art direction */}
        <div className="absolute inset-0 flex flex-col justify-evenly">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-px w-full bg-[#e0e0e0]" />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-row justify-evenly">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-full w-px bg-[#e0e0e0]" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-[#999999]">
            today's fit
          </span>
        </div>
      </div>

      {/* metadata rows */}
      <div className="mt-3 px-5">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex items-baseline justify-between py-2 ${
              i > 0 ? "border-t border-[#dedad4]" : ""
            }`}
          >
            <span className="font-sans text-[10px] font-light uppercase tracking-[0.18em] text-[#808080]">
              {k}
            </span>
            <span className="font-sans text-[11px] font-light text-[#000000]">
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* barcode */}
      <div className="mx-5 mt-3 flex h-8 items-end justify-center gap-px border-t border-[#333333] pt-3">
        {BARS.map((b, i) => (
          <i
            key={i}
            className="block bg-[#000000]"
            style={{
              width: `${b.w}px`,
              height: `${b.h * 100}%`,
              opacity: b.faint ? 0.2 : 1,
            }}
          />
        ))}
      </div>
      <div className="pb-4 pt-1 text-center font-sans text-[7px] font-light tracking-[0.26em] text-[#555555]">
        OUTFT · 1716 3357 9486 7750
      </div>
    </div>
  );
}
