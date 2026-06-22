import { HeroImage } from "@/components/hero-image";
import { AppDemo } from "@/components/app-demo";
import { RequestAccess } from "@/components/request-access";

export default function Home() {
  return (
    <>
      {/* full-bleed image hero with cascading headline */}
      <HeroImage />

      {/* the demo — from main: the app in motion (phone, rotating screens) */}
      <AppDemo />

      {/* request access — leads to /request-demo and /founders */}
      <RequestAccess />
    </>
  );
}
