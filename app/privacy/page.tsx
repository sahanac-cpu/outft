import type { Metadata } from "next";
import Link from "next/link";
import {
  LEGAL_CONTACT,
  LEGAL_EFFECTIVE_DATE,
  PRIVACY_VERSION,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy. OUTFT.",
  description:
    "What outft collects, how outfit photos are analysed by AI, who we share information with, and how to access or delete your data.",
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Who we are",
    p: [
      `outft ("outft", "we", "us" or "our") runs the outft mobile app and the website at outft.app (together, the "Service"). outft is based in New York, United States. We are responsible for the personal information described in this policy. You can contact us at ${LEGAL_CONTACT}.`,
      "This policy explains what we collect, why, who we share it with, how long we keep it, and the choices and rights you have. It should be read with our Terms of Service.",
    ],
  },
  {
    h: "2. Information you give us",
    p: [
      "Account information: your name, email address and password when you create an account. Passwords are handled by our authentication provider and stored in hashed form; we cannot see them.",
      "Outfit photos and details: the photos you capture or upload, and any caption or category you add.",
      "Onboarding and settings: the version of these documents you accepted and when, your notification choices, and a referral code if you enter one.",
      "Messages: anything you send us, for example by email.",
      "Website forms: if you join the waitlist or creator list on outft.app, your email address and, if you give it, your name, handle or note.",
    ],
  },
  {
    h: "3. Information we create or collect automatically",
    p: [
      "Style analysis: the aesthetic percentages, tags and short insight produced from your photos, and the Style DNA we build from them.",
      "App activity: events such as signing up, accepting the terms, uploading a photo, an analysis finishing or failing, viewing your Style DNA, and tapping share. Each event has a timestamp, your account identifier if you are signed in, and a few details about the event, such as which screen it came from. These events are stored in our own database and are not sent to advertising or analytics companies.",
      "Service records: for each AI analysis we record how many processing units (tokens) it used, its estimated cost, whether it succeeded, and how long it took. These records do not include your photo.",
      "Device information for notifications: if you allow notifications, a push token that lets us send them to your device.",
      "Referral and campaign records: when a referral code is redeemed, and counts of when a brand discount code is shown, tapped or redeemed.",
      "Website analytics: our website uses Vercel Web Analytics and Speed Insights, which measure page views and performance in aggregate without using cookies. Like any website, our hosting provider receives technical information such as your IP address and browser type to deliver pages and protect the site.",
    ],
  },
  {
    h: "4. What we do not collect",
    p: [
      "We do not collect your precise location. Photos are resized and re-encoded on your device before upload, which removes embedded location data from the photo file.",
      "We do not access your contacts, and we only access your camera or photo library when you choose to take or pick a photo. We only save to your photo library when you ask us to, for example to save a Style DNA card.",
      "We do not use third-party advertising trackers, and we do not sell your personal information.",
    ],
  },
  {
    h: "5. How your photos are analysed",
    p: [
      "When you analyse a photo, the app sends it to our server, which sends it to Anthropic's Claude AI model. The model returns a reading of the outfit's style. Our server does not keep a copy of the photo after the analysis is returned, and we do not write photos to our server logs.",
      "Anthropic processes the photo on our behalf as a service provider under its commercial terms, which do not permit it to use our customers' content to train its models. Anthropic may keep data for a limited time for safety and abuse monitoring, as described in its own policies.",
      "The analysis is automated. It is an opinion about clothing style, not a fact about you, and it is not used to make decisions that have legal or similarly significant effects on you.",
    ],
  },
  {
    h: "6. Where your photos are stored",
    p: [
      "If you use the app as a guest, or without an account, your photos and results are stored only on your device.",
      "If you have an account, your photos and results are stored in private storage at our database provider, linked to your account. They are not publicly accessible; they can only be viewed through your signed-in account, or by our team where needed to provide support, keep the Service safe, or meet legal obligations.",
    ],
  },
  {
    h: "7. How we use information",
    p: [
      "To provide the Service: create and secure your account, store your photos, run style analysis, build and show your Style DNA, and create share cards when you ask.",
      "To keep the Service working and safe: diagnose errors, prevent abuse, enforce our Terms, and protect our users.",
      "To understand and improve the Service: measure things like how many people finish onboarding or how often analyses fail, and track what the AI analysis costs us to run.",
      "To communicate with you: send account and service messages, and send reminders or updates only if you opt in.",
      "To measure referrals and brand campaigns: count referral redemptions and how often discount codes are shown, tapped or redeemed.",
      "To meet legal obligations, and to respond to lawful requests.",
    ],
  },
  {
    h: "8. Legal bases (EEA, Switzerland and UK)",
    p: [
      "If you are in the European Economic Area, Switzerland or the UK, we rely on these legal bases: performing our contract with you (running your account and style analysis); our legitimate interests (keeping the Service secure, understanding how it is used, measuring campaigns in aggregate, and improving it), balanced against your rights; your consent (optional notifications and emails, which you can withdraw at any time); and legal obligations.",
    ],
  },
  {
    h: "9. Who we share information with",
    p: [
      "Service providers who process information on our behalf, under contracts that limit how they can use it:",
      "Anthropic (AI style analysis of your photos);",
      "Supabase (account sign-in, database and private photo storage);",
      "Railway (hosting our app server);",
      "Vercel (hosting our website, and aggregate website analytics);",
      "Expo (delivering app updates and push notifications);",
      "an email delivery provider, such as Resend, if you opt in to emails.",
      "Brands: only aggregated and anonymous trend insights, such as which styles are rising. We never share your photos, your Style DNA or your identity with brands.",
      "People you choose to share with: when you share a Style DNA card or a look, it goes where you send it.",
      "Legal and safety: when required by law, or when we believe in good faith it is necessary to protect the rights, property or safety of our users, the public or outft.",
      "Business transfers: if outft is involved in a merger, acquisition or sale of assets, information may transfer as part of that deal, and this policy will continue to apply to it until you are told otherwise.",
      "We do not sell personal information, and we do not share it for cross-context behavioural advertising.",
    ],
  },
  {
    h: "10. How long we keep information",
    p: [
      "Account information, photos and Style DNA: for as long as your account exists. If you delete a photo, we delete it and its analysis.",
      "When you delete your account, it stops working right away, and we delete your photos, analyses and profile within 30 days. Copies in backups are overwritten on our normal backup cycle, within 90 days.",
      "App activity events and service records: up to 24 months, then deleted or made anonymous.",
      "Waitlist emails: until you ask us to remove you, or until we launch and no longer need the list.",
      "We may keep some information longer where the law requires it, or to resolve disputes and enforce our agreements.",
    ],
  },
  {
    h: "11. Your choices and rights",
    p: [
      "Delete a photo: open it in the app and choose delete.",
      `Delete your account: in the app, go to Settings, then Delete account, or email ${LEGAL_CONTACT}.`,
      "Notifications: turn reminders and updates on or off in Settings. Every reminder or update email includes an unsubscribe link.",
      "Sharing: nothing is shared outside outft unless you choose to share it.",
      `Access, correction, copies and other rights: email ${LEGAL_CONTACT}. Depending on where you live, you may have the right to know what personal information we hold about you, to get a copy of it, to correct it, to delete it, to restrict or object to how we use it, and to withdraw consent. We will not treat you differently for using these rights.`,
      "We will respond within the time the law requires, usually within 30 days in Europe and 45 days in US states with privacy laws. We may need to confirm your identity first. You may use an authorised agent where the law allows. If we decline your request, you can ask us to reconsider; residents of some US states can then appeal by replying to our decision.",
      "If you are in the EEA, Switzerland or the UK, you may also complain to your local data protection authority.",
      "Global Privacy Control: we do not sell or share personal information for targeted advertising, so there is nothing for these signals to opt out of, but we treat them as a valid request where the law requires.",
    ],
  },
  {
    h: "12. Children",
    p: [
      "outft is not for children under 13, and not for anyone under 16 in the EEA, Switzerland or the UK. We do not knowingly collect personal information from children below these ages. If you believe a child has given us information, email us and we will delete it.",
    ],
  },
  {
    h: "13. Security",
    p: [
      "We protect information with measures such as encrypted connections, private photo storage that only your account can access, database rules that keep each person's data separate, and keeping secret keys on our servers rather than in the app. No system is perfectly secure, so we cannot guarantee security. If we learn of a breach that affects your information, we will notify you and the authorities as the law requires.",
    ],
  },
  {
    h: "14. International transfers",
    p: [
      "We are based in the United States, and our service providers may process information in the United States and other countries. If you use outft from outside the United States, your information will be transferred there. Where the law requires, we use appropriate safeguards for these transfers, such as the European Commission's Standard Contractual Clauses.",
    ],
  },
  {
    h: "15. Payments",
    p: [
      "outft does not take payments today, so we do not collect payment information. If we introduce paid plans, we will update this policy before we do.",
    ],
  },
  {
    h: "16. Changes to this policy",
    p: [
      "We may update this policy as the Service changes or the law requires. We will update the effective date and version on this page. If a change is significant, we will tell you in the app or by email before it takes effect.",
    ],
  },
  {
    h: "17. Contact",
    p: [
      `Questions, requests or complaints about privacy: email ${LEGAL_CONTACT}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24">
      <h1 className="font-serif text-4xl italic">privacy policy.</h1>
      <p className="mt-4 text-sm opacity-70">
        Effective {LEGAL_EFFECTIVE_DATE}. Version {PRIVACY_VERSION}.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed opacity-80">
        The short version: your photos are private by default. They are
        analysed by AI to build your Style DNA, and we do not keep them on
        our analysis server or let the AI provider train on them. You decide
        what gets shared. Brands only ever see anonymous, aggregated trends.
        We do not sell your data. You can delete any photo, or your whole
        account, at any time.
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
