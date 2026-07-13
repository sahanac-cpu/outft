"use client";

import { useEffect, useRef, useState } from "react";

type Reading = {
  top: string;
  bars: [string, number][];
  tags: string[];
  insight: string;
};

// sample readings the panel decodes on a loop — a taste of what the AI returns
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

export function DnaLive() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const r = READINGS[i];

  // render the app at true 390px, then scale into the frame
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const set = () => el.style.setProperty("--dna-scale", String((el.clientWidth - 26) / 390));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // auto-cycle the sample readings (unless the user prefers reduced motion)
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % READINGS.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="try-dna" className="dna-section relative overflow-hidden">
      <div aria-hidden className="dna-aura" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        {/* header */}
        <div className="max-w-[42rem]">
          <span className="dna-eyebrow"><span className="dna-dot" /> Live · powered by AI</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-normal leading-[0.96] tracking-[-0.02em] text-[#f4efe7]">
            Your style, decoded<br />in seconds.
          </h2>
          <p className="mt-6 max-w-[40ch] font-serif text-[clamp(1.05rem,1.7vw,1.35rem)] font-light italic leading-snug text-[#b7b0a4]">
            Point the camera at today&apos;s outfit. It reads your aesthetic back to you — live —
            the way it&apos;s decoding these right now.
          </p>
        </div>

        {/* stage: animated readout + live phone */}
        <div className="mt-14 grid items-center gap-12 md:mt-16 md:grid-cols-[1fr_auto] md:gap-16 lg:gap-24">
          {/* the animated DNA readout */}
          <div className="dna-card">
            <div className="dna-card-hd">
              <span className="dna-card-kicker">Style DNA · reading</span>
              <span className="dna-scanning"><span className="dna-scan-dot" /> analyzing</span>
            </div>

            <div className="dna-top">
              <span className="dna-top-label">You read as</span>
              <div key={`t${i}`} className="dna-top-name">
                {r.top}<span className="dna-top-dot">.</span>
              </div>
            </div>

            <div key={`b${i}`} className="dna-bars">
              {r.bars.map(([label, pct], idx) => (
                <div className="dna-bar-row" key={label}>
                  <div className="dna-bar-meta">
                    <span>{label}</span>
                    <span className="dna-pct">{pct}%</span>
                  </div>
                  <div className="dna-track">
                    <div
                      className="dna-fill"
                      style={{ ["--pct" as string]: `${pct}%`, animationDelay: `${idx * 0.08}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div key={`g${i}`} className="dna-tags">
              {r.tags.map((t, idx) => (
                <span className="dna-tag" style={{ animationDelay: `${0.2 + idx * 0.07}s` }} key={t}>
                  {t}
                </span>
              ))}
            </div>

            <p key={`i${i}`} className="dna-insight">{r.insight}</p>

            {/* progress ticks */}
            <div className="dna-ticks">
              {READINGS.map((_, idx) => (
                <span key={idx} className={`dna-tick ${idx === i ? "on" : ""}`} />
              ))}
            </div>
          </div>

          {/* the live phone */}
          <div className="dna-device relative">
            <span className="dna-snaphint">snap yours — it&apos;s live ↴</span>
            <div className="dna-frame" ref={frameRef}>
              <div className="dna-island" />
              <span className="dna-btn dna-btn--silence" />
              <span className="dna-btn dna-btn--vol dna-btn--vol1" />
              <span className="dna-btn dna-btn--vol dna-btn--vol2" />
              <span className="dna-btn dna-btn--power" />
              <div className="dna-screen">
                <iframe
                  src="/demo/outft-dna.html"
                  title="OUTFT. — live Style DNA analyzer"
                  allow="camera; fullscreen"
                  loading="lazy"
                  className="dna-iframe"
                />
                <div aria-hidden className="dna-scanline" />
                <div aria-hidden className="dna-gloss" />
              </div>
            </div>
            <div aria-hidden className="dna-shadow" />
          </div>
        </div>

        <p className="mt-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[#7c766c]">
          <span className="h-px w-10 bg-[#3a352d]" />
          Camera runs on your device · photos are analyzed, never stored
        </p>
      </div>

      <style>{`
        .dna-section{ background:radial-gradient(120% 90% at 78% 30%, #211d16 0%, #16140f 42%, #100e0a 100%); border-top:1px solid #2a2620; }
        .dna-aura{ position:absolute; right:-6%; top:34%; width:min(720px,60vw); aspect-ratio:1; transform:translateY(-50%); pointer-events:none;
          background:radial-gradient(closest-side, rgba(196,176,152,0.20), rgba(99,201,141,0.08) 44%, transparent 72%); filter:blur(30px); animation:dnaAura 15s ease-in-out infinite; }
        @keyframes dnaAura{ 0%,100%{ transform:translateY(-50%) scale(1); opacity:.85;} 50%{ transform:translateY(-54%) scale(1.12); opacity:1;} }

        .dna-eyebrow{ display:inline-flex; align-items:center; gap:8px; font-family:var(--font-jost),sans-serif; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:#9a9488; }
        .dna-dot{ width:7px;height:7px;border-radius:999px;background:#63c98d; box-shadow:0 0 0 0 rgba(99,201,141,.5); animation:dnaPulse 1.7s ease-out infinite; }
        @keyframes dnaPulse{ 0%{box-shadow:0 0 0 0 rgba(99,201,141,.55);} 70%{box-shadow:0 0 0 8px rgba(99,201,141,0);} 100%{box-shadow:0 0 0 0 rgba(99,201,141,0);} }

        /* readout card */
        .dna-card{ position:relative; border:1px solid rgba(255,255,255,0.10); border-radius:22px; padding:26px 26px 22px; overflow:hidden;
          background:linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015)); backdrop-filter:blur(6px);
          box-shadow:0 40px 80px -40px rgba(0,0,0,0.6); max-width:560px; }
        .dna-card-hd{ display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .dna-card-kicker{ font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8f897d; }
        .dna-scanning{ display:inline-flex; align-items:center; gap:7px; font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:#63c98d; }
        .dna-scan-dot{ width:6px;height:6px;border-radius:999px;background:#63c98d; animation:scanBlink 1.1s steps(2,end) infinite; }
        @keyframes scanBlink{ 50%{ opacity:.25; } }

        .dna-top{ margin-bottom:22px; }
        .dna-top-label{ font-family:var(--font-jost),sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8f897d; }
        .dna-top-name{ font-family:var(--font-cormorant),serif; font-style:italic; font-size:clamp(2.2rem,4.5vw,3.4rem); line-height:1.02; color:#f4efe7; margin-top:4px; animation:riseIn .6s cubic-bezier(.16,1,.3,1) both; }
        .dna-top-dot{ color:#63c98d; }
        @keyframes riseIn{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:translateY(0); } }

        .dna-bars{ display:flex; flex-direction:column; gap:13px; margin-bottom:20px; }
        .dna-bar-row{ }
        .dna-bar-meta{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; font-family:var(--font-jost),sans-serif; font-size:13px; color:#d7d1c6; }
        .dna-pct{ font-family:var(--font-cormorant),serif; font-size:15px; color:#c4b098; }
        .dna-track{ height:5px; border-radius:999px; background:rgba(255,255,255,0.08); overflow:hidden; }
        .dna-fill{ height:100%; width:var(--pct); border-radius:999px; background:linear-gradient(90deg,#8a7a68,#c4b098,#e8d8c4); animation:fillIn .9s cubic-bezier(.16,1,.3,1) both; }
        @keyframes fillIn{ from{ width:0; } }

        .dna-tags{ display:flex; flex-wrap:wrap; gap:7px; margin-bottom:18px; }
        .dna-tag{ font-family:var(--font-jost),sans-serif; font-size:11px; letter-spacing:.04em; color:#d7d1c6; border:1px solid rgba(255,255,255,0.16); border-radius:999px; padding:5px 12px; animation:tagIn .5s ease both; }
        @keyframes tagIn{ from{ opacity:0; transform:translateY(6px) scale(.96); } to{ opacity:1; transform:none; } }

        .dna-insight{ font-family:var(--font-cormorant),serif; font-style:italic; font-size:clamp(1rem,1.4vw,1.2rem); line-height:1.5; color:#a9a294; padding-top:16px; border-top:1px solid rgba(255,255,255,0.09); animation:fadeIn .7s ease both; }
        @keyframes fadeIn{ from{ opacity:0; } to{ opacity:1; } }

        .dna-ticks{ display:flex; gap:6px; margin-top:16px; }
        .dna-tick{ height:3px; flex:1; border-radius:999px; background:rgba(255,255,255,0.12); overflow:hidden; position:relative; }
        .dna-tick.on{ background:rgba(255,255,255,0.14); }
        .dna-tick.on::after{ content:''; position:absolute; inset:0; background:#c4b098; transform-origin:left; animation:tickFill 4.2s linear both; }
        @keyframes tickFill{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }

        /* live phone */
        .dna-device{ animation:dnaFloat 7s ease-in-out infinite; justify-self:center; }
        .dna-device:hover{ animation-play-state:paused; }
        @keyframes dnaFloat{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-12px);} }
        .dna-snaphint{ position:absolute; top:-34px; right:6px; font-family:var(--font-jost),sans-serif; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:#8f897d; animation:hintBob 2.6s ease-in-out infinite; }
        @keyframes hintBob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(4px);} }
        .dna-frame{ position:relative; width:clamp(260px,80vw,326px); padding:13px; border-radius:56px; --dna-scale:0.77;
          background:linear-gradient(150deg,#4a463f,#1d1a15 38%,#332f28 64%,#100e0a);
          box-shadow:0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px -20px rgba(99,201,141,0.10), 0 64px 120px -44px rgba(0,0,0,0.7); }
        .dna-screen{ position:relative; border-radius:44px; overflow:hidden; background:#1A1916; aspect-ratio:390 / 844; box-shadow:0 0 0 2px rgba(0,0,0,.6), 0 0 0 6px rgba(50,47,40,.55); }
        .dna-iframe{ position:absolute; top:0; left:0; width:390px; height:844px; transform-origin:top left; transform:scale(var(--dna-scale)); border:0; background:#1A1916; }
        .dna-island{ position:absolute; top:22px; left:50%; transform:translateX(-50%); width:98px; height:26px; border-radius:999px; background:#000; z-index:6; }
        .dna-gloss{ position:absolute; inset:0; pointer-events:none; border-radius:44px; background:linear-gradient(125deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.04) 18%, transparent 38%); mix-blend-mode:screen; }
        .dna-scanline{ position:absolute; left:0; right:0; height:34%; pointer-events:none; border-radius:44px; transition:opacity .4s ease;
          background:linear-gradient(180deg, transparent, rgba(99,201,141,0.12) 60%, rgba(99,201,141,0.22)); mix-blend-mode:screen; animation:scanSweep 3.6s cubic-bezier(.5,0,.5,1) infinite; }
        .dna-device:hover .dna-scanline{ opacity:0; }
        @keyframes scanSweep{ 0%{ transform:translateY(-40%); opacity:0; } 15%{ opacity:1; } 85%{ opacity:1; } 100%{ transform:translateY(230%); opacity:0; } }
        .dna-btn{ position:absolute; background:linear-gradient(#3a362e,#141210); border-radius:3px; }
        .dna-btn--silence{ left:-3px; top:120px; width:3px; height:28px; }
        .dna-btn--vol{ left:-3px; width:3px; height:54px; }
        .dna-btn--vol1{ top:164px; } .dna-btn--vol2{ top:230px; }
        .dna-btn--power{ right:-3px; top:184px; width:3px; height:78px; }
        .dna-shadow{ position:absolute; left:50%; bottom:-44px; width:76%; height:44px; transform:translateX(-50%); background:radial-gradient(ellipse at center, rgba(0,0,0,.55), transparent 70%); filter:blur(12px); z-index:-1; }

        @media (prefers-reduced-motion: reduce){
          .dna-aura,.dna-dot,.dna-device,.dna-scanline,.dna-scan-dot,.dna-fill,.dna-tag,.dna-top-name,.dna-insight,.dna-tick.on::after,.dna-snaphint{ animation:none !important; }
          .dna-fill{ width:var(--pct); }
        }
      `}</style>
    </section>
  );
}
