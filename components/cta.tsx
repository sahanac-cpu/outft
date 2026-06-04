import Link from "next/link";
import { Reveal } from "./reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* faint warm wash so the dark block still reads OUTFT, not generic */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          background:
            "radial-gradient(60% 80% at 20% 0%, var(--color-mauve), transparent 60%), radial-gradient(50% 70% at 90% 100%, var(--color-sky), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <h2 className="max-w-[16ch] font-serif text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em]">
            Start your record. One fit at a time.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-[42ch] text-[15px] leading-relaxed text-white/70">
            outft is opening in small rooms. Request access and we will save your
            handle before the door does.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/join"
            className="rounded-full bg-white px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:-translate-y-px active:scale-[0.97]"
          >
            Request access
          </Link>
          <Link
            href="/why"
            className="rounded-full border border-white/25 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-white/70"
          >
            Read why
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
