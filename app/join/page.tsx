import type { Metadata } from "next";
import Image from "next/image";
import { JoinFlow } from "@/components/join-flow";
import { Reveal, MaskReveal, RuleDraw } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Request access. OUTFT.",
  description:
    "Join the OUTFT waitlist or apply as a creator. Opening in small rooms.",
};

export default function JoinPage() {
  return (
    <section className="min-h-[100dvh] pt-[60px] md:grid md:grid-cols-2">

      {/* left — full-bleed fabric photo */}
      <div className="relative hidden md:block">
        <Image
          src="/IMG_2115.jpeg"
          alt="Crumpled fabric"
          fill
          priority
          className="object-cover object-center"
          sizes="50vw"
        />
      </div>

      {/* right — pitch + form */}
      <div className="flex flex-col justify-center bg-white px-8 py-16 md:px-14 md:py-24">

        <Reveal>
          <span className="lbl">Two doors</span>
        </Reveal>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[0.9] tracking-[-0.022em] text-[#000000]">
          <MaskReveal delay={0.1}>Ask for a</MaskReveal>
          <MaskReveal delay={0.22} className="italic">room.</MaskReveal>
        </h1>

        <RuleDraw delay={0.38} className="mt-7 w-full" />

        <Reveal delay={0.2}>
          <p className="mt-7 max-w-[40ch] font-sans text-[15px] font-light leading-relaxed text-[#555555]">
            outft opens a few people at a time so the first feeds stay good.
            Take the waitlist, or apply as a creator and earn a place in the
            feeds you want to be in.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <dl className="mt-8 border-t border-[#333333]">
            {[
              ["Waitlist", "An invite when your room opens. Bring your friends."],
              ["Creator", "Reviewed by hand. Early access, a public profile, a place in people's feeds."],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-6 border-b border-[#333333] py-4">
                <dt className="w-20 shrink-0 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-[#000000]">
                  {k}
                </dt>
                <dd className="font-sans text-[13px] font-light leading-relaxed text-[#555555]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.36} className="mt-10">
          <JoinFlow />
        </Reveal>

      </div>
    </section>
  );
}
