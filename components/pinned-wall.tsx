"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FRIENDS } from "@/lib/aesthetics";
import { FitPlate } from "./fit-plate";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/** Feature 03 — Follow. A clean editorial friends grid, Zara-minimal. */
export function PinnedWall() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="friends" className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="lbl">The app · 03</span>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
              Follow the people you dress like.
            </h2>
          </div>
          <p className="max-w-[38ch] font-serif text-[clamp(1.05rem,1.8vw,1.35rem)] font-light leading-snug text-ink2">
            No feed to scroll, no like counts. Just your friends&rsquo; aesthetic
            cards, side by side — follow whoever&rsquo;s taste you want beside
            yours.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {FRIENDS.map((f, i) => (
            <motion.div
              key={f.handle}
              initial={reduce ? false : { y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <FitPlate swatch={f.swatch} src={f.src} aspect="4 / 5" rounded="0px" shadow={false} />
              <div className="mt-3 border-t border-line pt-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[15px] text-ink">{f.handle}</span>
                  <span className="lbl">{f.occasion}</span>
                </div>
                <div className="mt-1 font-serif text-[15px] italic text-ink2">
                  {f.pct}% {f.top}
                </div>
                <FollowBtn />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FollowBtn() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={`mt-3 lbl lbl-ink border-b pb-1 transition-opacity hover:opacity-60 ${
        on ? "border-grey text-grey" : "border-ink"
      }`}
    >
      {on ? "Following" : "Follow"}
    </button>
  );
}
