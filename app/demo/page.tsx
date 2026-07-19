import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Demo. OUTFT.",
  description: "A private demo of outft. for partners.",
  robots: { index: false, follow: false },
};

const PROPS: { h: string; p: string }[] = [
  {
    h: "Native sponsored fits",
    p: "Brand placements live inside the product — a sponsored fit in the feed, a curated pick on Twins — in the app's own visual language, never a banner.",
  },
  {
    h: "Style-DNA targeting",
    p: "Every posted fit folds into the user's running fashion DNA. A linen atelier reaches the quiet-luxury cohort; a streetwear label reaches theirs. Placement by aesthetic, not demographics.",
  },
  {
    h: "No engagement theater",
    p: "No public like counts, no follower leaderboards. Attention isn't gamed here — when a fit resonates, it's because the clothes did the work.",
  },
  {
    h: "A daily ritual",
    p: "outft. opens three windows a day. Users come back to log the fit they actually wore — daily attention, earned by habit rather than bought by feed algorithms.",
  },
];

const DNA = [
  { label: "Quiet luxury", pct: 38 },
  { label: "Minimalist", pct: 27 },
  { label: "Scandi", pct: 21 },
  { label: "Classic", pct: 14 },
];

export default function DemoPage() {
  return (
    <main>
      {/* Hero — brand + the live phone, first viewport */}
      <section className="border-b border-line2">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <Reveal>
              <p className="lbl">A private demo — for partners</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 font-display text-[clamp(4rem,10vw,7.5rem)] leading-none">
                outft.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[42ch] font-serif text-[clamp(1.05rem,1.6vw,1.3rem)] font-light italic leading-snug text-ink2">
                The daily fit ritual. People log the outfit they actually wore;
                an AI reads their wardrobe into a fashion DNA. This phone runs
                the real app — tap <em>explore as guest</em>, then find the
                brand placements on Twins, curated for each user&rsquo;s DNA.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-grey">
                native sponsored fits · style-DNA targeting · no like counts
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex items-center gap-6">
                <a
                  href="mailto:sahanalydiachandra@gmail.com?subject=Partnering%20with%20outft."
                  className="inline-block bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-bg"
                >
                  Partner with us
                </a>
                <span className="text-[11px] uppercase tracking-[0.2em] text-grey">
                  ● live — tap and scroll the screen
                </span>
              </div>
            </Reveal>
          </div>

          {/* The real app, embedded */}
          <Reveal delay={0.15} className="flex justify-center md:justify-end">
            <div
              className="relative overflow-hidden rounded-[46px] border-[10px] border-ink bg-ink shadow-2xl"
              style={{ width: 320, height: 660 }}
            >
              <iframe
                src="/demo/app/index.html"
                title="outft. — the real app, live"
                className="h-full w-full border-0 bg-ink"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why partner */}
      <section className="border-b border-line2 bg-panel">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
              The feed judges clothes, <em className="font-serif">not numbers.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {PROPS.map((v, i) => (
              <Reveal key={v.h} delay={0.06 * i}>
                <p className="lbl lbl-ink">{v.h}</p>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink2">
                  {v.p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DNA proof */}
      <section className="border-b border-line2">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <p className="lbl">The targeting layer</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
                Every wardrobe, read as an aesthetic.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[44ch] font-serif text-[clamp(1rem,1.5vw,1.2rem)] font-light italic leading-snug text-ink2">
                Each posted fit folds into the user&apos;s running DNA. Your
                brand appears where the aesthetic already matches — matched to
                taste, not demographics.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="border border-line2 bg-panel p-8">
              <p className="lbl lbl-ink">A sample reading</p>
              <div className="mt-6 flex flex-col gap-4">
                {DNA.map((d) => (
                  <div key={d.label} className="flex items-center gap-4">
                    <span className="w-28 text-[13px] text-ink2">{d.label}</span>
                    <span className="h-px flex-1 bg-line2">
                      <span
                        className="block h-px bg-ink"
                        style={{ width: `${d.pct}%` }}
                      />
                    </span>
                    <span className="font-serif text-lg">{d.pct}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[13px] leading-relaxed text-grey">
                A quiet-luxury lead means Toteme-adjacent placements land here
                first — sponsored fits the user reads as taste, not ads.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">
              Put your brand in the record.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-[46ch] font-serif italic text-ink2">
              We&rsquo;re opening a small number of founding brand partnerships.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href="mailto:sahanalydiachandra@gmail.com?subject=Partnering%20with%20outft."
              className="mt-8 inline-block bg-ink px-10 py-4 text-[11px] uppercase tracking-[0.25em] text-bg"
            >
              Partner with us
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
