"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./logo";

type Kind = "waitlist" | "creator";
type Status = "idle" | "loading" | "success" | "error";

const BARS = Array.from({ length: 48 }, (_, i) => ({
  w: ((i * 73) % 5) * 0.5 + 0.8,
  h: ((((i * 37) % 10) / 10) * 0.45 + 0.55) * 100,
  faint: (i * 17) % 9 === 0,
}));

export function JoinFlow() {
  const [kind, setKind] = useState<Kind>("waitlist");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [source, setSource] = useState("join");
  const emailRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const handle = String(form.get("handle") ?? "");

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, handle, kind, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something broke. Try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "You're in.");
      setPosition(data.position ?? null);
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  function quick(provider: string) {
    setSource(provider);
    setMessage(`We'll send a ${provider} invite to the email below.`);
    setStatus("idle");
    emailRef.current?.focus();
  }

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[360px] bg-white px-7 pb-6 pt-7"
        style={{ borderRadius: 10, boxShadow: "0 40px 80px -36px rgba(40,36,30,.5)" }}
      >
        <div className="text-center">
          <Logo size="1.5rem" href={null} />
          <div className="mt-1 text-[8px] uppercase tracking-[0.32em] text-grey">
            {kind === "creator" ? "creator application" : "access requested"}
          </div>
        </div>
        <div className="my-5 grid place-items-center">
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-ink">
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-white" fill="none" strokeWidth={1.5}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {[
          ["Status", kind === "creator" ? "Under review" : "On the list"],
          ["You are", position ? `No. ${String(position).padStart(4, "0")}` : "Saved"],
          ["Opens", "In small rooms"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`flex items-baseline justify-between py-[9px] text-[12px] ${
              i === 0 ? "" : "border-t border-dashed border-line2"
            }`}
          >
            <span className="tracking-wide text-grey">{k}</span>
            <span className="tracking-wide text-ink">{v}</span>
          </div>
        ))}
        <div className="mt-4 flex h-10 items-end justify-center gap-px">
          {BARS.map((b, i) => (
            <i
              key={i}
              className="block bg-ink"
              style={{ width: `${b.w}px`, height: `${b.h}%`, opacity: b.faint ? 0.2 : 1 }}
            />
          ))}
        </div>
        <p className="mt-4 text-center font-serif text-[15px] italic text-ink2">
          {message} We&rsquo;ll write when your room is ready.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setMessage("");
            setPosition(null);
          }}
          className="mt-5 w-full rounded-full border border-line2 py-3 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
        >
          Add another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* segmented control: multiple signups */}
      <div className="flex rounded-full border border-line2 bg-panel p-1">
        {(["waitlist", "creator"] as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`relative flex-1 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${
              kind === k ? "text-white" : "text-grey hover:text-ink"
            }`}
          >
            {kind === k && (
              <motion.span
                layoutId="join-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">
              {k === "waitlist" ? "Waitlist" : "Creator"}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-7 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[11px] uppercase tracking-[0.16em] text-ink2">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@studio.com"
            className="w-full rounded-xl border border-line2 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-grey-soft focus:border-ink"
          />
        </div>

        <AnimatePresence initial={false}>
          {kind === "creator" && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="handle" className="text-[11px] uppercase tracking-[0.16em] text-ink2">
                  Where you post
                </label>
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  placeholder="@handle or a link"
                  className="w-full rounded-xl border border-line2 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-grey-soft focus:border-ink"
                />
                <p className="text-[12px] leading-relaxed text-grey">
                  Creators get an early room and a seat in other people&rsquo;s
                  seven. We review every application by hand.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "error" && (
          <p className="text-[13px] text-[#9a5b5b]">{message}</p>
        )}
        {status === "idle" && message && (
          <p className="text-[13px] text-ink2">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative flex h-[52px] items-center justify-center rounded-full bg-ink text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <Spinner /> Sending
            </span>
          ) : kind === "creator" ? (
            "Apply as a creator"
          ) : (
            "Request access"
          )}
        </button>
      </form>

      {/* quick options */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-grey-soft">
          or continue with
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => quick("Apple")}
          className="flex items-center justify-center gap-2 rounded-full border border-line2 bg-white py-3.5 text-[12px] text-ink transition-colors hover:border-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M16 13.5c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6s1.5.6 2.6.6 1.7-.9 2.4-1.9c.5-.7.7-1.4.8-1.4-.1 0-1.8-.6-1.8-2zm-2-5.8c.5-.6.9-1.5.8-2.4-.8 0-1.7.5-2.2 1.2-.5.5-.9 1.4-.8 2.3.9.1 1.8-.5 2.2-1.1z" />
          </svg>
          Apple
        </button>
        <button
          onClick={() => quick("Google")}
          className="flex items-center justify-center gap-2 rounded-full border border-line2 bg-white py-3.5 text-[12px] text-ink transition-colors hover:border-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z" />
            <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.4-2.6c-.9.6-2 1-3.2 1-2.5 0-4.6-1.7-5.3-4H3.2v2.6A10 10 0 0 0 12 22z" />
            <path fill="#FBBC05" d="M6.7 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.2A10 10 0 0 0 2 12c0 1.6.4 3.1 1.2 4.6L6.7 14z" />
            <path fill="#EA4335" d="M12 5.9c1.4 0 2.7.5 3.7 1.5l2.8-2.8A10 10 0 0 0 12 2a10 10 0 0 0-8.8 5.4L6.7 10c.7-2.3 2.8-4 5.3-4z" />
          </svg>
          Google
        </button>
      </div>
      <p className="mt-5 text-[11px] leading-relaxed text-grey">
        outft never posts for you and never reads a feed you have not opened.
        Continuing means we hold your email for an invite, nothing more.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <motion.span
      className="block h-3.5 w-3.5 rounded-full border-[1.5px] border-white/40 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}
