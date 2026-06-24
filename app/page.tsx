import { HeroImage } from "@/components/hero-image";
import { AppDemo } from "@/components/app-demo";
import { ShortWhy } from "@/components/short-why";
import { RequestAccess } from "@/components/request-access";

export default function Home() {
  return (
    <>
      {/* full-bleed image hero with the tracing cycle */}
      <HeroImage />

      {/* the demo — main's app, in motion */}
      <AppDemo />

      {/* short why → learn more links to /why */}
      <ShortWhy />

      {/* request access — leads to /request-demo and /founders */}
      <RequestAccess />
    </>
  );
}
