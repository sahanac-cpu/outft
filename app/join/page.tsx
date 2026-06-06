import type { Metadata } from "next";
import { JoinFlow } from "@/components/join-flow";

export const metadata: Metadata = {
  title: "Request access. OUTFT.",
  description:
    "Join the OUTFT waitlist or apply as a creator. Opening in small rooms.",
};

export default function JoinPage() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-bone pt-[68px]">
      {/* warm wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 12% 8%, var(--color-blush), transparent 60%), radial-gradient(45% 55% at 92% 90%, var(--color-sky), transparent 60%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-10 md:py-24">
        {/* left: the pitch */}
        <div className="flex flex-col justify-center">
          <span className="lbl">Two doors</span>
          <h1 className="mt-5 font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em]">
            Ask for a<br />
            <span className="italic">room.</span>
          </h1>
          <p className="mt-7 max-w-[40ch] text-[15px] leading-relaxed text-ink2">
            outft opens a few people at a time so the first feeds stay good. Take
            the waitlist, or apply as a creator and earn a place in the feeds
            you want to be in.
          </p>

          <dl className="mt-10 flex flex-col divide-y divide-line border-y border-line">
            {[
              ["Waitlist", "An invite when your room opens. Bring your friends."],
              ["Creator", "Reviewed by hand. Early access, a public profile, a place in people's feeds."],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-6 py-5">
                <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.16em] text-ink">
                  {k}
                </dt>
                <dd className="text-[13.5px] leading-relaxed text-ink2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: the flow */}
        <div className="flex items-center justify-center md:justify-end">
          <JoinFlow />
        </div>
      </div>
    </section>
  );
}
