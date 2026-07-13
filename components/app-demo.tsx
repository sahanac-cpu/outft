"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────── live phones in a 3D cover-flow ─────────── */
const PHONES: { screen: string; n: string; title: string; sub: string }[] = [
  { screen: "home", n: "01", title: "Home", sub: "your morning ritual — streak alive, today's trace waiting" },
  { screen: "camera", n: "02", title: "Camera", sub: "snap the fit you actually wore, get the receipt" },
  { screen: "feed", n: "03", title: "Friends' traces", sub: "what they wore, the day they wore it — like, save, comment" },
  { screen: "twins", n: "04", title: "Twins", sub: "outfits from other people that echo yours" },
  { screen: "dna", n: "05", title: "ft. DNA", sub: "your whole wardrobe, read back in numbers" },
  { screen: "wrapped", n: "06", title: "Wrapped", sub: "swipe your month back, story by story" },
  { screen: "profile", n: "07", title: "Profile", sub: "every fit you've kept, in one place" },
];

export function AppDemo() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dims, setDims] = useState({ pw: 300, frameH: 621, scale: 0.7077 });
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const wheelAcc = useRef(0);
  const lastFlip = useRef(0);           // timestamp of the last flip
  const endTimer = useRef<number | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  // idle auto-advance — a living demo that cycles every screen until you take over
  useEffect(() => {
    if (touched || hovered) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % PHONES.length), 3400);
    return () => window.clearInterval(id);
  }, [touched, hovered]);

  // responsive params for the 3D spread
  // size the phone to the viewport so the whole demo fits on one screen
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mob = vw < 768;
      setCompact(mob);
      // reserve space for the header + caption + padding, then size the phone
      const frameH = Math.max(320, Math.min(vh - (mob ? 400 : 420), mob ? 560 : 560));
      const screenH = frameH - 24;              // frame padding
      const screenW = (screenH * 390) / 844;    // phone aspect
      setDims({
        pw: Math.round(screenW + 24),
        frameH: Math.round(frameH),
        scale: +(screenW / 390).toFixed(4),
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const move = useCallback(
    (dir: number) => {
      setActive((a) => Math.min(PHONES.length - 1, Math.max(0, a + dir)));
      setTouched(true);
    },
    []
  );

  // keyboard arrows when the carousel is in view / hovered
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    };
    stage.addEventListener("keydown", onKey);
    return () => stage.removeEventListener("keydown", onKey);
  }, [move]);

  // one scroll gesture = one step. after firing we disarm, and only re-arm
  // once the wheel has been quiet for a moment — so trackpad momentum can't
  // machine-gun through several screens on a single flick.
  const stepFromDelta = useCallback((dx: number, dy: number) => {
    const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    const dir = d > 0 ? 1 : -1;
    const canGo = dir > 0 ? activeRef.current < PHONES.length - 1 : activeRef.current > 0;
    if (!canGo) return false; // let the page keep scrolling at the ends

    const now = performance.now();
    // after a flip, swallow the trackpad's momentum tail so one gesture moves
    // exactly one screen (never skips past DNA etc.)
    if (now - lastFlip.current < 420) { wheelAcc.current = 0; return true; }

    // reset the running total if the gesture pauses or reverses
    if (endTimer.current) window.clearTimeout(endTimer.current);
    endTimer.current = window.setTimeout(() => { wheelAcc.current = 0; }, 130);

    // needs a deliberate scroll to flip, so a glance-scroll won't yank you off a screen
    if (Math.sign(wheelAcc.current) !== dir) wheelAcc.current = 0;
    wheelAcc.current += d;
    if (Math.abs(wheelAcc.current) > 90) {
      move(dir);
      lastFlip.current = now;
      wheelAcc.current = 0;
    }
    return true;
  }, [move]);

  // scroll to flip — over the stage, and forwarded from inside the live phones
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => { if (stepFromDelta(e.deltaX, e.deltaY)) e.preventDefault(); };
    const onMsg = (e: MessageEvent) => {
      const m = e.data || {};
      if (m.type === "outft-wheel") stepFromDelta(m.dx || 0, m.dy || 0);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("message", onMsg);
    return () => { stage.removeEventListener("wheel", onWheel); window.removeEventListener("message", onMsg); };
  }, [stepFromDelta]);

  // swipe on the stage (only when the touch starts off the active iframe — sides)
  const dragX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".cf-catch")) dragX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  };

  const SPACING = dims.pw * (compact ? 0.53 : 0.81);
  const DEPTH = dims.pw * (compact ? 0.6 : 0.8);
  const ANGLE = compact ? 38 : 46;

  return (
    <section id="demo" className="relative overflow-hidden border-t border-line2 bg-panel">
      <div aria-hidden className="demo-aura" />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col justify-center px-6 py-6 md:px-10 md:py-8">
        {/* header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="lbl inline-flex items-center gap-2">
              <span className="live-dot" /> The app — every screen is live
            </span>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-normal leading-[1] tracking-[-0.02em] text-ink">
              Flip through it. Then go play.
            </h2>
          </div>
          <p className="hidden font-serif text-[clamp(0.95rem,1.35vw,1.15rem)] font-light italic text-ink2 md:block md:max-w-[32ch] md:text-right">
            Not screenshots — the real product. Bring any screen to the front, then tap straight
            into it.
          </p>
        </div>

        {/* 3D cover-flow stage */}
        <div
          ref={stageRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setHovered(true)}
          style={{
            ["--pw" as string]: `${dims.pw}px`,
            ["--ph" as string]: `${dims.frameH}px`,
            ["--scale" as string]: `${dims.scale}`,
            height: `${dims.frameH + 30}px`,
          }}
          className="cf-stage relative mt-6 outline-none md:mt-8"
        >
          <div className="cf-track">
            {PHONES.map((p, i) => {
              const off = i - active;
              const a = Math.abs(off);
              const sign = Math.sign(off);
              const isActive = i === active;
              const hidden = a > 3;
              return (
                <div
                  key={p.screen}
                  className={`cf-phone ${isActive ? "is-active" : ""}`}
                  style={{
                    transform: `translateX(${off * SPACING}px) translateZ(${-a * DEPTH}px) rotateY(${-sign * ANGLE}deg) scale(${Math.max(0.66, 1 - a * 0.085)})`,
                    zIndex: 100 - a,
                    opacity: hidden ? 0 : 1 - a * 0.16,
                    pointerEvents: hidden ? "none" : "auto",
                    filter: isActive ? "none" : "brightness(0.86) saturate(0.92)",
                  }}
                >
                  <div className={`device-frame ${isActive ? "device-float" : ""}`}>
                    <div className="device-island" />
                    <span className="device-btn device-btn--silence" />
                    <span className="device-btn device-btn--vol device-btn--vol1" />
                    <span className="device-btn device-btn--vol device-btn--vol2" />
                    <span className="device-btn device-btn--power" />
                    <div className="device-screen">
                      <iframe
                        src={`/demo/outft-app.html?s=${p.screen}`}
                        title={`OUTFT. — ${p.title}, live`}
                        loading={i <= 2 ? "eager" : "lazy"}
                        className="border-0"
                        tabIndex={isActive ? 0 : -1}
                      />
                      <div aria-hidden className="device-gloss" />
                    </div>
                  </div>

                  {/* side phones: a catcher brings them to front, with a hover cue */}
                  {!isActive && (
                    <button
                      className="cf-catch"
                      aria-label={`Bring ${p.title} to the front`}
                      onClick={() => { setActive(i); setTouched(true); }}
                    >
                      <span className="cf-bring">{p.title} <em>· tap</em></span>
                    </button>
                  )}

                  {/* active phone: make it obvious this one is live + tappable */}
                  {isActive && (
                    <>
                      <div className={`cf-tapcue ${touched ? "is-gone" : ""}`} aria-hidden>
                        <span className="ring" />
                        <span className="ring ring2" />
                        <svg className="cursor" width="26" height="30" viewBox="0 0 26 30" fill="#16140f" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round">
                          <path d="M4 3l17 10-7.2 1.6 3.9 7.6-3.3 1.7-3.9-7.7L4 23z" />
                        </svg>
                      </div>

                      <div className={`cf-hint ${touched ? "is-gone" : ""}`} aria-hidden>
                        <span>Go on — tap it, it&apos;s the real app</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* arrows */}
          <button
            className="cf-arrow cf-arrow--l"
            onClick={() => move(-1)}
            disabled={active === 0}
            aria-label="Previous screen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            className="cf-arrow cf-arrow--r"
            onClick={() => move(1)}
            disabled={active === PHONES.length - 1}
            aria-label="Next screen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* active caption */}
        <div className="mt-5 flex flex-col items-center text-center">
          <div key={active} className="cf-caption">
            <span className="lbl">{PHONES[active].n} — {PHONES[active].title}</span>
            <p className="mx-auto mt-2 flex min-h-[2.8rem] max-w-[34ch] items-center justify-center font-serif text-[clamp(1rem,1.5vw,1.2rem)] font-light italic leading-snug text-ink2">
              {PHONES[active].sub}
            </p>
          </div>

          {/* dots */}
          <div className="mt-4 flex items-center gap-2.5">
            {PHONES.map((p, i) => (
              <button
                key={p.screen}
                onClick={() => { setActive(i); setTouched(true); }}
                aria-label={`Go to ${p.title}`}
                aria-current={i === active}
                className={`cf-dot ${i === active ? "is-on" : ""}`}
              />
            ))}
          </div>
          <span className="mt-3 text-[11px] uppercase tracking-[0.18em] text-grey-soft">
            14 screens · scroll to flip · tap a phone to play
          </span>
        </div>
      </div>

      <style>{`
        .demo-aura{
          position:absolute; left:50%; top:52%; width:min(1300px,96vw); aspect-ratio:2.2;
          transform:translate(-50%,-50%);
          background:radial-gradient(closest-side, rgba(221,185,200,0.24), rgba(196,208,216,0.15) 48%, transparent 74%);
          filter:blur(28px); pointer-events:none; animation:demoAura 18s ease-in-out infinite;
        }
        @keyframes demoAura{ 0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:.8;} 50%{ transform:translate(-50%,-52%) scale(1.06); opacity:1;} }
        .live-dot{ width:7px;height:7px;border-radius:999px;background:#16140f;display:inline-block; box-shadow:0 0 0 0 rgba(22,20,15,.5); animation:livePulse 1.8s ease-out infinite; }
        @keyframes livePulse{ 0%{box-shadow:0 0 0 0 rgba(22,20,15,.45);} 70%{box-shadow:0 0 0 7px rgba(22,20,15,0);} 100%{box-shadow:0 0 0 0 rgba(22,20,15,0);} }

        .cf-stage{ perspective:1700px; }
        .cf-track{ position:relative; width:100%; height:100%; transform-style:preserve-3d; }
        .cf-phone{
          position:absolute; left:50%; top:50%;
          margin-left:calc(var(--pw) / -2); margin-top:calc(var(--ph) / -2);
          width:var(--pw);
          transition:transform .42s cubic-bezier(0.22,1,0.36,1), opacity .42s ease, filter .42s ease;
          will-change:transform;
        }
        /* --pw / --ph / --scale and height are set inline from the viewport */

        .cf-catch{ position:absolute; inset:0; z-index:20; cursor:pointer; background:transparent; border:0; padding:0; border-radius:50px; }
        .cf-hint{ position:absolute; left:50%; top:-18px; transform:translate(-50%,-100%); z-index:25; pointer-events:none; transition:opacity .5s ease, transform .5s ease; }
        .cf-hint span{ display:inline-block; white-space:nowrap; background:#16140f; color:#fff; font-size:11px; letter-spacing:.14em; text-transform:uppercase; padding:9px 16px; border-radius:999px; box-shadow:0 14px 30px -14px rgba(22,20,15,.7); animation:hintBob 2.4s ease-in-out infinite; }
        .cf-hint.is-gone{ opacity:0; transform:translate(-50%,-130%); }
        @keyframes hintBob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-5px);} }

        /* animated tap cursor demonstrating the phone is tappable */
        .cf-tapcue{ position:absolute; left:56%; top:62%; z-index:24; pointer-events:none; transition:opacity .45s ease; }
        .cf-tapcue.is-gone{ opacity:0; }
        .cf-tapcue .ring{ position:absolute; left:0; top:0; width:46px; height:46px; margin:-23px 0 0 -23px; border-radius:999px; border:2px solid rgba(22,20,15,.55); animation:tapRing 1.8s ease-out infinite; }
        .cf-tapcue .ring2{ animation-delay:.9s; }
        @keyframes tapRing{ 0%{ transform:scale(.35); opacity:.9;} 100%{ transform:scale(1.5); opacity:0;} }
        .cf-tapcue .cursor{ position:relative; display:block; filter:drop-shadow(0 5px 9px rgba(0,0,0,.35)); animation:tapPress 1.8s ease-in-out infinite; }
        @keyframes tapPress{ 0%,100%{ transform:translate(0,0);} 42%{ transform:translate(-3px,-3px);} 54%{ transform:translate(0,0);} }

        /* side phone hover cue */
        .cf-catch{ display:grid; place-items:center; }
        .cf-catch:hover{ background:rgba(255,255,255,.05); }
        .cf-bring{ opacity:0; transform:scale(.9); transition:all .25s ease; background:rgba(255,255,255,.94); color:#16140f; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; padding:8px 14px; border-radius:999px; white-space:nowrap; box-shadow:0 12px 26px -12px rgba(0,0,0,.45); }
        .cf-bring em{ font-style:normal; color:#928e87; }
        .cf-catch:hover .cf-bring{ opacity:1; transform:scale(1); }

        /* make the arrows read clearly as controls */
        .cf-arrow{ overflow:visible; }
        .cf-arrow::after{ content:''; position:absolute; inset:0; border-radius:999px; border:1px solid rgba(22,20,15,.3); animation:arrowPulse 2.1s ease-out infinite; pointer-events:none; }
        @keyframes arrowPulse{ 0%{ transform:scale(1); opacity:.55;} 100%{ transform:scale(1.55); opacity:0;} }
        .cf-arrow--r svg{ animation:arrowNudgeR 1.7s ease-in-out infinite; }
        .cf-arrow--l svg{ animation:arrowNudgeL 1.7s ease-in-out infinite; }
        @keyframes arrowNudgeR{ 0%,100%{ transform:translateX(0);} 50%{ transform:translateX(2px);} }
        @keyframes arrowNudgeL{ 0%,100%{ transform:translateX(0);} 50%{ transform:translateX(-2px);} }

        .device-float{ animation:deviceFloat 7s ease-in-out infinite; }
        @keyframes deviceFloat{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-10px);} }
        .device-frame{
          position:relative; width:var(--pw); padding:12px; border-radius:50px;
          background:linear-gradient(150deg,#3a3733,#16140f 36%,#2a2723 64%,#0c0b09);
          box-shadow:0 2px 1px rgba(255,255,255,.22) inset, 0 -2px 2px rgba(0,0,0,.5) inset,
                     0 56px 100px -40px rgba(22,20,15,.55), 0 22px 44px -26px rgba(22,20,15,.42);
        }
        .device-screen{ position:relative; border-radius:40px; overflow:hidden; background:#1A1916; aspect-ratio:390 / 844; box-shadow:0 0 0 2px rgba(0,0,0,.6), 0 0 0 6px rgba(40,37,33,.55); }
        /* render the app at a real phone width (390px) then scale it into the frame,
           so its layout is correct instead of squished */
        .device-screen iframe{ position:absolute; top:0; left:0; width:390px; height:844px; transform-origin:top left; transform:scale(var(--scale)); background:#1A1916; }
        .device-island{ position:absolute; top:18px; left:50%; transform:translateX(-50%); width:90px; height:24px; border-radius:999px; background:#000; z-index:6; box-shadow:0 1px 2px rgba(255,255,255,.08) inset; }
        .device-gloss{ position:absolute; inset:0; pointer-events:none; border-radius:40px; background:linear-gradient(125deg, rgba(255,255,255,.15) 0%, rgba(255,255,255,.04) 18%, transparent 38%); mix-blend-mode:screen; }
        .device-btn{ position:absolute; background:linear-gradient(#2a2723,#100f0d); border-radius:3px; }
        .device-btn--silence{ left:-3px; top:108px; width:3px; height:26px; }
        .device-btn--vol{ left:-3px; width:3px; height:50px; }
        .device-btn--vol1{ top:148px; } .device-btn--vol2{ top:208px; }
        .device-btn--power{ right:-3px; top:166px; width:3px; height:70px; }
        /* premium floor reflection on the front phone */
        .cf-phone.is-active .device-frame{ -webkit-box-reflect: below 12px linear-gradient(transparent, transparent 55%, rgba(20,18,15,0.14)); }
        .cf-phone.is-active .device-shadow{ opacity:.24; }

        .cf-arrow{
          position:absolute; top:50%; transform:translateY(-50%); z-index:120;
          display:grid; place-items:center; width:48px; height:48px; border-radius:999px;
          background:rgba(255,255,255,.8); color:#16140f; border:1px solid var(--color-line2);
          backdrop-filter:blur(6px); cursor:pointer; transition:all .25s ease;
          box-shadow:0 14px 30px -16px rgba(22,20,15,.4);
        }
        .cf-arrow:hover{ background:#16140f; color:#fff; }
        .cf-arrow:disabled{ opacity:0; pointer-events:none; }
        .cf-arrow--l{ left:max(8px, 3vw); } .cf-arrow--r{ right:max(8px, 3vw); }

        .cf-caption{ animation:capIn .5s cubic-bezier(0.16,1,0.3,1); }
        @keyframes capIn{ from{ opacity:0; transform:translateY(8px);} to{ opacity:1; transform:translateY(0);} }
        .cf-dot{ width:8px; height:8px; border-radius:999px; background:var(--color-grey-soft); opacity:.5; border:0; padding:0; cursor:pointer; transition:all .3s ease; }
        .cf-dot:hover{ opacity:.8; }
        .cf-dot.is-on{ width:26px; opacity:1; background:#16140f; }

        @media (prefers-reduced-motion: reduce){
          .demo-aura,.live-dot,.device-float,.cf-hint span,
          .cf-tapcue .ring,.cf-tapcue .cursor,
          .cf-arrow::after,.cf-arrow--r svg,.cf-arrow--l svg{ animation:none !important; }
          .cf-phone{ transition:none; }
        }
      `}</style>
    </section>
  );
}
