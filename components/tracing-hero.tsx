"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { FITS, type Swatch } from "@/lib/fits";

// Plates woven into an S-curve wave (the "tracing art" line).
// x / y are percentages within the wave layer; size is px at desktop.
const NODES: { x: number; y: number; s: number; r: number; sw: Swatch }[] = [
  { x: 3, y: 64, s: 76, r: -7, sw: "sw1" },
  { x: 12, y: 49, s: 96, r: -3, sw: "sw3" },
  { x: 21, y: 62, s: 82, r: 5, sw: "sw6" },
  { x: 31, y: 46, s: 106, r: -2, sw: "sw2" },
  { x: 41, y: 60, s: 86, r: 6, sw: "sw5" },
  { x: 51, y: 41, s: 122, r: -4, sw: "sw4" },
  { x: 61, y: 58, s: 90, r: 3, sw: "sw3" },
  { x: 70, y: 44, s: 102, r: -3, sw: "sw1" },
  { x: 79, y: 60, s: 82, r: 5, sw: "sw6" },
  { x: 88, y: 46, s: 96, r: -2, sw: "sw5" },
  { x: 96, y: 62, s: 74, r: 4, sw: "sw2" },
];

export function TracingHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  // line draws as the section scrolls past
  const drift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-bone pt-[68px]"
    >
      {/* faint drifting auras */}
      <Auras />

      <div className="relative mx-auto flex min-h-[calc(100dvh-68px)] max-w-[1400px] flex-col px-6 md:px-10">
        {/* copy block — asymmetric, upper-left */}
        <div className="relative z-20 pt-[6vh] md:pt-[7vh]">
          <motion.span
            className="lbl block"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Trace your style
          </motion.span>

          <motion.h1
            className="mt-5 font-serif text-[clamp(3.6rem,11vw,9.5rem)] font-medium leading-[0.92] tracking-[-0.02em] text-ink"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Tracing <span className="italic text-ink2">Art</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[34ch] font-sans text-[15px] leading-relaxed text-ink2 md:text-[16px]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Every fit you log joins a line that traces your taste, and the people
            who share it.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/join"
              className="rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.97]"
            >
              Request access
            </Link>
            <Link
              href="/#demo"
              className="rounded-full border border-line2 bg-white/60 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink backdrop-blur-sm transition-colors hover:border-ink"
            >
              See it move
            </Link>
          </motion.div>
        </div>

        {/* the wave */}
        <div className="pointer-events-none relative z-10 mt-auto h-[44vh] w-full md:h-[52vh]">
          <motion.div
            className="absolute inset-0"
            style={reduce ? undefined : { y: drift }}
          >
            {/* trace line behind the plates */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1000 500"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M 20 330 C 140 200 210 430 320 250 C 430 70 470 430 530 220 C 600 -10 660 410 720 240 C 790 50 850 360 980 300"
                stroke="var(--color-ink)"
                strokeOpacity="0.22"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={reduce ? { pathLength: 1 } : { pathLength: scrollYProgress }}
              />
            </svg>

            {NODES.map((n, i) => {
              const fit = FITS[i % FITS.length];
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    width: `clamp(46px, ${n.s / 12}vw, ${n.s}px)`,
                    rotate: `${n.r}deg`,
                    x: "-50%",
                    y: "-50%",
                  }}
                  initial={reduce ? false : { opacity: 0, scale: 0.7, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`relative overflow-hidden ${fit.swatch}`}
                    style={{
                      aspectRatio: "4 / 5",
                      borderRadius: 8,
                      boxShadow: "0 18px 36px -22px rgba(40,36,30,0.5)",
                    }}
                  >
                    {fit.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={fit.src}
                        alt={fit.caption}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="grain-local" aria-hidden />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* baseline meta strip */}
      <div className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between px-6 pb-6 text-[10px] uppercase tracking-[0.24em] text-grey md:px-10">
        <span>The fits you choose</span>
        <span className="hidden sm:block">Curate · Keep · Revisit</span>
        <span>No. {FITS.length} logged today</span>
      </div>
    </section>
  );
}

function Auras() {
  const reduce = useReducedMotion();
  const blobs = [
    { c: "var(--color-mauve)", s: 360, top: "-6%", right: "-10%", d: 0 },
    { c: "var(--color-sage)", s: 320, top: "30%", left: "-14%", d: 6 },
    { c: "var(--color-sky)", s: 300, bottom: "4%", right: "8%", d: 11 },
    { c: "var(--color-butter)", s: 260, top: "12%", left: "30%", d: 3 },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ filter: "blur(70px)" }}
      aria-hidden
    >
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
            opacity: 0.55,
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 24, -12, 0],
                  y: [0, -20, 14, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: 22,
            delay: -b.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
