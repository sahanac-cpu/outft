import Link from "next/link";
import { Reveal, MaskReveal, RuleDraw } from "./reveal";

export function CTA() {
  return (
    <section className="bg-[#000000] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">

        <Reveal>
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.34em] text-[#808080]">
            Join the waitlist
          </span>
        </Reveal>

        <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.022em] text-white">
          <MaskReveal delay={0.1}>Start your record.</MaskReveal>
          <MaskReveal delay={0.22}>One fit at a time.</MaskReveal>
        </h2>

        <RuleDraw delay={0.4} className="mt-8 w-full" color="#333333" />

        <Reveal delay={0.18}>
          <p className="mt-8 max-w-[44ch] font-sans text-[15px] font-light leading-relaxed text-[#808080]">
            outft is opening in small rooms. Request access and we will save your
            handle before the door does.
          </p>
        </Reveal>

        <Reveal delay={0.26} className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/join" className="btn-ghost-inv">
            Request access
          </Link>
          <Link href="/why" className="btn-ghost-inv">
            Read why
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
