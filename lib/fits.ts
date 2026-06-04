// Fit data drives the tracing wave, the demo, and the boards.
// `src` is optional: drop real editorial JPGs into /public/fits and set src
// to swap the art-directed plate for a photograph. The components handle both.

export type Swatch = "sw1" | "sw2" | "sw3" | "sw4" | "sw5" | "sw6";

export interface Fit {
  id: string;
  who: string;
  handle: string;
  occasion: string;
  caption: string;
  swatch: Swatch;
  tags: string[];
  /** optional real photo, e.g. "/fits/maren-oat-linen.jpg" */
  src?: string;
}

export const FITS: Fit[] = [
  {
    id: "0091",
    who: "maren",
    handle: "@maren",
    occasion: "Solo date",
    caption: "Oat linen, no rush",
    swatch: "sw3",
    tags: ["#quietluxury", "#neutrals", "#linen"],
  },
  {
    id: "0092",
    who: "ari",
    handle: "@ari",
    occasion: "Dinner",
    caption: "Slate and a single pearl",
    swatch: "sw5",
    tags: ["#oldmoney", "#tailoring"],
  },
  {
    id: "0093",
    who: "lena",
    handle: "@lenav",
    occasion: "Gallery",
    caption: "Bone wool, black gloves",
    swatch: "sw1",
    tags: ["#scandi", "#minimal"],
  },
  {
    id: "0094",
    who: "soraya",
    handle: "@soraya",
    occasion: "Party",
    caption: "Mauve silk after midnight",
    swatch: "sw4",
    tags: ["#eveningwear", "#silk"],
  },
  {
    id: "0095",
    who: "theo",
    handle: "@theo",
    occasion: "Studio",
    caption: "Sand canvas, worn-in",
    swatch: "sw6",
    tags: ["#workwear", "#coastal"],
  },
  {
    id: "0096",
    who: "jude",
    handle: "@jude",
    occasion: "Gym",
    caption: "Grey on grey, done early",
    swatch: "sw5",
    tags: ["#monochrome"],
  },
  {
    id: "0097",
    who: "noor",
    handle: "@noor.a",
    occasion: "Dinner",
    caption: "Butter cashmere, low light",
    swatch: "sw6",
    tags: ["#cashmere", "#warm"],
  },
  {
    id: "0098",
    who: "remy",
    handle: "@remy",
    occasion: "Solo date",
    caption: "Sage poplin, café window",
    swatch: "sw3",
    tags: ["#poplin", "#calm"],
  },
  {
    id: "0099",
    who: "iris",
    handle: "@iris",
    occasion: "Gallery",
    caption: "Sky linen, one good coat",
    swatch: "sw2",
    tags: ["#linen", "#editorial"],
  },
  {
    id: "0100",
    who: "dani",
    handle: "@dani",
    occasion: "Party",
    caption: "Lilac slip, gold at the wrist",
    swatch: "sw4",
    tags: ["#slipdress"],
  },
  {
    id: "0101",
    who: "kit",
    handle: "@kit",
    occasion: "Studio",
    caption: "Clay knit, paint on the cuff",
    swatch: "sw1",
    tags: ["#knit", "#texture"],
  },
  {
    id: "0102",
    who: "vera",
    handle: "@vera",
    occasion: "Dinner",
    caption: "Ash tailoring, no logo",
    swatch: "sw5",
    tags: ["#tailoring", "#quiet"],
  },
];
