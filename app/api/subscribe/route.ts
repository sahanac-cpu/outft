import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

type Subscriber = {
  email: string;
  handle?: string;
  kind: "waitlist" | "creator";
  source: string;
  timestamp: string;
};

async function readData(): Promise<{ subscribers: Subscriber[] }> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { subscribers: [] };
  }
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
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Enter a valid email." },
      { status: 400 }
    );
  }

  const kind: Subscriber["kind"] = body.kind === "creator" ? "creator" : "waitlist";

  const data = await readData();
  if (data.subscribers.some((s) => s.email === email && s.kind === kind)) {
    return NextResponse.json(
      { error: "You are already on this list.", already: true },
      { status: 409 }
    );
  }

  data.subscribers.push({
    email,
    handle: (body.handle ?? "").trim() || undefined,
    kind,
    source: (body.source ?? "join").slice(0, 40),
    timestamp: new Date().toISOString(),
  });

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

  const position = data.subscribers.filter((s) => s.kind === kind).length;
  return NextResponse.json({
    ok: true,
    message: kind === "creator" ? "Application received." : "You're on the list.",
    position,
  });
}
