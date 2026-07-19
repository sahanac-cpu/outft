import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Demo. OUTFT.",
  description: "A private demo of outft. for partners.",
  robots: { index: false, follow: false },
};

const PHONES: { s: string; label: string; dark?: boolean }[] = [
  { s: "dna", label: "Style DNA · reading" },
  { s: "wrapped", label: "outft. wrapped", dark: true },
  { s: "home", label: "The daily ritual" },
];

const PROPS: { h: string; p: string }[] = [
  {
    h: "Native sponsored fits",
    p: "Brand placements live inside the product — in the app's own visual language, never a banner.",
  },
  {
    h: "Style-DNA targeting",
    p: "Every posted fit folds into the user's running fashion DNA. A linen atelier reaches the quiet-luxury cohort; a streetwear label reaches theirs. Placement by aesthetic, not demographics.",
  },
  {
    h: "No engagement theater",
    p: "No public like counts, no follower leaderboards. When a fit resonates, it's because the clothes did the work.",
  },
  {
    h: "A daily ritual",
    p: "outft. opens three windows a day. Users come back to log the fit they actually wore — daily attention, earned by habit.",
  },
];

export default function DemoPage() {
  return (
    <main>
      {/* Three live screens, straight in — like the site's own demo language */}
      <section className="border-b border-line2">
        <div className="mx-auto w-full max-w-6xl px-6 pt-8">
          <Reveal>
            <p className="lbl">A private demo — for partners · every screen is live, tap and scroll</p>
          </Reveal>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-16 pt-8 md:grid-cols-3">
          {PHONES.map((p, i) => (
            <Reveal key={p.s} delay={0.08 * i} className="flex flex-col items-center">
              <div
                className={`w-full overflow-hidden rounded-[36px] shadow-xl ${
                  p.dark ? "bg-ink" : "bg-bg"
                }`}
                style={{ maxWidth: 400, height: 780 }}
              >
                <iframe
                  src={`/demo/outft-app.html?s=${p.s}`}
                  title={`outft. — ${p.label}`}
                  className="h-full w-full border-0"
                />
              </div>
              <p className="lbl mt-5">{p.label}</p>
            </Reveal>
          ))}
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

      {/* The real app */}
      <section className="border-b border-line2">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <p className="lbl">Not a mockup</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
                This phone runs the real app.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[44ch] font-serif text-[clamp(1rem,1.5vw,1.2rem)] font-light italic leading-snug text-ink2">
                The same code that ships to iPhones. Tap{" "}
                <em>explore as guest</em> and walk the product yourself —
                the ritual, the DNA, the twins.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex justify-center md:justify-end">
            <div
              className="overflow-hidden rounded-[42px] border-[10px] border-ink bg-ink shadow-2xl"
              style={{ width: 300, height: 630 }}
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
