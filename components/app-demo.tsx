"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { Reveal, RuleDraw } from "./reveal";

const STEPS = [
  {
    key: "daily",
    title: "Daily ft.",
    body: "Three times a day, outft picks the moment. No scheduling, no posing on cue. You get a window.",
  },
  {
    key: "post",
    title: "Post to see",
    body: "Snap your fit and it prints a ticket — your fit of record. Until you post, the feed stays closed.",
  },
  {
    key: "feed",
    title: "Then the feed opens",
    body: "Only after you post do your friends and creators appear. Everyone's honest at once.",
  },
  {
    key: "dna",
    title: "Fashion DNA",
    body: "Your wardrobe, read back as percentages. Quiet luxury, old money, coastal, the wildcard 7%.",
  },
  {
    key: "twin",
    title: "ft. twin",
    body: "outft finds the people you actually dress like and ranks the match. Follow your closest twin.",
  },
] as const;

const ROTATE = 3600;

export function AppDemo() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), ROTATE);
    return () => clearInterval(t);
  }, [reduce, inView]);

  return (
    <section id="demo" ref={sectionRef} className="bg-transparent">
      {/* top rule */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-px w-full bg-[#333333]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">

          {/* narrative */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="lbl">The app, in motion</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.0] tracking-[-0.02em] text-[#000000]">
                A whole ritual, from the window to the wardrobe.
              </h2>
            </Reveal>
            <RuleDraw delay={0.18} className="mt-8 w-full" />

            <ol className="mt-0">
              {STEPS.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full gap-6 border-b border-[#333333] py-6 text-left"
                      aria-current={on}
                    >
                      <span
                        className={`mt-0.5 font-sans text-[12px] font-light tabular-nums transition-colors ${
                          on ? "text-[#000000]" : "text-[#808080]"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-serif text-[20px] leading-tight transition-colors md:text-[24px] ${
                            on ? "text-[#000000]" : "text-[#808080]"
                          }`}
                        >
                          {s.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-2 block max-w-[44ch] font-sans text-[13px] font-light leading-relaxed text-[#555555]">
                                {s.body}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>

                      {/* progress bar */}
                      <span className="relative mt-2 hidden h-px w-8 self-start overflow-hidden bg-[#e0e0e0] sm:block">
                        {on && !reduce && (
                          <motion.span
                            key={active}
                            className="absolute inset-0 bg-[#000000]"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: ROTATE / 1000, ease: "linear" }}
                            style={{ originX: 0 }}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* phone mockup */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end lg:pt-12">
            <Phone activeKey={STEPS[active].key} reduce={!!reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone({ activeKey, reduce }: { activeKey: string; reduce: boolean }) {
  return (
    <div
      className="relative flex h-[580px] w-[280px] flex-col overflow-hidden border border-[#000000] bg-white"
    >
      {/* status bar */}
      <div className="flex items-center justify-between border-b border-[#333333] px-5 py-2.5">
        <span className="font-sans text-[10px] font-light text-[#000000]">9:41</span>
        <span className="font-display text-[11px] font-bold tracking-[-0.01em] text-[#000000]">OUTFT.</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <i key={i} className="h-1 w-1 bg-[#000000]/40" style={{ display: "block" }} />
          ))}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeKey === "daily" && <ScreenDaily />}
            {activeKey === "post" && <ScreenPost />}
            {activeKey === "feed" && <ScreenFeed />}
            {activeKey === "dna" && <ScreenDNA />}
            {activeKey === "twin" && <ScreenTwin />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScreenDaily() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-[#555555]">
        14 : 32 · your window is open
      </span>
      <div className="mt-6 font-display text-[32px] font-bold tracking-[-0.02em] text-[#000000]">
        OUTFT.
      </div>
      <span className="mt-3 block font-sans text-[10px] font-light uppercase tracking-[0.35em] text-[#555555]">
        post today's fit
      </span>
      <div className="mx-auto mt-8 flex h-12 w-12 items-center justify-center border border-[#000000]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[#000000]" fill="none" strokeWidth={1.5}>
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-8 w-full border-t border-[#333333]" />
      <div className="mt-4 grid w-full grid-cols-3 gap-px border border-[#333333]">
        {["Morning", "Afternoon", "Evening"].map((w, i) => (
          <div
            key={w}
            className={`px-2 py-3 text-center ${
              i === 1 ? "bg-[#000000]" : "bg-white"
            }`}
          >
            <div className={`font-sans text-[8px] uppercase tracking-[0.15em] ${i === 1 ? "text-white/70" : "text-[#808080]"}`}>
              {w}
            </div>
            <div className={`mt-1 font-sans text-[10px] ${i === 1 ? "text-white" : "text-[#555555]"}`}>
              {["07–11", "11–17", "17–23"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BARS = Array.from({ length: 48 }, (_, i) => ({
  w: ((i * 73) % 5) * 0.4 + 0.7,
  h: (((i * 37) % 10) / 10) * 0.5 + 0.5,
  faint: (i * 17) % 9 === 0,
}));

function ScreenPost() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full border border-[#000000] bg-white">
        <div className="flex items-center justify-between border-b border-[#333333] px-4 py-3">
          <span className="font-display text-[11px] font-bold text-[#000000]">OUTFT.</span>
          <span className="font-sans text-[7.5px] uppercase tracking-[0.3em] text-[#808080]">
            fit of record
          </span>
        </div>
        <div
          className="relative mx-4 mt-3"
          style={{ aspectRatio: "1/1", background: "#f5f5f5", border: "1px solid #333333" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#999999]">
              today's fit
            </span>
          </div>
        </div>
        {[["Date", "04 · 06 · 2026"], ["Window", "Afternoon"], ["Occasion", "Solo date"], ["Look no.", "0097"]].map(([k, v], i) => (
          <div
            key={k}
            className={`mx-4 flex items-baseline justify-between py-2 text-[10px] ${i > 0 ? "border-t border-dashed border-[#e0e0e0]" : ""}`}
          >
            <span className="font-sans font-light tracking-wide text-[#808080]">{k}</span>
            <span className="font-sans font-light text-[#000000]">{v}</span>
          </div>
        ))}
        <div className="mx-4 mb-3 mt-2 flex h-8 items-end justify-center gap-px border-t border-[#333333] pt-2">
          {BARS.map((b, i) => (
            <i
              key={i}
              className="block bg-[#000000]"
              style={{ width: `${b.w}px`, height: `${b.h * 100}%`, opacity: b.faint ? 0.2 : 1 }}
            />
          ))}
        </div>
        <div className="pb-3 text-center font-sans text-[7px] tracking-[0.26em] text-[#555555]">
          OUTFT · 1716 3357 9486 7750
        </div>
      </div>
    </div>
  );
}

function ScreenFeed() {
  return (
    <div className="h-full overflow-hidden bg-white px-5 pt-4">
      <div className="flex items-center justify-between border-b border-[#333333] pb-3">
        <span className="font-display text-[13px] font-bold text-[#000000]">OUTFT.</span>
        <span className="font-sans text-[9px] font-light uppercase tracking-[0.24em] text-[#808080]">Feed</span>
      </div>
      <div className="mt-3 flex items-center gap-2.5 border-b border-[#e0e0e0] pb-3">
        <div className="flex h-7 w-7 items-center justify-center border border-[#333333] font-serif text-[12px] text-[#000000]">
          M
        </div>
        <div className="leading-tight">
          <div className="font-sans text-[11px] font-light text-[#000000]">maren</div>
          <div className="font-sans text-[8.5px] uppercase tracking-[0.16em] text-[#808080]">
            Solo date · 14:10
          </div>
        </div>
        <span className="ml-auto font-sans text-[10px] font-light text-[#808080]">2h</span>
      </div>
      <div
        className="relative mt-3 border border-[#333333] bg-[#f5f5f5]"
        style={{ aspectRatio: "4/5" }}
      >
        <div className="absolute inset-0 flex items-end p-3">
          <span className="bg-[#000000] px-2 py-1 font-serif text-[14px] text-white">
            Oat linen, no rush
          </span>
        </div>
      </div>
      <p className="mt-3 font-serif text-[12px] italic text-[#555555]">
        &ldquo;Reading-in-a-café kind of fit.&rdquo;
      </p>
      <div className="mt-2 flex gap-2 font-sans text-[9px] font-light text-[#808080]">
        <span>#quietluxury</span>
        <span>#neutrals</span>
        <span>#linen</span>
      </div>
    </div>
  );
}

const FACETS = [
  { p: 41, label: "Quiet luxury", x: 50, y: 16, size: 68 },
  { p: 23, label: "Old money", x: 84, y: 52, size: 56 },
  { p: 18, label: "Scandi", x: 64, y: 86, size: 50 },
  { p: 11, label: "Coastal", x: 22, y: 82, size: 46 },
  { p: 7, label: "Eclectic", x: 10, y: 46, size: 42 },
];

function ScreenDNA() {
  return (
    <div className="flex h-full flex-col bg-white px-5 pt-4">
      <div className="flex items-baseline gap-2 border-b border-[#333333] pb-3">
        <span className="font-display text-[11px] font-bold text-[#000000]">ft.</span>
        <span className="font-serif text-[16px] text-[#000000]">
          your fashion DNA
        </span>
      </div>
      <div className="relative mx-auto mt-3 h-[280px] w-[240px]">
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#000000] bg-[#000000]">
          <span className="font-sans text-[11px] font-light uppercase tracking-[0.14em] text-white">you</span>
        </div>
        {FACETS.map((f) => (
          <div
            key={f.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.size, height: f.size }}
          >
            <div
              className="flex h-full w-full items-center justify-center border border-[#333333] bg-white text-center"
            >
              <div>
                <div className="font-sans text-[12px] font-light text-[#000000]">{f.p}%</div>
                <div className="font-sans text-[7px] font-light uppercase tracking-[0.12em] text-[#808080]">{f.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenTwin() {
  const recs = [
    { i: "J", h: "@jude", m: "88%" },
    { i: "M", h: "@maren", m: "85%" },
    { i: "A", h: "@ari", m: "81%" },
    { i: "S", h: "@soraya", m: "79%" },
  ];
  return (
    <div className="h-full bg-white px-5 pt-4">
      <div className="border border-[#000000] p-4">
        <div className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#808080]">
          Your closest fashion twin
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-[#333333] font-serif text-[16px] text-[#000000]">
            L
          </div>
          <div className="leading-tight">
            <div className="font-sans text-[13px] font-light text-[#000000]">Lena Voss</div>
            <div className="font-sans text-[10px] font-light text-[#808080]">@lenav</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-serif text-[22px] text-[#000000]">92%</div>
            <div className="font-sans text-[7px] uppercase tracking-[0.2em] text-[#808080]">match</div>
          </div>
        </div>
        <button className="mt-4 w-full border border-[#000000] bg-[#000000] py-2.5 font-sans text-[9px] uppercase tracking-[0.2em] text-white">
          Follow
        </button>
      </div>
      <div className="mt-5 font-sans text-[8px] uppercase tracking-[0.24em] text-[#808080]">
        More to follow
      </div>
      <div className="mt-3 flex justify-between">
        {recs.map((r) => (
          <div key={r.h} className="text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center border border-[#333333] font-serif text-[14px] text-[#000000]">
              {r.i}
            </div>
            <div className="mt-1.5 font-sans text-[9px] font-light text-[#555555]">{r.h}</div>
            <div className="font-sans text-[8px] font-light text-[#808080]">{r.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
