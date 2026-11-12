import type { Metadata } from "next";
import Link from "next/link";
import {
  LEGAL_DRAFT_NOTE,
  LEGAL_LAST_UPDATED,
  PRIVACY_VERSION,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy. OUTFT.",
  description:
    "What outft collects, how outfit photos are analyzed by AI, what we share, and how to delete your data.",
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      "outft is an outfit journal app. You capture or upload photos of what you wore, and we read your style back to you. In this policy, \"outft\", \"we\" and \"us\" mean the team that runs the app and this website. You can reach us at sahana@outft.app.",
    ],
  },
  {
    h: "What we collect",
    p: [
      "Account details: your email address, username, and any profile details you add.",
      "Your outfits: the photos you capture or upload, plus any caption or category you add.",
      "Style analysis: the Style DNA we create from your photos. That means aesthetic percentages, tags, and a short written insight.",
      "Referral and discount-code activity: referral codes you use or share, and counts of when a brand discount code was shown, clicked, or redeemed through outft.",
      "Basic technical and usage information, such as device type, app version, and which screens you use, so we can run the service and fix problems.",
      "If you join the waitlist or contact us on this website, the email, name, and message you send.",
    ],
  },
  {
    h: "How your photos are analyzed",
    p: [
      "When you capture or upload a photo, it is sent to our server. From there, we send it to a third-party AI model, Claude, made by Anthropic. The model looks at the outfit and returns aesthetic percentages, tags, and a short insight. That result becomes part of your Style DNA.",
      "The analysis is automated. It is an opinion about style, not a fact about you, and it can be wrong.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "To run the app: store your photos, build your Style DNA, and show your journal back to you.",
      "Twin matching: we compare your Style DNA with other users' Style DNA to suggest people who dress like you, and to suggest you to them.",
      "Wrapped: we put together a yearly summary of your style as an image card.",
      "To send reminders and emails you have opted into. Every email has an unsubscribe link.",
      "To keep records of referrals and brand discount-code attribution, so we know how many times a code was shown, clicked, or redeemed.",
      "To keep outft safe, fix bugs, and improve the product.",
    ],
  },
  {
    h: "What is public, and what is not",
    p: [
      "Your photos and analyses are private to your account by default.",
      "You can choose to share a Wrapped card or an individual look to other platforms, such as Instagram. When you do, whatever you share becomes public on that platform and follows that platform's rules. We cannot remove it from another platform once it is posted there.",
      "If you use twin matching, other users may be shown your profile as a style match.",
    ],
  },
  {
    h: "Who we share information with",
    p: [
      "Service providers that help us run outft, such as hosting, storage, email delivery, and AI analysis (Anthropic). They get what they need to do that job.",
      "Brands, but only aggregated and anonymous trend insights, for example \"wide-leg trousers are up this month\". We never share your individual photos or your identity with brands.",
      "We do not sell your personal data. Referral and discount-code records are kept to count results, not to sell your information.",
      "Authorities, if the law requires it or to protect people from harm.",
      "A new owner, if outft is ever sold or merged. This policy would continue to apply to your information until you are told otherwise.",
    ],
  },
  {
    h: "How long we keep things",
    p: [
      "We keep your photos and analyses for as long as your account exists.",
      "When you delete your account, we delete your photos, analyses, and profile within 30 days. Copies in our backups are purged within 90 days.",
    ],
  },
  {
    h: "Your controls",
    p: [
      "Delete a single photo: open the capture and delete it from the capture view.",
      "Delete your whole account: in the app, go to Settings, then Delete account. You can also email sahana@outft.app and ask us to do it.",
      "Get a copy of your data: available on request by email to sahana@outft.app.",
      "Stop emails: use the unsubscribe link in any email.",
      "Depending on where you live, you may have other rights, such as correcting your data or objecting to how we use it. Email us and we will help.",
    ],
  },
  {
    h: "Age",
    p: [
      "You must be at least 13 to use outft, or at least 16 if you live in the European Economic Area or the UK. If we learn that someone younger has an account, we will delete it.",
    ],
  },
  {
    h: "Payments",
    p: [
      "outft does not take payments today. We may introduce premium pricing later. If we do, the price will be shown before you buy, and we will update this policy to explain any payment information we handle.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "If we change this policy, we will update the date and version on this page. If a change is significant, we will tell you in the app or by email before it takes effect.",
    ],
  },
  {
    h: "Contact",
    p: ["Questions about privacy or your data: email sahana@outft.app."],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24">
      <p
        role="note"
        className="mb-10 rounded-md border border-current px-4 py-3 text-sm font-medium"
      >
        {LEGAL_DRAFT_NOTE}
      </p>
      <h1 className="font-serif text-4xl italic">privacy.</h1>
      <p className="mt-4 text-sm opacity-70">
        Last updated {LEGAL_LAST_UPDATED}. Version {PRIVACY_VERSION}.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed opacity-80">
        The short version: your photos are private by default. They are
        analyzed by AI to build your Style DNA. You decide what gets shared
        publicly. Brands only ever see anonymous, aggregated trends. You can
        delete any photo, or your whole account, at any time.
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
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
        .
      </p>
    </main>
  );
}
