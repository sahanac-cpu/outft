import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type QA } from "@/components/faq-accordion";
import { Reveal, MaskReveal, RuleDraw } from "@/components/reveal";

export const metadata: Metadata = {
  title: "FAQ. OUTFT.",
  description:
    "How the daily ft. works, how following works, what fashion DNA reads, and how ft. twin matches you.",
};

const ITEMS: QA[] = [
  {
    q: "What is the daily ft.?",
    a: "Three times a day outft opens a window: morning, afternoon, evening. Post your fit in any one of them. You do not have to hit all three, and you cannot post outside them. The window is what keeps it a ritual instead of a habit you forget.",
  },
  {
    q: "How many people can I follow?",
    a: "As many as you like. There is no follow cap. The only gate is reciprocity: your feed opens once you have posted your own fit, so a longer following list never turns into a noisier, lurking feed.",
  },
  {
    q: "What does 'post to see' actually mean?",
    a: "Your feed stays closed until you post your own fit for the day. Once you do, your friends' and creators' fits unlock, captions and all. Everyone you see has shown you theirs first, so nobody is lurking and the room stays honest.",
  },
  {
    q: "How does fashion DNA work?",
    a: "Every fit you log is read for palette, silhouette and register. Over time that becomes a composition: quiet luxury, old money, scandi, coastal, and the wildcard slice that makes you you. It is a mirror, not a grade.",
  },
  {
    q: "What is a ft. twin?",
    a: "outft compares your fashion DNA against everyone else's and surfaces the people you genuinely dress like, ranked by match. Some are already your friends. Some are strangers with your exact taste. The closest is your twin.",
  },
  {
    q: "Do captions matter?",
    a: "Every fit carries a line. 'Reading-in-a-cafe kind of fit.' It is the difference between a photo and a record. Captions are how a log reads back like a diary instead of a camera roll.",
  },
  {
    q: "Is anything public?",
    a: "No public like counts, no follower leaderboard, no open profiles to strangers. Your record is yours and the people you follow.",
  },
  {
    q: "When does it open?",
    a: "outft opens a few rooms at a time so the first feeds stay good. Request access for the waitlist, or apply as a creator for an early seat. We write when your room is ready.",
  },
];

export default function FaqPage() {
  return (
    <section className="bg-white pt-[60px]">
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-24">

        <Reveal>
          <span className="lbl">Questions</span>
        </Reveal>

        <h1 className="mt-7 font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.022em] text-[#000000]">
          <MaskReveal delay={0.1}>The short answers.</MaskReveal>
        </h1>

        <RuleDraw delay={0.3} className="mt-7 w-full" />

        <Reveal delay={0.18}>
          <p className="mt-7 max-w-[52ch] font-sans text-[15px] font-light leading-relaxed text-[#555555]">
            Everything people ask before their room opens. If something is
            missing, it is probably on the{" "}
            <Link href="/why" className="border-b border-[#333333] text-[#000000]">
              why
            </Link>{" "}
            page.
          </p>
        </Reveal>

        <div className="mt-14">
          <FaqAccordion items={ITEMS} />
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-5 border-t border-[#333333] pt-10">
          <span className="font-serif text-[20px] italic text-[#555555]">
            Still deciding?
          </span>
          <Link href="/join" className="btn-ghost">
            Request access
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
