"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Logo, FtMark } from "./logo";

const STEPS = [
  {
    key: "daily",
    title: "Daily ft.",
    body: "Three times a day, outft picks the moment. No scheduling, no posing on cue. You get a window.",
  },
  {
    key: "post",
    title: "Post to see",
    body: "Snap your fit and it prints a ticket, your fit of record. Until you post, the feed stays closed.",
  },
  {
    key: "feed",
    title: "Then the feed opens",
    body: "Only after you post do your friends and the creators you follow appear. Everyone's honest at once.",
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
  const reduce = useReducedMotion();
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
    const t = setInterval(
      () => setActive((a) => (a + 1) % STEPS.length),
      ROTATE
    );
    return () => clearInterval(t);
  }, [reduce, inView]);

  return (
    <section id="demo" ref={sectionRef} className="relative bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* narrative */}
          <div className="order-2 lg:order-1">
            <span className="lbl">The app, in motion</span>
            <h2 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.01em]">
              A whole ritual, from the window to the wardrobe.
            </h2>

            <ol className="mt-10 flex flex-col">
              {STEPS.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full gap-5 border-t border-line py-5 text-left last:border-b"
                      aria-current={on}
                    >
                      <span
                        className={`mt-1 font-serif text-[15px] tabular-nums transition-colors ${
                          on ? "text-ink" : "text-grey-soft"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-serif text-[22px] leading-tight transition-colors ${
                            on ? "text-ink" : "text-grey"
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
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-2 block max-w-[44ch] text-[14px] leading-relaxed text-ink2">
                                {s.body}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      {/* progress hairline */}
                      <span className="relative mt-2 hidden h-px w-10 self-start overflow-hidden bg-line sm:block">
                        {on && !reduce && (
                          <motion.span
                            key={active}
                            className="absolute inset-0 bg-ink"
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

          {/* phone */}
          <div className="order-1 flex justify-center lg:order-2">
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
      className="relative flex h-[600px] w-[300px] flex-col overflow-hidden bg-white"
      style={{
        borderRadius: 44,
        boxShadow:
          "0 1px 0 1.5px rgba(255,255,255,.5) inset, 0 44px 90px -26px rgba(40,36,30,.5), 0 12px 30px -12px rgba(40,36,30,.3)",
      }}
    >
      <div className="flex items-center justify-between px-7 pt-4 text-[11px] tracking-wide text-ink">
        <span>9:41</span>
        <span className="flex gap-1">
          <i className="h-1 w-1 rounded-full bg-ink/50" />
          <i className="h-1 w-1 rounded-full bg-ink/50" />
          <i className="h-1 w-1 rounded-full bg-ink/50" />
        </span>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeKey === "daily" && <ScreenDaily />}
            {activeKey === "post" && <ScreenTicket />}
            {activeKey === "feed" && <ScreenFeed />}
            {activeKey === "dna" && <ScreenDNA />}
            {activeKey === "twin" && <ScreenTwin />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- screens ---------- */

function ScreenDaily() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#f3f1ed] px-8 text-center">
      <span className="absolute left-[-20%] top-[8%] h-44 w-44 rounded-full bg-mauve/70 blur-3xl" />
      <span className="absolute right-[-16%] top-[40%] h-40 w-40 rounded-full bg-sage/70 blur-3xl" />
      <span className="absolute bottom-[10%] left-[20%] h-36 w-36 rounded-full bg-sky/60 blur-3xl" />
      <div className="relative">
        <span className="text-[9px] uppercase tracking-[0.4em] text-ink2">
          14 : 32 · your window is open
        </span>
        <div className="mt-5">
          <Logo size="2.6rem" href={null} />
        </div>
        <span className="mt-4 block text-[11px] uppercase tracking-[0.35em] text-ink2">
          post today&rsquo;s fit
        </span>
        <div className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white" fill="none" strokeWidth={1.4}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const BARS = Array.from({ length: 52 }, (_, i) => {
  const w = ((i * 73) % 5) * 0.5 + 0.8;
  const h = (((i * 37) % 10) / 10) * 0.45 + 0.55;
  const faint = (i * 17) % 9 === 0;
  return { w, h, faint };
});

function ScreenTicket() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-bone px-7">
      <div
        className="w-full max-w-[230px] bg-white px-5 pb-4 pt-5"
        style={{ borderRadius: 8, boxShadow: "0 30px 60px -30px rgba(40,36,30,.5)" }}
      >
        <div className="text-center">
          <Logo size="1.25rem" href={null} />
          <div className="mt-1 text-[7.5px] uppercase tracking-[0.32em] text-grey">
            fit of record
          </div>
        </div>
        <div className="relative my-3 overflow-hidden sw4" style={{ aspectRatio: "1/1", borderRadius: 4 }}>
          <span className="grain-local" />
        </div>
        {[
          ["Date", "04 · 06 · 2026"],
          ["Time", "14:32"],
          ["Occasion", "Solo date"],
          ["Look no.", "0097"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`flex items-baseline justify-between py-[7px] text-[11px] ${
              i === 0 ? "" : "border-t border-dashed border-line2"
            }`}
          >
            <span className="tracking-wide text-grey">{k}</span>
            <span className="tracking-wide text-ink">{v}</span>
          </div>
        ))}
        <div className="mt-3 flex h-9 items-end justify-center gap-px">
          {BARS.map((b, i) => (
            <i
              key={i}
              className="block bg-ink"
              style={{ width: `${b.w}px`, height: `${b.h * 100}%`, opacity: b.faint ? 0.2 : 1 }}
            />
          ))}
        </div>
        <div className="mt-2 text-center text-[8px] tracking-[0.26em] text-ink2">
          OUTFT · 1716 3357 9486 7750
        </div>
      </div>
    </div>
  );
}

function ScreenFeed() {
  return (
    <div className="h-full overflow-hidden bg-white px-5 pt-3">
      <div className="flex items-center justify-between pb-3">
        <Logo size="1.15rem" href={null} />
        <span className="h-6 w-6 rounded-full sw4" />
      </div>
      <div className="flex items-center gap-2.5 pb-3">
        <span className="grid h-7 w-7 place-items-center rounded-full sw3 font-serif text-[12px] text-white">
          M
        </span>
        <div className="leading-tight">
          <div className="text-[12px] text-ink">maren</div>
          <div className="text-[8.5px] uppercase tracking-[0.16em] text-grey">
            Solo date · 14:10
          </div>
        </div>
        <span className="ml-auto text-[10px] text-grey-soft">2h</span>
      </div>
      <div className="relative overflow-hidden sw3" style={{ aspectRatio: "4/5", borderRadius: 14 }}>
        <span className="grain-local" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-9">
          <span className="font-serif text-[18px] font-medium text-white">
            Oat linen, no rush
          </span>
        </div>
      </div>
      <p className="mt-3 font-serif text-[13px] italic text-ink2">
        &ldquo;Reading-in-a-caf&eacute; kind of fit.&rdquo;
      </p>
      <div className="mt-2 flex gap-2 text-[10px] text-grey">
        <span>#quietluxury</span>
        <span>#neutrals</span>
        <span>#linen</span>
      </div>
    </div>
  );
}

const FACETS = [
  { p: 41, label: "Quiet luxury", sw: "sw3", size: 78, x: 50, y: 16 },
  { p: 23, label: "Old money", sw: "sw5", size: 64, x: 84, y: 52 },
  { p: 18, label: "Scandi", sw: "sw2", size: 58, x: 66, y: 86 },
  { p: 11, label: "Coastal", sw: "sw6", size: 52, x: 24, y: 84 },
  { p: 7, label: "Eclectic", sw: "sw4", size: 48, x: 12, y: 48 },
];

function ScreenDNA() {
  return (
    <div className="flex h-full flex-col bg-white px-5 pt-3">
      <div className="flex items-baseline gap-2">
        <FtMark size="1.6rem" />
        <span className="font-serif text-[18px] text-ink">
          your fashion <span className="italic text-grey">DNA</span>
        </span>
      </div>
      <div className="relative mx-auto mt-2 h-[300px] w-[260px]">
        <div className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink">
          <span className="font-display text-[15px] italic font-extrabold text-white">
            you
          </span>
        </div>
        {FACETS.map((f) => (
          <div
            key={f.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.size, height: f.size }}
          >
            <div
              className="relative grid h-full w-full place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-ink) ${f.p * 3.6}deg, var(--color-line2) 0)`,
              }}
            >
              <div className={`relative grid place-items-center overflow-hidden rounded-full ${f.sw}`} style={{ inset: 5, position: "absolute" }}>
                <span className="grain-local" />
                <div className="relative text-center leading-none">
                  <div className="font-serif text-[14px] font-semibold text-ink">{f.p}%</div>
                  <div className="mt-0.5 text-[7.5px] text-ink">{f.label}</div>
                </div>
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
    { i: "J", h: "@jude", m: "88%", sw: "sw1" },
    { i: "M", h: "@maren", m: "85%", sw: "sw3" },
    { i: "A", h: "@ari", m: "81%", sw: "sw5" },
    { i: "S", h: "@soraya", m: "79%", sw: "sw4" },
  ];
  return (
    <div className="h-full bg-white px-5 pt-4">
      <div className="rounded-2xl border border-line bg-panel p-5">
        <div className="text-[8.5px] uppercase tracking-[0.24em] text-grey">
          Your closest fashion twin
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full sw2 font-serif text-[18px] text-white">
            L
          </span>
          <div className="leading-tight">
            <div className="text-[14px] text-ink">Lena Voss</div>
            <div className="text-[10px] text-grey">@lenav</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-serif text-[24px] font-semibold leading-none text-ink">
              92%
            </div>
            <div className="text-[7.5px] uppercase tracking-[0.2em] text-grey">
              match
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-full bg-ink py-2.5 text-center text-[10px] uppercase tracking-[0.18em] text-white">
          Follow
        </div>
      </div>
      <div className="mt-5 text-[8.5px] uppercase tracking-[0.24em] text-grey">
        More to follow
      </div>
      <div className="mt-3 flex justify-between">
        {recs.map((r) => (
          <div key={r.h} className="text-center">
            <span className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${r.sw} font-serif text-[16px] text-white`}>
              {r.i}
            </span>
            <div className="mt-1.5 text-[9px] text-ink2">{r.h}</div>
            <div className="text-[8px] text-grey">{r.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
