"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const FACETS = [
  { label: "Quiet luxury", p: 41, sw: "sw3", angle: -90 },
  { label: "Old money", p: 23, sw: "sw5", angle: -18 },
  { label: "Scandi", p: 18, sw: "sw2", angle: 54 },
  { label: "Coastal", p: 11, sw: "sw6", angle: 126 },
  { label: "Eclectic", p: 7, sw: "sw4", angle: 198 },
];

const SIZE = 380;
const C = SIZE / 2;
const R = 126;

export function DnaWheel() {
  const reduce = useReducedMotionSafe();
  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
      {/* spokes */}
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
        {FACETS.map((f) => {
          const a = (f.angle * Math.PI) / 180;
          return (
            <line
              key={f.label}
              x1={C}
              y1={C}
              x2={C + Math.cos(a) * R}
              y2={C + Math.sin(a) * R}
              stroke="var(--color-line2)"
            />
          );
        })}
      </svg>

      {/* dashed orbit */}
      <motion.div
        className="absolute rounded-full border border-dashed border-line2"
        style={{ width: R * 2, height: R * 2, left: C - R, top: C - R }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-[-4px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-grey-soft" />
      </motion.div>

      {/* center */}
      <div
        className="absolute grid place-items-center rounded-full bg-ink shadow-[0_14px_30px_-12px_rgba(22,20,15,0.5)]"
        style={{ width: 92, height: 92, left: C - 46, top: C - 46 }}
      >
        <span className="font-display text-[22px] font-black italic text-white">you</span>
      </div>

      {/* facets */}
      {FACETS.map((f, i) => {
        const a = (f.angle * Math.PI) / 180;
        const sz = 56 + f.p * 1.15;
        const x = C + Math.cos(a) * R - sz / 2;
        const y = C + Math.sin(a) * R - sz / 2;
        return (
          <motion.div
            key={f.label}
            className="absolute"
            style={{ left: x, top: y, width: sz, height: sz }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="relative grid h-full w-full place-items-center rounded-full"
              style={{ background: `conic-gradient(var(--color-ink) ${f.p * 3.6}deg, var(--color-line2) 0)` }}
            >
              <div
                className={`absolute grid place-items-center overflow-hidden rounded-full ${f.sw} shadow-[0_8px_18px_-12px_rgba(40,36,30,0.4)]`}
                style={{ inset: 6 }}
              >
                <span className="grain-local" />
                <div className="relative text-center leading-none">
                  <div className="font-serif text-[clamp(15px,4vw,19px)] font-semibold text-ink">{f.p}%</div>
                  <div className="mt-0.5 text-[9.5px] text-ink">{f.label}</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
