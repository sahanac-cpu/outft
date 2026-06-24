/**
 * The grey crumpled-paper background from the repo (IMG_2115), desaturated to
 * a neutral grey and washed for legibility. Absolute layer — put inside a
 * `relative` section, content above it.
 */
export function CrumpledBg({
  overlay = 0.62,
  className = "",
}: {
  overlay?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/IMG_2115.jpeg"
        alt=""
        className="h-full w-full object-cover"
        style={{ filter: "grayscale(0.6) contrast(1.05) brightness(1.02)" }}
      />
      <div className="absolute inset-0" style={{ background: `rgba(231,230,227,${overlay})` }} />
    </div>
  );
}
