"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
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

const PRINCIPLES = [
  {
    n: "01",
    t: "A record, not a feed",
    b: "You photograph what you actually wore, and OUTFT keeps it — a quiet diary of your real wardrobe in use. No styling, no closet to maintain, no algorithm to win.",
  },
  {
    n: "02",
    t: "Taste, quantified",
    b: "We read palette, cut and register across your logged fits and hand you the breakdown. 41% old money, 27% streetwear, the wildcard 7% that makes you you.",
  },
  {
    n: "03",
    t: "The card is the point",
    b: "The aesthetic card is the most shareable self-portrait in fashion — a number you post because it says something true. A mirror, not a grade.",
  },
];

const STATEMENT = ["Getting dressed is the", "one creative act you", "repeat every day."];

export function WhyAltBorder() {
  const reduce = useReducedMotionSafe();

  // parallax for the feed grid
  const feedRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: feedRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["2%", "-10%"]);
  const feedY = [y1, y2, y3];

  // rising "sheet" transition into the deeper why
  const sheetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sp } = useScroll({ target: sheetRef, offset: ["start end", "start center"] });
  const sheetRadius = useTransform(sp, [0, 1], [80, 0]);
  const wordX = useTransform(sp, [0, 1], ["-2%", "8%"]);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { y: 26, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <main className="bg-white text-black">
      {/* ── WHITE: Alt-Border gallery card ───────────────────────── */}
      <section className="flex min-h-[100svh] items-center px-4 pt-[64px] md:px-6">
        <motion.article
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[10px] border border-black"
          style={{ fontFamily: GROTESK }}
        >
          <div className="flex items-center justify-between border-b border-[#333] px-5 py-3 text-[12px] tracking-tight">
            <Link href="/" className="hover:opacity-60">OUTFT — Why</Link>
            <span className="hidden italic sm:block">The Record (Index)</span>
            <span>Information</span>
          </div>

          <div className="px-5 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
            <h1 className="text-[clamp(1.7rem,5.2vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.03em]">
              OUTFT <Chip src="/IMG_2115.jpeg" /> is a style self-knowledge
              product <Chip sw="sw4" /> tracing the fits <Chip src="/IMG_2141.png" />{" "}
              you actually wore <Chip sw="sw3" /> back into fashion, beauty,{" "}
              <Chip sw="sw5" /> and you — in numbers.
            </h1>
          </div>

          <div className="border-t border-[#333]" ref={feedRef}>
            <div className="px-5 pt-3 text-[11px] uppercase tracking-[0.1em] text-[#808080] md:px-8">Feed</div>
            <div className="grid grid-cols-3 gap-px p-2 md:p-3">
              {[{ src: "/IMG_2115.jpeg" }, { sw: "sw4" }, { src: "/IMG_2141.png" }].map((c, i) => (
                <div key={i} className={`relative overflow-hidden ${c.sw ?? ""}`} style={{ aspectRatio: "3 / 3.1" }}>
                  <motion.div className="absolute inset-[-10%]" style={{ y: reduce ? 0 : feedY[i] }}>
                    {c.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.src} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="grain-local" aria-hidden />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-3 text-right text-[11px] text-[#808080] md:px-8">→ Instagram</div>
          </div>
        </motion.article>
      </section>

      {/* drifting wordmark + rising grey sheet */}
      <div ref={sheetRef} className="relative">
        <section className="overflow-hidden px-4 pb-12 md:px-6" style={{ fontFamily: GROTESK }}>
          <div className="mx-auto flex max-w-[1280px] items-end justify-between">
            <motion.h2
              style={{ x: reduce ? 0 : wordX }}
              className="font-serif text-[clamp(4rem,16vw,13rem)] font-medium italic leading-[0.8] tracking-[-0.02em]"
            >
              Why.
            </motion.h2>
            <span className="pb-3 text-right text-[14px] leading-[1.05]">OUTFT<br />Nº01</span>
          </div>
        </section>

        {/* ── GREY CRUMPLED: the deeper why ─────────────────────── */}
        <motion.section
          style={{ borderTopLeftRadius: reduce ? 0 : sheetRadius, borderTopRightRadius: reduce ? 0 : sheetRadius }}
          className="relative -mt-6 overflow-hidden text-ink"
        >
          <CrumpledBg overlay={0.66} />
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-36">
            {/* running head */}
            <div className="flex items-end justify-between border-b border-[#bdb8af] pb-4">
              <span className="lbl">The deeper why</span>
              <span className="lbl">Essay · Nº01</span>
            </div>

            {/* big serif statement — masked line reveal (mount) */}
            <h3 className="mt-12 max-w-[18ch] font-display text-[clamp(2.4rem,6.5vw,5.8rem)] font-normal leading-[1.0] tracking-[-0.02em]">
              {STATEMENT.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h3>

            <motion.p
              {...reveal(0.5)}
              className="mt-9 max-w-[46ch] font-serif text-[clamp(1.3rem,2.2vw,1.9rem)] font-light italic leading-snug text-[#23211c]"
            >
              Almost all of it disappears. OUTFT makes the thing you spend the
              most attention on finally count — measured, kept, and read back to
              you as a number.
            </motion.p>

            {/* numbered principles */}
            <div className="mt-20 border-t border-[#bdb8af]">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.n}
                  {...reveal(0.6 + i * 0.1)}
                  className="grid gap-4 border-b border-[#bdb8af] py-9 md:grid-cols-[5rem_1fr_1.1fr] md:gap-12"
                >
                  <span className="font-serif text-[20px] text-[#8a857c]">{p.n}</span>
                  <h4 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-normal leading-tight">
                    {p.t}
                  </h4>
                  <p className="max-w-[44ch] font-serif text-[clamp(1.15rem,1.7vw,1.4rem)] font-light leading-[1.45] text-[#2a2823]">
                    {p.b}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* closing pull quote + CTA */}
            <motion.blockquote {...reveal(0.7)} className="mt-20 max-w-[24ch]">
              <p className="font-display text-[clamp(2rem,5vw,4rem)] font-normal italic leading-[1.02] tracking-[-0.02em]">
                &ldquo;The most shareable self-portrait in fashion is a number.&rdquo;
              </p>
            </motion.blockquote>

            <motion.div {...reveal(0.8)} className="mt-12">
              <Link
                href="/request-demo"
                className="inline-block border-b border-black pb-1 font-sans text-[12px] uppercase tracking-[0.16em] hover:opacity-60"
              >
                Request a demo →
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
