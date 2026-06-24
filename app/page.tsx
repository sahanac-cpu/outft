import { HeroImage } from "@/components/hero-image";
import { AppDemo } from "@/components/app-demo";

export default function Home() {
  return (
    <>
      {/* full-bleed image hero with the tracing cycle */}
      <HeroImage />

      {/* the demo — main's app, in motion */}
      <AppDemo />
    </>
  );
}
