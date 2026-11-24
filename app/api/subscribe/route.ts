import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Waitlist and creator-list signups.
 *
 * In production these are saved in the outft Supabase project through the
 * join_waitlist() function (see outft-dna supabase/migrations/0008). It only
 * needs the public project URL and publishable key; the table itself cannot
 * be read with that key. Set on Vercel:
 *   SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
 *
 * Locally, without those, signups go to data/subscribers.json as before.
 * On Vercel that file is not kept, so production refuses to pretend.
 */

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

type Kind = "waitlist" | "creator";

type Subscriber = {
  email: string;
  handle?: string;
  kind: Kind;
  source: string;
  timestamp: string;
};

// Returns the place in line, -1 if already on the list, or null on failure.
async function joinSupabase(email: string, handle: string | undefined, kind: Kind, source: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/join_waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY!,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ p_email: email, p_handle: handle ?? null, p_kind: kind, p_source: source }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("subscribe: join_waitlist failed with status", res.status);
    return null;
  }
  const value = await res.json();
  return typeof value === "number" ? value : null;
}

async function joinFile(email: string, handle: string | undefined, kind: Kind, source: string) {
  let data: { subscribers: Subscriber[] } = { subscribers: [] };
  try {
    data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  } catch {}
  if (data.subscribers.some((s) => s.email === email && s.kind === kind)) return -1;
  data.subscribers.push({ email, handle, kind, source, timestamp: new Date().toISOString() });
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  return data.subscribers.filter((s) => s.kind === kind).length;
}

export async function POST(request: Request) {
  let body: {
    email?: string;
    handle?: string;
    kind?: string;
    source?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
  if (!emailOk) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const kind: Kind = body.kind === "creator" ? "creator" : "waitlist";
  const handle = (body.handle ?? "").trim().slice(0, 80) || undefined;
  const source = (body.source ?? "join").slice(0, 40);

  let position: number | null;
  if (SUPABASE_URL && SUPABASE_KEY) {
    position = await joinSupabase(email, handle, kind, source).catch(() => null);
  } else if (process.env.NODE_ENV !== "production") {
    position = await joinFile(email, handle, kind, source).catch(() => null);
  } else {
    console.error("subscribe: SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY not set");
    position = null;
  }

  if (position === null) {
    return NextResponse.json(
      { error: "We could not save your signup right now. Please try again, or email sahana@outft.app." },
      { status: 503 }
    );
  }
  if (position === -1) {
    return NextResponse.json({ error: "You are already on this list.", already: true }, { status: 409 });
  }
  return NextResponse.json({
    ok: true,
    message: kind === "creator" ? "Application received." : "You're on the list.",
    position,
  });
}
