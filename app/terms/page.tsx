import type { Metadata } from "next";
import Link from "next/link";
import {
  LEGAL_DRAFT_NOTE,
  LEGAL_LAST_UPDATED,
  TERMS_VERSION,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms. OUTFT.",
  description:
    "The rules for using outft: your account, your photos, AI style analysis, sharing, and what we each agree to.",
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "The basics",
    p: [
      "These terms are an agreement between you and outft (\"we\", \"us\"). They cover the outft app and this website. By creating an account or using outft, you agree to them. If you do not agree, please do not use outft.",
      "Our Privacy Policy explains what we do with your information, and is part of these terms.",
    ],
  },
  {
    h: "Who can use outft",
    p: [
      "You must be at least 13 years old, or at least 16 if you live in the European Economic Area or the UK. If you are under the age of adulthood where you live, you should have a parent or guardian's permission.",
      "You can only use outft if the law where you live allows you to.",
    ],
  },
  {
    h: "Your account",
    p: [
      "Give us accurate details when you sign up, and keep your login private. You are responsible for what happens on your account.",
      "If you think someone else has access to your account, email sahana@outft.app straight away.",
    ],
  },
  {
    h: "Your content, and the licence you give us",
    p: [
      "Your photos, captions, and anything else you add are yours. You keep ownership of them.",
      "To run outft, we need your permission to handle them. So you give us a non-exclusive, worldwide, royalty-free licence to store, copy, analyze, and display your content, only so we can operate the service: keeping your journal, building your Style DNA, showing it to you, and showing it to people you choose to share it with.",
      "This licence ends when you delete the content or your account, except for backup copies, which are purged within 90 days, and anything you already shared publicly on other platforms.",
      "We do not use your photos in ads, and we do not give your individual photos to brands.",
    ],
  },
  {
    h: "AI style analysis",
    p: [
      "Your photos are analyzed by a third-party AI model (Claude, made by Anthropic) to produce aesthetic percentages, tags, and a short insight. Twin matching uses these results to suggest people who dress like you.",
      "This is an automated opinion about style. It can be wrong, incomplete, or simply not how you see yourself. It is not professional advice of any kind, and you should not rely on it for decisions that matter.",
    ],
  },
  {
    h: "Acceptable use",
    p: [
      "Only upload photos you have the right to use.",
      "Do not upload photos of other people without their consent.",
      "Do not upload anything illegal, sexual content involving minors, or content that harasses, threatens, or exploits anyone.",
      "Do not try to break, overload, scrape, or reverse engineer outft, or access other people's accounts or data.",
      "Do not use outft to spam people or abuse the referral program.",
      "We may remove content or suspend accounts that break these rules.",
    ],
  },
  {
    h: "Public sharing is your choice",
    p: [
      "Nothing you add is public by default. You can choose to share a Wrapped card (your yearly style summary) or an individual look to other platforms, such as Instagram.",
      "When you share outside outft, that platform's terms apply, and the content may be seen, saved, or reshared by others. We cannot remove it from other platforms for you.",
    ],
  },
  {
    h: "Premium and payments",
    p: [
      "outft is free to use today, and we do not take payments.",
      "We may introduce premium pricing in the future. If we do, the price and any extra terms will be shown to you before you buy, and you will not be charged unless you choose to purchase.",
    ],
  },
  {
    h: "Referral program and brand codes",
    p: [
      "You may get a referral code to invite friends. We record referrals so we can count them. There are no payouts or rewards for referrals at the moment. If that changes, we will publish the rules first.",
      "Brand discount codes shown in outft are offered by the brands. We record how many times a code is shown, clicked, or redeemed, but the brand is responsible for honouring its own offer.",
    ],
  },
  {
    h: "Ending your account",
    p: [
      "You can stop using outft and delete your account at any time from Settings, then Delete account, in the app, or by emailing sahana@outft.app.",
      "We may suspend or close your account if you break these terms, if the law requires it, or if we stop running outft. Where it is reasonable, we will tell you first.",
      "When an account is deleted, its photos and analyses are deleted as described in our Privacy Policy.",
    ],
  },
  {
    h: "Disclaimers",
    p: [
      "We work hard on outft, but it is provided \"as is\" and \"as available\". We do not promise it will always work, be error free, or that the AI analysis will be accurate. Some features may change or be removed over time.",
      "Some places do not allow these disclaimers, so they may not all apply to you.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the extent the law allows, outft is not liable for indirect or consequential losses, such as lost data, lost profits, or harm to reputation, that come from using or not being able to use outft.",
      "Nothing in these terms limits liability that cannot be limited by law, or takes away rights you have as a consumer.",
    ],
  },
  {
    h: "Changes to these terms",
    p: [
      "We may update these terms as outft grows. We will change the date and version on this page, and if a change is significant, we will tell you in the app or by email before it takes effect. If you keep using outft after that, the new terms apply.",
    ],
  },
  {
    h: "Contact",
    p: ["Questions about these terms: email sahana@outft.app."],
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24">
      <p
        role="note"
        className="mb-10 rounded-md border border-current px-4 py-3 text-sm font-medium"
      >
        {LEGAL_DRAFT_NOTE}
      </p>
      <h1 className="font-serif text-4xl italic">terms.</h1>
      <p className="mt-4 text-sm opacity-70">
        Last updated {LEGAL_LAST_UPDATED}. Version {TERMS_VERSION}.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed opacity-80">
        The short version: your photos stay yours. We only use them to run
        outft for you. The AI reads your style, but it is an opinion and can
        be wrong. Be kind, only post what you have the right to post, and you
        decide what gets shared.
      </p>
      {SECTIONS.map((s) => (
        <section key={s.h} className="mt-12">
          <h2 className="font-serif text-2xl">{s.h}</h2>
          {s.p.map((t, i) => (
            <p key={i} className="mt-3 text-[15px] leading-relaxed opacity-80">
              {t}
            </p>
          ))}
        </section>
      ))}
      <p className="mt-16 text-xs opacity-50">
        See also our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
