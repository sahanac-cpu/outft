import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#333333] bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">

          {/* brand + tagline */}
          <div className="max-w-sm">
            <span className="font-display text-[18px] font-bold tracking-[-0.01em] text-[#000000]">
              OUTFT.
            </span>
            <p className="mt-5 max-w-[34ch] font-serif text-[20px] font-light italic leading-[1.3] text-[#555555]">
              The fits you choose, kept like records. One a day, with the people
              who dress like you.
            </p>
          </div>

          {/* nav links */}
          <nav className="grid grid-cols-2 gap-x-14 gap-y-3">
            {[
              { label: "Tracing", href: "/" },
              { label: "Why outft", href: "/why" },
              { label: "The app", href: "/#demo" },
              { label: "FAQ", href: "/faq" },
              { label: "Fashion DNA", href: "/#dna" },
              { label: "Request access", href: "/join" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-sans text-[12px] font-light text-[#555555] transition-colors duration-150 hover:text-[#000000]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* bottom strip */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[#333333] pt-6 md:flex-row md:items-center md:justify-between">
          {["OUTFT · fit of record", "Curate. Keep. Revisit.", String(new Date().getFullYear())].map((t) => (
            <span
              key={t}
              className="font-sans text-[10px] font-light uppercase tracking-[0.22em] text-[#808080]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
