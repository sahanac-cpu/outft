import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <Logo size="2rem" href={null} />
            <p className="mt-5 font-serif text-[22px] italic leading-[1.3] text-ink2">
              The fits you choose, kept like records. One a day, with the people
              who dress like you.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-14 gap-y-3 text-[13px] text-ink2">
            <Link href="/" className="transition-colors hover:text-ink">
              Tracing
            </Link>
            <Link href="/why" className="transition-colors hover:text-ink">
              Why outft
            </Link>
            <Link href="/#demo" className="transition-colors hover:text-ink">
              The app
            </Link>
            <Link href="/faq" className="transition-colors hover:text-ink">
              FAQ
            </Link>
            <Link href="/#dna" className="transition-colors hover:text-ink">
              Fashion DNA
            </Link>
            <Link href="/join" className="transition-colors hover:text-ink">
              Request access
            </Link>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line2 pt-6 text-[11px] uppercase tracking-[0.18em] text-grey md:flex-row md:items-center md:justify-between">
          <span>OUTFT · fit of record</span>
          <span>Curate. Keep. Revisit.</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
