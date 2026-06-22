import Link from "next/link";

export function Logo({
  size = "1.5rem",
  href = "/",
  className = "",
}: {
  size?: string;
  href?: string | null;
  className?: string;
}) {
  const mark = (
    <span
      className={`font-display font-bold tracking-[-0.015em] leading-none text-[#000000] ${className}`}
      style={{ fontSize: size }}
    >
      OUTFT.
    </span>
  );
  if (href === null) return mark;
  return (
    <Link href={href} aria-label="OUTFT home" className="inline-flex">
      {mark}
    </Link>
  );
}

/** The "ft." sub-brand mark used for DNA / twin features. */
export function FtMark({
  size = "1.25rem",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={`font-display italic font-extrabold leading-none text-ink ${className}`}
      style={{ fontSize: size }}
    >
      ft<span className="not-italic">.</span>
    </span>
  );
}
