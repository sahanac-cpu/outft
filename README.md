# outft·

**fit check. everyday. no excuses.**

a minimalist, identity-forward social platform where getting dressed is the point. outft· is an app that turns getting dressed into a daily ritual with your friends. post your fit, track your style, and build your streak.

## Project Structure

- `public/` - Static assets for the frontend landing page.
  - `index.html` - Main landing page with signup form.
  - `styles.css` - Custom design system implementing the outft· brand guidelines.
  - `script.js` - Frontend logic for animations, API calls, and smooth scrolling.
  - `images/` - High-quality mockups and lifestyle imagery used in the site.
- `server.js` - Lightweight Express backend to handle email signups.
- `data/` - Database storage.
  - `subscribers.json` - JSON file where collected waitlist emails are saved.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   (Alternatively, use `node server.js`)

3. View the app at `http://localhost:3000`

## Brand Guidelines

- **Palette**: Dark mode (`#0A0A0A`), Lime Green Accent (`#C8FF00`), White (`#ffffff`), Dust (`#ff4444`)
- **Typography**: Inter (Clean sans-serif)
- **Voice**: Lowercase, confident, minimalist. "never explain. never exclaim."

## Features Showcased on Landing Page

1. **The Ritual**: One random moment a day, everyone posts what they're wearing.
2. **Friends & Streaks**: Your real friends, real accountability, and fit reactions.
3. **Style DNA**: Monthly breakdown of your aesthetic evolution.
4. **Cost Per Wear**: Tag items to see which pieces in your closet actually earn their keep.
5. **Fit Vote**: Post two options, let friends decide before you leave.

## Endpoints

- `POST /api/subscribe`: Accepts `{ email: "user@example.com" }` to add to the waitlist.
- `GET /api/subscribers`: Admin endpoint to view the current waitlist.