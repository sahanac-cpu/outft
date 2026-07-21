import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const ALLOWED_MEDIA = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

// Default to the current Sonnet; override with ANTHROPIC_MODEL if your account needs a different id.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

const SYSTEM = `You are outft.'s style DNA engine. Analyze outfit photos and return ONLY a JSON object with no markdown, no preamble, just raw JSON:
{"aesthetics":[{"label":"...","pct":0}],"tags":["..."],"insight":"..."}
- aesthetics: top 4 aesthetic categories summing to 100. Labels from: Quiet luxury, Old money, Scandi, Coastal, Eclectic, Minimalist, Athleisure, Bold, Vintage, Classic
- tags: 4-6 concise style descriptors (e.g. "neutral palette", "wide leg", "structured")
- insight: one sentence max 16 words about the dominant aesthetic quality`;

export async function POST(request: Request) {
  let body: { imageBase64?: unknown; mediaType?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const imageBase64 = body.imageBase64;
  const mediaType = typeof body.mediaType === "string" ? body.mediaType : "image/jpeg";

  if (!imageBase64 || typeof imageBase64 !== "string") {
    return NextResponse.json({ error: "imageBase64 required" }, { status: 400 });
  }
  if (!ALLOWED_MEDIA.has(mediaType)) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }
  if (imageBase64.length > 12_000_000) {
    return NextResponse.json({ error: "Image is too large" }, { status: 413 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set on server" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
              { type: "text", text: "Analyze the style DNA of this outfit." },
            ],
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Anthropic API error", data);
      const detail = data?.error?.message || data?.error?.type || "";
      return NextResponse.json(
        {
          error: detail
            ? `We could not analyze this outfit: ${detail}`
            : "We could not analyze this outfit. Please try again.",
        },
        { status: res.status }
      );
    }

    const raw: string = data?.content?.[0]?.text || "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "Model returned unexpected format" }, { status: 500 });
    }
    const result = JSON.parse(match[0]);
    if (
      !Array.isArray(result.aesthetics) ||
      !Array.isArray(result.tags) ||
      typeof result.insight !== "string"
    ) {
      return NextResponse.json(
        { error: "The style analysis was incomplete. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "We could not analyze this outfit. Please try again." },
      { status: 500 }
    );
  }
}

// The live prototype pings this on load in some flows; report configuration status.
export async function GET() {
  return NextResponse.json({ ok: true, isConfigured: Boolean(process.env.ANTHROPIC_API_KEY) });
}
