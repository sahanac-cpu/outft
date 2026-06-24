import { HeroImage } from "@/components/hero-image";
import { IndexStatement } from "@/components/index-statement";
import { AppDemo } from "@/components/app-demo";

export default function Home() {
  return (
    <>
      {/* full-bleed image hero with the tracing cycle */}
      <HeroImage />

      {/* index statement — the Why headline, after the hero */}
      <IndexStatement />

      {/* the demo — main's app, in motion */}
      <AppDemo />
    </>
  );
}
