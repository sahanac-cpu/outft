import Link from "next/link";

export function Footer() {
  const cols: { head: string; links: { label: string; href: string }[] }[] = [
    {
      head: "Product",
      links: [
        { label: "The demo", href: "/#demo" },
        { label: "Request a demo", href: "/request-demo" },
      ],
    },
    {
      head: "Company",
      links: [
        { label: "Talk to the founders", href: "/founders" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <span className="font-display text-[24px] font-semibold tracking-[-0.01em] text-ink">
              OUTFT.
            </span>
            <p className="mt-4 max-w-[34ch] font-serif text-[20px] font-light italic leading-snug text-ink2">
              Log what you wore. Read your aesthetic in numbers. The fits you
              chose, kept like records.
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.head}>
              <span className="lbl">{c.head}</span>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="lbl lbl-ink hover:opacity-60">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <span className="lbl">OUTFT © 2026 · Style Journal Nº01</span>
          <span className="lbl">Log · Read · Share</span>
          <span className="lbl">The fits you chose</span>
        </div>
      </div>
    </footer>
  );
}
