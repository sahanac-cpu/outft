import type { Metadata } from "next";
import { WhyAltBorder } from "@/components/why-altborder";

export const metadata: Metadata = {
  title: "Why — OUTFT.",
  description:
    "OUTFT is a style self-knowledge product. We trace the fits you wore back into a number — fashion, then you.",
};

export default function WhyPage() {
  return <WhyAltBorder />;
}
