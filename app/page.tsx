import Image from "next/image";
import { TracingHero } from "@/components/tracing-hero";
import { AppDemo } from "@/components/app-demo";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";
import { CircularRevealHeading } from "@/components/circular-reveal-heading";

export default function Home() {
  return (
    <>
      <TracingHero />

      {/* interstitial statement */}
      <div className="overflow-hidden bg-[#f3f1ec] px-6 py-28 md:px-10 md:py-36">
        <CircularRevealHeading
          text="The fits you choose."
          className="text-[clamp(3.5rem,10vw,9rem)]"
        />
      </div>

      {/* fabric background spans both slides */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/IMG_2115.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <AppDemo />
        <Features />
      </div>

      <CTA />
    </>
  );
}
