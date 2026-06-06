import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type QA } from "@/components/faq-accordion";

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
    a: "Every fit you log is read for palette, silhouette and register. Over time that becomes a composition: quiet luxury, old money, scandi, coastal, and the wildcard slice that makes you you. It is a mirror, not a grade. Nothing is ranked against anyone else.",
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
    a: "No public like counts, no follower leaderboard, no open profiles to strangers. Your record is yours and the people you follow. A creator profile is the one exception, and it is opt-in by application.",
  },
  {
    q: "When does it open?",
    a: "outft opens a few rooms at a time so the first feeds stay good. Request access for the waitlist, or apply as a creator for an early seat. We write when your room is ready.",
  },
];

export default function FaqPage() {
  return (
    <section className="bg-bg pt-[68px]">
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-24">
        <span className="lbl">Questions</span>
        <h1 className="mt-6 max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0] tracking-[-0.02em]">
          The short answers.
        </h1>
        <p className="mt-7 max-w-[52ch] text-[15.5px] leading-relaxed text-ink2">
          Everything people ask before their room opens. If something is missing,
          it is probably on the{" "}
          <Link href="/why" className="text-ink underline underline-offset-4">
            why
          </Link>{" "}
          page.
        </p>

        <div className="mt-14">
          <FaqAccordion items={ITEMS} />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-10">
          <span className="font-serif text-[20px] italic text-ink2">
            Still deciding?
          </span>
          <Link
            href="/join"
            className="rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.97]"
          >
            Request access
          </Link>
        </div>
      </div>
    </section>
  );
}
