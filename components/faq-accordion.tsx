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
    <div className="border-t border-[#333333]">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q} className="border-b border-[#333333]">
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center gap-6 py-6 text-left"
            >
              <span className="font-sans text-[12px] font-light text-[#808080]">
                0{i + 1}
              </span>
              <span className="flex-1 font-serif text-[20px] leading-snug text-[#000000] md:text-[24px]">
                {item.q}
              </span>
              <span
                className="relative h-4 w-4 shrink-0 text-[#000000] transition-transform duration-200"
                style={{ transform: on ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-7 pl-[2.4rem] font-sans text-[14px] font-light leading-relaxed text-[#555555]">
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
