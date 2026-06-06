"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * SSR-safe reduced-motion hook.
 *
 * `useReducedMotion()` returns `false` during server render (no media query
 * available) but the real value on the client. Branching `initial` props on
 * that difference produces a hydration mismatch for reduced-motion users.
 *
 * This returns `false` on the server AND the first client render (matching the
 * SSR HTML), then the real preference after mount. Entrance animations are
 * already done by then; only looping/idle motion flips, post-hydration.
 */
export function useReducedMotionSafe(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!prefers : false;
}
