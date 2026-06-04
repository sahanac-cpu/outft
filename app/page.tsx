import { TracingHero } from "@/components/tracing-hero";
import { AppDemo } from "@/components/app-demo";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <TracingHero />
      <AppDemo />
      <Features />
      <CTA />
    </>
  );
}
