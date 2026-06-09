"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/* ------------------------------------------------------------------ *
   Pixel-sort figure in a bright paneled hallway, with scattered
   bitmap glyphs. Vivid yellow / red / black streaks (reference look).
   The silhouette morphs: bob + dress -> long hair + pants ->
   short hair + jorts, dissolving to near-blank between looks.
 * ------------------------------------------------------------------ */

const W = 240;
const H = 330;

type RGB = [number, number, number];

const ROOM: RGB = [250, 249, 246];
const SKIN: RGB = [233, 202, 178];

// vivid reference palette
const YELLOW: RGB = [233, 201, 45];
const ORANGE: RGB = [224, 142, 40];
const RED: RGB = [203, 58, 58];
const CRIMSON: RGB = [178, 40, 62];
const MAGENTA: RGB = [206, 72, 150];
const BLACK: RGB = [22, 19, 16];

type Hair = "bob" | "long" | "short";
type Garment = "dress" | "pants" | "jorts";

const LOOKS: { hair: Hair; garment: Garment; top: RGB; bottom: RGB }[] = [
  { hair: "bob", garment: "dress", top: YELLOW, bottom: RED },
  { hair: "long", garment: "pants", top: ORANGE, bottom: CRIMSON },
  { hair: "short", garment: "jorts", top: YELLOW, bottom: MAGENTA },
];

