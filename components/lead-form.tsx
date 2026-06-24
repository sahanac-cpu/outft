"use client";

import { useState } from "react";

/**
 * Editorial lead form. Posts name + email (+ optional note) to /api/subscribe
 * with a source tag. Hairline inputs, light labels, one elegant success state.
 */
export function LeadForm({
  source,
  cta,
  withNote = false,
  notePlaceholder = "A line about you",
}: {
  source: string;
  cta: string;
  withNote?: boolean;
  notePlaceholder?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, handle: name, note, kind: "waitlist", source }),
      });
      const data = await res.json();
      if (res.ok || data.already) {
        setStatus("done");
        setMessage(data.already ? "You're already on the list — we'll be in touch." : "Sent. We'll be in touch shortly.");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] font-light italic leading-snug text-ink">
        {message}
      </p>
    );
  }

  const field =
    "w-full border-b border-line2 bg-transparent pb-2 font-serif text-[clamp(1.05rem,2vw,1.4rem)] font-light text-ink outline-none placeholder:text-grey focus:border-ink";

  return (
    <form onSubmit={submit} className="space-y-10">
      <label className="block">
        <span className="lbl block">Name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={`mt-3 ${field}`}
        />
      </label>

      <label className="block">
        <span className="lbl block">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={`mt-3 ${field}`}
        />
      </label>

      {withNote && (
        <label className="block">
          <span className="lbl block">Message</span>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={notePlaceholder}
            className={`mt-3 resize-none ${field}`}
          />
        </label>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="lbl lbl-ink border-b border-ink pb-1.5 text-[12px] hover:opacity-60 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : cta}
      </button>

      {status === "error" && <p className="lbl lbl-ink">{message}</p>}
    </form>
  );
}
