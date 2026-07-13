"use client";

import { useEffect, useRef, useState } from "react";

type Reading = {
  top: string;
  bars: [string, number][];
  tags: string[];
  insight: string;
};

const READINGS: Reading[] = [
  {
    top: "Quiet luxury",
    bars: [["Quiet luxury", 41], ["Old money", 23], ["Scandi", 18], ["Coastal", 11], ["Eclectic", 7]],
    tags: ["neutral palette", "structured", "understated", "wide leg"],
    insight: "Deliberate lines and a quiet, unbranded confidence.",
  },
  {
    top: "Old money",
    bars: [["Old money", 44], ["Classic", 26], ["Quiet luxury", 20], ["Coastal", 10]],
    tags: ["tailored", "timeless", "elevated basics", "muted tones"],
    insight: "Heritage tailoring — nothing loud, everything considered.",
  },
  {
    top: "Streetwear",
    bars: [["Streetwear", 37], ["Minimalist", 28], ["Bold", 21], ["Vintage", 14]],
    tags: ["relaxed fit", "monochrome", "statement", "layered"],
    insight: "Effortless edge riding on a clean, minimal backbone.",
  },
  {
    top: "Scandi",
    bars: [["Scandi", 39], ["Minimalist", 31], ["Coastal", 18], ["Classic", 12]],
    tags: ["soft neutrals", "clean silhouette", "functional", "cozy"],
    insight: "Calm, considered, and quietly modern.",
  },
];

const WRAPPED: { k: string; big: string; sub: string; italic?: boolean }[] = [
  { k: "May · Wrapped", big: "26 fits", sub: "your most consistent month yet" },
  { k: "Top aesthetic", big: "Quiet luxury", sub: "41% of your fits this month", italic: true },
  { k: "Most active window", big: "Afternoon", sub: "64% posted 11–17" },
  { k: "Fashion confidence", big: "87", sub: "up 6 points from April" },
  { k: "Growth this month", big: "+4% Scandi", sub: "2 new echoes · 14-day streak" },
];

