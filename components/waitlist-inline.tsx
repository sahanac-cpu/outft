"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistInline() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const reduce = useReducedMotionSafe();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, kind: "waitlist", source: "hero" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Try again.");
        return;
      }
      setStatus("success");
      setPosition(data.position ?? null);
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="ok"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#333333] px-5 py-4 font-sans text-[12px] font-light uppercase tracking-[0.22em] text-[#000000]"
          >
            Handle saved — we&apos;ll write when your room is ready.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="flex items-stretch"
          >
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              aria-label="Email for the waitlist"
              className="min-w-0 flex-1 border border-r-0 border-[#333333] bg-[#f3f1ec]/80 px-4 py-3 font-sans text-[13px] font-light text-[#000000] outline-none placeholder:text-[#888888]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 border border-[#000000] bg-[#000000] px-5 py-3 font-sans text-[10px] font-light uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-[#333333] disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Join"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-3 font-sans text-[10px] font-light uppercase tracking-[0.24em] text-[#808080]">
        {status === "error" ? (
          <span className="normal-case tracking-normal text-[#888]">{message}</span>
        ) : (
          "Opening in small rooms"
        )}
      </p>
    </div>
  );
}

