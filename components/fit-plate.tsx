import type { Swatch } from "@/lib/fits";

/**
 * The art-directed "fit plate". Default: a muted gradient + film grain,
 * matching the OUTFT app's own fit treatment. Pass `src` to render a real
 * editorial photograph instead. Either way the framing stays consistent.
 */
export function FitPlate({
  swatch = "sw3",
  src,
  caption,
  occasion,
  aspect = "4 / 5",
  rounded = "var(--radius-plate)",
  className = "",
  shadow = true,
  showCaption = false,
}: {
  swatch?: Swatch;
  src?: string;
  caption?: string;
  occasion?: string;
  aspect?: string;
  rounded?: string;
  className?: string;
  shadow?: boolean;
  showCaption?: boolean;
}) {
  return (
    <figure
      className={`relative overflow-hidden ${swatch} ${className}`}
      style={{
        aspectRatio: aspect,
        borderRadius: rounded,
        boxShadow: shadow
          ? "0 24px 48px -28px rgba(40,36,30,0.42)"
          : undefined,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption ?? "A logged outfit"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="grain-local" aria-hidden />
      )}

      {showCaption && (caption || occasion) && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 pb-3.5 pt-10">
          {occasion && (
            <span className="block text-[9px] uppercase tracking-[0.2em] text-white/75">
              {occasion}
            </span>
          )}
          {caption && (
            <span className="block font-serif text-[20px] font-medium leading-[1.05] text-white">
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
