"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CrumpledBg } from "./crumpled-bg";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const GROTESK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* static inline image chip in the broadsheet headline */
function Chip({ src, sw }: { src?: string; sw?: string }) {
  return (
    <span
      className={`mx-[0.1em] inline-block h-[0.64em] w-[0.96em] translate-y-[0.03em] overflow-hidden rounded-[3px] border border-black/40 align-middle ${sw ?? ""}`}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      )}
    </span>
  );
}

const STATEMENT = ["Getting dressed is the", "one creative act you", "repeat every day."];

export function WhyAltBorder() {
  const reduce = useReducedMotionSafe();

  return (
    <main className="flex h-[100svh] flex-col overflow-hidden bg-white px-4 pb-4 pt-[72px] text-black md:px-6 md:pb-6">
      {/* ── index card ─────────────────────────────────────────── */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex min-h-0 w-full max-w-[1280px] flex-[3] flex-col overflow-hidden rounded-[10px] border border-black"
        style={{ fontFamily: GROTESK }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#333] px-5 py-2.5 text-[12px] tracking-tight">
          <Link href="/" className="hover:opacity-60">OUTFT — Why</Link>
          <span className="hidden italic sm:block">The Record (Index)</span>
          <span>Information</span>
        </div>

        <div className="shrink-0 px-5 py-[2.2vh] md:px-8">
          <h1 className="text-[clamp(1.3rem,4vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.03em]">
            OUTFT <Chip src="/IMG_2115.jpeg" /> is a style self-knowledge
            product <Chip sw="sw4" /> tracing the fits <Chip src="/IMG_2141.png" />{" "}
            you actually wore <Chip sw="sw3" /> back into fashion, beauty,{" "}
            <Chip sw="sw5" /> and you — in numbers.
          </h1>
        </div>

        <div className="flex min-h-0 flex-1 flex-col border-t border-[#333]">
          <div className="shrink-0 px-5 pt-2 text-[11px] uppercase tracking-[0.1em] text-[#808080] md:px-8">
            Feed
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-px p-2 md:p-3">
            {[{ src: "/IMG_2115.jpeg" }, { sw: "sw4" }, { src: "/IMG_2141.png" }].map((c, i) => (
              <div key={i} className={`relative min-h-0 overflow-hidden ${c.sw ?? ""}`}>
                {c.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.src} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="grain-local absolute inset-0" aria-hidden />
                )}
              </div>
            ))}
          </div>
          <div className="shrink-0 px-5 py-1.5 text-right text-[11px] text-[#808080] md:px-8">
            → Instagram
          </div>
        </div>
      </motion.article>

      {/* ── Why. wordmark + statement on a crumpled panel ──────── */}
      <section className="relative mx-auto mt-3 flex min-h-0 w-full max-w-[1280px] flex-[2] overflow-hidden rounded-[10px] text-ink md:mt-4">
        <CrumpledBg overlay={0.66} />
        <div className="relative z-10 flex w-full items-center justify-between gap-6 px-6 py-4 md:px-10">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,11vw,8.5rem)] font-medium italic leading-[0.8] tracking-[-0.02em]"
          >
            Why.
          </motion.h2>
          <h3 className="max-w-[18ch] text-right font-display text-[clamp(1.1rem,2.8vw,2.4rem)] font-normal leading-[1.04] tracking-[-0.02em]">
            {STATEMENT.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h3>
        </div>
      </section>
    </main>
  );
}
