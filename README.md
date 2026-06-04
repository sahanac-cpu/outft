# OUTFT.

**the fits you choose**

The editorial marketing site for OUTFT, a daily ritual for getting dressed.
Post your fit to open the feed, trace your style into fashion DNA, and find the
people you actually dress like.

Built with **Next.js (App Router) + React 19 + Motion + Tailwind v4**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Pages

| Route   | What it is |
|---------|------------|
| `/`     | **Tracing Art** hero (logged fits form a wave with a trace line that draws on scroll), the auto-cycling app demo (Daily ft -> camera ticket -> feed -> fashion DNA -> ft. twin), the four features, and the closing call to action. |
| `/why`  | The manifesto: post to see, narrow doors, a record not a stream. |
| `/faq`  | The short answers, as an accordion. |
| `/join` | Multiple signups: waitlist or creator application, plus Apple / Google quick options. Submissions confirm as a brand "fit of record" ticket. |

## The signup API

`POST /api/subscribe` with `{ email, handle?, kind: "waitlist" | "creator", source? }`.
Emails are validated, de-duplicated per list, and appended to
`data/subscribers.json` (gitignored). Returns the waitlist position.

## Design system

- **Type:** Playfair Display italic (the `OUTFT.` / `ft.` marks), Cormorant
  Garamond (editorial headlines), Jost (UI text). Loaded via `next/font`.
- **Palette:** warm bone + ink `#16140F`, with drifting muted auras
  (mauve, sage, sky, blush, butter, lilac). Light theme, locked.
- **Motion:** scroll-linked trace draw, `whileInView` reveals, the cycling
  phone demo. Everything degrades under `prefers-reduced-motion`.

## Imagery: swapping in real photos

Outfits currently render as art-directed **fit plates** (muted gradient + film
grain), matching the OUTFT app's own treatment. Every plate accepts a real
photograph with zero layout change:

1. Drop editorial JPGs into `public/fits/`.
2. Add a `src` to the relevant entries in `lib/fits.ts`
   (e.g. `src: "/fits/maren-oat-linen.jpg"`). The tracing wave, demo, and
   feature plates pick them up automatically.

## Legacy

The previous dark/lime Express landing page is preserved under `legacy/` for
reference. It is not part of the build.
