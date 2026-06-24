import type { Metadata } from "next";
import Link from "next/link";
import { CrumpledBg } from "@/components/crumpled-bg";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Request access — OUTFT.",
  description: "OUTFT opens in small rooms. Request early access.",
};

export default function RequestAccessPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pt-[64px] text-ink">
      <CrumpledBg overlay={0.64} />
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-16 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-24 md:px-10 md:py-28">
        {/* left — editorial statement */}
        <div className="md:sticky md:top-28 md:self-start">
          <Link href="/" className="lbl lbl-ink hover:opacity-60">
            ← OUTFT.
          </Link>
          <span className="lbl mt-12 block">Request access</span>
          <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,7vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.02em]">
            Come and see it <span className="italic">for yourself.</span>
          </h1>
          <p className="mt-8 max-w-[42ch] font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light leading-snug text-ink2">
            OUTFT opens a few people at a time so the first feeds stay good.
            Leave your name and we&rsquo;ll send an invite when your room opens.
          </p>
        </div>

        {/* right — form */}
        <div className="md:pt-16">
          <LeadForm source="access" cta="Request access →" />
        </div>
      </div>
    </main>
  );
}
