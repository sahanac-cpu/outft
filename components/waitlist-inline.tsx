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
    <div className="mx-auto w-full max-w-[440px]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="ok"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 py-3 font-serif text-[18px] italic text-ink"
          >
            <CheckDot />
            You&rsquo;re on the list
            {position ? `. No. ${String(position).padStart(4, "0")}` : "."}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="flex items-center gap-1.5 rounded-full border border-line2 bg-white/75 p-1.5 pl-5 backdrop-blur-md shadow-[0_14px_34px_-22px_rgba(40,36,30,0.5)]"
          >
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@studio.com"
              aria-label="Email for the waitlist"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-[14.5px] text-ink outline-none placeholder:text-grey-soft"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white transition-transform duration-300 hover:-translate-y-px active:scale-[0.97] disabled:opacity-70"
            >
              {status === "loading" ? (
                <Spinner />
              ) : (
                <>
                  Join
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={1.6}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-grey">
        {status === "error" ? (
          <span className="text-[#9a5b5b] normal-case tracking-normal">{message}</span>
        ) : (
          "Opening in small rooms"
        )}
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

function CheckDot() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-ink">
      <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-white" fill="none" strokeWidth={2}>
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
