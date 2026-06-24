"use client";

import {
  CenterUnderline,
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
} from "@/components/ui/underline-animation";

export function ContactFancy() {
  return (
    <div className="flex flex-row items-start gap-8 font-sans text-[clamp(0.95rem,2.4vw,1.9rem)] uppercase tracking-tight text-ink">
      <div className="text-[#808080]">Contact</div>
      <ul className="flex flex-col space-y-1.5">
        <li>
          <a href="https://www.linkedin.com/company/outft" target="_blank" rel="noopener noreferrer">
            <CenterUnderline label="LinkedIn — outft" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/outft.co" target="_blank" rel="noopener noreferrer">
            <ComesInGoesOutUnderline label="Instagram — outft.co" direction="right" />
          </a>
        </li>

        <li className="pt-12">
          <ul className="flex flex-col space-y-1.5">
            <li>
              <a href="mailto:sahana@outft.app">
                <GoesOutComesInUnderline label="sahana@outft.app" direction="left" />
              </a>
            </li>
            <li>
              <a href="mailto:victoria@outft.app">
                <GoesOutComesInUnderline label="victoria@outft.app" direction="right" />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
