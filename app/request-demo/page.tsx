import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Request a demo — OUTFT.",
  description: "See OUTFT read a wardrobe back in numbers. Request a private demo.",
};

export default function RequestDemoPage() {
  return (
    <main className="relative min-h-[100svh] pt-[64px]">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-24 md:px-10 md:py-28">
        {/* left — editorial statement */}
        <div className="md:sticky md:top-28 md:self-start">
          <Link href="/" className="lbl lbl-ink hover:opacity-60">
            ← OUTFT.
          </Link>
          <span className="lbl mt-12 block">Request a demo</span>
          <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,7vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
            See your style, <span className="italic">read back.</span>
          </h1>
          <p className="mt-8 max-w-[42ch] font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light leading-snug text-ink2">
            We&rsquo;ll walk you through OUTFT on a real wardrobe — logging a
            fit, reading the aesthetic in numbers, and printing the card. Twenty
            minutes, no slides.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {["Private session", "On your fits", "Twenty minutes"].map((t, i) => (
              <span key={t} className="lbl">
                {String(i + 1).padStart(2, "0")} {t}
              </span>
            ))}
          </div>
        </div>

        {/* right — form */}
        <div className="md:pt-16">
          <LeadForm source="demo" cta="Request the demo →" withNote notePlaceholder="What would you like to see?" />
        </div>
      </div>
    </main>
  );
}
