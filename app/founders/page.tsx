import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Talk to the founders — OUTFT.",
  description: "OUTFT is early. Tell the founders what you think — they read everything.",
};

export default function FoundersPage() {
  return (
    <main className="relative min-h-[100svh] pt-[64px]">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-24 md:px-10 md:py-28">
        {/* left — editorial statement */}
        <div className="md:sticky md:top-28 md:self-start">
          <Link href="/" className="lbl lbl-ink hover:opacity-60">
            ← OUTFT.
          </Link>
          <span className="lbl mt-12 block">Talk to the founders</span>
          <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,7vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
            We&rsquo;re early. <span className="italic">Tell us everything.</span>
          </h1>
          <p className="mt-8 max-w-[42ch] font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light leading-snug text-ink2">
            OUTFT is a small team building a new way to know your own style.
            Press, partnerships, a sharp opinion, or you just want in early —
            write to us directly. We read everything.
          </p>
          <blockquote className="mt-12 border-t border-line pt-6">
            <p className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] font-light italic leading-snug text-ink">
              &ldquo;The most shareable self-portrait in fashion is a number.&rdquo;
            </p>
            <span className="lbl mt-4 block">The OUTFT founders</span>
          </blockquote>
        </div>

        {/* right — form */}
        <div className="md:pt-16">
          <LeadForm source="founders" cta="Send it to the founders →" withNote notePlaceholder="What's on your mind?" />
        </div>
      </div>
    </main>
  );
}
