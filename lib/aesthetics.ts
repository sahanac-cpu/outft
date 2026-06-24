// Data for the magazine sections: the aesthetic index (contents spread),
// the logged-fit window stack, and the pinned friends wall.

export type Swatch = "sw1" | "sw2" | "sw3" | "sw4" | "sw5" | "sw6";

export interface Aesthetic {
  key: string;
  label: string;
  note: string;
}

/** The aesthetic read, as a magazine contents spread (image 2).
 *  `pct` doubles as the "page number" beneath each column. */
export interface IndexEntry {
  pct: number;
  label: string;
  note: string;
  swatch: Swatch;
  src?: string;
}

export const AESTHETIC_INDEX: IndexEntry[] = [
  { pct: 41, label: "Old Money", note: "Tailoring, no logo", swatch: "sw6", src: "/IMG_2115.jpeg" },
  { pct: 27, label: "Streetwear", note: "Volume & attitude", swatch: "sw5" },
  { pct: 18, label: "Minimalist", note: "Bone, ash, one line", swatch: "sw1" },
  { pct: 14, label: "Romantic", note: "The wildcard slice", swatch: "sw4", src: "/IMG_2141.png" },
];

/** Logged fits, rendered as stacked app windows (image 3). */
export interface LogFit {
  handle: string;
  caption: string;
  occasion: string;
  swatch: Swatch;
  src?: string;
}

export const LOG_FITS: LogFit[] = [
  { handle: "@you", caption: "Oat linen, no rush", occasion: "Solo date", swatch: "sw3", src: "/IMG_2115.jpeg" },
  { handle: "@you", caption: "Slate and a single pearl", occasion: "Dinner", swatch: "sw5" },
  { handle: "@you", caption: "Bone wool, black gloves", occasion: "Gallery", swatch: "sw1" },
  { handle: "@you", caption: "Mauve silk after midnight", occasion: "Party", swatch: "sw4", src: "/IMG_2141.png" },
];

/** Friends, rendered as pinned tilted cards (image 4). */
export interface Friend {
  handle: string;
  name: string;
  top: string;
  pct: number;
  occasion: string;
  swatch: Swatch;
  src?: string;
  rotate: number;
}

export const FRIENDS: Friend[] = [
  { handle: "@maren", name: "Maren", top: "Minimalist", pct: 52, occasion: "Solo date", swatch: "sw1", src: "/IMG_2141.png", rotate: -3 },
  { handle: "@ari", name: "Ari", top: "Old Money", pct: 48, occasion: "Dinner", swatch: "sw6", rotate: 2.5 },
  { handle: "@theo", name: "Theo", top: "Streetwear", pct: 44, occasion: "Studio", swatch: "sw5", src: "/IMG_2115.jpeg", rotate: -1.5 },
  { handle: "@soraya", name: "Soraya", top: "Evening", pct: 46, occasion: "Party", swatch: "sw4", rotate: 3 },
  { handle: "@lena", name: "Lena", top: "Scandi", pct: 39, occasion: "Gallery", swatch: "sw2", rotate: -2 },
  { handle: "@theo.k", name: "Kit", top: "Coastal", pct: 41, occasion: "Café", swatch: "sw3", rotate: 1.5 },
];
