import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, MaskReveal, RuleDraw } from "@/components/reveal";
import { WhyHeroHeadline } from "@/components/why-hero-headline";

export const metadata: Metadata = {
  title: "Why outft. The fits you choose",
  description:
    "Getting dressed is the creative act you repeat every day. outft makes it a record, a ritual, and a way to find the people you dress like.",
};

const BELIEFS = [
  {
    index: "01",
    title: "Follow freely",
    body: "Follow as many people as you like. The gate is posting, not following, so the feed stays honest without staying small.",
  },
  {
    index: "02",
    title: "A record, not a stream",
    body: "Each fit prints a ticket and joins your log. Over a season it traces your taste back to you as fashion DNA.",
  },
  {
    index: "03",
    title: "The people you dress like",
    body: "outft reads palette and cut, then finds your twin. The match is the point, not the follower number.",
  },
];

export default function WhyPage() {
  return (
    <article className="bg-white pt-[60px]">

      {/* opening statement — full-viewport editorial split */}
      <section className="grid min-h-[calc(100dvh-60px)] md:grid-cols-2">

        {/* left — text */}
        <div className="flex flex-col justify-center border-r border-[#333333] px-8 py-20 md:px-14 md:py-28">
          <Reveal>
            <span className="lbl">Why outft</span>
          </Reveal>
          <WhyHeroHeadline />
          <Reveal delay={0.28}>
            <p className="mt-8 max-w-[44ch] font-sans text-[16px] font-light leading-relaxed text-[#555555]">
              Most of it disappears. A good fit happens in a hallway mirror at
              08:44 and is gone by lunch. outft is built on a small idea: the
              outfit is worth keeping, and worth sharing, but only with the people
              who would actually understand it.
            </p>
          </Reveal>
        </div>

        {/* right — full-bleed figure photo */}
        <div className="relative hidden md:block">
          <Image
            src="/IMG_2141.png"
            alt="A blurred figure"
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>

      </section>

      {/* the problem */}
      <section className="border-t border-[#333333] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[#000000]">
                Every other feed pays you to perform.
              </h2>
              <p className="mt-7 max-w-[46ch] font-sans text-[15px] font-light leading-relaxed text-[#555555]">
                Likes reward the loudest version of you, so that is the version
                everyone posts. The honest Tuesday fit never makes the grid.
                outft removes the audience that made you lie. There is no public
                count, no algorithm to win, no stranger to impress.
              </p>
            </Reveal>

            {/* editorial aside card */}
            <Reveal delay={0.12}>
              <div className="border border-[#333333] p-8">
                <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-[#808080]">
                  Ash tailoring, no logo
                </span>
                <div
                  className="mt-4 w-full border border-[#808080] bg-[#f5f5f5]"
                  style={{ aspectRatio: "4 / 5" }}
                />
                <div className="mt-4 flex items-baseline justify-between border-t border-[#333333] pt-3">
                  <span className="font-sans text-[10px] font-light uppercase tracking-[0.18em] text-[#808080]">Occasion</span>
                  <span className="font-sans text-[11px] font-light text-[#000000]">Dinner</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between border-t border-[#e0e0e0] pt-2">
                  <span className="font-sans text-[10px] font-light uppercase tracking-[0.18em] text-[#808080]">Look no.</span>
                  <span className="font-sans text-[11px] font-light text-[#000000]">0056</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* pull quote */}
      <section className="border-t border-[#333333] bg-[#000000]">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-36">
          <div className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.022em] text-white">
            <MaskReveal>&ldquo;Post to see.&rdquo;</MaskReveal>
          </div>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[50ch] font-sans text-[15px] font-light leading-relaxed text-[#808080]">
              The feed stays closed until you put your own fit on the table.
              Reciprocity is the whole mechanic. Everyone you see has shown you
              theirs first, so the room is honest by construction, not by hope.
            </p>
          </Reveal>
        </div>
      </section>

      {/* three beliefs */}
      <section className="border-t border-[#333333] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <span className="lbl">Three beliefs</span>
          </Reveal>
          <RuleDraw delay={0.1} className="mt-5 w-full" />
          <div className="mt-0">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.index} delay={i * 0.08}>
                <div className="grid grid-cols-[3rem_1fr] gap-6 border-b border-[#333333] py-8 md:grid-cols-[3rem_1fr_1fr] md:gap-12">
                  <span className="font-sans text-[12px] font-light text-[#808080]">{b.index}</span>
                  <h3 className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] font-medium text-[#000000]">
                    {b.title}
                  </h3>
                  <p className="col-start-2 mt-2 font-sans text-[14px] font-light leading-relaxed text-[#555555] md:col-start-3 md:mt-0">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* close */}
      <section className="border-t border-[#333333] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.022em] text-[#000000]">
              Keep the fits you choose.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-4">
            <Link href="/join" className="btn-ghost">
              Request access
            </Link>
            <Link href="/faq" className="btn-ghost">
              Read the FAQ
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
