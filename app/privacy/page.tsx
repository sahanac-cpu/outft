import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy. OUTFT.",
  description: "What outft collects, how outfit photos are analyzed, and your choices.",
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "What we collect",
    p: [
      "Your account email and username when you sign up.",
      "The outfit photos you choose to capture or upload, the caption you write, and the category you pick.",
      "The style analysis derived from your photos (aesthetic percentages, tags, and insights), which together form your fashion DNA.",
      "Basic technical and usage information needed to run and improve the service.",
    ],
  },
  {
    h: "How photos are used",
    p: [
      "Outfit photos exist to be analyzed and shown back to you. Analysis runs on our servers using trusted third-party AI providers under agreements that restrict how they handle your content.",
      "Photos are stored privately in your account. Nothing is public by default: no public like counts, no open profiles, and your record is visible only to you and the people you follow.",
    ],
  },
  {
    h: "How information may be shared",
    p: [
      "With service providers that help us operate outft (hosting, analysis, analytics), bound by contracts limiting their use of your data.",
      "As aggregated or de-identified insights — for example, style and trend patterns across the community — with brands and partners. These insights do not identify you.",
      "If outft introduces new partnerships or features that involve sharing personal information in new ways, we will update this policy and notify you before they take effect, with choices where required by law.",
    ],
  },
  {
    h: "Your controls",
    p: [
      "You can delete any capture, and deleting removes its server record.",
      "You can export your data or delete your entire account from Settings. Account deletion removes your photos, analyses, and profile.",
      "Where privacy laws give you additional rights (such as access, correction, or opting out of certain sharing), you can exercise them by contacting us.",
    ],
  },
  {
    h: "Contact",
    p: [
      "Questions about privacy or your data: reach us through the contact page and we will respond directly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24">
      <h1 className="font-serif text-4xl italic">privacy.</h1>
      <p className="mt-4 text-sm opacity-70">
        The short version: your fits live in your record. We collect what we
        need to read your style DNA, show it back to you, and build outft.
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
      <p className="mt-16 text-xs opacity-50">Last updated July 2026.</p>
    </main>
  );
}
