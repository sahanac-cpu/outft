"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

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
  const reduce = useReducedMotionSafe();

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
      if (!res.ok) { setStatus("error"); setMessage(data.error ?? "Try again."); return; }
      setStatus("success");
      setMessage(data.message ?? "You're in.");
      setPosition(data.position ?? null);
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] border border-[#000000] bg-white"
      >
        <div className="flex items-center justify-between border-b border-[#333333] px-6 py-4">
          <span className="font-display text-[13px] font-bold text-[#000000]">OUTFT.</span>
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-[#808080]">
            {kind === "creator" ? "creator application" : "access requested"}
          </span>
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="flex items-center justify-center border border-[#333333] py-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-[#000000]" fill="none" strokeWidth={1.5}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {[
            ["Status", kind === "creator" ? "Under review" : "On the list"],
            ["You are", position ? `No. ${String(position).padStart(4, "0")}` : "Saved"],
            ["Opens", "In small rooms"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`flex items-baseline justify-between py-3 font-sans text-[12px] font-light ${
                i === 0 ? "border-t border-[#333333] mt-4" : "border-t border-[#e0e0e0]"
              }`}
            >
              <span className="uppercase tracking-[0.16em] text-[#808080]">{k}</span>
              <span className="text-[#000000]">{v}</span>
            </div>
          ))}
          <div className="mt-4 flex h-10 items-end justify-center gap-px border-t border-[#333333] pt-4">
            {BARS.map((b, i) => (
              <i key={i} className="block bg-[#000000]"
                style={{ width: `${b.w}px`, height: `${b.h}%`, opacity: b.faint ? 0.2 : 1 }} />
            ))}
          </div>
          <p className="mt-4 font-sans text-[12px] font-light leading-relaxed text-[#555555]">
            We&rsquo;ll write when your room is ready.
          </p>
          <button
            onClick={() => { setStatus("idle"); setMessage(""); setPosition(null); }}
            className="btn-ghost mt-5 w-full justify-center"
          >
            Add another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* tab switcher */}
      <div className="flex border border-[#333333]">
        {(["waitlist", "creator"] as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`relative flex-1 px-4 py-3 font-sans text-[11px] font-light uppercase tracking-[0.18em] transition-colors ${
              kind === k
                ? "bg-[#000000] text-white"
                : "bg-white text-[#555555] hover:text-[#000000]"
            }`}
          >
            {k === "waitlist" ? "Waitlist" : "Creator"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#555555]">
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
            className="w-full border border-[#333333] bg-white px-4 py-3.5 font-sans text-[14px] font-light text-[#000000] outline-none placeholder:text-[#999999] focus:border-[#000000]"
          />
        </div>

        <AnimatePresence initial={false}>
          {kind === "creator" && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="handle" className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#555555]">
                  Where you post
                </label>
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  placeholder="@handle or a link"
                  className="w-full border border-[#333333] bg-white px-4 py-3.5 font-sans text-[14px] font-light text-[#000000] outline-none placeholder:text-[#999999] focus:border-[#000000]"
                />
                <p className="font-sans text-[12px] font-light leading-relaxed text-[#808080]">
                  Creators get an early room and a place in the feeds that follow them.
                  We review every application by hand.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "error" && (
          <p className="font-sans text-[13px] font-light text-[#888]">{message}</p>
        )}
        {status === "idle" && message && (
          <p className="font-sans text-[13px] font-light text-[#555555]">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full border border-[#000000] bg-[#000000] py-4 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#333333] disabled:opacity-60"
        >
          {status === "loading" ? "…" : kind === "creator" ? "Apply as a creator" : "Request access"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-[#333333]" />
        <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#808080]">
          or continue with
        </span>
        <span className="h-px flex-1 bg-[#333333]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["Apple", "Google"].map((p) => (
          <button
            key={p}
            onClick={() => { setSource(p); setMessage(`We'll send a ${p} invite to the email below.`); emailRef.current?.focus(); }}
            className="btn-ghost justify-center"
          >
            {p}
          </button>
        ))}
      </div>

      <p className="mt-5 font-sans text-[11px] font-light leading-relaxed text-[#808080]">
        outft never posts for you and never reads a feed you have not opened.
        Continuing means we hold your email for an invite, nothing more.
      </p>
    </div>
  );
}