export function DnaLive() {
  const camRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [w, setW] = useState(0);
  const r = READINGS[i];
  const wr =
    w === 1
      ? { k: "Top aesthetic", big: r.top, sub: `${r.bars[0][1]}% of your fits this month`, italic: true }
      : WRAPPED[w];

  // DNA ring segments
  const RC = 2 * Math.PI * 50;
  const RING_COLORS = ["#2A2820", "#8A7A68", "#B4A898", "#C4B098", "#D8CFC4"];
  let acc = 0;
  const segs = r.bars.map(([, pct], idx) => {
    const arc = (pct / 100) * RC;
    const seg = { arc, offset: acc, color: RING_COLORS[idx % RING_COLORS.length] };
    acc += arc;
    return seg;
  });

  // scale the live app to fill the camera panel
  useEffect(() => {
    const el = camRef.current;
    if (!el) return;
    const set = () => el.style.setProperty("--dna-scale", String(el.clientWidth / 390));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // auto-cycle the reading + the Wrapped story
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const idR = window.setInterval(() => setI((v) => (v + 1) % READINGS.length), 2600);
    const idW = window.setInterval(() => setW((v) => (v + 1) % WRAPPED.length), 2600);
    return () => { window.clearInterval(idR); window.clearInterval(idW); };
  }, []);

  return (
    <section id="try-dna" className="dna-section relative overflow-hidden border-t border-line2">
      <div aria-hidden className="dna-aura" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        {/* header */}
        <div className="max-w-[46rem]">
          <span className="dna-eyebrow"><span className="dna-dot" /> Live · powered by AI</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-normal leading-[0.96] tracking-[-0.02em] text-ink">
            Your style, decoded<br />in seconds.
          </h2>
          <p className="mt-6 max-w-[46ch] font-serif text-[clamp(1.05rem,1.7vw,1.35rem)] font-light italic leading-snug text-ink2">
            Read your aesthetic, roll the month into your <span className="not-italic font-normal text-ink">Wrapped</span>,
            then point the camera and get it live.
          </p>
        </div>

        {/* three equal panels */}
        <div className="mt-14 grid grid-cols-1 justify-items-center gap-10 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {/* 01 — the reading */}
          <figure className="dna-cell">
            <div className="dna-panel dna-panel--read">
              <div className="dna-card-hd">
                <span className="dna-card-kicker">Style DNA · reading</span>
              </div>
              <div className="dna-read-body">
              <svg className="dna-ring" viewBox="0 0 120 120" key={`r${i}`} aria-hidden>
                <g transform="rotate(-90 60 60)" fill="none" strokeWidth="11">
                  {segs.map((s, idx) => (
                    <circle key={idx} cx="60" cy="60" r="50" stroke={s.color}
                      strokeDasharray={`${s.arc.toFixed(2)} ${(RC - s.arc).toFixed(2)}`}
                      strokeDashoffset={(-s.offset).toFixed(2)}
                      style={{ animationDelay: `${idx * 0.09}s` }} />
                  ))}
                </g>
                <text x="60" y="58" textAnchor="middle" className="dna-ring-pct">
                  {r.bars[0][1]}<tspan className="dna-ring-sign">%</tspan>
                </text>
                <text x="60" y="72" textAnchor="middle" className="dna-ring-lbl">STYLE DNA</text>
              </svg>
              <div className="dna-top">
                <span className="dna-top-label">You read as</span>
                <div key={`t${i}`} className="dna-top-name">{r.top}<span className="dna-top-dot">.</span></div>
              </div>
              <div key={`b${i}`} className="dna-bars">
                {r.bars.slice(0, 4).map(([label, pct], idx) => (
                  <div className="dna-bar-row" key={label}>
                    <div className="dna-bar-meta"><span>{label}</span><span className="dna-pct">{pct}%</span></div>
                    <div className="dna-track">
                      <div className="dna-fill" style={{ ["--pct" as string]: `${pct}%`, animationDelay: `${idx * 0.08}s` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div key={`g${i}`} className="dna-tags">
                {r.tags.slice(0, 3).map((t, idx) => (
                  <span className="dna-tag" style={{ animationDelay: `${0.2 + idx * 0.07}s` }} key={t}>{t}</span>
                ))}
              </div>
              <p key={`i${i}`} className="dna-insight">{r.insight}</p>
              </div>
              <div className="dna-ticks">
                {READINGS.map((_, idx) => (
                  <span key={idx} className={`dna-tick ${idx === i ? "on" : ""}`} />
                ))}
              </div>
            </div>
            <figcaption className="dna-cap"><span>01</span> Your reading</figcaption>
          </figure>

          {/* 02 — Wrapped */}
          <figure className="dna-cell">
            <div className="dna-panel dna-panel--wrap">
              <div className="wrap-bars">
                {WRAPPED.map((_, idx) => (
                  <span key={idx} className={`wrap-seg ${idx < w ? "done" : ""} ${idx === w ? "active" : ""}`} />
                ))}
              </div>
              <div key={`w${w}`} className="wrap-body">
                <span className="wrap-k">{wr.k}</span>
                <div className={`wrap-big ${wr.italic ? "ital" : ""}`}>{wr.big}</div>
                <span className="wrap-sub">{wr.sub}</span>
              </div>
              <span className="wrap-foot">outft. wrapped</span>
            </div>
            <figcaption className="dna-cap"><span>02</span> Your Wrapped</figcaption>
          </figure>

          {/* 03 — live camera */}
          <figure className="dna-cell">
            <div className="dna-panel dna-panel--cam" ref={camRef}>
              <iframe
                src="/demo/outft-dna.html?s=camera"
                title="OUTFT. — live camera"
                allow="camera; fullscreen"
                loading="lazy"
                className="dna-iframe"
              />
            </div>
            <figcaption className="dna-cap"><span>03</span> Snap yours — live</figcaption>
          </figure>
        </div>

        <p className="mt-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-grey-soft">
          <span className="h-px w-10 bg-line2" />
          Camera runs on your device · photos are analyzed, never stored
        </p>
      </div>

      <style>{`
        .dna-section{ background:radial-gradient(120% 90% at 80% 20%, #fbfaf9 0%, #f4f2ee 46%, #efece7 100%); }
        .dna-aura{ position:absolute; right:-4%; top:30%; width:min(760px,58vw); aspect-ratio:1; transform:translateY(-50%); pointer-events:none;
          background:radial-gradient(closest-side, rgba(196,208,216,0.28), rgba(221,185,200,0.15) 46%, transparent 72%); filter:blur(30px); animation:dnaAura 16s ease-in-out infinite; }
        @keyframes dnaAura{ 0%,100%{ transform:translateY(-50%) scale(1); opacity:.85;} 50%{ transform:translateY(-54%) scale(1.12); opacity:1;} }
        .dna-eyebrow{ display:inline-flex; align-items:center; gap:8px; font-family:var(--font-jost),sans-serif; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:#928e87; }
        .dna-dot{ width:7px;height:7px;border-radius:999px;background:#4bb47a; box-shadow:0 0 0 0 rgba(75,180,122,.5); animation:dnaPulse 1.7s ease-out infinite; }
        @keyframes dnaPulse{ 0%{box-shadow:0 0 0 0 rgba(75,180,122,.45);} 70%{box-shadow:0 0 0 8px rgba(75,180,122,0);} 100%{box-shadow:0 0 0 0 rgba(75,180,122,0);} }

        /* one shared panel size for all three */
        .dna-cell{ width:100%; max-width:322px; display:flex; flex-direction:column; align-items:center; }
        .dna-panel{ width:100%; aspect-ratio:390 / 844; border-radius:34px; overflow:hidden; position:relative;
          box-shadow:0 44px 84px -44px rgba(40,36,30,0.34), 0 10px 24px -16px rgba(40,36,30,0.16); }
        .dna-cap{ margin-top:16px; font-family:var(--font-jost),sans-serif; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:#928e87; }
        .dna-cap span{ color:#c4beb4; margin-right:9px; }

        /* 01 reading panel */
        .dna-panel--read{ background:#fff; border:1px solid var(--color-line); display:flex; flex-direction:column; padding:22px 22px 20px; }
        .dna-card-hd{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .dna-card-kicker{ font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#a49e94; }
        .dna-read-body{ flex:1; display:flex; flex-direction:column; justify-content:center; }
        .dna-ring{ width:132px; height:132px; align-self:center; margin:6px 0 2px; }
        .dna-ring circle{ animation:ringDraw .8s cubic-bezier(.16,1,.3,1) both; }
        @keyframes ringDraw{ from{ stroke-dasharray:0 314.16; } }
        .dna-ring-pct{ font-family:var(--font-cormorant),serif; font-size:27px; fill:#16140f; }
        .dna-ring-sign{ font-size:13px; fill:#8a7a68; }
        .dna-ring-lbl{ font-family:var(--font-jost),sans-serif; font-size:6.5px; letter-spacing:1.6px; fill:#a49e94; }
        .dna-top{ text-align:center; margin-bottom:16px; }
        .dna-top-label{ font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#a49e94; }
        .dna-top-name{ font-family:var(--font-cormorant),serif; font-style:italic; font-size:clamp(1.7rem,2.2vw,2rem); line-height:1.05; color:#16140f; margin-top:2px; animation:riseIn .6s cubic-bezier(.16,1,.3,1) both; }
        .dna-top-dot{ color:#b19a86; }
        @keyframes riseIn{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:translateY(0); } }
        .dna-bars{ display:flex; flex-direction:column; gap:11px; }
        .dna-bar-meta{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:5px; font-family:var(--font-jost),sans-serif; font-size:12.5px; color:#3a352d; }
        .dna-pct{ font-family:var(--font-cormorant),serif; font-size:14px; color:#8a7a68; }
        .dna-track{ height:5px; border-radius:999px; background:#eceae5; overflow:hidden; }
        .dna-fill{ height:100%; width:var(--pct); border-radius:999px; background:linear-gradient(90deg,#b19a86,#c4b098,#8a7a68); animation:fillIn .9s cubic-bezier(.16,1,.3,1) both; }
        @keyframes fillIn{ from{ width:0; } }
        .dna-tags{ display:flex; flex-wrap:wrap; gap:7px; margin-top:16px; }
        .dna-tag{ font-family:var(--font-jost),sans-serif; font-size:11px; letter-spacing:.04em; color:#5e5a53; border:1px solid var(--color-line2); border-radius:999px; padding:5px 12px; animation:tagIn .5s ease both; }
        @keyframes tagIn{ from{ opacity:0; transform:translateY(6px) scale(.96); } to{ opacity:1; transform:none; } }
        .dna-insight{ font-family:var(--font-cormorant),serif; font-style:italic; font-size:14px; line-height:1.5; color:#5e5a53; margin-top:16px; padding-top:14px; border-top:1px solid var(--color-line); animation:fadeIn .7s ease both; }
        .dna-ticks{ display:flex; gap:6px; margin-top:16px; padding-top:2px; }
        .dna-tick{ height:3px; flex:1; border-radius:999px; background:#e7e6e3; overflow:hidden; position:relative; }
        .dna-tick.on{ background:#e0ddd6; }
        .dna-tick.on::after{ content:''; position:absolute; inset:0; background:#8a7a68; transform-origin:left; animation:tickFill 2.6s linear both; }
        @keyframes tickFill{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }

        /* 02 wrapped panel */
        .dna-panel--wrap{ padding:20px 20px; display:flex; flex-direction:column; color:#f4efe7;
          background:radial-gradient(120% 80% at 30% 12%, #24201a 0%, #16140f 55%, #100e0a 100%); }
        .wrap-bars{ display:flex; gap:4px; }
        .wrap-seg{ flex:1; height:3px; border-radius:2px; background:rgba(255,255,255,0.22); overflow:hidden; position:relative; }
        .wrap-seg.done{ background:#f4efe7; }
        .wrap-seg.active::after{ content:''; position:absolute; inset:0; background:#f4efe7; transform-origin:left; animation:wrapFill 2.6s linear both; }
        @keyframes wrapFill{ from{ transform:scaleX(0);} to{ transform:scaleX(1);} }
        .wrap-body{ flex:1; display:flex; flex-direction:column; justify-content:center; animation:fadeIn .5s ease both; }
        @keyframes fadeIn{ from{ opacity:0; } to{ opacity:1; } }
        .wrap-k{ font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:rgba(244,239,231,0.5); margin-bottom:12px; }
        .wrap-big{ font-family:var(--font-cormorant),serif; font-size:clamp(34px,4vw,44px); line-height:1.02; color:#f4efe7; margin-bottom:10px; }
        .wrap-big.ital{ font-style:italic; }
        .wrap-sub{ font-family:var(--font-jost),sans-serif; font-size:12.5px; line-height:1.4; color:rgba(244,239,231,0.55); }
        .wrap-foot{ font-family:var(--font-jost),sans-serif; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(244,239,231,0.4); }

        /* 03 camera panel */
        .dna-panel--cam{ background:#1A1916; --dna-scale:0.82; }
        .dna-iframe{ position:absolute; top:0; left:0; width:390px; height:844px; transform-origin:top left; transform:scale(var(--dna-scale)); border:0; background:#1A1916; }

        @media (prefers-reduced-motion: reduce){
          .dna-aura,.dna-dot,.dna-fill,.dna-tag,.dna-top-name,.dna-insight,.dna-tick.on::after,.wrap-seg.active::after,.wrap-body,.dna-ring circle{ animation:none !important; }
          .dna-fill{ width:var(--pct); }
        }
      `}</style>
    </section>
  );
}
