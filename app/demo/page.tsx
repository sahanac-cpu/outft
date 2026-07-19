import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Demo. OUTFT.",
  description: "A private demo of outft. for partners.",
  robots: { index: false, follow: false },
};

const BENEFITS: { h: string; p: string }[] = [
  {
    h: "Native sponsored fits",
    p: "Your brand appears as a fit in the feed, a curated pick on Twins, a spotlight on Home — in the app's own language, never a banner. Flip through the phone: the placements are already in there.",
  },
  {
    h: "Style-DNA targeting",
    p: "Every logged outfit folds into the user's fashion DNA. You reach the cohort whose aesthetic already matches yours — placement by taste, not demographics.",
  },
  {
    h: "Attention that's a ritual",
    p: "Three posting windows a day, streaks, a monthly wrapped. No like counts, no leaderboards — when your fit resonates, it's because the clothes did the work.",
  },
];

export default function DemoPage() {
  return (
    <main>
      {/* Everything on one screen: the whole app in one phone + why partners win */}
      <section className="border-b border-line2">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-14 pt-8 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
          <div>
            <Reveal>
              <p className="lbl">A private demo — for partners</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
                outft.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[46ch] font-serif text-[clamp(1rem,1.4vw,1.2rem)] font-light italic leading-snug text-ink2">
                The daily fit ritual. This phone is the whole app — sixteen
                screens, live. Tap the tabs, scroll the feed, open Wrapped.
                Your brand is already placed inside it.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-col gap-6">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.h} delay={0.12 + 0.06 * i}>
                  <p className="lbl lbl-ink">{b.h}</p>
                  <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink2">
                    {b.p}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.34}>
              <div className="mt-9 flex items-center gap-6">
                <a
                  href="mailto:sahanalydiachandra@gmail.com?subject=Partnering%20with%20outft."
                  className="inline-block bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-bg"
                >
                  Partner with us
                </a>
                <span className="text-[11px] uppercase tracking-[0.2em] text-grey">
                  ● live — tap and scroll
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="flex justify-center md:justify-end">
            <div
              className="overflow-hidden rounded-[40px] bg-bg shadow-2xl ring-1 ring-line2"
              style={{ width: 375, height: 812, maxHeight: "calc(100vh - 140px)" }}
            >
              <iframe
                src="/demo/outft-app.html?s=home"
                title="outft. — the whole app, live"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