function hash(x: number, y: number, s: number): number {
  let h = x * 374761393 + y * 668265263 + s * 2246822519;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function mul(c: RGB, f: number): RGB {
  return [c[0] * f, c[1] * f, c[2] * f];
}

// 5x7 bitmap font — the scattered glyphs spell TRACING / FASHION
const FONT: Record<string, number[]> = {
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
  A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  C: [0x0f, 0x10, 0x10, 0x10, 0x10, 0x10, 0x0f],
  I: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x1f],
  N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  G: [0x0f, 0x10, 0x10, 0x17, 0x11, 0x11, 0x0f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
};

const GLYPHS = (() => {
  const cols = [
    { word: "TRACING", x: 9, y0: 30, s: 3, step: 27 },
    { word: "FASHION", x: 40, y0: 44, s: 3, step: 27 },
  ];
  const out: { ch: string; x: number; y: number; s: number }[] = [];
  for (const col of cols) {
    col.word.split("").forEach((ch, i) => {
      const jx = ((i * 5) % 3) - 1; // tiny broken-font jitter
      out.push({ ch, x: col.x + jx, y: col.y0 + i * col.step, s: col.s });
    });
  }
  return out;
})();

const CX = 0.52;

// region: 0 none, 1 hair, 2 skin, 3 top, 4 bottom, 5 shoe
function regionAt(nx: number, ny: number, hair: Hair, garment: Garment, lLeg: number, rLeg: number): number {
  const dx = nx - CX;
  const adx = Math.abs(dx);
  if (Math.hypot(dx, ny - 0.135) < 0.048) return 2;

  if (hair === "bob") {
    if (ny < 0.21 && Math.hypot(dx * 0.92, ny - 0.118) < 0.084) return 1;
  } else if (hair === "long") {
    if (ny < 0.2 && Math.hypot(dx * 0.92, ny - 0.118) < 0.08) return 1;
    if (ny >= 0.15 && ny < 0.46 && Math.abs(adx - 0.085) < 0.03) return 1;
  } else {
    if (ny >= 0.078 && ny < 0.122 && adx < 0.055) return 1;
  }

  if (ny >= 0.225 && ny < 0.45 && Math.abs(adx - 0.1) < 0.017) return 2;

  if (ny >= 0.2 && ny < 0.47) {
    const hw = 0.084 - (ny - 0.2) * 0.02;
    if (adx < hw) return 3;
  }

  const k = Math.max(0, (ny - 0.5) / 0.42);
  const lx = lLeg * k;
  const rx = rLeg * k;

  if (garment === "dress") {
    if (ny >= 0.45 && ny < 0.66) {
      const hw = 0.07 + (ny - 0.45) * 0.46;
      if (adx < hw) return 4;
    }
    if (ny >= 0.66 && ny < 0.93) {
      const off = 0.034;
      if (Math.abs(nx - (CX - off + lx)) < 0.025 || Math.abs(nx - (CX + off + rx)) < 0.025)
        return ny > 0.905 ? 5 : 2;
    }
  } else if (garment === "pants") {
    if (ny >= 0.46 && ny < 0.93) {
      const off = 0.03 + (ny - 0.46) * 0.02;
      if (Math.abs(nx - (CX - off + lx)) < 0.032 || Math.abs(nx - (CX + off + rx)) < 0.032)
        return ny > 0.905 ? 5 : 4;
    }
  } else {
    if (ny >= 0.46 && ny < 0.62) {
      const off = 0.03 + (ny - 0.46) * 0.06;
      if (adx < 0.05 || Math.abs(nx - (CX - off + lx * 0.4)) < 0.05 || Math.abs(nx - (CX + off + rx * 0.4)) < 0.05)
        return 4;
    }
    if (ny >= 0.62 && ny < 0.93) {
      const off = 0.035;
      if (Math.abs(nx - (CX - off + lx)) < 0.027 || Math.abs(nx - (CX + off + rx)) < 0.027)
        return ny > 0.905 ? 5 : 2;
    }
  }
  return 0;
}

function hallway(x: number, y: number): RGB {
  const nx = x / W;
  const ny = y / H;
  let c: RGB = [250, 249, 246];

  // back doorway (brighter panel behind the figure)
  if (nx > 0.34 && nx < 0.68 && ny > 0.16 && ny < 0.62) {
    c = [252, 251, 249];
    if (Math.abs(nx - 0.34) < 0.006 || Math.abs(nx - 0.68) < 0.006 || Math.abs(ny - 0.16) < 0.005)
      c = [223, 220, 214];
  }
  // wainscot molding line
  if (Math.abs(ny - 0.6) < 0.006) c = [224, 221, 215];
  // lower wall paneling
  if (ny > 0.6 && ny < 0.9 && (x % 30) < 1.2) c = [233, 230, 224];
  // upper wall faint seams
  if (ny < 0.6 && (x % 44) < 1) c = mul(c, 0.985);
  // floor
  if (ny > 0.9) c = [241, 239, 233];
  // corridor side shading (walls receding)
  const edge = Math.min(nx, 1 - nx);
  if (edge < 0.16) c = mul(c, 0.9 + (edge / 0.16) * 0.1);
  return c;
}

export function GlitchCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    const img = ctx.createImageData(W, H);
    const work = img.data;
    const colTop = new Int16Array(W);
    const colBot = new Int16Array(W);

    const PER = 3600;
    const HOLD = 2500;
    const TRANS = PER - HOLD;
    const IDLE = 0.06;
    const N = LOOKS.length;

    let startT = performance.now();
    let raf = 0;
    let running = true;
    let lastDraw = 0;

    const set = (i: number, c: RGB) => {
      work[i] = c[0];
      work[i + 1] = c[1];
      work[i + 2] = c[2];
      work[i + 3] = 255;
    };

    const drawGlyph = (g: (typeof GLYPHS)[number], dxj: number) => {
      const rows = FONT[g.ch];
      if (!rows) return;
      for (let ry = 0; ry < 7; ry++) {
        for (let rxx = 0; rxx < 5; rxx++) {
          if (!(rows[ry] & (1 << (4 - rxx)))) continue;
          for (let sy = 0; sy < g.s; sy++) {
            for (let sx = 0; sx < g.s; sx++) {
              const px = g.x + dxj + rxx * g.s + sx;
              const py = g.y + ry * g.s + sy;
              if (px < 0 || px >= W || py < 0 || py >= H) continue;
              set((py * W + px) * 4, BLACK);
            }
          }
        }
      }
    };

    const render = (now: number) => {
      const elapsed = Math.max(0, now - startT);
      const t = now / 1000;

      const ph = t * 1.7;
      const bobPx = Math.sin(ph * 2) * 1.5;
      const lLeg = Math.sin(ph) * 0.024;
      const rLeg = -lLeg;

      const li = ((Math.floor(elapsed / PER) % N) + N) % N;
      const ni = (li + 1) % N;
      const into = elapsed % PER;
      let amount: number;
      let presence: number;
      let idx: number;
      if (into < HOLD) {
        amount = IDLE;
        presence = 1;
        idx = li;
      } else {
        const tp = (into - HOLD) / TRANS;
        const env = Math.sin(tp * Math.PI);
        amount = IDLE + env * 0.78;
        presence = 1 - env * 0.92;
        idx = tp < 0.5 ? li : ni;
      }
      if (elapsed < 1000) {
        const r = elapsed / 1000;
        presence = Math.min(presence, r);
        amount = Math.max(amount, (1 - r) * 0.65);
      }
      const look = LOOKS[idx];
      const effPres = presence - 0.08;

      colTop.fill(-1);
      colBot.fill(-1);

      // 1) hallway + vivid figure
      for (let y = 0; y < H; y++) {
        const ny = (y - bobPx) / H;
        for (let x = 0; x < W; x++) {
          const nx = x / W;
          const i = (y * W + x) * 4;
          const reg = regionAt(nx, ny, look.hair, look.garment, lLeg, rLeg);
          if (reg === 0) {
            set(i, hallway(x, y));
            continue;
          }
          if (hash(x, y + Math.floor(t * 8), 5) > effPres) {
            set(i, hallway(x, y));
            continue;
          }
          let c: RGB;
          if (reg === 1) c = BLACK;
          else if (reg === 2) c = SKIN;
          else if (reg === 3) c = look.top;
          else if (reg === 4) c = look.bottom;
          else c = BLACK;
          // magenta flecks + grain (vivid, minimal lift)
          if (reg >= 3 && hash(x, y, 9) > 0.95) c = MAGENTA;
          const g = (hash(x, y, 3) - 0.5) * 18;
          c = [c[0] + g, c[1] + g, c[2] + g];
          // translucent: let the hallway show through so it is not opaque
          c = mix(c, hallway(x, y), 0.34);
          if (colTop[x] < 0) colTop[x] = y;
          colBot[x] = y;
          set(i, c);
        }
      }

      // 2) pixel-sort streaks (always flowing) + glitch (transitions only)
      {
        const seed = Math.floor(now / 80);
        const flow = 0.34 + amount; // streaks flow continuously, not just on morph
        for (let x = 0; x < W; x++) {
          if (colTop[x] < 0) continue;
          const drip = Math.floor(hash(x, 1, seed) * flow * 62);
          const end = Math.min(H - 1, colBot[x] + drip);
          const resetBias = 0.1 + (1 - flow) * 0.32;
          let carry: RGB | null = null;
          for (let y = colTop[x]; y <= end; y++) {
            const i = (y * W + x) * 4;
            const r = hash(x, y, seed);
            if (carry === null || r < resetBias) carry = [work[i], work[i + 1], work[i + 2]];
            else {
              const past = y > colBot[x] ? (y - colBot[x]) / Math.max(1, drip) : 0;
              set(i, mix(carry, ROOM, past * 0.85));
            }
          }
        }
        const splits = amount > 0.3 ? Math.floor(amount * 7) : 0;
        for (let s = 0; s < splits; s++) {
          const by = Math.floor(hash(s, 9, seed) * H);
          const bh = 2 + Math.floor(hash(s, 11, seed) * 9);
          const dx = Math.round((hash(s, 13, seed) - 0.5) * amount * 13);
          for (let y = by; y < Math.min(H, by + bh); y++) {
            for (let x = 0; x < W; x++) {
              const i = (y * W + x) * 4;
              const rxx = Math.max(0, Math.min(W - 1, x - dx));
              const bxx = Math.max(0, Math.min(W - 1, x + dx));
              work[i] = work[(y * W + rxx) * 4];
              work[i + 2] = work[(y * W + bxx) * 4 + 2];
            }
          }
        }
        const blocks = amount > 0.3 ? Math.floor(amount * 4) : 0;
        for (let b = 0; b < blocks; b++) {
          if (hash(b, 17, seed) > 0.6) {
            const by = Math.floor(hash(b, 19, seed) * H);
            const bh = 3 + Math.floor(hash(b, 23, seed) * 12);
            const dx = Math.round((hash(b, 29, seed) - 0.5) * amount * 22);
            for (let y = by; y < Math.min(H, by + bh); y++) {
              const rs = y * W * 4;
              const row = work.slice(rs, rs + W * 4);
              for (let x = 0; x < W; x++) {
                const sx = (x - dx + W) % W;
                const i = rs + x * 4;
                work[i] = row[sx * 4];
                work[i + 1] = row[sx * 4 + 1];
                work[i + 2] = row[sx * 4 + 2];
              }
            }
          }
        }
      }

      // 3) bitmap glyphs spelling tracing / fashion — always on, subtle jitter
      const tick = Math.floor(now / 90);
      for (let gi = 0; gi < GLYPHS.length; gi++) {
        const jit = amount > 0.25 && hash(gi, 37, tick) > 0.7 ? 1 : 0;
        drawGlyph(GLYPHS[gi], jit);
      }

      // 4) light edge feather (top/bottom only; keep hallway sides)
      const bY = 14;
      for (let y = 0; y < H; y++) {
        const fy = Math.min(y, H - 1 - y) / bY;
        if (fy >= 1) continue;
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const c = mix([work[i], work[i + 1], work[i + 2]], ROOM, 1 - fy);
          work[i] = c[0];
          work[i + 1] = c[1];
          work[i + 2] = c[2];
        }
      }

      ctx.putImageData(img, 0, 0);
    };

    if (reduce) {
      render(startT + 600);
      return () => {};
    }

    const loop = (now: number) => {
      if (!running) return;
      if (now - lastDraw >= 33) {
        lastDraw = now;
        render(now);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-label="A figure in a hallway cycling through looks, traced from pixels"
      style={{ width: "100%", height: "100%", imageRendering: "pixelated", display: "block" }}
    />
  );
}
