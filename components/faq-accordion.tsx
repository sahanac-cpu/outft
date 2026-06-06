"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export interface QA {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotionSafe();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center gap-6 py-7 text-left"
            >
              <span className="font-serif text-[14px] text-grey-soft">
                0{i + 1}
              </span>
              <span className="flex-1 font-serif text-[22px] leading-snug text-ink md:text-[26px]">
                {item.q}
              </span>
              <span
                className="relative h-4 w-4 shrink-0 text-ink transition-transform duration-300"
                style={{ transform: on ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-8 pl-[2.6rem] text-[15px] leading-relaxed text-ink2">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
