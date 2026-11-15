import type { Metadata } from "next";
import Link from "next/link";
import {
  LEGAL_CONTACT,
  LEGAL_EFFECTIVE_DATE,
  TERMS_VERSION,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service. OUTFT.",
  description:
    "The terms for using outft: your account, your photos, AI style analysis, sharing, and what we each agree to.",
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. About these terms",
    p: [
      "These Terms of Service (\"Terms\") are an agreement between you and outft (\"outft\", \"we\", \"us\" or \"our\"). They apply to the outft mobile app, the website at outft.app, and any related services we provide (together, the \"Service\").",
      "By creating an account, ticking the box to accept these Terms, or otherwise using the Service, you agree to these Terms and to our Privacy Policy, which explains how we handle your information. If you do not agree, do not use the Service.",
      "If you use the Service on behalf of an organisation, you confirm you are allowed to accept these Terms for it.",
    ],
  },
  {
    h: "2. Who can use outft",
    p: [
      "You must be at least 13 years old to use the Service. If you live in the European Economic Area, Switzerland or the United Kingdom, you must be at least 16. If you are under 18, or under the age of majority where you live, you may only use the Service with the permission of a parent or guardian, who agrees to these Terms on your behalf.",
      "You may not use the Service if you have been barred from it before, or if the law where you live does not allow it.",
    ],
  },
  {
    h: "3. Your account",
    p: [
      "You need an account to use most of the Service. Give us accurate information when you sign up and keep it up to date.",
      `Keep your password private. You are responsible for activity on your account. If you think someone has accessed your account without permission, tell us right away at ${LEGAL_CONTACT}.`,
      "You may also explore parts of the app as a guest. Guest data is stored only on your device and is lost if you remove the app.",
    ],
  },
  {
    h: "4. What outft does",
    p: [
      "outft is an outfit journal. You capture or upload photos of what you wear, and the Service reads the style in them and builds a profile we call your Style DNA: aesthetic percentages, tags, and a short written insight.",
      "Some features described on our website or in the app are planned and not yet available, such as matching you with people who dress like you (\"style twins\") and a yearly style summary (\"Wrapped\"). We will not describe a feature as available until it is. We may add, change or remove features over time.",
    ],
  },
  {
    h: "5. Your content",
    p: [
      "\"Your Content\" means the photos, captions, categories and other material you add to the Service. You own Your Content. These Terms do not give us ownership of it.",
      "So that we can run the Service, you give us a worldwide, non-exclusive, royalty-free licence to host, store, copy, process, analyse, resize and display Your Content, and to create Style DNA results from it. We use this licence only to provide the Service to you and to people you choose to share with, to keep the Service safe, and to fix and improve it.",
      "This licence ends when you delete Your Content or your account, except for copies in backups, which are removed on our normal backup schedule, and anything you have already shared outside outft.",
      "We do not sell Your Content, we do not use your photos in advertising, and we do not give your individual photos or identity to brands.",
      "You confirm that you have the rights needed to upload Your Content, and that it does not break any law or anyone else's rights, including their privacy.",
    ],
  },
  {
    h: "6. AI style analysis",
    p: [
      "Style analysis is produced automatically. Your photo is sent to an AI model provided by Anthropic, which returns a reading of the outfit's style. We combine readings over time into your Style DNA.",
      "The analysis is an automated opinion about clothing style. It can be wrong, incomplete or inconsistent, and it is not a judgement about you as a person. It is not professional, medical, psychological, financial or other advice. Do not rely on it for important decisions.",
      "The analysis looks at clothing and styling. Please do not upload photos for the purpose of having the Service judge a person's body, health, ethnicity or other personal characteristics.",
    ],
  },
  {
    h: "7. Acceptable use",
    p: [
      "You agree not to:",
      "upload content you do not have the right to share, or photos of other people without their permission;",
      "upload nudity, sexual content, or any content that sexualises or endangers minors;",
      "upload content that is illegal, hateful, harassing, threatening or violent, or that invades someone's privacy;",
      "impersonate anyone, or misrepresent your connection to anyone;",
      "scrape, copy or harvest data from the Service, or use bots or automated tools to access it, except as we expressly allow;",
      "attempt to probe, break, overload or get around the security of the Service, or access accounts or data that are not yours;",
      "reverse engineer the Service, except where the law allows it despite this restriction;",
      "use the Service to send spam, or game or abuse referral codes, discount codes or other programs;",
      "use the Service or its output to build a competing product or to train an AI model.",
      "We may remove content or limit, suspend or close accounts that we reasonably believe break these Terms or put people or the Service at risk.",
    ],
  },
  {
    h: "8. Sharing",
    p: [
      "Your photos and Style DNA are private to your account by default. You choose what to share.",
      "The app can create a Style DNA card and pass it to your device's share sheet, or save it to your photos so you can post it on another platform such as Instagram. Once you share content outside outft, the other platform's terms apply, and other people may see, save or reshare it. We cannot remove content from other platforms for you.",
    ],
  },
  {
    h: "9. Brands, sponsored content and discount codes",
    p: [
      "The app may show sponsored posts or brand offers. They are labelled as sponsored.",
      "Discount codes and offers shown in the app are provided by the brand. The brand, not outft, is responsible for its products, its offer and its terms. We record counts of when a code is shown, tapped or redeemed so we can measure campaigns, as described in our Privacy Policy.",
      "We may share aggregated and anonymous style trends with brands. We never share your photos or your identity with them.",
    ],
  },
  {
    h: "10. Referral codes",
    p: [
      "You may receive a referral code to invite others. We record when a code is used so we can count referrals.",
      "There are currently no rewards, credits or payouts for referrals. If we introduce rewards, we will publish the rules before they apply. Referral codes have no cash value and may not be sold.",
    ],
  },
  {
    h: "11. Price and payments",
    p: [
      "The Service is currently free and we do not take payments.",
      "We may introduce paid plans or limits on free use in the future. If we do, we will show you the price and what it includes before you buy, you will only be charged if you choose to buy, and any additional purchase terms will be shown at that time. We will give you notice before any limit on free features takes effect.",
    ],
  },
  {
    h: "12. Notifications and emails",
    p: [
      "We send optional reminders and updates only if you turn them on. You can turn them off in Settings at any time, and every marketing or reminder email we send includes an unsubscribe link.",
      "We may still send messages that are needed to run your account, such as password resets or important changes to these Terms.",
    ],
  },
  {
    h: "13. Our intellectual property",
    p: [
      "The Service, including the outft name, logo, design, software and the text and graphics we create, belongs to us or our licensors and is protected by law. We give you a personal, non-exclusive, non-transferable, revocable licence to use the app for your own non-commercial use, in line with these Terms.",
      "If you send us feedback or ideas, we may use them without owing you anything.",
    ],
  },
  {
    h: "14. Copyright complaints",
    p: [
      `If you believe content on the Service infringes your copyright, email ${LEGAL_CONTACT} with: your contact details; a description of the work; where the content is on the Service; a statement that you believe in good faith the use is not authorised; a statement, under penalty of perjury, that your notice is accurate and that you are the owner or authorised to act for the owner; and your physical or electronic signature.`,
      "We will respond to valid notices, which may include removing the content. We may close the accounts of repeat infringers.",
    ],
  },
  {
    h: "15. Third-party services",
    p: [
      "The Service relies on, or links to, services run by others, such as app stores, Instagram, and the providers listed in our Privacy Policy. We are not responsible for their services, and your use of them is subject to their own terms.",
      "If you downloaded the app from the Apple App Store, Apple is not a party to these Terms and has no responsibility for the app or its support, but Apple and its subsidiaries may enforce these Terms against you as third-party beneficiaries.",
    ],
  },
  {
    h: "16. Deleting your account and ending these Terms",
    p: [
      `You can stop using the Service at any time. You can delete your account in the app under Settings, then Delete account, or by emailing ${LEGAL_CONTACT}. You can delete individual photos from the app.`,
      "We may suspend or close your account if you seriously or repeatedly break these Terms, if we must for legal reasons, or if we stop offering the Service. Where reasonable, we will tell you first and give you a chance to save your data.",
      "Sections 5 (for content already shared), 13, 17, 18, 19, 20 and 21 continue to apply after these Terms end.",
    ],
  },
  {
    h: "17. Disclaimers",
    p: [
      "We work hard to make outft useful and reliable, but the Service is provided \"as is\" and \"as available\". To the fullest extent the law allows, we make no warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement. We do not promise that the Service will be uninterrupted, secure or error free, that AI analysis will be accurate, or that your content will never be lost. Please keep your own copies of photos that matter to you.",
    ],
  },
  {
    h: "18. Limitation of liability",
    p: [
      "To the fullest extent the law allows, outft will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or goodwill, arising from or related to the Service or these Terms.",
      "To the fullest extent the law allows, our total liability for all claims related to the Service is limited to the greater of the amount you paid us for the Service in the 12 months before the claim, or 100 US dollars.",
      "Nothing in these Terms limits liability that cannot be limited by law, such as liability for fraud, or for death or personal injury caused by negligence, and nothing in these Terms takes away rights you have as a consumer that cannot be waived.",
    ],
  },
  {
    h: "19. Indemnity",
    p: [
      "To the extent the law allows, you agree to cover reasonable losses and costs, including reasonable legal fees, that we incur because of a claim by someone else arising from Your Content or your breach of these Terms. This does not apply to the extent the claim was caused by us.",
    ],
  },
  {
    h: "20. Governing law and disputes",
    p: [
      "These Terms are governed by the laws of the State of New York, United States, without regard to its conflict of law rules.",
      `If you have a concern, please email us first at ${LEGAL_CONTACT} so we can try to resolve it informally. If we cannot resolve it within 60 days, either of us may bring a claim in the state or federal courts located in New York County, New York, and both of us consent to those courts' jurisdiction. Either of us may instead bring an eligible claim in small claims court.`,
      "If you are a consumer living outside the United States, you also keep the protection of the mandatory laws of your country, and you may bring a claim in the courts where you live.",
    ],
  },
  {
    h: "21. General",
    p: [
      "These Terms and the Privacy Policy are the whole agreement between you and us about the Service. If any part of these Terms cannot be enforced, the rest stays in effect. If we do not enforce a part of these Terms right away, we do not give up our right to enforce it later.",
      "You may not transfer your rights under these Terms without our consent. We may transfer ours as part of a merger, acquisition or sale of assets, or by law, and these Terms will continue to protect you.",
      "We are not responsible for delays or failures caused by events outside our reasonable control.",
    ],
  },
  {
    h: "22. Changes to these Terms",
    p: [
      "We may update these Terms as the Service changes or the law requires. We will update the effective date and version on this page. If a change is significant, we will tell you in the app or by email before it takes effect and, where required, ask you to accept the new Terms. If you do not agree to a change, you can delete your account before it takes effect.",
    ],
  },
  {
    h: "23. Contact",
    p: [`Questions about these Terms: email ${LEGAL_CONTACT}.`],
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24">
      <h1 className="font-serif text-4xl italic">terms of service.</h1>
      <p className="mt-4 text-sm opacity-70">
        Effective {LEGAL_EFFECTIVE_DATE}. Version {TERMS_VERSION}.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed opacity-80">
        The short version: your photos stay yours, and we only use them to
        run outft for you. The AI reads your style, but it is an opinion and
        can be wrong. Only post what you have the right to post, be kind, and
        you decide what gets shared. outft is free today. The full terms
        below are what apply.
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
