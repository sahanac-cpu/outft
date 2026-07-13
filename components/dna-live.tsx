"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { n: "01", t: "Sign in", s: "email, Apple, or jump in as a guest" },
  { n: "02", t: "Open the camera", s: "front or rear — or upload a photo" },
  { n: "03", t: "Snap your fit", s: "full-length, presented as a receipt" },
  { n: "04", t: "Read your DNA", s: "real aesthetic percentages, tags & an insight" },
];

export function DnaLive() {
  const frameRef = useRef<HTMLDivElement>(null);

  // render the app at a true 390px width, then scale it to fit the frame
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const set = () => {
      const inner = el.clientWidth - 26; // 13px padding each side
      el.style.setProperty("--dna-scale", String(inner / 390));
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="try-dna" className="relative overflow-hidden border-t border-line2 bg-bone">
      <div aria-hidden className="dna-aura" />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 px-6 py-20 md:grid-cols-[1fr_auto] md:gap-20 md:px-10 md:py-28">
        {/* copy + steps */}
        <div>
          <span className="lbl inline-flex items-center gap-2">
            <span className="dna-dot" /> Live · powered by AI
          </span>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,5vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
            Now try your own.
          </h2>
          <p className="mt-5 max-w-[42ch] font-serif text-[clamp(1.05rem,1.6vw,1.3rem)] font-light italic leading-snug text-ink2">
            This one&apos;s real. Point the camera at today&apos;s outfit and watch it read your
            style back to you — aesthetic breakdown, tags, and a one-line insight, generated live.
          </p>

          <ol className="mt-9 max-w-[34rem] divide-y divide-line">
            {STEPS.map((step) => (
              <li key={step.n} className="flex items-baseline gap-5 py-4">
                <span className="w-8 shrink-0 font-serif text-[17px] text-grey-soft">{step.n}</span>
                <div>
                  <p className="font-display text-[18px] leading-tight text-ink">{step.t}</p>
                  <p className="mt-0.5 font-serif text-[14px] italic text-grey">{step.s}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-grey-soft">
            <span className="h-px w-10 bg-line2" />
            Camera runs on your device · photos are analyzed, never stored
          </p>
        </div>

        {/* the live phone */}
        <div className="flex justify-center md:justify-end">
          <div className="dna-device relative">
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
                <div aria-hidden className="dna-gloss" />
              </div>
            </div>
            <div aria-hidden className="dna-shadow" />
          </div>
        </div>
      </div>

      <style>{`
        .dna-aura{
          position:absolute; left:72%; top:50%; width:min(900px,80vw); aspect-ratio:1;
          transform:translate(-50%,-50%);
          background:radial-gradient(closest-side, rgba(196,208,216,0.28), rgba(221,185,200,0.16) 46%, transparent 72%);
          filter:blur(26px); pointer-events:none; animation:dnaAura 17s ease-in-out infinite;
        }
        @keyframes dnaAura{ 0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:.8;} 50%{ transform:translate(-54%,-52%) scale(1.1); opacity:1;} }
        .dna-dot{ width:7px;height:7px;border-radius:999px;background:#63c98d;display:inline-block; box-shadow:0 0 0 0 rgba(99,201,141,.5); animation:dnaPulse 1.7s ease-out infinite; }
        @keyframes dnaPulse{ 0%{box-shadow:0 0 0 0 rgba(99,201,141,.5);} 70%{box-shadow:0 0 0 7px rgba(99,201,141,0);} 100%{box-shadow:0 0 0 0 rgba(99,201,141,0);} }

        .dna-device{ animation:dnaFloat 7s ease-in-out infinite; }
        .dna-device:hover{ animation-play-state:paused; }
        @keyframes dnaFloat{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-12px);} }
        .dna-frame{
          position:relative; width:clamp(260px,82vw,340px); padding:13px; border-radius:56px;
          --dna-scale:0.805;
          background:linear-gradient(150deg,#3a3733,#16140f 36%,#2a2723 64%,#0c0b09);
          box-shadow:0 2px 1px rgba(255,255,255,.22) inset, 0 -2px 2px rgba(0,0,0,.5) inset,
                     0 64px 110px -44px rgba(22,20,15,.55), 0 24px 48px -28px rgba(22,20,15,.42);
        }
        .dna-screen{ position:relative; border-radius:44px; overflow:hidden; background:#1A1916; aspect-ratio:390 / 844; box-shadow:0 0 0 2px rgba(0,0,0,.6), 0 0 0 6px rgba(40,37,33,.55); }
        .dna-iframe{ position:absolute; top:0; left:0; width:390px; height:844px; transform-origin:top left; transform:scale(var(--dna-scale)); border:0; background:#1A1916; }
        .dna-island{ position:absolute; top:22px; left:50%; transform:translateX(-50%); width:100px; height:27px; border-radius:999px; background:#000; z-index:6; box-shadow:0 1px 2px rgba(255,255,255,.08) inset; }
        .dna-gloss{ position:absolute; inset:0; pointer-events:none; border-radius:44px; background:linear-gradient(125deg, rgba(255,255,255,.15) 0%, rgba(255,255,255,.04) 18%, transparent 38%); mix-blend-mode:screen; }
        .dna-btn{ position:absolute; background:linear-gradient(#2a2723,#100f0d); border-radius:3px; }
        .dna-btn--silence{ left:-3px; top:120px; width:3px; height:28px; }
        .dna-btn--vol{ left:-3px; width:3px; height:54px; }
        .dna-btn--vol1{ top:164px; } .dna-btn--vol2{ top:230px; }
        .dna-btn--power{ right:-3px; top:184px; width:3px; height:78px; }
        .dna-shadow{ position:absolute; left:50%; bottom:-46px; width:78%; height:46px; transform:translateX(-50%); background:radial-gradient(ellipse at center, rgba(22,20,15,.4), transparent 70%); filter:blur(11px); z-index:-1; }

        @media (prefers-reduced-motion: reduce){
          .dna-aura,.dna-dot,.dna-device{ animation:none !important; }
        }
      `}</style>
    </section>
  );
}
