import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { FitPlate } from "@/components/fit-plate";

export const metadata: Metadata = {
  title: "Why outft. The fits you choose",
  description:
    "Getting dressed is the creative act you repeat every day. outft makes it a record, a ritual, and a way to find the people you dress like.",
};

export default function WhyPage() {
  return (
    <article className="bg-bg pt-[68px]">
      {/* opening statement */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-[10vh] md:px-10 md:pb-28">
        <Reveal>
          <span className="lbl">Why outft</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-[20ch] font-serif text-[clamp(2.6rem,7vw,6.2rem)] font-medium leading-[1.0] tracking-[-0.02em]">
            Getting dressed is the creative act you repeat every day.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-9 max-w-[58ch] text-[16px] leading-relaxed text-ink2">
            Most of it disappears. A good fit happens in a hallway mirror at
            08:44 and is gone by lunch. outft is built on a small idea: the
            outfit is worth keeping, and worth sharing, but only with the people
            who would actually understand it.
          </p>
        </Reveal>
      </section>

      {/* the problem — split with plate */}
      <section className="border-t border-line bg-bone">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="max-w-[16ch] font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.01em]">
              Every other feed pays you to perform.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink2">
              Likes reward the loudest version of you, so that is the version
              everyone posts. The honest Tuesday fit never makes the grid. outft
              removes the audience that made you lie. There is no public count,
              no algorithm to win, no stranger to impress.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto w-full max-w-[300px]">
            <FitPlate swatch="sw5" aspect="4 / 5" caption="Ash tailoring, no logo" occasion="Dinner" showCaption />
          </Reveal>
        </div>
      </section>

      {/* the principle — full-width pull quote */}
      <section className="bg-bg">
        <div className="mx-auto max-w-[1100px] px-6 py-24 text-center md:py-36">
          <Reveal>
            <p className="font-serif text-[clamp(2.2rem,5.5vw,4.4rem)] font-medium italic leading-[1.08] tracking-[-0.01em] text-ink">
              &ldquo;Post to see.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-[52ch] text-[15.5px] leading-relaxed text-ink2">
              The feed stays closed until you put your own fit on the table.
              Reciprocity is the whole mechanic. Everyone you see has shown you
              theirs first, so the room is honest by construction, not by hope.
            </p>
          </Reveal>
        </div>
      </section>

      {/* three beliefs — distinct grid, no zigzag */}
      <section className="border-y border-line bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                t: "Narrow doors",
                b: "You follow seven. A feed worth opening is a small one, curated like a wardrobe, not a warehouse.",
              },
              {
                t: "A record, not a stream",
                b: "Each fit prints a ticket and joins your log. Over a season it traces your taste back to you as fashion DNA.",
              },
              {
                t: "The people you dress like",
                b: "outft reads palette and cut, then finds your twin. The match is the point, not the follower number.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-[24px] leading-tight md:text-[28px]">
                    {c.t}
                  </h3>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink2">
                  {c.b}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* close */}
      <section className="bg-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.01em]">
              Keep the fits you choose.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="rounded-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.97]"
            >
              Request access
            </Link>
            <Link
              href="/faq"
              className="rounded-full border border-line2 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
            >
              Read the FAQ
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
